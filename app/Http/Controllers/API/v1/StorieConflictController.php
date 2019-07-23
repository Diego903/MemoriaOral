<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Requests\RequestRegisterStories;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\GestionHistoriasConflicto;
use App\Models\AnexoHistoriasConflicto;
use App\Models\Archivo;
use Illuminate\Http\Request;
use App\Models\HistoriaConflicto;
use App\User;
use Carbon\Carbon;





class StorieConflictController extends Controller
{
	public function register(Request $request)
	{
		$historiaConflicto = new HistoriaConflicto();
		$historiaConflicto->fill([
            "titulo" => $request->titulo,
            "texto" => $request->texto,
            "estado" => "Activo",
            "municipio_id" =>$request->municipio_id,
            "usuario_id" => null,
		]);
		

		$historiaConflicto->save();

		$log = new GestionHistoriasConflicto();

        $log->fill([            
            "accion" => "Crear",
            "fecha" => date("Y-m-d"),
            "usuario_id" =>null,
            "historia_conflicto_id" => $historiaConflicto->id,
        ]);

        $log->save(); 

		/*$archivo = $request->file('file_');
		$file_route=time().'_'. $archivo->getClientOriginalName();
       
		Storage::disk('file_')->put($file_route, file_get_contents( $archivo->getRealPath() ) );
			
		$archivo->nombre= $file_route;
		$archivos->nombre_archivo= $file_route;
		$archivos->ubicacion= $file_route;
		$archivos->metadatos= null;
		$archivos->save();*/

		$i=1;

		$endFiles= false;

		while (!$endFiles) {
			if(!$request->hasFile('file_'.$i)){
				$endFiles = true;
			}else{
				$file = $request->file('file_'.$i);		

				$archivo = new Archivo();

				$archivo->fill([
		            "nombre" => $file->getClientOriginalName(),
		            "nombre_archivo" => $file->getClientOriginalName(),
		            "ubicacion" => "empty",
		            "metadatos" => null,		
				]);

		        $archivo->save();

				$ubicacion = storage_path("public/stories_conflict/".$historiaConflicto->id."/".$archivo->id);

				$archivo->ubicacion = $ubicacion;
				$archivo->save();
				
		        $file->move($ubicacion, $file->getClientOriginalName());
				
				$anexos = new AnexoHistoriasConflicto();

				$anexos->fill([
		            "archivo_id" => $archivo->id,
		            "historia_conflicto_id" => $historiaConflicto->id,			

				]);

				$anexos->save();
			}
			$i++;
		}    

        return response(["success"=>true], 200);		
		
	}

  
}