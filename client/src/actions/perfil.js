import axios from "axios";
import { GET_PERFIL } from './constant'

export function getPerfil(){
    //console.log('Action getPerfil: All');
     return async function (dispatch) {
         var perfil = await axios.get(`/perfil`);
         return dispatch({
             type: GET_PERFIL,
             payload: perfil.data
         })
     }
 }
 
 export function AddPerfil(perfil) {
    return function (dispatch) {
      axios.post('/perfil', perfil)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  
  export function UpdatePerfil(perfil) {
    return function (dispatch) {
      axios.put('/perfil', perfil)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }