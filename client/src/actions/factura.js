// Reemplar FACTURA Factura factura por la tabla a crear 
import axios from "axios";
import { GET_FACTURA, GET_FACTCAB, RESET_FAC,GET_FACTSTS } from './constant'
import { AddFacturaDet } from "./factdet";
import { PostCondicionesFac } from "./condiciones";

export function getFactura() {
  console.log('Action getFactura: All');
  return async function (dispatch) {
    var factura = await axios.get(`factura`);
    return dispatch({
      type: GET_FACTURA,
      payload: factura.data
    })
  }
}
export function getFacturaBckp() {
  console.log('Action getFactura: bckp');
  return async function (dispatch) {
    var factura = await axios.get(`factura/bckp`);
    return dispatch({
      type: GET_FACTURA,
      payload: factura.data
    })
  }
}

export function getFacturaCab(id) {
  // console.log('Action getFacturaCab: ', id);
  return async function (dispatch) {
    var factura = await axios.get(`factura/Cab?id=${id}`);
    return dispatch({
      type: GET_FACTCAB,
      payload: factura.data
    })
  }
}

export function postFacturaNew(factcab) {
  // console.log('Action putFacturaNew: ', factcab);
  return async function (dispatch) {
    var factura = await axios.post(`factura`, factcab);
    //console.log('factura: ', factura);
    return dispatch({
      type: GET_FACTCAB,
      payload: factura
    })
  }
}

export function AddFactura(factcab, factdet, inputDet,initialCondGral) {
  return async function (dispatch) {
    var facid = 0
    await axios.post(`factura`, factcab)
      .then(response => {
        var xOrden = 0;
        factdet.forEach((fact) => {
          xOrden += 1
          facid = response.data[0][0].id
          inputDet.fac_id = response.data[0][0].id
          inputDet.orden = xOrden
          inputDet.prod_id = fact.prod_id
          inputDet.precio = fact.precio
          inputDet.cantidad = fact.cantidad
          inputDet.total = fact.total
          console.log('Graba Productos ', inputDet);
          dispatch(AddFacturaDet(inputDet))
          console.log('Detalle de Factura ');
        })
        console.log('AddCotizacion initialCondGral: ', initialCondGral);
        initialCondGral.fac_id = facid;
        //initialCondGral.cot_id=inputDet.cot_id;
        dispatch(PostCondicionesFac(initialCondGral))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function UpdateFactura(factcab, factdet, inputDet) {
  return async function (dispatch) {
    await axios.put(`factura`, factcab)
      .then(response => {
        if (response.data.message !== 'OK') {
          console.log('UpdateFactura - response: ', response);
          alert('Error UpdateFactura');
          return response;
        } else {
          //console.log('UpdateFactura response: ', response);
          var xOrden = 0;
          factdet.forEach((fact) => {
            xOrden += 1
            inputDet.fac_id = fact.fac_id
            inputDet.orden = xOrden
            inputDet.prod_id = fact.prod_id
            inputDet.precio = fact.precio
            inputDet.cantidad = fact.cantidad
            inputDet.total = fact.total
            dispatch(AddFacturaDet(inputDet))
          })
          return response
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function UpdateFacturaSts(id, sts) {
  console.log('UpdateFacturaSTS');
  return async function (dispatch) {

    var factsts = await axios.put(`factura/stat?id=${id}&sts=${sts}`);
    return dispatch({
      type: GET_FACTSTS,
      payload: factsts.data
    })
  }
}

export function cotiToFact(data) {
  return async function (dispatch) {
    await axios.post(`factura/cotifac`, data)
      .then(response => {
        if (response.data.message !== 'OC Creada') {
          console.log('cotiToFact - response: ', response);
          return "Err";
        } else {
          return response
        }
      })
      .catch(err => {
        console.log(err)
        return err
      })
  }
}

export function resetFact() {
  console.log('resetFact: ');
  var factura=[]
  return {
    type: RESET_FAC,
    payload: factura
  }
}
