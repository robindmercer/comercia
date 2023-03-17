import axios from "axios";
import { GET_PRODUCTOSLANG } from './constant'

export function getProductoLang(){
    console.log('Action getProductoLang: All');
     return async function (dispatch) {
         var productoLang = await axios.get(`/productoLang`);
         return dispatch({
             type: GET_PRODUCTOSLANG,
             payload: productoLang.data
         })
     }
 }
 
 export function getProductoLangId(id){
  console.log('Action getProductoLang: All');
   return async function (dispatch) {
       var productoLang = await axios.get(`/productoLang/${id}`);
       return dispatch({
           type: GET_PRODUCTOSLANG,
           payload: productoLang.data
       })
   }
}

 export function AddProductoLang(productoLang) {
    return function (dispatch) {
      axios.post('/productoLang', productoLang)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  
  export function UpdateProductoLang(productoLang) {
    return function (dispatch) {
      axios.put('/productoLang', productoLang)
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
      axios.put(`/productoLang/status/${id}`)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }  