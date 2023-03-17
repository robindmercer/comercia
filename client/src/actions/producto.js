import axios from "axios";
import { GET_PRODUCTOS,GET_PRODUCTOSID } from './constant'

export function getProducto(){
    console.log('Action getProducto: All');
     return async function (dispatch) {
         var producto = await axios.get(`/producto`);
         return dispatch({
             type: GET_PRODUCTOS,
             payload: producto.data
         })
     }
 }
 
 export function AddProducto(producto) {
  //console.log('AddProducto: ', producto);
    return function (dispatch) {
      axios.post('/producto', producto)
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
       var producto = await axios.get(`/producto/detail/${id}`);
       return dispatch({
           type: GET_PRODUCTOSID,
           payload: producto.data
       })
   }
}
  export function UpdateProducto(producto) {
    return function (dispatch) {
      axios.put('/producto', producto)
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
      axios.put(`/producto/status/${id}`)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }  