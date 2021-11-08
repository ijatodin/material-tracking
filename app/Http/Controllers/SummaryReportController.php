<?php

namespace App\Http\Controllers;

use App\Models\Receiving;
use App\Models\ReceivingDetails;
use App\Models\registryCounters;
use App\Models\SummaryReport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SummaryReportController extends Controller
{
    public function index()
    {
        try {
            $res = SummaryReport::with('maker', 'checker', 'approver', 'maker.signature', 'checker.signature', 'approver.signature')->get();

            return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function single()
    {
        try {
            $res = ReceivingDetails::where('summary_id', request('id'))->with('ref', 'ref.supplier', 'ref.subcon')->get()->groupBy('description');

            return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function singleSubcon()
    {
        try {
            $res = ReceivingDetails::where('summary_id', request('id'))->with('ref', 'ref.supplier', 'ref.subcon')->get()->groupBy('ref.subcon_id');

            return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function approval()
    {
        try {
            DB::beginTransaction();

            $res = SummaryReport::where('id', request('id'))->first();

            if ($res) {
                if ($res->status === 1) {
                    $res->status = 2;
                    $res->checked_at = Carbon::now();
                    $res->updated_by = auth()->id();
                } else if ($res->status === 2) {
                    $res->status = 3;
                    $res->approved_at = Carbon::now();
                    $res->updated_by = auth()->id();
                }
                $res->save();
            }

            DB::commit();
            return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function save()
    {
        try {
            DB::beginTransaction();
            $maker = (object) request('maker');
            $checker = (object) request('checker');
            $approver = (object) request('approver');
            $details = request('details');
            // dd($details);

            // set slip details
            $slip_no = SummaryReport::setRunningNumbers('SLIP');
            $slip = new SummaryReport();
            $slip->sum_no = $slip_no;
            $slip->maker_id = $maker->id;
            $slip->checker_id = $checker->id;
            $slip->approver_id = $approver->id;
            $slip->status = 1;
            $slip->created_by = auth()->id();
            $slip->updated_by = auth()->id();
            $slip->save();

            // set summary id
            foreach ($details as $details) {
                foreach ($details as $d) {
                    $d = (object) $d;
                    $rd = ReceivingDetails::where('id', $d->id)->first();
                    $rd->summary_id = $slip->id;
                    $rd->save();
                }
            }

            $res = $slip;

            DB::commit();
            return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function generate()
    {
        try {
            DB::beginTransaction();
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

                $res = $query->where('material_id', request('material_id'))->whereNull('summary_id')->with('ref', 'ref.supplier', 'ref.subcon')->get()->groupBy('description');

                DB::commit();
                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            } else {
                $query = Receiving::query();

                $query->when(request('supplier_id'), function ($q) {
                    return $q->where('supplier_id', request('supplier_id'));
                });
                $query->when(request('subcon_id'), function ($q) {
                    return $q->where('subcon_id', request('subcon_id'));
                });

                $query->when(request('po'), function ($q) {
                    return $q->where('po_no', request('po'));
                });

                $query->when(request('do'), function ($q) {
                    return $q->where('do_no', request('do'));
                });

                // range
                $query->when($range == 'week', function ($q) {
                    return $q->whereBetween('received_date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                });

                $query->when($range == 'month', function ($q) {
                    return $q->whereMonth('received_date', date('m'))->whereYear('received_date', date('Y'));
                });

                $query->when($range == 'custom', function ($q) {
                    return $q->whereBetween('received_date', [Carbon::parse(request('from'))->format('Y-m-d H:i:s'), Carbon::parse(request('to'))->format('Y-m-d H:i:s')]);
                });

                $receiving = $query->where('status', 0)->get();
                $ref = array();
                foreach ($receiving as $r) {
                    $push = array_push($ref, $r->ref_no);
                }

                $res = ReceivingDetails::getDetails($ref);

                DB::commit();
                return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
            }
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
