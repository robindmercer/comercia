import axios from "axios"; 
import { GET_PRODUCTOSLANG } from './constant'

export function getProductoLang(){
    //console.log('Action getProductoLang: All');
     return async function (dispatch) {
         var productolang = await axios.get(`/productolang`);
         return dispatch({
             type: GET_PRODUCTOSLANG,
             payload: productolang.data
         })
     }
 }
 
 export function getProductoLangId(id){
  //console.log('Action getProductoLang: All');
   return async function (dispatch) {
       var productolang = await axios.get(`/productolang/${id}`);
       return dispatch({
           type: GET_PRODUCTOSLANG,
           payload: productolang.data
       })
   }
}

 export function AddProductoLang(productolang) {
    return function (dispatch) {
      axios.post('/productolang', productolang)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  
  export function UpdateProductoLang(productolang) {
    return function (dispatch) {
      axios.put('/productolang', productolang)
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
      axios.put(`/productolang/status/${id}`)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }  