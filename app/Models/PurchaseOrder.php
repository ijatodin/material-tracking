<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'file_id', 'created_by', 'updated_by'
    ];

    public function file() {
        return $this->hasOne('App\Models\File', 'id', 'file_id');
    }
}
