<?php

namespace App\Http\Controllers;

use App\Models\supplier;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SupplierController extends Controller
{
    public function index() {
        try {
            $model = supplier::all();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function supplier() {
        try {
            $model = supplier::whereIn('role', [1,3])->get();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function subcon() {
        try {
            $model = supplier::whereIn('role', [2,3])->get();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function store(Request $request) {
        DB::beginTransaction();
        try {
            $supplier = supplier::where('id', $request->input('id'))->first();

            if (!$supplier) {
                $res = supplier::create([
                    'name' => $request->input('name'),
                    // 'parent_id' => $request->input('parent_id') ?: null,
                    'role' => $request->input('role') ?: null
                ]);

                DB::commit();
                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            } else {
                $supplier->name = request('name');
                $supplier->role = request('role');
                // $supplier->parent_id = $request->input('parent_id') ?: null;
                $supplier->save();

                DB::commit();
                return response()->json(['message' => 'SUCCESS', 'model' => $supplier], 200);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
