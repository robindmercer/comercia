import axios from "axios";
import { GET_CLIENTE } from './constant'
const url = "https://comercia-production.up.railway.app/"
export function getCliente(){
    console.log('Action getCliente: All');
     return async function (dispatch) {
         var cliente = await axios.get(`${url}/cliente`);
         return dispatch({
             type: GET_CLIENTE,
             payload: cliente.data
         })
     }
 }
 
 export function getClienteId(id){
  console.log('Action getClienteId:',id);
   return async function (dispatch) {
       var cliente = await axios.get(`${url}/cliente/${id}`);
       return dispatch({
           type: GET_CLIENTE,
           payload: cliente.data
       })
   }
}

 export function getClienteByName(nombre){
  console.log('Action getClienteByName: ',nombre);
   return async function (dispatch) {
       var cliente = await axios.get(`${url}/cliente?nombre=${nombre}`);
       return dispatch({
           type: GET_CLIENTE,
           payload: cliente.data
       })
   }
}

 export function AddCliente(cliente) {
    return function (dispatch) {
      axios.post('${url}/cliente', cliente)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  
  export function UpdateCliente(cliente) {
    return function (dispatch) {
      axios.put('${url}/cliente', cliente)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }