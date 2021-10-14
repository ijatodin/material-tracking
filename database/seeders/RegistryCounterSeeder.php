<?php

namespace Database\Seeders;

use App\Models\registryCounters;
use Illuminate\Database\Seeder;

class RegistryCounterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rcv = registryCounters::firstOrCreate(
            ['prefix' => 'RCV'],
            [
                'counter' => 0,
                'description' => 'RECEIVING',
            ]
        );

        if ($rcv) {
            echo 'DONE ' . $rcv->prefix . '->' . $rcv->description.PHP_EOL;
        }

        $smry = registryCounters::firstOrCreate(
            ['prefix' => 'SLIP'],
            [
                'counter' => 0,
                'description' => 'SUMMARY SLIP',
            ]
        );

        if ($smry) {
            echo 'DONE ' . $smry->prefix . '->' . $smry->description.PHP_EOL;
        }
    }
}
