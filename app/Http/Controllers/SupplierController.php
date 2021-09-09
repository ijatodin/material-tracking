<?php

namespace App\Http\Controllers;

use App\Models\supplier;
use Exception;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index() {
        try {
            $model = supplier::with('parent')->get();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function supplier() {
        try {
            $model = supplier::whereNull('parent_id')->with('subcon')->get();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function store(Request $request) {
        try {
            $supplier = supplier::where('name', $request->input('name'))->first();

            if (!$supplier) {
                $res = supplier::create([
                    'name' => $request->input('name'),
                    'parent_id' => $request->input('parent_id') ?: null
                ]);

                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
