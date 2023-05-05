import axios from "axios";
import { GET_CONDICION,GET_COTCOND,GET_FACTCOND } from './constant'

export function getCondicionesID(id){
    //console.log('Action getCondiciones: All');
     return async function (dispatch) {
         var condiciones = await axios.get(`condiciones?id=${id}`);
         return dispatch({
             type: GET_CONDICION,
             payload: condiciones.data
         })
     }
 }

 export function getCondiciones(){
  //console.log('Action getCondiciones: All');
   return async function (dispatch) {
       var condiciones = await axios.get(`condiciones`);
       return dispatch({
           type: GET_CONDICION,
           payload: condiciones.data
       })
   }
}

 export function getCondicionesFac(fac_id){
  //console.log('Action getCondiciones: FAC');
   return async function (dispatch) {
       var factcond = await axios.get(`condiciones?fac_id=${fac_id}`);
       return dispatch({
           type: GET_FACTCOND,
           payload: factcond.data
       })
   }
}
// Condicion Seleccionada para Factura
export function PostCondicionesFac(condiciones) {
  //console.log('PostCondicionesCot: ', condiciones);
  return async function (dispatch) {
    await axios.post('condiciones/fact', condiciones)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}
 
// Condicion Seleccionada para Cotizacion
export function PostCondicionesCot(condiciones) {
  //console.log('PostCondicionesCot: ', condiciones);
  return async function (dispatch) {
    await axios.post('condiciones/cot', condiciones)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

 export function AddCondiciones(condiciones) {
    return async function (dispatch) {
      await axios.post('condiciones', condiciones)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  export function DelCondiciones(id) {
    return async function (dispatch) {
     await axios.delete('condiciones', id)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }  
  
  export function UpdateCondiciones(condiciones) {
    return async function (dispatch) {
    await axios.put('condiciones', condiciones)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }