<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'description', 'specs', 'type', 'uom', 'vendor_id', 'created_by', 'updated_by'
    ];

    public function types() {
        return $this->hasOne('App\Models\materialType', 'id', 'type');
    }
}
