<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class supplier extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'parent_id', 'id'
    ];

    public function parent() {
        return $this->hasOne('App\Models\supplier', 'id', 'parent_id');
    }

    public function subcon() {
        return $this->hasMany('App\Models\supplier', 'parent_id', 'id');
    }
}
