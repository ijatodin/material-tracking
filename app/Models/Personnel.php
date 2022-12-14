<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'designation', 'role', 'id', 'signature_id'
    ];

    public function signature() {
        return $this->hasOne('App\Models\File', 'id', 'signature_id');
    }
}
