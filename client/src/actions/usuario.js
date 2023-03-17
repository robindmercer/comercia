import axios from "axios";
import { GET_USUARIOS } from './constant'

export function getUsuario(){
    console.log('Action getUsuario: All');
     return async function (dispatch) {
         var usuario = await axios.get(`/usuario`);
         return dispatch({
             type: GET_USUARIOS,
             payload: usuario.data
         })
     }
 }
 
 export function AddUsuario(usuario) {
    return function (dispatch) {
      axios.post('/usuario', usuario)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  
  export function UpdateUsuario(usuario) {
    return function (dispatch) {
      axios.put('/usuario', usuario)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  export function ChangeStatus(id) {
    return function (dispatch) {
      axios.put(`/usuario/status/${id}`)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }  