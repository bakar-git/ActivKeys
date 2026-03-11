<?php

namespace App\Traits;
use App\Enums\KeyInfoStatus;
use App\Enums\KeyRemainingCountStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;

trait HasToCheckScope
{
    #[Scope]
    protected function toCheck(Builder $query): void
    {
        $query
        ->where('key_info_status', KeyInfoStatus::RECEIVED->value)
        ->whereIn('key_type', ['Volume:MAK', 'OEM:NONSLP'])
        ->where(function ($query) {
                    $query->whereNull('key_remaining_count_status')
                        ->orWhere(function ($subquery) {
                            $subquery->where('key_remaining_count_status', KeyRemainingCountStatus::PENDING->value)
                                ->where('updated_at', '<', Carbon::now()->subMinute(5));
                        });
            });
    }


    // Check to see if records need polling
    public function needsPolling(): bool
    {
        return 
        $this->key_info_status === null || 
        $this->key_info_status === KeyInfoStatus::PENDING->value ||
        ($this->key_info_status === KeyInfoStatus::RECEIVED->value && $this->key_remaining_count_status === null) ||
        ($this->key_info_status === KeyInfoStatus::RECEIVED->value && $this->key_remaining_count_status === KeyRemainingCountStatus::PENDING->value);
    }
}
