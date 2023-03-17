import axios from "axios";
import { GET_TABLA,SET_IVA } from './constant'

// trae todos los registros con codsigo 0
export function getTabla(){
    console.log('Action getTabla: All');
     return async function (dispatch) {
         var tabla = await axios.get(`/tabla`);
         return dispatch({
             type: GET_TABLA,
             payload: tabla.data
         })
     }
 }
 // trae todos los registros de in ID 
 export function getDetail(id){
  console.log('Action Tabla getDetail: ',id);
   return async function (dispatch) {
       var tabla = await axios.get(`/tabla/cod/${id}`);
       return dispatch({
           type: GET_TABLA,
           payload: tabla.data
       })
   }
}

export function getDetailIva(id){
  console.log('Action Tabla getDetailIva: ',id);
   return async function (dispatch) {
       var porciva = await axios.get(`/tabla/iva/${id}`);
       return dispatch({
           type: SET_IVA,
           payload: porciva.data
       })
   }
}


  export function UpdateTabla(tabla) {
    console.log('UpdateTabla: ', tabla);
    return function (dispatch) {
      axios.post('/tabla', tabla)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }