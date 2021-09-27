<?php

namespace App\Http\Controllers;

use App\Models\ReceivingDetails;
use Illuminate\Http\Request;

class ReceivingDetailsController extends Controller
{
    public function index() {
        try {
            $res = ReceivingDetails::with('ref', 'location')->get();
            $model = $res->groupBy('description');
            $model = $model->toArray();

            return response()->json(['message' => 'SUCCESS', 'model' => $model], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
