<?php

namespace App\Http\Controllers;

use App\Models\Personnel;
use Illuminate\Http\Request;

class PersonnelController extends Controller
{
    public function index() {
        try {
            $model = Personnel::get();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function group() {
        try {
            $res = Personnel::get()->groupBy('role');
            // $model = $res->groupBy('role');
            return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function store(Request $request) {
        try {
            $title = Personnel::where('name', $request->input('name'))->first();

            if (!$title) {
                $res = Personnel::create([
                    'name' => $request->input('name'),
                    'designation' => $request->input('designation') ?: null,
                    'role' => $request->input('role') ?: 1
                ]);

                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
