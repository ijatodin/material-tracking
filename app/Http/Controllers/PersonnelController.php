<?php

namespace App\Http\Controllers;

use App\Models\Personnel;
use App\Models\User;
use Illuminate\Http\Request;

class PersonnelController extends Controller
{
    public function index()
    {
        try {
            $res = User::where('role', '<', 99)->with('personnel')->get();

            return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function group()
    {
        try {
            $res = Personnel::get()->groupBy('role');
            // $model = $res->groupBy('role');
            return response()->json(['message' => 'SUCCESS', 'model' => $res], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            $id = request('id');
            $designation = (object) request('personnel');

            if (!$id) {
                $personnel = Personnel::create([
                    'name' => $request->input('name'),
                    'designation' => $designation->designation ?: null,
                    'role' => $request->input('role') ?: 1
                ]);

                if ($personnel) {
                    $user = new User();
                    $user->name = $personnel->name;
                    $user->email = request('email');
                    $user->password = app('hash')->make(request('password'));
                    $user->personnel_id = $personnel->id;
                    $user->role = $personnel->role;
                    $user->save();
                }
                $user->personnel = $personnel;

                return response()->json(['message' => 'SUCCESS', 'model' => $user], 200);
            } else {
                $user = User::where('id', request('id'))->first();

                $user->name = request('name');
                $user->email = request('email');
                $user->role = request('role');
                if (request('password')) {
                    $user->password = app('hash')->make(request('password'));
                }
                $user->save();

                $personnel = Personnel::where('id', $user->personnel_id)->first();
                $personnel->name = $user->name;
                $personnel->designation = $designation->designation;
                $personnel->role = $user->role;
                $personnel->save();

                $user->personnel = $personnel;

                return response()->json(['message' => 'SUCCESS', 'model' => $user], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function delete(Request $request) {
        try {
            $user = User::where('id', $request->input('id'))->first();

            if (!$user) {
                return response()->json(['message' => 'NO DATA'], 404);
            } else {
                $user->delete();

                $personnel = Personnel::where('id', $request->input('personnel_id'))->first();
                $personnel->delete();

                $user->personnel = $personnel;

                return response()->json(['message' => 'SUCCESS', 'model' => $user], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
