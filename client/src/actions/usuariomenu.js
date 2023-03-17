import axios from "axios";
import { GET_USUARIOSMENU } from './constant'

export function getUsuariomenu(){
    console.log('Action getUsuariomenu: All');
     return async function (dispatch) {
         var usuariomenu = await axios.get(`/usuariomenu`);
         return dispatch({
             type: GET_USUARIOSMENU,
             payload: usuariomenu.data
         })
     }
 }

 export function getUsuariomenId(id){
  return async function (dispatch) {
      var usuariomenu = await axios.get(`/menu/usr/${id}`);
      return dispatch({
          type: GET_USUARIOSMENU,
          payload: usuariomenu.data
      })
  }
}
 
 export function AddUsuariomenu(usuariomenu) {
    return function (dispatch) {
      axios.post('/usuariomenu', usuariomenu)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  
  export function UpdateUsuariomenu(usuariomenu) {
    return function (dispatch) {
      axios.put('/usuariomenu', usuariomenu)
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
      axios.put(`/usuariomenu/status/${id}`)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }  

  export function ChangeUsrAcceso(input) {
    return function (dispatch) {
      axios.put(`/menu`,input)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }    
  export function DeleteUsrAcceso(input) {
    return function (dispatch) {
      axios.put(`/menu`,input)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }  