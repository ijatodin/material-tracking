<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Receiving;
use App\Models\ReceivingDetails;
use App\Models\registryCounters;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReceivingController extends Controller
{
    public function index()
    {
        try {
            $model = Receiving::with('details', 'subcon', 'supplier', 'files', 'po', 'po.file')->get();
            // $res = $model->details->groupBy('description');
            // dd($model);
            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function store()
    {
        DB::beginTransaction();
        try {
            $refNo = request('ref_no') == '' ? registryCounters::setRunningNumbers('RCV') : request('ref_no');
            $res = Receiving::updateOrCreate(
                ['ref_no' => $refNo],
                [
                    'ref_no' => $refNo,
                    'supplier_id' => request('supplier_id'),
                    'subcon_id' => request('subcon_id'),
                    'do_no' => request('do_no'),
                    'po_no' => request('po_no'),
                    'remarks' => request('remarks') ?: null,
                    'date' => Carbon::parse(request('date'))->format('Y-m-d H:i:s'),
                    'received_date' => Carbon::parse(request('received_date'))->format('Y-m-d H:i:s')
                ]
            );

            $receivingDetails = request('details');

            if ($res) {
                foreach ($receivingDetails as $rd) {
                    ReceivingDetails::create(
                        [
                            'ref_no' => $res->ref_no,
                            'material_id' => $rd['id'],
                            'description' => $rd['description'],
                            'location' => $rd['location'],
                            'element' => $rd['element'] ?: null,
                            'quantity' => $rd['quantity'],
                            'remarks' => $rd['remarks'] ?: null,
                        ]
                    );
                }
            }

            if (request('do_file')) {
                $dofile = new File(request('do_file'));
                
                $file = File::where('id', $dofile->id)->first();
                $file->ref_no = $refNo;
                $file->save();
            }


            DB::commit();
            return response()->json([
                'message' => 'SUCCESS',
                'data' => $res
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'ERROR',
                'data' => $e->getMessage()
            ], 404);
        }
    }
}
