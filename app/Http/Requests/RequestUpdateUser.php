<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestUpdateUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "numero_identificacion"=>"required|min:6|max:10|digits_between:6,10",
            "nombres"=>"required|min:3|max:60",
            "apellidos"=>"required|min:3|max:60",
            "email"=>"required|min:7|max:100|email",
            "genero"=>"required",            
            "nivel_estudio"=>"required",
            "fecha_nacimiento"=>"required|Date",
            "direccion"=>"required|min:3|max:60",
            "municipio_id"=>"required",
        ];
    }
}