import axios from "axios";
import { GET_COMPANIA,GET_COMPANIAID } from './constant'

export function getCompania(){
    //console.log('Action getCompania: All');
     return async function (dispatch) {
         var compania = await axios.get(`/compania/bckp`);
         return dispatch({
             type: GET_COMPANIA,
             payload: compania.data
         })
     }
 }
 
 export function AddCompania(compania) {
  //console.log('AddCompania: ', compania);
    return function (dispatch) {
      axios.post('/compania', compania)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
   // trae todos los registros de in ID 
 export function getProdDetail(id){
   return async function (dispatch) {
       var compania = await axios.get(`/compania/detail/${id}`);
       return dispatch({
           type: GET_COMPANIAID,
           payload: compania.data
       })
   }
}
  export function UpdateCompania(compania) {
    return function (dispatch) {
      axios.put('/compania', compania)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  export function ChangeStatus(id) {
    return function (dispatch) {
      axios.put(`/compania/status/${id}`)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }  