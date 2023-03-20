import axios from "axios";
import { LOG_CONTROL,GET_MENU,GET_MENUID } from './constant'

// Busco Id del ususario Logeado
// comunico con el Back 
export function AccessCtrl(id){
   console.log('Action AccessCtrl: ', id);
    return async function (dispatch) {
        var usuario = await axios.get(`usuario/usr/${id}`);
        return dispatch({
            type: LOG_CONTROL,
            payload: usuario.data
        })
    }
}

// Rutinas del Menu 
export function GetMenuId(id){
    console.log('Action AccessCtrl: ', id);
     return async function (dispatch) {
         var menu = await axios.get(`menu/usr/${id}`);
         return dispatch({
             type: GET_MENUID,
             payload: menu.data
         })
     }
 }
 
 export function GetMenu(){
    console.log('Action GetMenu: All');
     return async function (dispatch) {
         var menu = await axios.get(`menu`);
         return dispatch({
             type: GET_MENU,
             payload: menu.data
         })
     }
 }
 

 export function mailEnviar(data) {
    console.log('mailEnviar data: ', data);
    return async function (dispatch) {
      axios.post(`/email`, data)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  