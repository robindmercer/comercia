import axios from "axios";
import { GET_MATERIAPRIMA, GET_MATERIAPRIMAPROD, RESET_PRODMP, DEL_MATERIAPRIMAPROD } from './constant'
// Lista Materias Primas 
export function getMateriaprima() {
  //console.log('Action getMateriaprima: All');
  return async function (dispatch) {
    var materiaprima = await axios.get(`/materiaprima`);
    return dispatch({
      type: GET_MATERIAPRIMA,
      payload: materiaprima.data
    })
  }
}
// ABM de Materias Primas 
export function AddMateriaprima(materiaprima) {
  return function (dispatch) {
    axios.post('/materiaprima', materiaprima)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}
// trae todos los registros de Materia Prima de un producto in ID 
export function getMPDetail(id) {
  //console.log('Action getMPDetail: ', id);
  return async function (dispatch) {
    var prodmp = await axios.get(`/materiaprima/prod?id=${id}`);
    return dispatch({
      type: GET_MATERIAPRIMAPROD,
      payload: prodmp.data
    })
  }
}
export function UpdateMateriaprima(materiaprima) {
  return function (dispatch) {
    axios.post('/materiaprima', materiaprima)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export function getMPByName(nombre){
  return async function (dispatch) {
      var materiaprima = await axios.get(`/materiaprima?nombre=${nombre}`);
      return dispatch({
          type: GET_MATERIAPRIMA,
          payload: materiaprima.data
      })
  }
}

export function deleteMPDetail(id) {
  return async function (dispatch) {
    var prodmp = await axios.delete(`/materiaprima/prod?id=${id}`);
    return dispatch({
      type: DEL_MATERIAPRIMAPROD,
      payload: prodmp.data
    })
  }
}
export function AddMPDetail(input) {
  return function (dispatch) {
    axios.put('/materiaprima/prod', input)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export function resetProd() {
  return {
    type: RESET_PRODMP
  }
}
