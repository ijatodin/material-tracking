<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function index() {
        try {
            $model = Material::with('type')->orderBy('description', 'asc')->get();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function search() {
        try {
            $query = Material::query();
            $query->when(request('search'), function ($q) {
                return $q->where('description', 'LIKE', "%" . request('search') . "%");
            });

            $model = $query->get();

            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function store(Request $request) {
        try {
            $material = Material::where('description', $request->input('description'))->first();

            if (!$material) {
                $res = Material::create([
                    'description' => $request->input('description'),
                    'specs' => $request->input('specs') ?: null,
                    'uom' => $request->input('uom') ?: null,
                    'type' => $request->input('type') ?: 1,
                    'vendor_id' => $request->input('vendor_id') ?: null
                ]);

                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            } else {
                return response()->json(['message' => 'EXIST', 'model' => $material], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
