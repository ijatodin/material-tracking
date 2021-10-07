<?php

namespace App\Http\Controllers;

use App\Models\materialType;
use Illuminate\Http\Request;

class MaterialTypeController extends Controller
{
    public function index()
    {
        try {
            $model = materialType::all();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            $id = request('id');

            if ($id) {
                $type = materialType::where('id', $id)->first();
                $type->name = request('name');
                $type->status = request('status');
                $type->updated_by = auth()->id();
                $type->save();

                return response()->json(['message' => 'SUCCESS', 'model' => $type], 200);
            } else {
                $res = materialType::create([
                    'name' => $request->input('name'),
                    'status' => $request->input('status') ?: 1,
                ]);

                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            }

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
