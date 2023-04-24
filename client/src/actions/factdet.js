import axios from "axios";
import { GET_FACTURADET } from './constant'

 export function getFacturaDet(id){
  // console.log('Action getFactura: DET');
   return async function (dispatch) {
       var factdet = await axios.get(`factdet/det?id=${id}`);
       return dispatch({
           type: GET_FACTURADET,
           payload: factdet.data
       })
   }
}

export function AddFacturaDet(input) {
    //console.log('AddFacturaDet input: ', input);
    return function (dispatch) {
      axios.post(`factdet`, input)
        .then(response => {
            //console.log('AddFacturaDet response: ', response);
          return response
        })
        .catch(err => {
          console.log('Error:',err)
        })
    }
  }
  
