import axios from "axios";
import { LOG_CONTROL,GET_MENU,GET_MENUID } from './constant'

const url = "http://localhost:3001" 

// Busco Id del ususario Logeado
// comunico con el Back 
export function AccessCtrl(id){
   console.log('Action AccessCtrl: ', id);
    return async function (dispatch) {
        var usuario = await axios.get(`${url}/usuario/usr/${id}`);
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
         var menu = await axios.get(`${url}/menu/usr/${id}`);
         return dispatch({
             type: GET_MENUID,
             payload: menu.data
         })
     }
 }
 
 export function GetMenu(){
    console.log('Action GetMenu: All');
     return async function (dispatch) {
         var menu = await axios.get(`${url}/menu`);
         return dispatch({
             type: GET_MENU,
             payload: menu.data
         })
     }
 }
 

 export function mailEnviar(data) {
    console.log('mailEnviar data: ', data);
    return async function (dispatch) {
      axios.post(`${url}/email`, data)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  