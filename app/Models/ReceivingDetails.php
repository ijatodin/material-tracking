<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceivingDetails extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'ref_no', 'description', 'location_id', 'plot', 'quantity', 'remarks', 'created_by', 'updated_by'
    ];

    public function location() {
        return $this->hasOne('App\Models\location', 'id', 'location_id');
    }

    public function ref() {
        return $this->hasOne('App\Models\Receiving', 'ref_no', 'ref_no');
    }
}
