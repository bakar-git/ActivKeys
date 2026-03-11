<?php

namespace App\Models;

use App\Enums\AppSettingKey;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppSetting extends Model
{
    use HasFactory;

    protected $fillable = ['key', 'value'];

    /**
     * Get setting value by key
     */
    public static function getValue(AppSettingKey $key, $default = null)
    {
        $setting = self::where('key', $key->value)->first();
        return $setting ? $setting->value : $default;
    }

    /**
     * Set setting value by key
     */
    public static function setValue(AppSettingKey $key, $value): void
    {
        self::updateOrCreate(
            ['key' => $key->value],
            ['value' => $value]
        );
    }
}
