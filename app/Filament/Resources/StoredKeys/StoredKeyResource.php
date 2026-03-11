<?php

namespace App\Filament\Resources\StoredKeys;

use App\Filament\Resources\StoredKeys\Pages\CreateStoredKey;
use App\Filament\Resources\StoredKeys\Pages\EditStoredKey;
use App\Filament\Resources\StoredKeys\Pages\ListStoredKeys;
use App\Filament\Resources\StoredKeys\Pages\ViewStoredKey;
use App\Filament\Resources\StoredKeys\Schemas\StoredKeyForm;
use App\Filament\Resources\StoredKeys\Schemas\StoredKeyInfolist;
use App\Filament\Resources\StoredKeys\Tables\StoredKeysTable;
use App\Models\StoredKey;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class StoredKeyResource extends Resource
{
    protected static ?string $model = StoredKey::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedKey;

    protected static ?string $recordTitleAttribute = 'key';

    public static function canViewAny(): bool
    {
        return !Auth::user()?->is_admin;
    }

    public static function form(Schema $schema): Schema
    {
        return StoredKeyForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return StoredKeyInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StoredKeysTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListStoredKeys::route('/'),
            'create' => CreateStoredKey::route('/create'),
            'view' => ViewStoredKey::route('/{record}'),
            'edit' => EditStoredKey::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();
        if (!Auth::user()?->is_admin) {
            $query->where('user_id', Auth::id());
        }
        return $query;
    }
}
