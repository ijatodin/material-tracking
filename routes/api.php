<?php

use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::group(['middleware' => ['auth:sanctum']], function () {

    // receiving
    Route::post('receiving-all', 'ReceivingController@index');
    Route::post('receiving-single', 'ReceivingController@single');
    Route::post('receiving-store', 'ReceivingController@store');

    // receiving details
    Route::post('rdetails-all', 'ReceivingDetailsController@index');

    // summary report
    Route::post('summary-generate', 'SummaryReportController@generate');
    Route::post('summary-all', 'SummaryReportController@index');
    Route::post('summary-single', 'SummaryReportController@single');
    Route::post('summary-save', 'SummaryReportController@save');

    // material registry
    Route::post('material-store', 'MaterialController@store');
    Route::post('material-all', 'MaterialController@index');
    Route::post('material-search', 'MaterialController@search');

    // file management
    Route::post('file-store', 'FileController@store');
    Route::post('file-cleardo', 'FileController@clearDo');

    // purchase order
    Route::post('po-all', 'PurchaseOrderController@index');
    Route::post('po-store', 'PurchaseOrderController@store');

    // settings
    Route::group(['prefix' => 'setting'], function () {
        // supplier & subcon
        Route::post('supplier-store', 'SupplierController@store');
        Route::post('supplier-all', 'SupplierController@index');
        Route::post('supplier-only', 'SupplierController@supplier');
        Route::post('subcon-only', 'SupplierController@subcon');

        // location management
        Route::post('location-store', 'LocationController@store');
        Route::post('location-all', 'LocationController@index');
        Route::post('location-active', 'LocationController@location');

        // project management
        Route::post('project-store', 'ProjectController@store');
        Route::post('project-all', 'ProjectController@index');

        // personnel management
        Route::post('personnel-store', 'PersonnelController@store');
        Route::post('personnel-all', 'PersonnelController@index');
        Route::post('personnel-group', 'PersonnelController@group');

        // type management
        Route::post('type-store', 'MaterialTypeController@store');
        Route::post('type-all', 'MaterialTypeController@index');
    });

    Route::post('logout', 'AuthController@logout');
});

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@authenticate');

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
