<?php

namespace App\Http\Controllers;

use App\Models\StoredKey;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GetRemainingCountAPIController extends Controller
{
	/**
	 * Handle incoming request from remote service to get remaining counts for given keys.
	 *
	 * Expected request:
	 *  - Header: Token => 'Get.MAK.$3cretKey.%23@nk@sky'
	 *  - JSON body: { "keys": ["KEY1", "KEY2", ...] }
	 *
	 * Returns a JSON object mapping each requested key to its remaining_counts.
	 *
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function __invoke(Request $request): JsonResponse
	{
		$token = $request->header('Token') ?? $request->header('token');
		$expectedToken = 'Get.MAK.$3cretKey.%23@nk@sky';

		if ($token !== $expectedToken) {
			return response()->json(['error' => 'Unauthorized'], 401);
		}

		$keys = $request->input('keys', []);

		if (!is_array($keys)) {
			return response()->json(['error' => 'Invalid payload: keys must be an array'], 422);
		}

		if (empty($keys)) {
			return response()->json([]);
		}

		$allowedKeyTypes = ['Volume:MAK', 'OEM:NONSLP'];

		$found = StoredKey::query()
			->whereIn('key', $keys)
			->get(['key', 'remaining_counts', 'key_type'])
			->keyBy('key');

		$result = [];
		foreach ($keys as $k) {
			if (!isset($found[$k])) {
				$result[$k] = -3;
				continue;
			}

			$stored = $found[$k];
			$keyType = $stored->key_type;

			if (!in_array($keyType, $allowedKeyTypes, true)) {
				$result[$k] = -2;
				continue;
			}

			$result[$k] = (int) $stored->remaining_counts;
		}

		return response()->json($result);
	}
}
