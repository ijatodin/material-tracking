<?php

namespace App\Http\Controllers;

use App\Models\File;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $file = new File;

            if ($request->hasFile('file')) {
                $fileName = $request->file('file')->getClientOriginalName();
                $fileNameOnly = pathinfo($fileName, PATHINFO_FILENAME);
                $fileExtension = $request->file('file')->getClientOriginalExtension();
                $completeName = str_replace(' ', '_', $fileNameOnly).'_'.rand().'.'.$fileExtension;
                $date = Carbon::now()->format('dmYHis');
                // $completeName = $fileNameOnly . '_' . $date .  '.' . $fileExtension;
                $path = $request->file('file')->storeAs('public', $completeName);

                $url = Storage::url($completeName);

                $file->type = request('type');
                $file->filename = $completeName;
                $file->path = $url;
                $file->created_by = auth()->id();
                $file->updated_by = auth()->id();
            }
            if ($file->save()) {
                DB::commit();
                return response()->json(['message' => 'SUCCESS', 'model' => $file], 200);
            }
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function clearDo()
    {
        try {
            $files = File::whereNull('ref_no')->where('type', 1)->get();

            if ($files) {
                foreach ($files as $file) {
                    $storage = Storage::delete('public/' . $file->filename);
                    $file->delete();
                }
                return response()->json(['message' => 'SUCCESS', 'model' => $files], 200);
            } else {
                return response()->json(['message' => 'NO DATA'], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
