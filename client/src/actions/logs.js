import axios from "axios";
import { GET_LOGSID } from "./constant";



 export function AddLogs(logs) {
    return async function (dispatch) {
      await axios.post('log', logs)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
 // trae todos los registros de in ID 
 export function getLogs(id){
  //console.log('Action Tabla getDetail: ',id);
   return async function (dispatch) {
       var logs = await axios.get(`/log/fac/${id}`);
       return dispatch({
           type: GET_LOGSID,
           payload: logs.data
       })
   }
}
