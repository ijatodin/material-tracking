<?php

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
    Route::post('logout', 'AuthController@logout');
});

// receiving
Route::post('receiving-all', 'ReceivingController@index');
Route::post('receiving-store', 'ReceivingController@store');


// material registry
Route::post('material-store', 'MaterialController@store');
Route::post('material-all', 'MaterialController@index');
Route::post('material-search', 'MaterialController@search');

// settings
Route::group(['prefix' => 'setting'], function () {
    // supplier & subcon
    Route::post('supplier-store', 'SupplierController@store');
    Route::post('supplier-all', 'SupplierController@index');
    Route::post('supplier-only', 'SupplierController@supplier');

    // location management
    Route::post('location-store', 'LocationController@store');
    Route::post('location-all', 'LocationController@index');
    Route::post('location-active', 'LocationController@location');
});

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@authenticate');

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
