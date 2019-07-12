import types from './const';
import axios from 'axios';
import params from '../../config/params';



/**
 * Acción para registrar un usuario en el sistema
 * @param  {Oobject} data Datos necesarios para registrar un nuevo usuario en el sistema
 * @return {Object}      Respuesta del servidor
 */

const actRegisterUser = (data) => {
    //console.log(data);
    return dispatch => {
        return axios.post(params.URL_API+'user/register',{
        	numero_identificacion:data.numero_identificacion,
        	nombres:data.nombres,
        	apellidos:data.apellidos,
            email:data.email,
            genero:data.genero,
            password:data.password,
            password_confirmation:data.password_confirmation,
            telefono:data.telefono,
            nivel_estudio:data.nivel_estudio,
            fecha_nacimiento:data.fecha_nacimiento,
            direccion:data.direccion,
            municipio_id:data.municipio_id
        })
        .then((response) => {
            //console.log(response);
            return response;
        
        })
        .catch((error) => {
            return error.response;
        });
    }
}

const actUpdateUser =(data, userId)=>{

    return dispatch => {
        return axios.post(params.URL_API+'user/update/'+userId,{
            numero_identificacion:data.numero_identificacion,
            nombres:data.nombres,
            apellidos:data.apellidos,
            email:data.email,
            genero:data.genero,
            telefono:data.telefono,
            nivel_estudio:data.nivel_estudio,
            fecha_nacimiento:data.fecha_nacimiento,
            direccion:data.direccion,
            municipio_id:data.municipio_id
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
    }    
}

export {actRegisterUser, actUpdateUser};

