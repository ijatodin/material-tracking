<?php

namespace App\Http\Controllers;

use App\Models\Receiving;
use App\Models\ReceivingDetails;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SummaryReportController extends Controller
{
    public function generate()
    {
        try {
            // dd(Carbon::now()->startOfWeek()->format('Y-m-d H:i:s'));
            $filterBy = request('filterBy');
            $range = request('range');

            if ($filterBy == 'description') {
                $query = ReceivingDetails::query();

                $query->when($range == 'week', function ($q) {
                    return $q->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                });

                $query->when($range == 'month', function ($q) {
                    return $q->whereMonth('created_at', date('m'))->whereYear('created_at', date('Y'));
                });

                $query->when($range == 'custom', function ($q) {
                    return $q->whereBetween('created_at', [Carbon::parse(request('from'))->format('Y-m-d H:i:s'), Carbon::parse(request('to'))->format('Y-m-d H:i:s')]);
                });

                $res = $query->where('material_id', request('material_id'))->with('ref', 'ref.supplier', 'ref.subcon')->get()->groupBy('description');

                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            } else {
                $query = Receiving::query();

                if ($filterBy == 'supplier_id') {
                    $query->when(request('supplier_id'), function ($q) {
                        return $q->where('supplier_id', request('supplier_id'));
                    });
                } else if ($filterBy == 'subcon_id') {
                    $query->when(request('subcon_id'), function ($q) {
                        return $q->where('subcon_id', request('subcon_id'));
                    });
                }

                // range
                $query->when($range == 'week', function ($q) {
                    return $q->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                });

                $query->when($range == 'month', function ($q) {
                    return $q->whereMonth('created_at', date('m'))->whereYear('created_at', date('Y'));
                });

                $query->when($range == 'custom', function ($q) {
                    return $q->whereBetween('created_at', [Carbon::parse(request('from'))->format('Y-m-d H:i:s'), Carbon::parse(request('to'))->format('Y-m-d H:i:s')]);
                });

                $receiving = $query->get();
                // dd($receiving);
                $ref = array();
                foreach ($receiving as $r) {
                    $push = array_push($ref, $r->ref_no);
                }
                // dd($ref);

                $res = ReceivingDetails::getDetails($ref);

                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
