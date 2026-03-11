<?php

namespace App\Filament\Resources\LiveKeys\Schemas;

use App\Enums\KeyInfoStatus;
use App\Enums\KeyRemainingCountStatus;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class LiveKeyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
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
            ]);
    }
}
