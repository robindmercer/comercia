import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getClienteDir } from "../../actions/cliente";
import { cotiToFact } from "../../actions/factura";

import "../admin/condiciones/add.css";

const AsignCli = (cotid) => {
   // const { addCondicion } = useContext(CondicionContext);
   const [cliid, setCliid] = useState(0);
   const [onChange, setOnChange] = useState(false);
   const [ver, setVer] = useState(false);
   const { cliente } = useSelector((state) => state);
   const [nombre, setName] = useState("");
   const dispatch = useDispatch();
   var ant = "";
   const [input, setInput] = useState({
      cli_id: "",
      cot_id: 0,
      dir_id: 0,
   });

   useEffect(() => {
      dispatch(getClienteDir());
   }, [dispatch]);

   function handlePerfil(e) {
      e.preventDefault();
      if (e.target.name ==="cliente"){
         input.cli_id=e.target.value
         setCliid(e.target.value);
      }
      
      if (e.target.name ==="domic"){
         input.dir_id=e.target.value
      }
      
      console.log("e.target.value: ", e.target.value, input);
      if (onChange) {
         setOnChange(false);
      } else {
         setOnChange(true);
      }
      console.log("cliid: ", cliid);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      setVer(false);
      if (cliid === 0 || cotid === 0) {
         setVer(true);
      } else {
         setInput((input.cli_id = cliid));
         setInput((input.cot_id = cotid.cotid));
         dispatch(cotiToFact(input));
         //console.log('input: ', input);
         window.location.href = "/factura";
      }
   };

   console.log('cliente: ', cliente);

   return (
      <Form onSubmit={handleSubmit}>
         <table>
            <tbody>
               <tr>
                  <td>Seleccion</td>
                  <td>
                     <select
                        className="selWidth"
                        name="cliente"
                        id="cliente"
                        onChange={(e) => handlePerfil(e)}
                        value={input.cod_cliente}
                     >
                        <option value="0">Seleccionar</option>
                        {cliente.map((perf) => {
                           var nombre = perf.nombre + " " + perf.apellido;
                           if (nombre.indexOf(perf.razsoc) < 0) {
                              nombre += " - " + perf.razsoc;
                           }
                           if (nombre !== ant) {
                              ant = nombre;
                              return (
                                 <option
                                    value={perf.id}
                                    key={perf.id}
                                 >{`${nombre}`}</option>
                              );
                           } else {
                              return null;
                           }
                        })}
                     </select>
                  </td>
               </tr>
               {cliid > 0 ? (
                  <tr>
                     <td>Entrega</td>
                     <td>
                        <select
                           className="selWidth"
                           name="domic"
                           id="domic"
                           onChange={(e) => handlePerfil(e)}
                           value={input.dirId}
                        >
                           <option value="0">Seleccionar</option>
                           {cliente.map((direc) => {
                              var nombre = 
                                 direc.dirdes + " : " + direc.cc + " " + direc.dd + " " + direc.cui + " " +direc.dd;
                              if (parseInt(direc.id) === parseInt(input.cli_id)){
                              return (
                                 <option
                                    value={direc.dirid}
                                    key={direc.dirid}
                                 >{`${nombre}`}</option>
                              );} else{
                                 return (
                                    null
                                 )}
                           })}
                        </select>
                     </td>
                  </tr>
               ) : null}
            </tbody>
         </table>
         <Button variant="success" type="submit" block>
            Asignar al Cliente
         </Button>
      </Form>
   );
};

export default AsignCli;
