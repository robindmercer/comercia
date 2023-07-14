import axios from "axios";
import { GET_COMENTARIO } from './constant'

export function getComentarioID(facid){
    //console.log('Action getComentario: All');
     return async function (dispatch) {
         var comentario = await axios.get(`comentario?facid=${facid}`);
         return dispatch({
             type: GET_COMENTARIO,
             payload: comentario.data
         })
     }
 }

 export function getComentario(){
  //console.log('Action getComentario: All');
   return async function (dispatch) {
       var comentario = await axios.get(`comentario`);
       return dispatch({
           type: GET_COMENTARIO,
           payload: comentario.data
       })
   }
}

// Condicion Seleccionada para Factura
export function PostComentarioFac(comentario) {
  //console.log('PostComentarioCot: ', comentario);
  return async function (dispatch) {
    await axios.post('comentario/fact', comentario)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}
 
// Condicion Seleccionada para Cotizacion
export function PostComentarioCot(comentario) {
  //console.log('PostComentarioCot: ', comentario);
  return async function (dispatch) {
    await axios.post('comentario/cot', comentario)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

 export function AddComentario(comentario) {
    return async function (dispatch) {
      await axios.post('comentario', comentario)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  export function DelComentario(id) {
    return async function (dispatch) {
     await axios.delete(`comentario?id=${id}`)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }  
  
  export function UpdateComentario(comentario) {
    return async function (dispatch) {
    await axios.put('comentario', comentario)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }