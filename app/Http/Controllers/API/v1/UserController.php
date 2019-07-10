<?php

namespace App\Http\Controllers\API\v1;

use App\Helpers\TableJL1805;
use App\Http\Controllers\Controller;
use App\Models\GestionUsuario;
use App\Http\Requests\RequestRegisterUser;
use App\Http\Requests\RequestUpdateUser;
use App\Mail\RegisterUser;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function list(Request $request)
    {	
    	/*$module = Module::where('identifier',1)->first();
    	dd(Gate::allows('update', $module));*/

		$query = User::select('users.id',
					'numero_identificacion',
					DB::raw('CONCAT(users.nombres," ",users.apellidos) as nombre'),
					'genero',
					'nivel_estudio',
					DB::raw('CONCAT(municipios.nombre," - ",departamentos.nombre) as municipio'),
					'email',
					'telefono',
					'estado'
				)
				->join('municipios','users.municipio_id','=','municipios.id')
				->join('departamentos','municipios.departamento_id','=','departamentos.id')
				->where('rol','Usuario');

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

    public function accountActivation(Request $request){
    	$user = User::where('token',$request->token)->first();

    	if($user && $user->id == $request->id && $user->estado == "Inactivo" && Hash::check($request->password, $user->password)){
    		$creationDate = new Carbon($user->created_at,"America/Bogota");
    		$currentDate = Carbon::now();

    		$creationDate->add(2,"week");

    		//han pasado más de dos semanas
    		if($creationDate <= $currentDate){
    			return response(['error'=>'ERROR!! Esta url ha expirado, para más información comuniquese con el admnistrador.'], 422);
    		}

    		$user->token = NULL;
			$user->estado = "Activo";
			$user->save();


    		return response(["success"=>true,"email"=>$user->email], 200);
    	}

    	return response(['error'=>'ERROR!! Los datos enviados son incorrectos.'], 422);
    }

    public function toggleLock(Request $request){
    	$user = User::find($request->user);

    	if($user){
    		$version_previa = $user->toJson();

    		$user->estado = $user->estado == "Activo"?"Inactivo":"Activo";
    		$user->save();

    		$version_nueva = $user->toJson();

			$log = new GestionUsuario();

			$log->fill([
				"fecha" => date("Y-m-d"),
				"accion" => $user->estado=="Activo"?"Desbloquear":"Bloquear",
				"version_previa" => $version_previa,
				"version_nueva" => $version_nueva,
				"usuario_admin_id" => Auth::user()->id,
				"usuario_id" => $user->id,
			]);

			$log->save();

    		return ["success"=>true];
    	}

    	return response(["error"=>"La información enviada es incorrecta."],422);
    }
}
