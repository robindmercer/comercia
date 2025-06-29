// Reemplar COTIZACION Cotizacion cotizacion por la tabla a crear 
import axios from "axios";
import { GET_COTIZACION, GET_COTCAB } from './constant'
import { AddCotizacionDet } from "./cotizaciondet";
import { PostCondicionesCot } from "./condiciones";

export function getCotizacionCab(id) {
  // console.log('Action getCotizacionCab: ', id);
  return async function (dispatch) {
    var cotizacion = await axios.get(`cotizacion/cabecera/${id}`);
    return dispatch({
      type: GET_COTCAB,
      payload: cotizacion.data
    })
  }
}

export function getCotizacion(id) {
  console.log('Action getCotizacion: All');
  return async function (dispatch) {
    var cotizacion = await axios.get(`cotizacion/${id}`);
    return dispatch({
      type: GET_COTIZACION,
      payload: cotizacion.data
    })
  }
}

export function getCotizacionAll() {
  console.log('Action getCotizacion: All');
  return async function (dispatch) {
    var cotizacion = await axios.get(`cotizacion/all`);
    return dispatch({
      type: GET_COTIZACION,
      payload: cotizacion.data
    })
  }
}



export function postCotizacionNew(cotizCab) {
  // console.log('Action putCotizacionNew: ', cotizCab);
  return async function (dispatch) {
    var cotizacion = await axios.post(`cotizacion`, cotizCab);
    //console.log('cotizacion: ', cotizacion);
    return dispatch({
      type: GET_COTCAB,
      payload: cotizacion
    })
  }
}

export function AddCotizacion(cotizCab, cotizaciondet, inputDet, initialCondGral) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`cotizacion`, cotizCab);
      const cot_id = response.data[0][0].id;
      let xOrden = 0;

      for (const fact of cotizaciondet) {
        xOrden += 1;
        const det = {
          ...inputDet,
          cot_id,
          orden: xOrden,
          prod_id: fact.prod_id,
          precio: fact.precio,
          cantidad: fact.cantidad,
          total: fact.total,
          descto: fact.descto,
        };
        await dispatch(AddCotizacionDet(det));
      }

      const condGral = {
        ...initialCondGral,
        cot_id,
      };
      await dispatch(PostCondicionesCot(condGral));
      return response;
    } catch (err) {
      console.log(err);
      alert(err)
      throw err;
    }
  };
}

export function AddCotizacion2(cotizCab) {
  return async function (dispatch) {
    await axios.post(`cotizacion`, cotizCab)
      .then(response => {
        console.log('AddCotizacion2: ', response);
        return response    
      })
      .catch(err => {
        console.log(err)
      })
  }
}



export function UpdateCotizacion(cotizCab, cotizaciondet, inputDet,condicion) {
  return async function (dispatch) {
    await axios.put(`cotizacion`, cotizCab)
    .then(response => {
      if (response.data.message !== 'OK') {
        console.log('UpdateCotizacion Error ', response);
        alert("Error UpdateCotizacion");
        return response;
      } else {
        console.log('UpdateCotizacion response: ', cotizaciondet);
        console.log('cotizCab: ', cotizCab.id);
          var xOrden = 0;
          cotizaciondet.forEach((fact) => {
            xOrden += 1
            inputDet.cot_id = cotizCab.id
            inputDet.orden = xOrden
            inputDet.prod_id = fact.prod_id
            inputDet.precio = fact.precio
            inputDet.cantidad = fact.cantidad
            inputDet.descto = fact.descto
            inputDet.total = fact.total
            dispatch(AddCotizacionDet(inputDet))
          })
          if (response.data.message === 'OK') {
            dispatch(PostCondicionesCot(condicion))
          }          
          return response
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function UpdateCotizacionSts(id, sts) {
  console.log('UpdateCotizacionSTS');
  return async function (dispatch) {

    var cotizacion = await axios.put(`cotizacion/stat?id=${id}&sts=${sts}`);
    return dispatch({
      type: GET_COTCAB,
      payload: cotizacion.data
    })
  }
}
