import axios from "axios";
import { GET_COMPRA } from './constant'

export function getCompras(){
    // console.log('Action getCliente: All');
     return async function (dispatch) {
         var compra = await axios.get(`/compra`);
         return dispatch({
             type: GET_COMPRA,
             payload: compra.data
         })
     }
 }