<?php

namespace App\Filament\Resources\StoredKeys\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\ChangeLog;
use Flowframe\Trend\Trend as TrendTrend;
use LaravelTrend\Trend; // Ensure laravel-trend is installed and imported
use LaravelTrend\TrendValue;
use Illuminate\Support\Carbon;

class StoredKeyHistoryChart extends ChartWidget
{
    protected ?string $heading = 'Stored Key History Chart';

    protected int | string | array $columnSpan = 'full';

    protected ?string $maxHeight = '300px';

    public $record_id;

    protected function getData(): array
    {
        // For each date, get the latest remaining_counts value
        $datewiseCounts = ChangeLog::query()
            ->where('table_id', $this->record_id)
            ->where('table_name', 'stored_keys')
            ->selectRaw('DATE(created_at) as date, MAX(id) as max_id')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($row) {
                $log = ChangeLog::find($row->max_id);
                $remaining = null;
                if ($log && isset($log->data['remaining_counts'])) {
                    $remaining = $log->data['remaining_counts'];
                }
                return [
                    'date' => $row->date,
                    'remaining_counts' => $remaining,
                ];
            })
            ->filter(fn($item) => $item['remaining_counts'] !== null)
            ->values();

        return [
            'datasets' => [
                [
                    'label' => 'Remaining Counts',
                    'data' => $datewiseCounts->pluck('remaining_counts', 'date')->toArray(),
                ],
            ],
            'labels' => $datewiseCounts->pluck('date')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
