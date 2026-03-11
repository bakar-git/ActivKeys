<?php

namespace App\Http\Controllers;

use App\Enums\KeyInfoStatus;
use App\Models\LiveKey;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LiveKeyInfoController extends Controller
{
    public function index()
    {
        return DB::transaction(function () {
            $res = LiveKey::select(['id', 'key'])
                ->where(function ($query) {
                    $query->whereNull('key_info_status')
                        ->orWhere(function ($subquery) {
                            $subquery->where('key_info_status', KeyInfoStatus::PENDING->value)
                                ->where('updated_at', '<', Carbon::now()->subMinute(5));
                        });
                })
                ->orderBy('id', 'desc')
                ->limit(50)
                ->lockForUpdate()
                ->get();

            if ($res->isNotEmpty()) {
                LiveKey::whereIn('id', $res->pluck('id'))
                    ->update(['key_info_status' => KeyInfoStatus::PENDING->value]);

                return response()->json($res->pluck('key'));
            }

            return response()->json([]);
        });
    }

    public function update(Request $request)
    {
        $updates = $request->all();
        foreach ($updates as $update) {
            $liveKey = LiveKey::where('key', $update['Key']);

            if ($update['Error'] !== null) {
                $liveKey->update([
                    'key_info_status' => KeyInfoStatus::ERROR->value,
                    'error' => $update['Error'],
                ]);
                continue;
            }

            $liveKey->update([
                'description' => $update['Description'] ?? null,
                'edition_id' => $update['EditionId'] ?? null,
                'key_type' => $update['KeyType'] ?? null,
                'eula_type' => $update['EulaType'] ?? null,
                'product_id' => $update['ProductId'] ?? null,
                'key_info_status' => KeyInfoStatus::RECEIVED->value,
            ]);
        }
        return response()->json();
    }
}
