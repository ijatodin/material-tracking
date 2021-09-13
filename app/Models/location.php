<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class location extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'status', 'parent_id', 'created_by', 'updated_by'
    ];

    public function parent() {
        return $this->hasOne('App\Models\location', 'id', 'parent_id');
    }
}
