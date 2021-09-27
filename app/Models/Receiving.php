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
        'id', 'ref_no', 'supplier', 'subcon', 'date', 'received_date', 'location_id', 'plot', 'do_no', 'po_no', 'remarks', 'status', 'created_by', 'updated_by'
    ];

    public function details() {
        return $this->hasMany('App\Models\ReceivingDetails', 'ref_no', 'ref_no');
    }

    public function location() {
        return $this->hasOne('App\Models\location', 'id', 'location_id');
    }
}
