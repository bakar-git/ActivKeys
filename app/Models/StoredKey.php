<?php

namespace App\Models;

use App\Traits\HasToCheckScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoredKey extends Model
{
    use HasToCheckScope;
    public function keyType(): BelongsTo
    {
        return $this->belongsTo(KeyType::class, 'key_type_id');
    }
}
