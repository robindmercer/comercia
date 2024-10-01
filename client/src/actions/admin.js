import axios from "axios";
import { GET_ADMIN } from "./constant";

// Ejemplo de Uso 
// { "sql":"insert into condiciones (nombre,descuento,enganche,meses,interes) values ",
//   "sql1":"('nom1',1,2,3,4);('nom2',1,2,3,4)"
//  }
export function InsertData(data) {
    return async function (dispatch) {
      await axios.post(`admin/insert`, data)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  export function BulkData(data) {
    return async function (dispatch) {
      await axios.post(`admin/bulk`, data)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

  export function RunSqlPost(data) {
    // console.log('RunSqlPost: ', data);
    return async function (dispatch) {
      await axios.post(`admin/update`, data)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log('Error',err)
        })
    }
  }
  
  export function RunSqlDel(data) {
    return async function (dispatch) {
      await axios.post(`admin/delete`, data)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }


  export function RunSql(id) {
    return async function (dispatch) {
      var admin = await axios.get(`admin/count?id=${id}`);
      return dispatch({
        type: GET_ADMIN,
        payload: admin.data
      })
    }
  }