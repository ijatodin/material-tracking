<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PurchaseOrderController extends Controller
{
    public function index()
    {
        try {
            $model = PurchaseOrder::with('file')->get();
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        //validate incoming request
        $this->validate($request, [
            'name' => 'required|string|unique:purchase_orders,name'
        ]);

        try {
            $po = PurchaseOrder::where('id', request('id'))->first();
            $file = new File();

            if ($request->hasFile('file')) {
                $fileName = $request->file('file')->getClientOriginalName();
                $fileNameOnly = pathinfo($fileName, PATHINFO_FILENAME);
                $fileExtension = $request->file('file')->getClientOriginalExtension();
                $completeName = str_replace(' ', '_', $fileNameOnly) . '_' . rand() . '.' . $fileExtension;
                $path = $request->file('file')->storeAs('public', $completeName);

                $url = Storage::url($completeName);

                $file->type = request('type');
                $file->filename = $completeName;
                $file->path = $url;
                $file->created_by = auth()->id();
                $file->updated_by = auth()->id();
            }
            if ($file->save()) {
                $name = request('name');
                // dd($formData);

                if ($po) {
                    $po->name = $name;
                    if ($file) {
                        $po->file_id = $file->id;
                    }
                    $po->save();
                    DB::commit();
                    return response()->json(['message' => 'SUCCESS', 'model' => $po], 200);
                } else {
                    $res = PurchaseOrder::create([
                        'name' => $name,
                        'file_id' => $file->id
                    ]);
                    $res->file = $file;
                    DB::commit();
                    return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
                }
            }
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function delete(Request $request)
    {
        try {
            $purchaseOrder = PurchaseOrder::where('id', $request->input('id'))->first();

            if (!$purchaseOrder) {
                return response()->json(['message' => 'NO DATA'], 404);
            } else {
                $file = File::where('id', $purchaseOrder->file_id)->first();
                $file->delete();

                $purchaseOrder->delete();

                return response()->json(['message' => 'SUCCESS', 'model' => $purchaseOrder], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
