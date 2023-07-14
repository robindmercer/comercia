import axios from "axios";
import { GET_FACTCOND } from './constant'

export function getCondicionesBckp(){

    //console.log('Action getCondiciones: All');
     return async function (dispatch) {
         var factcond = await axios.get(`factcond/bckp`);
         return dispatch({
             type: GET_FACTCOND,
             payload: factcond.data
         })
     }
  }