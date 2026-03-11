<?php

namespace App\Filament\Resources\StoredKeys\Schemas;

use App\Enums\KeyInfoStatus;
use App\Enums\KeyRemainingCountStatus;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Unique;

class StoredKeyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->unique(ignoreRecord: true, modifyRuleUsing: fn (Unique $rule) => $rule->where('user_id', Auth::id()))
                    ->required(),
                TextInput::make('description'),
                TextInput::make('edition_id'),
                TextInput::make('key_type'),
                TextInput::make('eula_type'),
                TextInput::make('product_id'),
                TextInput::make('error'),
                Select::make('key_info_status')->enum(KeyInfoStatus::class)->options(KeyInfoStatus::class)->nullable()->placeholder('No Status'),
                Select::make('key_remaining_count_status')->enum(KeyRemainingCountStatus::class)->options(KeyRemainingCountStatus::class)->nullable()->placeholder('No Status'),
                TextInput::make('remaining_counts')
                    ->required()
                    ->numeric()
                    ->default(-111),
                Toggle::make('is_sold')
                    ->required(),
                Select::make('key_type_id')
                    ->relationship('keyType', 'name', fn (Builder $query) => Auth::user()?->is_admin
                        ? $query
                        : $query->where('user_id', Auth::id())
                    )
                    ->searchable()
                    ->required(),
            ]);
    }
}
