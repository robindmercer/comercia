import axios from "axios";
import { GET_STATUS } from './constant'

export function getStatus(){
    console.log('Action getStatus: All');
     return async function (dispatch) {
         var status = await axios.get(`/status`);
         return dispatch({
             type: GET_STATUS,
             payload: status.data
         })
     }
 }
 
 export function AddStatus(status) {
    return function (dispatch) {
      axios.post('/status', status)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  
  export function UpdateStatus(status) {
    return function (dispatch) {
      axios.put('/status', status)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }