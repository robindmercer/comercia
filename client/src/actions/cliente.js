import axios from "axios";
import { GET_CLIENTE } from './constant'

export function getCliente(){
    // console.log('Action getCliente: All');
     return async function (dispatch) {
         var cliente = await axios.get(`cliente`);
         return dispatch({
             type: GET_CLIENTE,
             payload: cliente.data
         })
     }
 }
 
 export function getClienteDir(){
  // console.log('Action getCliente: All');
   return async function (dispatch) {
       var cliente = await axios.get(`cliente/cliDir`);
       return dispatch({
           type: GET_CLIENTE,
           payload: cliente.data
       })
   }
}
 
 export function getClienteBckp(){
  // console.log('Action getCliente: All');
   return async function (dispatch) {
       var cliente = await axios.get(`cliente/bckp`);
       return dispatch({
           type: GET_CLIENTE,
           payload: cliente.data
       })
   }
}
 
 export function getClienteId(id){
  // console.log('Action getClienteId:',id);
   return async function (dispatch) {
       var cliente = await axios.get(`cliente/${id}`);
       return dispatch({
           type: GET_CLIENTE,
           payload: cliente.data
       })
   }
}

export function getClienteATC(perfil){
   return async function (dispatch) {
       var cliente = await axios.get(`cliente/atc/${perfil}`);
       return dispatch({
           type: GET_CLIENTE,
           payload: cliente.data
       })
   }
}


 export function getClienteByName(nombre){
  // console.log('Action getClienteByName: ',nombre);
   return async function (dispatch) {
       var cliente = await axios.get(`cliente?nombre=${nombre}`);
       return dispatch({
           type: GET_CLIENTE,
           payload: cliente.data
       })
   }
}

 export function AddCliente(cliente) {
    return async function (dispatch) {
      try {       
        await axios.post(`cliente`, cliente)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
      } catch (error) {
        alert(`Error creacion Cliente ${error}`)
      }
    }
  }
  
  export function UpdateCliente(cliente) {
    return async function (dispatch) {
      await axios.put(`cliente`, cliente)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }