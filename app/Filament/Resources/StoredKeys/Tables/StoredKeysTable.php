<?php

namespace App\Filament\Resources\StoredKeys\Tables;

use App\Enums\KeyInfoStatus;
use App\Models\StoredKey;
use App\Services\PidProcessingService;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class StoredKeysTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn ($query) => $query->orderBy('id', 'desc'))
            ->columns([
                TextColumn::make('key')
                    ->copyable()
                    ->tooltip('Click key to copy')
                    ->description(function (StoredKey $record) {
                        
                        if ($record->key_info_status === KeyInfoStatus::ERROR->value) {
                            return $record->error ?: 'N/A';
                        }
                        if ($record->remaining_counts < 0) {
                            return PidProcessingService::getErrorMessage($record->remaining_counts);
                        }
                        return $record->product_id ?: 'N/A';
                    })
                    ->searchable(),
                TextColumn::make('description')
                    ->description(function (StoredKey $record) {
                        return $record->edition_id ?: 'N/A';
                    })
                    ->searchable(),
                TextColumn::make('keyType.name')
                    ->searchable(),
                TextColumn::make('key_type')
                    ->label('Type (auto)')
                    ->description(function (StoredKey $record) {
                        return $record->eula_type ?: 'N/A';
                    })
                    ->toggleable()
                    ->searchable(),
                TextColumn::make('remaining_counts')
                    ->sortable(),
                IconColumn::make('is_sold')
                    ->boolean(),
                TextColumn::make('key_info_status')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('key_remaining_count_status')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->poll(function () use ($table) {
                $records = $table->getRecords();
                $shouldPoll = collect($records->items())->contains(function (StoredKey $record) {
                    return $record->needsPolling();
                });
                return $shouldPoll ? '2s' : null;
            })
            ->groups([
                'keyType.name'
            ])
            ->filters([
                // filter by key Type relationship sort by name
                SelectFilter::make('keyType')->relationship('keyType', 'name', fn (Builder $query) => $query->orderBy('name', 'desc')),
                SelectFilter::make('remaining_counts')
                ->options([
                    'positive' => 'Greater than 0',
                    'zero' => 'Equal to 0',
                    'blocked' => 'Key Blocked (-1)',
                    'error' => 'Error (<0)',
                ])
                ->query(function (Builder $query, array $data) {
                    if ($data['value'] === 'positive') {
                        $query->where('remaining_counts', '>', 0);
                    } elseif ($data['value'] === 'zero') {
                        $query->where('remaining_counts', '=', 0);
                    } elseif ($data['value'] === 'blocked') {
                        $query->where('remaining_counts', '=', -1);
                    } elseif ($data['value'] === 'error') {
                        $query->where('remaining_counts', '<', -1);
                    }
                })
            ])
            ->recordActions([
                Action::make('recheck')
                    ->label('Recheck')
                    ->tooltip('Recheck Key Info')
                    ->icon(Heroicon::ArrowPath)
                    ->iconButton()
                    ->action(function (StoredKey $record) {
                        $record->remaining_counts = -111;
                        $record->key_remaining_count_status = null;
                        $record->save();
                    }),
                ViewAction::make()->iconButton(),
                EditAction::make()->iconButton(),
                DeleteAction::make()->iconButton(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
