<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Municipio;
use Illuminate\Http\Request;

class QueryController extends Controller
{
    public function municipios(Request $request){
    	$search = $request->has('search')?$request->search:"";

    	return Municipio::select('municipios.id as key','municipios.nombre as title','departamentos.nombre as description')
    		->join('departamentos','municipios.departamento_id','=','departamentos.id')
    		->where('municipios.nombre','like','%'.$search.'%')
    		->orWhere('municipios.id',$search)
    		->orWhere('departamentos.nombre','like','%'.$search.'%')->take(10)->get();
    }
}
