import types from './const';
import axios from 'axios';
import params from '../../config/params';



/**
 * Acción para registrar una historia en el sistema
 * @param  {Oobject} data Datos necesarios para registrar una nueva historia en el sistema
 * @return {Object}      Respuesta del servidor
 */

const actRegisterStories = (data) => {
    return dispatch => {
        const formData = new FormData();

        formData.append("titulo",data.titulo);
        formData.append("texto",data.texto);
        formData.append("municipio_id",data.municipio_id);
        let indice = 1;
        _.map(data.annexesValues, (el, i) => {
            formData.append("file_"+indice,el);
            indice++;
        })

        return axios.post(params.URL_API+'storie_conflict/register',formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        )
        .then((response) => {
            //console.log(response);
            return response;
        
        })
        .catch((error) => {
            return error.response;
        });
    }
}

const actUpdateStories =(data)=>{
   
}

export {actRegisterStories, actUpdateStories};