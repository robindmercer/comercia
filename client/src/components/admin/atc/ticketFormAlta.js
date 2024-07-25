// <!-- https://docs.google.com/document/d/1bdFXGLJFUtue53QChnEkuCcpSyxyKPZM/edit -->
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { getTablaAll } from "../../../actions/tabla";
// import { FcHome, FcOk, FcLeft } from "react-icons/fc";
// import { Link } from "react-router-dom";
import { getPerfil } from "../../../actions/perfil";

import { getCliente } from "../../../actions/cliente";
// import style from '../../../css/ticket.module.css'
import '/comercia/client/src/components/admin/atc/tickets.css'
import { AddTicket, UpdateTicket, getTicketUno } from "../../../actions/ticket";
import Header from "../../Header";
// Acciones
import "../../../css/usuario.css";

export function validate(input) {
   let errors = {};

   if (input.description === "") {
      errors.description = "Debe Ingresar una descripcion";
   }

   return errors;
}

function ABMTicket() {
   const hoy = new Date()
   const cookies = new Cookies();
   const id_usuario = cookies.get("usuario");
   const location = useLocation();
   const { state } = location;
   const navigate = useNavigate();
   const dispatch = useDispatch();
   // const ticketuno = useSelector((state) => state.ticketuno)
   // const status = useSelector((state) => state.status);
   const tabla = useSelector((state) => state.tabla);
   // const [cod_perfil, setPerfil] = useState(0);
   const perfil = useSelector((state) => state.perfil)
   const { cliente } = useSelector((state) => state);
   // const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
   // const [data, setData] = useState({sql1: "",});
   const [onChange, setOnChange] = useState(false);
   
   // const [cliid, setCliid] = useState(0);
   const vuelvoA = "/ticket"
   var dateInput = new Date();
   var formattedDate = dateInput.toISOString().slice(0,10);

   var [chkA, setchkA] = useState(' ');
   var [chkB, setchkB] = useState(' ');
   var [chkC, setchkC] = useState(' ');
   var [chkD, setchkD] = useState(' ');
   var [chkE, setchkE] = useState(' ');
   var [chkF, setchkF] = useState(' ');
   var [chkG, setchkG] = useState(' ');
   var [chkH, setchkH] = useState(' ');
   var [chkI, setchkI] = useState(' ');
   var btnGrabar = false;
   var xOcultoCli = false;
   var ErrMsg = ""
   var cabecera = ""
   // var ant = "";
   var xEvidencia=[]
   var xevi_act=[]

   const [input, setInput] = useState({
      id:  state ? state.id : 0, 
      cli_id:  state ? state.cli_id: "",
      detecta:  state ? state.detecta : "",
      tck_id:  state ? state.tck_id : 1,
      tck_linea:  state ? state.tck_linea : 1,
      serie:  state ? state.serie : "",
      description:  state ? state.description : "",
      porque1:     state ? state.porque1 : "",
      porque2:     state ? state.porque2 : "",
      porque3:     state ? state.porque3 : "",
      porque4:     state ? state.porque4 : "",
      porque5:     state ? state.porque5 : "",
      analisis:    state ? state.analisis : "",
      chkbox:      state ? state.chkbox : "",
      evidencia:   state ? state.evidencia : "",
      evi_act:     state ? state.evi_act:"",
      actividad:   state ? state.actividad:"",
      fact:        hoy.toISOString().split('T')[0],
      conclusion:  state ? state.conclusion : "",
      usr:  id_usuario,
      perfil:  state ? state.perfil : 0,
      alta:   hoy.toISOString().split('T')[0],
      cierre:  "19000101",
      cod_status:  state ? state.cod_status : 0,
      prioridad:  state ? state.prioridad : 0,
      responsable: state ? state.responsable: "",
      nombre: state ? state.nombre: "",
      apellido: state ? state.apellido: "",
      razsoc: state ? state.razsoc: "",
   });

   useEffect(() => {
      // limpar_datos();
      dispatch(getTablaAll());
      dispatch(getPerfil());
      dispatch(getCliente());
      //      dispatch(getTicketUno(state.id));// Id del ticket no es el numero del ticket
      //cargarInput();
   }, [dispatch, state.id]);

   const marcar = (letra) => {
      
      if (letra === 'A') chkA = (chkA === "X") ? setchkA(" ") : setchkA("X");
      if (letra === 'B') chkB = (chkB === "X") ? setchkB(" ") : setchkB("X");
      if (letra === 'C') chkC = (chkC === "X") ? setchkC(" ") : setchkC("X");
      if (letra === 'D') chkD = (chkD === "X") ? setchkD(" ") : setchkD("X");
      if (letra === 'E') chkE = (chkE === "X") ? setchkE(" ") : setchkE("X");
      if (letra === 'F') chkF = (chkF === "X") ? setchkF(" ") : setchkF("X");
      if (letra === 'G') chkG = (chkG === "X") ? setchkG(" ") : setchkG("X");
      if (letra === 'H') chkH = (chkH === "X") ? setchkH(" ") : setchkH("X");
      if (letra === 'I') chkI = (chkI === "X") ? setchkI(" ") : setchkI("X");

      if (onChange) {
         setOnChange(false);
         } else {
         setOnChange(true);
      }       

      var xlista = '         '
      var newchk = xlista.split('')
      newchk[0] = chkA
      newchk[1] = chkB
      newchk[2] = chkC
      newchk[3] = chkD
      newchk[4] = chkE
      newchk[5] = chkF
      newchk[6] = chkG
      newchk[7] = chkH
      newchk[8] = chkI
      let modifiedString = newchk.join('');
       console.log('modifiedString: ', '*'+modifiedString+'*',chkA);
      // ticketuno[0].chkbox = modifiedString
      input.chkbox = modifiedString
      if (input.id === 0){
         input.fact = formattedDate;
      }
   }

   function handleChange(e) {
      e.preventDefault();

      setInput({
         ...input,
         [e.target.name]: e.target.value,
         });
         if (e.target.name === 'actividad') {
            input.actividad = e.target.value; 
            console.log('input.actividad: ', input.actividad);
         }
      if (onChange) {
         setOnChange(false);
      } else {
         setOnChange(true);
      }      
      console.log('datos2: ', e.target.name, e.target.value,input);
    }


   function handlePerfil(e) {
      e.preventDefault();
      if (e.target.name ==="perfil"){
         input.perfil=e.target.value
      }
      if (e.target.name ==="cliente"){
         input.cli_id=e.target.value
         input.cliente = ""  // para que no quede undefined
      }      
      if (onChange) {
         setOnChange(false);
      } else {
         setOnChange(true);
      }
   }

   const grabar = () => {
      var grabo = true      
      if (input.perfil ===undefined) {
         grabo=false
         alert("Debe grabar un perfil")
      }
      if (input.prioridad ===undefined) {
         grabo=false
         alert("Debe grabar la Prioridad")
      }      
      if (input.evidencia ===undefined) input.evidencia ='';
      if (input.evi_act ===undefined) input.evi_act ='';
      if (input.apellido ===undefined) input.apellido ='';
      if (input.nombre ===undefined) input.nombre ='';
      if (input.cliente ===undefined) input.cliente ='';
      if (input.razsoc ===undefined) input.razsoc ='';
      if (input.porque1 ===undefined) input.porque1 ='';
      if (input.porque2 ===undefined) input.porque2 ='';
      if (input.porque3 ===undefined) input.porque3 ='';
      if (input.porque4 ===undefined) input.porque4 ='';
      if (input.porque5 ===undefined) input.porque5 ='';
      if (input.analisis ===undefined) input.analisis ='';
      if (input.actividad ===undefined) input.actividad ='';
      if (input.conclusion ===undefined) input.conclusion ='';

      console.log('input: ', state.id,input);
      if (grabo){
         if (input.id === 0){
            dispatch(AddTicket(input));
         } else {
            dispatch(UpdateTicket(input));
         }
         window.location.href = '/ticket';
      }
   };
   btnGrabar=true;

   // console.log('start: ','A ' + input.chkA,' B ' + input.chkB,' C ' + input.chkC);
   
   if (state.cli_id === 0 && state.tck_linea === 1 ) cabecera = "Ticket Nuevo"
   if (state.cli_id !== 0) {
      xOcultoCli = true
      cabecera = `Modificacion Ticket : ${state.tck_id} - ${state.tck_linea}`
   }   
   if (input.evidencia !==undefined) {
      console.log('entre evidencia',input.evidencia);
      if (input.evidencia.indexOf(';') > 0){
         xEvidencia = input.evidencia.split(';');
      } else {
         xEvidencia.push(input.evidencia)
      }
   }   
   if (input.evi_act !==undefined) {
      console.log('entre evi_act',input.evi_act);
      if (input.evi_act.indexOf(';') > 0){
         xevi_act = input.evi_act.split(';');
      } else {
         xevi_act.push(input.evi_act)
      }
   }
   
   console.log('state: ', state);

   // console.log('input',input);

   console.log('input: ', input);

   var xlista = '         '
   var newchk = xlista.split('')
   newchk[0] = chkA
   newchk[1] = chkB
   newchk[2] = chkC
   newchk[3] = chkD
   newchk[4] = chkE
   newchk[5] = chkF
   newchk[6] = chkG
   newchk[7] = chkH
   newchk[8] = chkI
   let modifiedString = newchk.join('');
    console.log('modifiedString: ', '*'+modifiedString+'*',chkA);
   // ticketuno[0].chkbox = modifiedString
   input.chkbox = modifiedString



   return(
      <>
   <Header />
   <body className="c34">
   <div>
      <table className="c65">
         <tbody>
            <tr className="c52">
               <td >{cabecera}</td>
            </tr>
         </tbody>
      </table>

      <ol className="c36 lst-kix_list_1-0 start" start="1">
         <li className="c10 li-bullet-0">
            <span className="c8">Datos generales del producto</span>
         </li>
      </ol>
      
      <table className="c51">
      <tbody>
      <tr className="c35">
            <td className="c48" colSpan="1" rowSpan="1">
               <p className="c23"><span className="c8">N&uacute;mero de serie:</span></p>
            </td>
            <td className="c29" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <input
                    type="text"
                    id="serie"
                    name="serie"
                    value={input.serie}
                    onChange={handleChange}
                    placeholder="Numero de Serie"
                    />
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
         </tr>
         <tr className="c27">
            <td className="c48" colSpan="1" rowSpan="1">
               <p className="c23">
                  <span className="c8">Descripci&oacute;n del producto:</span>
               </p>
            </td>
            <td className="c29" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               {/* <input id="descripcion"
                  className="inputAncho"
                  name="descripcion"
               type="text"
               placeholder="Descripición"
            ></input> */}
               <textarea
                        type="text"
                        id="description"
                        name="description"
                        cols="70"
                        rows="5"
                        className="txtarea"
                        defaultValue={input.description}
                        onChange={handleChange}
                        placeholder="Ingrese una descripcion"
                        />                
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
         </tr>
         <tr className="c28">
            <td className="c48" colSpan="1" rowSpan="1">
               <p className="c23">
                  <span className="c8">&iquest;D&oacute;nde se detecta?:</span>
               </p>
            </td>
            <td className="c29" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               {/* <input id="detecta"
                  className="inputAncho"
                  name="detecta"
               type="text"
               defaultValue={input.detecta}
            placeholder="Lugar"></input> */}
               <textarea
                        type="text"
                        id="detecta"
                        name="detecta"
                        cols="70"
                        rows="3"
                        defaultValue={input.detecta}
                        onChange={handleChange}
                        placeholder="Donde se detecta"

                     />                 
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
         </tr>
         <tr className="c28">
            <td className="c48" colSpan="1" rowSpan="1">
            <p className="c23 c13"><span className="c12"></span></p>
               <p className="c23">
                  <span className="c8"
                     >&iquest;Qui&eacute;n detecta? (Nombre):</span
                  >
               </p>
            </td>
            {xOcultoCli === true ? (
               <td>{input.nombre  + " " + input.apellido + " - " + input.razsoc}</td>
            ):
               <td className="c29" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <select
                     className="selWidth"
                     name="cliente"
                     id="cliente"
                     onChange={(e) => handlePerfil(e)}
                     value={input.cli_id}
                     >
                        <option value="0">Seleccionar</option>
                     {cliente.map((perf) => {
                        var nombre = perf.nombre + " " + perf.apellido;
                           if (nombre.indexOf(perf.razsoc) < 0) {
                              nombre += " - " + perf.razsoc;
                           }
                              return (
                                 <option
                                    value={perf.id}
                                    key={perf.id}
                                 >{`${nombre}`}</option>
                              );
                        })}
                     </select>
                     <p className="c23 c13"><span className="c12"></span></p>
                  </td>
               }
         </tr>
      <tr className="c28">
            <td className="c59 c72" colSpan="1" rowSpan="1">
               <p className="c23">
                  <span className="c8">Evidencia (1 o 2 fotograf&iacute;as)<br/>(Direccion URL del Drive):</span>
               </p>
            </td>
            <td className="c29" colSpan="1" rowSpan="1">
               {xEvidencia &&
                 xEvidencia.map((element, i) => {
                  if (element !==""){
                   return(
                     <a className="aText" href={element} target="_blank" rel="noreferrer">Foto&nbsp;&nbsp;{i}&nbsp;</a>
                   )
                  } else {
                     return (null)
                  }
                 })
               }
               <p className="c23 c13"><span className="c12"></span></p>
               <textarea
                        type="text"
                        id="evidencia"
                        name="evidencia"
                        cols="80"
                        rows="3"
                        defaultValue={input.evidencia}
                        onChange={handleChange}
                        placeholder="Evidencias"
                     />   
            </td>
         </tr>
         </tbody>

      </table>
      <p className="c2 c26"><span className="c8"></span></p>
      <ol className="c36 lst-kix_list_1-0" start="2">
         <li className="c10 li-bullet-0">
            <span className="c8">An&aacute;lisis de la no conformidad</span>
         </li>
      </ol>
      
      <table className="c51">
      <tbody>
      <tr className="c35">
            <td className="c16" colSpan="1" rowSpan="1">
            <p className="c23 c13"><span className="c12"></span></p>
               <p className="c23 c13"><span className="c12"></span></p>
               <p className="c7"><span className="c8">1er Por qu&eacute;</span></p>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
            <td className="c33" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <textarea id="porque1"
               className="inputAncho"
               name="porque1"
               type="text"
               defaultValue={input.porque1}
               cols="70"
               rows="2"
               onChange={handleChange}
               placeholder="Porque"></textarea>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
         </tr>
         <tr className="c35">
            <td className="c16" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <p className="c7"><span className="c8">2do Por qu&eacute;</span></p>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
            <td className="c33" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <textarea 
                  id="porque2"
                  name="porque2"
                  className="inputAncho"
                  type="text"
                  defaultValue={input.porque2}
                  cols="70"
                  rows="2"
                  onChange={handleChange}
                  placeholder="Porque">
               </textarea>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
         </tr>
         <tr className="c35">
            <td className="c16" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <p className="c7"><span className="c8">3er Por qu&eacute;</span></p>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
            <td className="c33" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <textarea id="porque3"
                  className="inputAncho"
                  name="porque3"
                  type="text"
                  defaultValue={input.porque3}
                  cols="70"
                  rows="2"
                  onChange={handleChange}
                  placeholder="Porque">
               </textarea>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
         </tr>
         <tr className="c35">
            <td className="c16" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <p className="c7"><span className="c8">4to Por qu&eacute;</span></p>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
            <td className="c33" colSpan="1" rowSpan="1">
            <p className="c23 c13"><span className="c12"></span></p>
               <textarea id="porque4"
                  className="inputAncho"
                  name="porque4"
                  type="text"
                  defaultValue={input.porque4}
                  cols="70"
                  rows="2"
                  onChange={handleChange}
                  placeholder="Porque">
               </textarea>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
         </tr>
         <tr className="c35">
            <td className="c16" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <p className="c7"><span className="c8">5to Por qu&eacute;</span></p>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
            <td className="c33" colSpan="1" rowSpan="1">
            <p className="c23 c13"><span className="c12"></span></p>
               <textarea id="porque5"
                  className="inputAncho"
                  name="porque5"
                  type="text"
                  defaultValue={input.porque5}
                  cols="70"
                  rows="2"
                  onChange={handleChange}
                  placeholder="Porque">
               </textarea>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
         </tr>
         <tr className="c62">
            <td className="c16" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <p className="c7">
                  <span className="c8">Conclusi&oacute;n del an&aacute;lisis</span>
               </p>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
            <td className="c33" colSpan="1" rowSpan="1">
            <p className="c23 c13"><span className="c12"></span></p>
               <textarea 
                  id="analisis"
                  name="analisis"
                  className="inputAncho"
                  type="text"
                  defaultValue={input.analisis}
                  onChange={handleChange}
                  placeholder="Ingrese la conclusion del analisis">
               </textarea>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
         </tr>
         </tbody>
      </table>
      <p className="c2 c26"><span className="c8"></span></p>
      <ol className="c36 lst-kix_list_1-0" start="3">
         <li className="c10 li-bullet-0">
            <span className="c8"
               >Tipo de incumplimiento del producto no conforme.</span
            >
         </li>
      </ol>
      <p className="c23">
         <span className="c12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Procedimiento&nbsp;&nbsp;</span>
         {/* <input 
            id="chkA"
            name="chkA"
            className="chkBox"
            // onClick={() =>marcar("A")}
            onChange={handleChange}
            type="checkbox"
            checked={input.chkA}
         /> */}
         <input
            onClick={() =>marcar("A")}
            className={"xinput " + (chkA ==='X' ? 'textok':'textnormal')}
            type="text"
            id="chkA"
            value={chkA}
         />
         <span className="c12">&nbsp;&nbsp;&nbsp;&nbsp;Especificaciones de calidad&nbsp;&nbsp;</span>
         <input
            onClick={() =>marcar("B")}
            className={"xinput " + (chkB ==='X' ? 'textok':'textnormal')}
            type="text"
            id="chkB"
            value={chkB}
         />
         <span className="c12">&nbsp;&nbsp;&nbsp;&nbsp;Proveedores&nbsp;&nbsp;</span>
         <input
            onClick={() =>marcar("C")}
            className={"xinput " + (chkC ==='X' ? 'textok':'textnormal')}
            type="text"
            id={chkC}
            value={chkC}
         />

         
       </p>
       <p className="c23 c13"><span className="c12"></span></p>
      <ol className="c36 lst-kix_list_1-0" start="4">
         <li className="c10 li-bullet-0">
            <span className="c8">Responsable del producto no conforme.</span>
         </li>
      </ol>
      <p className="c23">
         <span className="c12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Operaciones&nbsp;&nbsp;</span>         
         <input
            onClick={() =>marcar("D")}
            className={"xinput " + (chkD ==='X' ? 'textok':'textnormal')}
            type="text"
            id="chkD"
            value={chkD}
         />   
         <span className="c12">&nbsp;&nbsp;&nbsp;&nbsp;Calidad&nbsp;&nbsp;</span>         
         <input
            onClick={() =>marcar("E")}
            className={"xinput " + (chkE ==='X' ? 'textok':'textnormal')}
            type="text"
            id="chkE"
            value={chkE}
         />
         <span className="c12">&nbsp;&nbsp;&nbsp;&nbsp;Administraci&oacute;n&nbsp;&nbsp;</span>         
         <input
            onClick={() =>marcar("F")}
            className={"xinput " + (chkF ==='X' ? 'textok':'textnormal')}
            type="text"
            id="chkF"
            value={chkF}
         />
      </p>
      <p className="c23">
         <p className="c23 c13"><span className="c12"></span></p>
         <span className="c12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nombre:&nbsp;&nbsp;</span>
         <input
            className="inputAncho2"
            type="text"
            id="responsable"
            name="responsable"
            defaultValue={input.responsable}
            onChange={handleChange}
            placeholder="Ingrese nombre del Responsable"
         />
               <p className="c23 c13"><span className="c12"></span></p>
      </p>
      <ol className="c36 lst-kix_list_1-0" start="5">
         <li className="c10 li-bullet-0">
            <span className="c8">Disposici&oacute;n del producto no conforme.</span>
         </li>
      </ol>
      <p className="c23">
         <span className="c12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Liberaci&oacute;n&nbsp;&nbsp;</span>
         <input
            onClick={() =>marcar("G")}
            className={"xinput " + (chkG ==='X' ? 'textok':'textnormal')}
            type="text"
            id="chkG"
            value={chkG}
         />
         <span className="c12">&nbsp;&nbsp;&nbsp;&nbsp;Destrucci&oacute;n&nbsp;&nbsp;</span>
         <input
            onClick={() =>marcar("H")}
            className={"xinput " + (chkH ==='X' ? 'textok':'textnormal')}
            type="text"
            id="chkH"
            value={chkH}
         />
         <span className="c12">&nbsp;&nbsp;&nbsp;&nbsp;Retrabajo&nbsp;&nbsp;</span>
         <input
            onClick={() =>marcar("I")}
            className={"xinput " + (chkI ==='X' ? 'textok':'textnormal')}
            type="text"
            id="chkI"
            value={chkI}
         />
      </p>
      <p className="c23 c13"><span className="c12"></span></p>
      <ol className="c36 lst-kix_list_1-0" start="6">
         <li className="c10 li-bullet-0">
            <span className="c8">Plan de acci&oacute;n.</span>
         </li>
      </ol>
      <table className="c51">
      <tbody>
      <tr className="c60"> 
            <td className="c50 c59" colSpan="2" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <p className="c9"><span className="c8">Actividad</span></p>
               <p className="c23 c13"><span className="c12"></span></p>
            </td>
            <td className="c18" colSpan="1" rowSpan="1">
               <p className="c9"><span className="c8">Fecha compromiso</span></p>
            </td>
         </tr>
         <tr className="c60">
            <td className="c50" colSpan="2" rowSpan="1">
               <p className="c7 c13"><span className="c12"></span></p>
               <input 
                  id="actividad"
                  name="actividad"
                  className="inputAncho2"
                  type="text"
                  defaultValue={input.actividad}
                  onChange={handleChange}
                  placeholder="Numero de actividad">
               </input>
               <p className="c7 c13"><span className="c12"></span></p>

            </td>
            <td className="c55" colSpan="1" rowSpan="1">
               <p className="c7 c13"><span className="c12"></span></p>
               <input
                  id="fact"
                  name="fact"
                  type="date"
                  onChange={handleChange}
                  value={input.fact}
                  ></input>               
            </td>
         </tr>
         <tr className="c28">
            <td className="c59 c72" colSpan="1" rowSpan="1">
               <p className="c23">
                  <span className="c8">Evidencia:</span>
               </p>
            </td>
            <td className="c29" colSpan="1" rowSpan="1">
               {xevi_act &&
                 xevi_act.map((element, i) => {
                  if (element !==""){
                   return(
                     <a className="aText" href={element} target="_blank" rel="noreferrer">Foto&nbsp;&nbsp;{i}&nbsp;</a>
                   )
                  } else {
                     return null
                  }
                 })
               }
               <p className="c23 c13"><span className="c12"></span></p>
               <textarea
                        type="text"
                        id="evi_act"
                        name="evi_act"
                        cols="80"
                        rows="3"
                        defaultValue={input.evi_act}
                        onChange={handleChange}
                        placeholder="evi_act"
                     />   
            </td>
         </tr>
         </tbody>
      </table>
      <p className="c23 c13"><span className="c12"></span></p>
      <ol className="c36 lst-kix_list_1-0" start="7">
         <li className="c10 li-bullet-0">
            <span className="c8">Verificaci&oacute;n del cierre.</span>
         </li>
      </ol>
      <table className="c51">
      <tbody>
      <tr className="c52">
            <td className="c65 c59" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <p className="c39"><span className="c8">Conclusi&oacute;n</span></p>
            </td>
         </tr>
         <tr className="c74">
            <td className="c65" colSpan="1" rowSpan="1">
               <p className="c23 c13"><span className="c12"></span></p>
               <textarea
                  type="text"
                  id="conclusion"
                  name="conclusion"
                  cols="120"
                  rows="5"
                  className="txtarea"
                  onChange={handleChange}
                  defaultValue={input.conclusion}
                     />               
            </td>
         </tr>
         </tbody>
      </table>
      <p className="c23 c1 3"><span className="c12"></span></p>
      <table className="c65">
      <tbody>
      <tr className="c52">
            <td className="tdTitulo">Prioridad:</td>
            <td>
            <select
               name="prioridad"
               id="prioridad"
               value={input.prioridad}
               onChange={handleChange}
               placeholder="Seleccione Prioridad"
            >
               <option value="0">Seleccionar</option>
               {tabla &&
                  tabla.map((tabla) => {
                     if (tabla.id === 17 && tabla.cod !== 0) {
                     return (
                        <option
                        value={tabla.cod}
                        key={tabla.cod}
                        >{`${tabla.description}`}</option>
                     );
                  } else {
                     return null;
                  }
               })}
               </select>            
            </td>
            <td className="tdTitulo">Perfil:</td>
            <td>
               <select
                  id="perfil"
                  name="perfil"
                  onChange={handleChange}
                  value={input.perfil}
                >
                  <option value="0">Seleccionar</option>
                  {perfil.map((perf) => {
                    return (
                          <option
                            value={perf.id_perfil}
                            key={perf.id_perfil}
                          >{`${perf.description}`}</option>                   
                          )
                  })}
                </select>            
            </td>

         </tr>
         </tbody>
      </table>
    { ErrMsg !== '' ? (
      <div>
         <p className="errmsg">{ErrMsg}</p>
      </div>
      ) : null}

      <p className="c23 c13"><span className="c12"></span></p>
      <div>
         {btnGrabar ? (
            <button className="nibbotBtn" onClick={() =>grabar()}>
               GRABAR
            </button>
         ) : null}
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <button
            className="nibbotBtn"
            onClick={() => {
               navigate(vuelvoA);
            }}
         >
            VOLVER
         </button>
      </div>
   </div>
   </body>
</>
)
}
export default ABMTicket;