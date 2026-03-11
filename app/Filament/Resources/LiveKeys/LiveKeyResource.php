<?php

namespace App\Filament\Resources\LiveKeys;

use App\Filament\Resources\LiveKeys\Pages\CreateLiveKey;
use App\Filament\Resources\LiveKeys\Pages\EditLiveKey;
use App\Filament\Resources\LiveKeys\Pages\ListLiveKeys;
use App\Filament\Resources\LiveKeys\Pages\ViewLiveKey;
use App\Filament\Resources\LiveKeys\Schemas\LiveKeyForm;
use App\Filament\Resources\LiveKeys\Schemas\LiveKeyInfolist;
use App\Filament\Resources\LiveKeys\Tables\LiveKeysTable;
use App\Models\LiveKey;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class LiveKeyResource extends Resource
{
    protected static ?string $model = LiveKey::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedKey;

    protected static ?string $recordTitleAttribute = 'key';

    public static function canViewAny(): bool
    {
        return !Auth::user()?->is_admin;
    }

    public static function form(Schema $schema): Schema
    {
        return LiveKeyForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return LiveKeyInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LiveKeysTable::configure($table);
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
            'index' => ListLiveKeys::route('/'),
            'create' => CreateLiveKey::route('/create'),
            'view' => ViewLiveKey::route('/{record}'),
            'edit' => EditLiveKey::route('/{record}/edit'),
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
