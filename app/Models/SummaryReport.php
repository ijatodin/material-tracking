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

    public static function setRunningNumbers($prefix)
    {

        $result = registryCounters::where('prefix', $prefix)->first();
        $result->counter += 1;
        $result->save();

        $newReportNo = str_pad($result->counter, 5, 0, STR_PAD_LEFT);
        return $result->prefix . '-' . $newReportNo;
    }

    public static function getRunningNumbers($prefix)
    {

        $result = registryCounters::where('prefix', $prefix)->first();

        $newReportNo = str_pad($result->counter, 5, 0, STR_PAD_LEFT);
        return $prefix . '-' . $newReportNo;
    }

    public function maker()
    {
        return $this->hasOne('App\Models\Personnel', 'id', 'maker_id');
    }

    public function checker()
    {
        return $this->hasOne('App\Models\Personnel', 'id', 'checker_id');
    }

    public function approver()
    {
        return $this->hasOne('App\Models\Personnel', 'id', 'approver_id');
    }
}
