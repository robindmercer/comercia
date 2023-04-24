import axios from "axios";
import { GET_DIRECCION } from './constant'

export function getDireccion(id){
    //console.log('Action getDireccion: All');
     return async function (dispatch) {
         var direccion = await axios.get(`direccion?cli_id=${id}`);
         return dispatch({
             type: GET_DIRECCION,
             payload: direccion.data
         })
     }
 }
 
 export function AddDireccion(direccion) {
    return function (dispatch) {
      axios.post('direccion', direccion)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  
  export function UpdateDireccion(direccion) {
    return function (dispatch) {
      axios.put('direccion', direccion)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }