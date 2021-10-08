<?php

namespace Database\Seeders;

use App\Models\Personnel;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $personnels = Personnel::get();
        if ($personnels) {
            foreach ($personnels as $personnel) {
                $name = explode(" ", $personnel->name);
                echo 'Making user for '.$personnel->name.PHP_EOL;
                $firstName = strtolower($name[0]);

                $user = new User();
                $user->name = $personnel->name;
                $user->email = $firstName.'@kys.awantera.co';
                $plainPassword = 'secret';
                $user->password = app('hash')->make($plainPassword);
                $user->personnel_id = $personnel->id;
                $user->role = $personnel->role;
                $user->save();
                echo 'SUCCESS.'.PHP_EOL;
            }
        }
    }
}
