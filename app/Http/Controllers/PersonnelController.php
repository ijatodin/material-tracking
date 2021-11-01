<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Personnel;
use App\Models\User;
use Faker\Provider\ar_JO\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PersonnelController extends Controller
{
    public function index()
    {
        try {
            $res = User::where('role', '<', 99)->with('personnel', 'personnel.signature')->get();

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

    public function storeSign(Request $request)
    {
        DB::beginTransaction();

        try {
            $file = new File();

            if ($request->hasFile('sign')) {
                $fileName = $request->file('sign')->getClientOriginalName();
                $fileNameOnly = pathinfo($fileName, PATHINFO_FILENAME);
                $fileExtension = $request->file('sign')->getClientOriginalExtension();
                $completeName = str_replace(' ', '_', $fileNameOnly) . '_' . rand(00000, 99999) . '.' . $fileExtension;
                $path = $request->file('sign')->storeAs('public', $completeName);

                $url = Storage::url($completeName);

                $xsign = File::where('ref_no', request('personnel_id'))->where('type', 3)->first();

                if ($xsign) {
                    // delete existing sign
                    $xsign->delete();

                    // save new sign
                    $file->type = 3;
                    $file->ref_no = request('personnel_id');
                    $file->filename = $completeName;
                    $file->path = $url;
                    $file->created_by = auth()->id();
                    $file->updated_by = auth()->id();
                } else {
                    $file->type = 3;
                    $file->ref_no = request('personnel_id');
                    $file->filename = $completeName;
                    $file->path = $url;
                    $file->created_by = auth()->id();
                    $file->updated_by = auth()->id();
                }
            }
            if ($file->save()) {
                $personnel = Personnel::where('id', request('personnel_id'))->first();
                if ($personnel) {
                    $personnel->signature_id = $file->id;
                    $personnel->save();
                }
                DB::commit();
                return response()->json(['message' => 'SUCCESS', 'model' => $file], 200);
            }
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function delete(Request $request)
    {
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
