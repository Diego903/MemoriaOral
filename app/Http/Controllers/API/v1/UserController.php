<?php

namespace App\Http\Controllers\API\v1;

use App\Helpers\TableJL1805;
use App\Http\Controllers\Controller;
use App\Http\Requests\RequestRegisterUser;
use App\Http\Requests\RequestUpdateUser;
use App\Mail\RegisterUser;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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
    
    public function register(RequestRegisterUser $request)
    {
       // DB::beginTransaction();
    	$user = new User();
    	$user->fill($request->all());
        $user->password = Hash::make($request->password);
    	$user->save();

        Mail::to($user)->send(new RegisterUser($user));
        //DB::commit();
    	return response(["success"=>true], 200);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return view ("user.show", compact("user"));
    }


    public function update(RequestUpdateUser $request, $id)
    {
        $user=User::findOrFail($id);
        $user->update($request->all());

        return view("user.update", compact("user"));
    }
}
