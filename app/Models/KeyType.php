<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KeyType extends Model
{
    protected $fillable = [
        'name',
        'daily_check',
    ];

    public function storedKeys()
    {
        return $this->hasMany(StoredKey::class, 'key_type_id');
    }
}
