<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestTestimony;
use App\Models\Archivo;
use App\Models\Testimonio;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class TestimonyController extends Controller
{
	public function register(RequestTestimony $request)
	{	
		DB::beginTransaction();

		$user = Auth::user();
		//si el usuario actual es un administrador
		//el nuevo usuario que se relaciona con el testimonio 
		//se crea con los datos recibidos
		if(Auth::user()->rol == "Administrador")
			$user = User::register($request, true);

		$testimony = Testimonio::register($request, $user);
		DB::commit();
	}  

	public function list(Request $request){
		$testimonies = Testimonio::select(
			"testimonios.*",
			DB::raw("CONCAT(municipios.nombre,' (',departamentos.nombre,')') as nombreMunicipio")
		)
		->join("municipios","testimonios.municipio_id","=","municipios.id")
		->join("departamentos","municipios.departamento_id","=","departamentos.id");

		if($request->has("texto") && $request->texto){
			$search = "%".$request->texto."%";

			$testimonies = $testimonies->where(function($q) use ($search){
				$q->where("testimonios.titulo","like",$search)
					->orWhere("testimonios.descripcion_corta","like",$search)
					->orWhere("testimonios.descripcion_detallada","like",$search)
					->orWhere("testimonios.descripcion_lugar","like",$search);
			});
		}

		if($request->has("tipo") && $request->tipo && $request->tipo != "Todos"){
			$testimonies = $testimonies->where("testimonios.tipo",$request->tipo);
		}

		if(Auth::check() && Auth::user()->rol == "Administrador" && $request->has("estado") && $request->estado && $request->estado != "Todos"){
			$testimonies = $testimonies->where("testimonios.estado",$request->estado);
		}

		if($request->has("municipio") && $request->municipio){
			$testimonies = $testimonies->where("testimonios.municipio_id",$request->municipio);
		}

		if($request->has("fechaInicio") && $request->fechaInicio){
			$testimonies = $testimonies->where("testimonios.fecha_evento",">=",$request->fechaInicio);
		}

		if($request->has("fechaFin") && $request->fechaFin){
			$testimonies = $testimonies->where("testimonios.fecha_evento","<=",$request->fechaFin);
		}

		if(Auth::check() && Auth::user()->rol == "Usuario" && $request->has("mostrar") && $request->mostrar && $request->mostrar == "Mis testimonios"){
			$testimonies = $testimonies->where("testimonios.usuario_id",Auth::user()->id);
		}

		if(!Auth::check()){
			$testimonies = $testimonies->where("testimonios.estado","Aprobado");
		}

		if($request->has("tipoVista") && $request->tipoVista == "Detalle"){
			if($request->has("find") && $request->find){
				$testimonies = $testimonies->where("testimonios.id",$request->find);
			}

			if($request->has("findNext") && $request->findNext){
				$testimonies = $testimonies->where("testimonios.id",">", $request->findNext);
			}

			if($request->has("findPrevious") && $request->findPrevious){
				$testimonies = $testimonies->where("testimonios.id","<", $request->findPrevious)
					->orderBy("testimonios.id", "DESC");
			}

			$testimonies = $testimonies->first();

			if($testimonies){
				$testimonies->audio;
				$testimonies->video;
				$testimonies->anexos;
			}

			$testimonies = $testimonies?[$testimonies]:[];
		}else{
			$testimonies = $testimonies->whereNotIn("testimonios.id", $request->ids);

			$testimonies = $testimonies->take(1)->get();
		}

		return $testimonies;
	}

	public function annexed(Request $request, Testimonio $testimony, $type, $idAnnexed){

		if($type == "image"){
			$annexed = $testimony->anexos()->find($idAnnexed);
		}else if($type == "audio"){
			$annexed = $testimony->audio()->find($idAnnexed);
		}else{
			$annexed = $testimony->video()->find($idAnnexed);
		}

		if($annexed){
			$path = storage_path().'/'. $annexed->ubicacion.'/'.$annexed->nombre_archivo;

		    if(!File::exists($path)) abort(404);

		    $file = File::get($path);
		    $type = File::mimeType($path);


		    $response = Response::make($file, 200);
		    $response->header("Content-Type", $type);

		    return $response;
		}
	}
}