<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SummaryReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 'sum_no', 'filter_by', 'status', 'created_by', 'updated_by', 'updated_at'
    ];

    public static function setRunningNumbers($prefix) {

        $result = registryCounters::where('prefix', $prefix)->first();
        $result->counter += 1;
        $result->save();

        $newReportNo = str_pad($result->counter, 5, 0, STR_PAD_LEFT);
        return $result->prefix. '-' .$newReportNo;
    }

    public static function getRunningNumbers($prefix) {

        $result = registryCounters::where('prefix', $prefix)->first();

        $newReportNo = str_pad($result->counter, 5, 0, STR_PAD_LEFT);
        return $prefix . '-' . $newReportNo;
    }
}
