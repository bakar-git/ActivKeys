<?php

namespace App\Filament\Resources\LiveKeys\Tables;

use App\Enums\KeyInfoStatus;
use App\Models\LiveKey;
use App\Services\PidProcessingService;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class LiveKeysTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn ($query) => $query->orderBy('id', 'desc'))
            ->columns([
                TextColumn::make('key')
                    ->copyable()
                    ->tooltip('Click key to copy')
                    ->description(function (LiveKey $record) {
                        if ($record->key_info_status === KeyInfoStatus::ERROR->value) {
                            return $record->error;
                        }

                        if ($record->remaining_counts < 0) {
                            return PidProcessingService::getErrorMessage($record->remaining_counts);
                        }
                        return $record->product_id ?: 'N/A';
                    })
                    ->searchable(),
                TextColumn::make('description')
                    ->description(function (LiveKey $record) {
                        return $record->edition_id ?: 'N/A';
                    })
                    ->searchable(),
                TextColumn::make('key_type')
                    ->label('Type (auto)')
                    ->description(function (LiveKey $record) {
                        return $record->eula_type ?: 'N/A';
                    })
                    ->toggleable()
                    ->searchable(),
                TextColumn::make('remaining_counts')
                    ->sortable(),
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
                $shouldPoll = collect($records->items())->contains(function (LiveKey $record) {
                    return $record->needsPolling();
                });
                return $shouldPoll ? '2s' : null;
            })
            ->filters([
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
                    ->action(function (LiveKey $record) {
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
