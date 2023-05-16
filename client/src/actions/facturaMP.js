import axios from "axios";
import { GET_FACTURAMP,GET_MPDEFAC} from './constant'

export function getFacturaMP() {
  // console.log('Action getFacturaMP: All');
  return async function (dispatch) {
    var facturaMP = await axios.get(`facturaMP`);
    return dispatch({
      type: GET_FACTURAMP,
      payload: facturaMP.data
    })
  }
}

export function getFacturaMPId(id) {
  // console.log('Action getFacturaMP: All');
  return async function (dispatch) {
    var facturaMP = await axios.get(`facturaMP/fac?id=${id}`);
    return dispatch({
      type: GET_MPDEFAC, // MateriaPrima DE FACtura 
      payload: facturaMP.data
    })
  }
}

export function putFacturaMP(id) {
  // console.log('Action getFacturaMP: All');
  return async function (dispatch) {
    var facturaMP = await axios.put(`facturaMP/fac?id=${id}`);
    return dispatch({
      type: GET_MPDEFAC, // MateriaPrima DE FACtura 
      payload: facturaMP.data
    })
  }
}