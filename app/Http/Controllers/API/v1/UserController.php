<?php

namespace App\Http\Controllers\API\v1;

use App\Helpers\TableJL1805;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function list(Request $request)
    {	
    	/*$module = Module::where('identifier',1)->first();
    	dd(Gate::allows('update', $module));*/

		$query = User::select('id','nombres', 'email', 'created_at');

    	$table = new TableJL1805($query, $request->config);

    	return $table->make();
    }
}
