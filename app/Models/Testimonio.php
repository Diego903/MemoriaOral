<?php

namespace App\Models;

use App\Models\GestionTestimonio;
use App\Models\Testimonio;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Testimonio extends Model
{
    protected $table = "testimonios";

    protected $fillable = [
        'titulo',
        'descripcion_corta',
        'descripcion_detallada',
        'fecha_evento',
        'descripcion_lugar',
        //'latitud',
        //'longitud',
        'tipo',
        'plantilla',
        'municipio_id',
        'usuario_id',
        'audio_id',
        'video_id',
    ];

    public function anexos(){
    	return $this->belongsToMany(Archivo::class, "anexos_testimonios", "testimonio_id","archivo_id");
    }

    public function audio(){
        return $this->belongsTo(Archivo::class, "audio_id");
    }

    public function video(){
        return $this->belongsTo(Archivo::class, "video_id");
    }

    public static function rules(Request $request){
    	$maxDate = date('Y-m-d', strtotime('-1 month'));
    	$data = [
	        'titulo' => 'required|min:6|max:250',
	        'descripcion_corta' => 'required|min:50|max:150',
	        'fecha_evento' => 'required|date|before_or_equal:'.$maxDate,
	        'descripcion_lugar' => 'required|min:20|max:150',
	        //'latitud',
	        //'longitud',
	        'tipo' => 'required|in:Atentado,Desaparición forzada,Desplazamiento,Muerte,Secuestros,Supervivencia',
	        'plantilla' => 'required|in:1,2,3,4',
	        'municipio' => 'required|exists:municipios,id',
	        //annexos
	        'descripcion_detallada' => 'required_without_all:audio,video,anexos',
	        'audio' => 'file|mimetypes:audio/mpeg,audio/webm,video/webm|max:10240|required_without_all:descripcion_detallada,video,anexos',
	        'video' => 'file|mimetypes:video/mp4,video/ogg|max:20480|required_without_all:descripcion_detallada,audio,anexos',
	        'anexos' => 'required_without_all:descripcion_detallada,audio,video',
	    ];

		if($request->has("anexos")){
		    $anexos = json_decode($request->anexos);

	    	foreach ($anexos as $anexo) {
			    if($request->hasFile('anexos_valores_'.$anexo->name)){
			    	$data['anexos_valores_'.$anexo->name] = "file|max:1024|mimes:jpg,jpeg,png";
		        }
		    }
		}

	    return $data;
    }

    public static function register(Request $request, $user = null){
        $testimony = new Testimonio();
        $version_previa = $testimony->toJson();
        $testimony->fill($request->all());
        $testimony->usuario_id = $user->id;
        $testimony->municipio_id = $request->municipio;

        if(Auth::user()->rol == "Administrador")
            $testimony->estado = "Aprobado";

        $testimony->save();

        //si se envía un audio
        if($request->hasFile("audio")){

            $fileAudio = $request->file('audio');     

            $archivoAudio = new Archivo();

            $archivoAudio->fill([
                "nombre" => $fileAudio->getClientOriginalName(),
                "nombre_archivo" => $fileAudio->getClientOriginalName(),
                "ubicacion" => "public/testimony/audio/".$testimony->id,
                "metadatos" => null,        
            ]);

            $archivoAudio->save();

            $fileAudio->move(storage_path($archivoAudio->ubicacion), $fileAudio->getClientOriginalName());

            $testimony->audio_id = $archivoAudio->id;
        }

        //si se envía un video
        if($request->hasFile("video")){

            $fileVideo = $request->file('video');     

            $archivoVideo = new Archivo();

            $archivoVideo->fill([
                "nombre" => $fileVideo->getClientOriginalName(),
                "nombre_archivo" => $fileVideo->getClientOriginalName(),
                "ubicacion" => "public/testimony/video/".$testimony->id,
                "metadatos" => null,        
            ]);

            $archivoVideo->save();

            $fileVideo->move(storage_path($archivoVideo->ubicacion), $fileVideo->getClientOriginalName());

            $testimony->video_id = $archivoVideo->id;
        }

        $testimony->save();

        //si se envían anexos (imagenes)
        if($request->has("anexos")){

        	$anexos = json_decode($request->anexos);

        	$annexesSave = [];

        	foreach ($anexos as $anexo) {
        		if($request->hasFile('anexos_valores_'.$anexo->name)){

		            $file = $request->file('anexos_valores_'.$anexo->name);     
		            $data = $request->input('anexos_datos_'.$anexo->name);
		            $data = json_decode($data);

		            $archivo = new Archivo();

		            $archivo->fill([
		                "nombre" => $data->name,
		                "nombre_archivo" => $file->getClientOriginalName(),
		                "ubicacion" => "public/testimony/images/".$testimony->id."/".$anexo->name,
		                "descripcion" => $data->description,
		                "metadatos" => null,        
		            ]);

                    if($data->date){
                        $archivo->fecha = $data->date;
                    }

		            $archivo->save();

		            $file->move(storage_path($archivo->ubicacion), $file->getClientOriginalName());

		            $annexesSave[] = $archivo->id;
		        }
	        }

	        $testimony->anexos()->attach($annexesSave);
        }

        $version_nueva = $testimony->toJson();

        $log = new GestionTestimonio();

        $log->fill([
            "fecha" => date("Y-m-d"),
            "accion" => "Crear",
            "version_previa" => $version_previa,
            "version_nueva" => $version_nueva,
            "usuario_id" => Auth::check()?Auth::user()->id:null,
            "testimonio_id" => $testimony->id,
        ]);

        $log->save();

        return $testimony;
    }
}