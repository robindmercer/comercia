import { useState } from "react";
import * as XLSX from "xlsx";
import { BulkData, RunSqlDel } from '../../actions/admin'

import { useDispatch } from 'react-redux'


function Restore() {
    const [data, setData] = useState([]);
    const [file, setFile] = useState('');

    const [datos, setDatos] = useState({
        sql1:"",
        sql2:""
     });     
    const dispatch = useDispatch();

   const handleFileUpload = (e) => {
       const reader = new FileReader();
       reader.readAsBinaryString(e.target.files[0]);
       setFile(e.target.files[0].name.replace('.xlsx',''))
       reader.onload = (e) => {
           const data = e.target.result;
           const workbook = XLSX.read(data, { type: "binary" });
           const sheetName = workbook.SheetNames[0];
         const sheet = workbook.Sheets[sheetName];
         const parsedData = XLSX.utils.sheet_to_json(sheet);
         setData(parsedData);
        };
    };
    var insertar = "";
    var coma = ""
    insertar = "";
    console.log('file: ', file);

   if (data.length > 0 && file !== '') {

      //  var sql=`TRUNCATE table ${file}` 
      //  console.log('sql: ', sql);
      //  setDatos(datos.sql1=sql)
      //  dispatch(RunSqlDel(datos))
      //     setDatos(datos.sql1='')
      //  console.log("Start: ", datos);
      //  setDatos(datos.sql1=xSql2)
       var xSql = "Update " + file + " set stock = @ where name = '#'"
       var xSql1 = ""
       var kl = 0
      for (var I = 0; I < data.length; I++) {
         //console.log("data[I]: ", data[I]);
         let claves = Object.values(data[I]); // claves = ["nombre", "color", "macho", "edad"]
         for (let i = 0; i < claves.length; i++) {
            let clave = claves[0];
            let stock = claves[4];
            xSql1 = xSql.replace("@",stock)
            xSql1 = xSql1.replace("#",clave)
            console.log('registro',clave,stock,xSql1);
        }
      }

      setFile('');
   }

   return (
      <div>
         <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
         {data.length > 0 && (
            <table className="table">
               <thead>
                  <tr>
                     {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {data.map((row, index) => (
                     <tr key={index}>
                        {Object.values(row).map((value, index) => (
                           <td key={index}>{value}</td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
         <br />
         <br />
         Nota: Este APP solamente actualiza el stock 'NO' crear Materias Primas Nueva
         <br />
      </div>
   );
}

export default Restore;
