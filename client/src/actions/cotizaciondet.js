import axios from "axios";
import { GET_COTIZACIONDET } from './constant'

 export function getCotizacionDet(id){
  // console.log('Action getCotizacion: DET');
   return async function (dispatch) {
       var cotizaciondet = await axios.get(`cotizaciondet/det?id=${id}`);
       return dispatch({
           type: GET_COTIZACIONDET,
           payload: cotizaciondet.data
       })
   }
} 

export function getCotizacionDetAll(){
  // console.log('Action getCotizacion: DET');
   return async function (dispatch) {
       var cotizaciondet = await axios.get(`cotizaciondet/all`);
       return dispatch({
           type: GET_COTIZACIONDET,
           payload: cotizaciondet.data
       })
   }
} 


export function AddCotizacionDet(input) {
    console.log('AddCotizacionDet input: ', input);
    return async function (dispatch) {
      await axios.post(`cotizaciondet`, input)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log('Error:',err)
        })
    }
  }
  
