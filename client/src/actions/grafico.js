// Reemplar FACTURA Factura factura por la tabla a crear 
import axios from "axios";
import { GET_GRAF } from './constant'


export function getFacturaGraf(fDesde,fHasta) {
  console.log('Actions getFacturaGraf', fDesde,fHasta);
  return async function (dispatch) {
    var grafico = await axios.get(`factura/graf?fDesde=${fDesde}&fHasta=${fHasta}`);
    return dispatch({
      type: GET_GRAF,
      payload: grafico.data
    })
  }
}