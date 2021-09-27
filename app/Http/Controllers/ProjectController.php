<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index() {
        try {
            $model = Project::get();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function store(Request $request) {
        try {
            $title = Project::where('title', $request->input('title'))->first();

            if (!$title) {
                $res = Project::create([
                    'title' => $request->input('title'),
                    'sub_title' => $request->input('sub_title') ?: null,
                    'project_no' => $request->input('project_no') ?: null
                ]);

                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
