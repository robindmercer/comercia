import axios from "axios";
import { GET_COTCOND } from './constant'


// Cotizaciones 
export function getCondicionesCot(cot_id){
  console.log('Action getCondicionesCot: COT',cot_id);
   return async function (dispatch) {
       var condicionescond = await axios.get(`cotizacioncond/cot?cot_id=${cot_id}`);
       return dispatch({
           type: GET_COTCOND,
           payload: condicionescond.data
       })
   }
}

// Cotizaciones 
export function getCotizacioncondAll(){
     return async function (dispatch) {
         var condicionescond = await axios.get(`cotizacioncond`);
         return dispatch({
             type: GET_COTCOND,
             payload: condicionescond.data
         })
     }
  }