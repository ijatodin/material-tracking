<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receiving extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'ref_no', 'supplier_id', 'subcon_id', 'date', 'received_date', 'do_no', 'po_no', 'remarks', 'status', 'summary_id', 'created_by', 'updated_by'
    ];

    protected $casts = [
        'date' => 'datetime:d-m-Y',
        'received_date' => 'datetime:d-m-Y'
     ];

    public function details() {
        return $this->hasMany('App\Models\ReceivingDetails', 'ref_no', 'ref_no');
    }

    public function location() {
        return $this->hasOne('App\Models\location', 'id', 'location_id');
    }

    public function supplier() {
        return $this->hasOne('App\Models\supplier', 'id', 'supplier_id');
    }

    public function subcon() {
        return $this->hasOne('App\Models\supplier', 'id', 'subcon_id');
    }

    public function files() {
        return $this->hasOne('App\Models\File', 'ref_no', 'ref_no');
    }

    public function do_file() {
        return $this->hasOne('App\Models\File', 'ref_no', 'ref_no');
    }

    public function po() {
        return $this->hasOne('App\Models\PurchaseOrder', 'name', 'po_no');
    }
}
