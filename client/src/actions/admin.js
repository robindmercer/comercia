import axios from "axios";

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
  
  export function RunSql(data) {
    return async function (dispatch) {
      await axios.post(`admin/update`, data)
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  