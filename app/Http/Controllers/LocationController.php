<?php

namespace App\Http\Controllers;

use App\Models\location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index() {
        try {
            $model = location::with('parent')->get();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function location() {
        try {
            $model = location::where('status', 1)->get();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function store(Request $request) {
        try {
            $location = location::where('name', $request->input('name'))->first();

            if (!$location) {
                $res = location::create([
                    'name' => $request->input('name'),
                    'parent_id' => $request->input('parent_id') ?: null,
                    'status' => $request->input('status') ?: 1
                ]);

                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
