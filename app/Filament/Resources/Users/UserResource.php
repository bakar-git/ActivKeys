<?php

namespace App\Filament\Resources\Users;

use App\Filament\Resources\Users\Pages\ManageUsers;
use App\Models\User;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUsers;

    public static function canViewAny(): bool
    {
        return Auth::user()?->is_admin ?? false;
    }

    public static function canAccess(): bool
    {
        return Auth::user()?->is_admin ?? false;
    }



    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true),
                TextInput::make('password')
                    ->password()
                    ->required(fn (string $operation) => $operation === 'create')
                    ->dehydrated(fn ($state) => filled($state))
                    ->dehydrateStateUsing(fn ($state) => bcrypt($state))
                    ->label(fn (string $operation) => $operation === 'create' ? 'Password' : 'New Password (leave blank to keep)'),
                Toggle::make('is_admin')
                    ->label('Administrator')
                    ->helperText('Administrators can see all users\' data and manage users.'),
                Toggle::make('is_active')
                    ->label('Active')
                    ->default(true)
                    ->helperText('Inactive users cannot log in.'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->searchable()
                    ->sortable(),
                IconColumn::make('is_admin')
                    ->label('Admin')
                    ->boolean(),
                IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean(),
                TextColumn::make('key_types_count')
                    ->counts('keyTypes')
                    ->label('Key Types')
                    ->badge()
                    ->color('info')
                    ->sortable(),
                TextColumn::make('stored_keys_count')
                    ->counts('storedKeys')
                    ->label('Stored Keys')
                    ->badge()
                    ->color('warning')
                    ->sortable(),
                TextColumn::make('live_keys_count')
                    ->counts('liveKeys')
                    ->label('Live Keys')
                    ->badge()
                    ->color('success')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageUsers::route('/'),
        ];
    }
}
