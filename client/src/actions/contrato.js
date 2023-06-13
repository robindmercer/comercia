import axios from "axios";
import { GET_CONTRATOID } from './constant'

export function getContratoID(id){
    //console.log('Action getContrato: All');
     return async function (dispatch) {
         var contrato = await axios.get(`contrato?id=${id}`);
         return dispatch({
             type: GET_CONTRATOID,
             payload: contrato.data
         })
     }
 }

 export function getContrato(){
  //console.log('Action getContrato: All');
   return async function (dispatch) {
       var contrato = await axios.get(`contrato`);
       return dispatch({
           type: GET_CONTRATOID,
           payload: contrato.data
       })
   }
}

 export function AddContrato(contrato) {
    return async function (dispatch) {
      await axios.post('contrato', contrato)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  export function DelContrato(id) {
    return async function (dispatch) {
     await axios.delete('contrato', id)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }  
  
  export function UpdateContrato(contrato) {
    return async function (dispatch) {
    await axios.put('contrato', contrato)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }