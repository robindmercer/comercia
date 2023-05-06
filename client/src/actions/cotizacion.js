// Reemplar COTIZACION Cotizacion cotizacion por la tabla a crear 
import axios from "axios";
import { GET_COTIZACION, GET_COTCAB } from './constant'
import { AddCotizacionDet } from "./cotizaciondet";
import { PostCondicionesCot } from "./condiciones";


export function getCotizacion() {
  console.log('Action getCotizacion: All');
  return async function (dispatch) {
    var cotizacion = await axios.get(`cotizacion`);
    return dispatch({
      type: GET_COTIZACION,
      payload: cotizacion.data
    })
  }
}

export function getCotizacionCab(id) {
  // console.log('Action getCotizacionCab: ', id);
  return async function (dispatch) {
    var cotizacion = await axios.get(`cotizacion/Cab?id=${id}`);
    return dispatch({
      type: GET_COTCAB,
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

export function AddCotizacion(cotizCab, cotizaciondet, inputDet,initialCondGral) {
  return async function (dispatch) {
  await  axios.post(`cotizacion`, cotizCab)
      .then(response => {
        var xOrden = 0;
        cotizaciondet.forEach((fact) => {
          console.log('AddCotizacion: ', fact);
          xOrden += 1
          inputDet.cot_id = response.data[0][0].id
          inputDet.orden = xOrden
          inputDet.prod_id = fact.prod_id
          inputDet.precio = fact.precio
          inputDet.cantidad = fact.cantidad
          inputDet.total = fact.total
          console.log('Graba Productos ', inputDet);
          dispatch(AddCotizacionDet(inputDet))
          console.log('Detalle de Cotizacion ');
        })
        console.log('AddCotizacion initialCondGral: ', initialCondGral);
        initialCondGral.cot_id=inputDet.cot_id;
        dispatch(PostCondicionesCot(initialCondGral))
      })
      .catch(err => {
        console.log(err)
      })
  }
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



export function UpdateCotizacion(cotizCab, cotizaciondet, inputDet) {
  return async function (dispatch) {
    console.log('actions/cotizacion/UpdateCotizacion ');
    console.log(cotizCab);
  await axios.put(`cotizacion`, cotizCab)
      .then(response => {
        if (response.data !== 'OK') {
          console.log('UpdateCotizacion Error ', response);
          alert(response.data);
          return "Err";
        } else {
          console.log('UpdateCotizacion response: ', response);
          var xOrden = 0;
          cotizaciondet.forEach((fact) => {
            xOrden += 1
            inputDet.cot_id = fact.cot_id
            inputDet.orden = xOrden
            inputDet.prod_id = fact.prod_id
            inputDet.precio = fact.precio
            inputDet.cantidad = fact.cantidad
            inputDet.total = fact.total
            dispatch(AddCotizacionDet(inputDet))
          })
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