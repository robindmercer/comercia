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

       var sql=`TRUNCATE table ${file}` 
       console.log('sql: ', sql);
       setDatos(datos.sql1=sql)
       dispatch(RunSqlDel(datos))
       setDatos(datos.sql1='')
    console.log("Start: ", datos);
       var xSql2 = "insert into " + file + " values"
       setDatos(datos.sql1=xSql2)

       var xSql3 = "("
       var kl = 0
      for (var I = 0; I < data.length; I++) {
         //console.log("data[I]: ", data[I]);
         let claves = Object.keys(data[I]); // claves = ["nombre", "color", "macho", "edad"]
         for (let i = 0; i < claves.length; i++) {
            let clave = claves[i];
            xSql3 += coma + "'" + data[I][clave] + "'";
            //console.log(data[I][clave]);
            coma=","
        }
        xSql3 +="),("
        console.log('xSql3: ', xSql3);
        kl+=1
        if (kl > 20){
            xSql3 = xSql3.substring(0,xSql3.length-2)
            setDatos(datos.sql1=xSql2 + xSql3)
            console.log("kl>10: ", datos);
            dispatch(BulkData(datos))
            xSql3="("
            kl=0
        }
        coma=""
      }

      if (xSql3 !=='('){
        xSql3 = xSql3.substring(0,xSql3.length-2)
        setDatos(datos.sql1=xSql2 + xSql3)
        console.log("Final: ", datos);
        dispatch(BulkData(datos))
        xSql3=""

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
         ... webstylepress ...
      </div>
   );
}

export default Restore;
