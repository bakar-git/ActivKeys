<?php

namespace App\Models;

use App\Traits\HasToCheckScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class LiveKey extends Model
{
    use HasToCheckScope;

    protected $fillable = [
        'user_id',
        'key',
        'description',
        'edition_id',
        'key_type',
        'eula_type',
        'product_id',
        'error',
        'key_info_status',
        'key_remaining_count_status',
        'remaining_counts',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (is_null($model->user_id) && Auth::check()) {
                $model->user_id = Auth::id();
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
