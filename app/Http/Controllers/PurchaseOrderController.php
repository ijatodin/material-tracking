<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PurchaseOrderController extends Controller
{
    public function index() {
        try {
            $model = PurchaseOrder::with('file')->get();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function store(Request $request) {
        DB::beginTransaction();
        try {
            $file = new File();

            if ($request->hasFile('file')) {
                $fileName = $request->file('file')->getClientOriginalName();
                $fileNameOnly = pathinfo($fileName, PATHINFO_FILENAME);
                $fileExtension = $request->file('file')->getClientOriginalExtension();
                $completeName = str_replace(' ', '_', $fileNameOnly).'_'.rand().'.'.$fileExtension;
                $path = $request->file('file')->storeAs('public', $completeName);

                $url = Storage::url($completeName);

                $file->type = request('type');
                $file->filename = $completeName;
                $file->path = $url;
                $file->created_by = auth()->id();
                $file->updated_by = auth()->id();
            }
            if ($file->save()) {
                $formData = request('form');
                // dd($formData);
                $res = PurchaseOrder::create([
                    'name' => $formData,
                    'file_id' => $file->id
                ]);
                $res->file = $file;
                DB::commit();
                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            }
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
