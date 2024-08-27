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
import "./tickets.css";
import {
   AddTicket,
   CloseTicket,
   UpdateTicket,
   getinput,
} from "../../../actions/ticket";
import Header from "../../Header";
// Acciones
// import "../../../css/usuario.css";

// export function validate(input) {
//    let errors = {};

//    if (input.description === "") {
//       errors.description = "Debe Ingresar una descripcion";
//    }

//    return errors;
// }

function ABMTicket() {
   const hoy = new Date();
   const cookies = new Cookies();
   const id_usuario = cookies.get("usuario");
   const location = useLocation();
   const { state } = location;
   const navigate = useNavigate();
   const dispatch = useDispatch();
   // const input = useSelector((state) => state.input)
   const status = useSelector((state) => state.status);
   const tabla = useSelector((state) => state.tabla);
   const [cod_perfil, setPerfil] = useState(0);
   const perfil = useSelector((state) => state.perfil);
   const { cliente } = useSelector((state) => state);
   const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
   const [data, setData] = useState({ sql1: "" });
   const [onChange, setOnChange] = useState(false);

   const [cliid, setCliid] = useState(0);
   const vuelvoA = "/ticket";
   var dateInput = new Date();
   var updatable = "";
   var updatableNewTck = "";
   var newTckTitle = ""
   var formattedDate = dateInput.toISOString().slice(0, 10);

   var [chkA, setchkA] = useState(" ");
   var [chkB, setchkB] = useState(" ");
   var [chkC, setchkC] = useState(" ");
   var [chkD, setchkD] = useState(" ");
   var [chkE, setchkE] = useState(" ");
   var [chkF, setchkF] = useState(" ");
   var [chkG, setchkG] = useState(" ");
   var [chkH, setchkH] = useState(" ");
   var [chkI, setchkI] = useState(" ");
   var btnGrabar = false;
   var btnOcultoCli = false;
   var cabecera = "";
   // var ant = "";
   var xEvidencia = [];
   var xevi_act = [];

   const [input, setInput] = useState({
      id: state ? state.id : 0,
      actividad: state ? state.actividad : "",
      alta: hoy.toISOString().split("T")[0],
      apellido: state ? state.apellido : "",
      analisis: state ? state.analisis : "",
      chkbox: state ? state.chkbox : "",
      cierre: state ? state.cierre : "19000101",
      cli_id: state ? state.cli_id : "",
      cod_status: state ? state.cod_status : 0,
      conclusion: state ? state.conclusion : "",
      detecta: state ? state.detecta : "",
      description: state ? state.description : "",
      evi_act: state ? state.evi_act : "",
      evidencia: state ? state.evidencia : "",
      fact: hoy.toISOString().split("T")[0],
      nombre: state ? state.nombre : "",
      nextlinea: state ? state.nextlinea : 1,
      nuevotck: state ? state.nuevotck : "",
      perfil: state ? state.perfil : 0,
      porque1: state ? state.porque1 : "",
      porque2: state ? state.porque2 : "",
      porque3: state ? state.porque3 : "",
      porque4: state ? state.porque4 : "",
      porque5: state ? state.porque5 : "",
      prioridad: state ? state.prioridad : 0,
      razsoc: state ? state.razsoc : "",
      responsable: state ? state.responsable : "",
      serie: state ? state.serie : "",
      tck_id: state ? state.tck_id : 1,
      tck_linea: state ? state.tck_linea : 1,
      tot_lineas: state ? state.tot_lineas : 0,
      usr: id_usuario,
   });

   console.log("state: ", state);

   useEffect(() => {
      dispatch(getTablaAll());
      dispatch(getPerfil());
      dispatch(getCliente());
      // dispatch(getinput(state.id));// Id del ticket no es el numero del ticket
   }, [dispatch, state.id]);

   const marcar = (letra) => {
      console.log("marcar letra: ", letra, "chkA", chkA);

      if (letra === "A") chkA = chkA === "X" ? setchkA(" ") : setchkA("X");
      if (letra === "B") chkB = chkB === "X" ? setchkB(" ") : setchkB("X");
      if (letra === "C") chkC = chkC === "X" ? setchkC(" ") : setchkC("X");
      if (letra === "D") chkD = chkD === "X" ? setchkD(" ") : setchkD("X");
      if (letra === "E") chkE = chkE === "X" ? setchkE(" ") : setchkE("X");
      if (letra === "F") chkF = chkF === "X" ? setchkF(" ") : setchkF("X");
      if (letra === "G") chkG = chkG === "X" ? setchkG(" ") : setchkG("X");
      if (letra === "H") chkH = chkH === "X" ? setchkH(" ") : setchkH("X");
      if (letra === "I") chkI = chkI === "X" ? setchkI(" ") : setchkI("X");

      var xlista = "NNNNNNNNN";
      var newchk = xlista.split("");
      newchk[0] = chkA;
      newchk[1] = chkB;
      newchk[2] = chkC;
      newchk[3] = chkD;
      newchk[4] = chkE;
      newchk[5] = chkF;
      newchk[6] = chkG;
      newchk[7] = chkH;
      newchk[8] = chkI;
      let modifiedString = newchk.join("");
      console.log("modifiedString: ", modifiedString);
      // input.chkbox = modifiedString
      input.chkbox = modifiedString;
      if (input.id === 0) {
         input.fact = formattedDate;
      }

      if (onChange) {
         setOnChange(false);
      } else {
         setOnChange(true);
      }
   };

   // console.log('input.chkbox: ', modifiedString, input.chkbox,'chkA',chkA);

   function handlePerfil(e) {
      e.preventDefault();
      if (e.target.name === "perfil") {
         input.perfil = e.target.value;
      }
      if (e.target.name === "cliente") {
         input.cli_id = e.target.value;
         input.cliente = ""; // para que no quede undefined
      }
      if (onChange) {
         setOnChange(false);
      } else {
         setOnChange(true);
      }
   }

   const grabar = () => {
      var grabo = true;
      if (input.perfil === undefined) {
         grabo = false;
         alert("Debe grabar un perfil");
      }
      if (input.prioridad === undefined) {
         grabo = false;
         alert("Debe grabar la Prioridad");
      }
      if (input.evidencia === undefined) input.evidencia = "";
      if (input.evi_act === undefined) input.evi_act = "";
      if (input.apellido === undefined) input.apellido = "";
      if (input.nombre === undefined) input.nombre = "";
      if (input.cliente === undefined) input.cliente = "";
      if (input.razsoc === undefined) input.razsoc = "";
      if (input.porque1 === undefined) input.porque1 = "";
      if (input.porque2 === undefined) input.porque2 = "";
      if (input.porque3 === undefined) input.porque3 = "";
      if (input.porque4 === undefined) input.porque4 = "";
      if (input.porque5 === undefined) input.porque5 = "";
      if (input.analisis === undefined) input.analisis = "";
      if (input.actividad === undefined) input.actividad = "";
      if (input.conclusion === undefined) input.conclusion = "";

      console.log("input: ", input, grabo);

      if (grabo) {
         if (input.id === 0) {
            dispatch(AddTicket(input));
         } else {
            dispatch(UpdateTicket(input));
         }
      }
      // Solo se cierran en forma automatica los tickets hijos.
      if (input.conclusion !== "" && input.tck_linea !== 1) {
         dispatch(CloseTicket(input.id));
      }

      // window.location.href = "/ticket";
   };

   btnGrabar = true;

   // console.log('start: ','A ' + input.chkA,' B ' + input.chkB,' C ' + input.chkC);
   console.log("input: ", input);

   if (state.cli_id === 0 && state.tck_linea === 1) {
      cabecera = "Ticket Nuevo";
   }
   if (state.cli_id !== 0) {
      btnOcultoCli = true;
      updatable = "readonly";
      cabecera = `Modificacion Ticket : ${state.tck_id} - ${state.tck_linea}`;
   }

   if (input.tot_lineas > 1 || input.cierre !== "01/01/1900") {
      btnGrabar = false;
   }
   if (input.nextlinea - 1 > input.tck_linea) {
      updatableNewTck = "readonly";
      newTckTitle="No actualizable por no ser el ultimo ticket de la lista"
   }
   function handleChange(e) {
      e.preventDefault();
      if (e.target.name === "serie") input.serie = e.target.value;
      if (e.target.name === "tck_id") input.tck_id = e.target.value;
      if (e.target.name === "tck_linea") input.tck_linea = e.target.value;
      if (e.target.name === "analisis") input.analisis = e.target.value;
      if (e.target.name === "description") input.description = e.target.value;
      if (e.target.name === "evidencia") input.evidencia = e.target.value;
      if (e.target.name === "evi_act") input.evi_act = e.target.value;
      if (e.target.name === "detecta") input.detecta = e.target.value;
      if (e.target.name === "porque1") input.porque1 = e.target.value;
      if (e.target.name === "porque2") input.porque2 = e.target.value;
      if (e.target.name === "porque3") input.porque3 = e.target.value;
      if (e.target.name === "porque4") input.porque4 = e.target.value;
      if (e.target.name === "porque5") input.porque5 = e.target.value;
      if (e.target.name === "conclusion") input.conclusion = e.target.value;
      // if (e.target.name === 'chkbox') input.chkbox = e.target.value;
      if (e.target.name === "responsable") input.responsable = e.target.value;
      if (e.target.name === "cli_id") input.cli_id = e.target.value;
      if (e.target.name === "perfil") input.perfil = e.target.value;
      if (e.target.name === "prioridad") input.prioridad = e.target.value;
      if (e.target.name === "cod_status") input.cod_status = e.target.value;
      if (e.target.name === "actividad") input.actividad = e.target.value;
      if (e.target.name === "nombre") input.nombre = e.target.value;
      if (e.target.name === "apellido") input.apellido = e.target.value;
      if (e.target.name === "razsoc") input.razsoc = e.target.value;
      if (e.target.name === "fact") input.fact = e.target.value;
      if (e.target.name === "nvotck") input.nuevotck = e.target.value;
      if (onChange) {
         setOnChange(false);
      } else {
         setOnChange(true);
      }
      console.log("datos2: ", e.target.name, e.target.value, input.serie);
   }

   // console.log('input: ', input.id, input.serie,state.id);
   if (!input && state.id > 0) {
      return <div>Leyendo...</div>;
   } else {
      if (input.evidencia !== "" && input.evidencia !== undefined) {
         if (input.evidencia.indexOf(";") > 0) {
            xEvidencia = input.evidencia.split(";");
         } else {
            xEvidencia.push(input.evidencia);
         }
      }
      if (input.evi_act !== "" && input.evi_act !== undefined) {
         if (input.evi_act.indexOf(";") > 0) {
            xevi_act = input.evi_act.split(";");
         } else {
            xevi_act.push(input.evi_act);
         }
      }
      // setchkA(input.chkbox.substring(0,1));
      // setchkB(input.chkbox.substring(1,2));
      // setchkC(input.chkbox.substring(2,3));
      // setchkD(input.chkbox.substring(3,4));
      // setchkE(input.chkbox.substring(4,5));
      // setchkF(input.chkbox.substring(5,6));
      // setchkG(input.chkbox.substring(6,7));
      // setchkH(input.chkbox.substring(7,8));
      // setchkI(input.chkbox.substring(8,9));

      console.log("input form: ", input);
      // console.log('input: ', input);
      return (
         <>
            <Header />
            <div>
               <body className="c34">
                  <table className="c65">
                     <tr className="c52">
                        <td>{cabecera}</td>
                     </tr>
                  </table>

                  <ol className="c36 lst-kix_list_1-0 start" start="1">
                     <li className="c10 li-bullet-0">
                        <span className="c8">Datos generales del producto</span>
                     </li>
                  </ol>

                  <table className="c51">
                     <tr className="c35">
                        <td className="c48" colSpan="1" rowSpan="1">
                           <p className="c23">
                              <span className="c8">
                                 N&uacute;mero de serie:
                              </span>
                           </p>
                        </td>
                        <td className="c29" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <input
                              type="text"
                              id="serie"
                              name="serie"
                              value={input.serie}
                              onChange={handleChange}
                              placeholder="Numero de Serie del producto"
                              readOnly={updatable}
                           />
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                     </tr>
                     <tr className="c27">
                        <td className="c48" colSpan="1" rowSpan="1">
                           <p className="c23">
                              <span className="c8">
                                 Descripci&oacute;n del producto:
                              </span>
                           </p>
                        </td>
                        <td className="c29" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
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
                              readOnly={updatable}
                           />
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                     </tr>
                     <tr className="c28">
                        <td className="c48" colSpan="1" rowSpan="1">
                           <p className="c23">
                              <span className="c8">
                                 &iquest;D&oacute;nde se detecta?:
                              </span>
                           </p>
                        </td>
                        <td className="c29" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
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
                              readOnly={updatable}
                           />
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                     </tr>
                     <tr className="c28">
                        <td className="c48" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <p className="c23">
                              <span className="c8">
                                 &iquest;Qui&eacute;n detecta? (Nombre):
                              </span>
                           </p>
                        </td>
                        {btnOcultoCli === true ? (
                           <td>
                              {input.nombre +
                                 " " +
                                 input.apellido +
                                 " - " +
                                 input.razsoc}
                           </td>
                        ) : (
                           <td className="c29" colSpan="1" rowSpan="1">
                              <p className="c23 c13">
                                 <span className="c12"></span>
                              </p>
                              <select
                                 className="selWidth"
                                 name="cliente"
                                 id="cliente"
                                 onChange={(e) => handlePerfil(e)}
                                 value={input.cli_id}
                              >
                                 <option value="0">Seleccionar</option>
                                 {cliente.map((perf) => {
                                    var nombre =
                                       perf.nombre + " " + perf.apellido;
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
                              <p className="c23 c13">
                                 <span className="c12"></span>
                              </p>
                           </td>
                        )}
                     </tr>
                     <tr className="c28">
                        <td className="c59 c72" colSpan="1" rowSpan="1">
                           <p className="c23">
                              <span className="c8">
                                 Evidencia (1 o 2 fotograf&iacute;as)
                                 <br />
                                 (Direccion URL del Drive):
                              </span>
                           </p>
                        </td>
                        <td className="c29" colSpan="1" rowSpan="1">
                           {xEvidencia &&
                              xEvidencia.map((element, i) => {
                                 if (element !== "") {
                                    return (
                                       <a
                                          className="aText"
                                          href={element}
                                          target="_blank"
                                          rel="noreferrer"
                                       >
                                          Foto&nbsp;&nbsp;{i}&nbsp;
                                       </a>
                                    );
                                 } else {
                                    return null;
                                 }
                              })}
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
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
                  </table>
                  <p className="c2 c26">
                     <span className="c8"></span>
                  </p>
                  <ol className="c36 lst-kix_list_1-0" start="2">
                     <li className="c10 li-bullet-0">
                        <span className="c8">
                           An&aacute;lisis de la no conformidad
                        </span>
                     </li>
                  </ol>

                  <table className="c51">
                     <tr className="c35">
                        <td className="c16" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <p className="c7">
                              <span className="c8">1er Por qu&eacute;</span>
                           </p>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                        <td className="c33" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <textarea
                              id="porque1"
                              className="inputAncho"
                              name="porque1"
                              type="text"
                              defaultValue={input.porque1}
                              cols="70"
                              rows="2"
                              onChange={handleChange}
                              placeholder="Porque"
                              readOnly={updatable}
                           ></textarea>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                     </tr>
                     <tr className="c35">
                        <td className="c16" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <p className="c7">
                              <span className="c8">2do Por qu&eacute;</span>
                           </p>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                        <td className="c33" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <textarea
                              id="porque2"
                              name="porque2"
                              className="inputAncho"
                              type="text"
                              defaultValue={input.porque2}
                              cols="70"
                              rows="2"
                              onChange={handleChange}
                              placeholder="Porque"
                              readOnly={updatable}
                           ></textarea>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                     </tr>
                     <tr className="c35">
                        <td className="c16" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <p className="c7">
                              <span className="c8">3er Por qu&eacute;</span>
                           </p>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                        <td className="c33" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <textarea
                              id="porque3"
                              className="inputAncho"
                              name="porque3"
                              type="text"
                              defaultValue={input.porque3}
                              cols="70"
                              rows="2"
                              onChange={handleChange}
                              placeholder="Porque"
                              readOnly={updatable}
                           ></textarea>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                     </tr>
                     <tr className="c35">
                        <td className="c16" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <p className="c7">
                              <span className="c8">4to Por qu&eacute;</span>
                           </p>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                        <td className="c33" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <textarea
                              id="porque4"
                              className="inputAncho"
                              name="porque4"
                              type="text"
                              defaultValue={input.porque4}
                              cols="70"
                              rows="2"
                              onChange={handleChange}
                              placeholder="Porque"
                              readOnly={updatable}
                           ></textarea>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                     </tr>
                     <tr className="c35">
                        <td className="c16" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <p className="c7">
                              <span className="c8">5to Por qu&eacute;</span>
                           </p>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                        <td className="c33" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <textarea
                              id="porque5"
                              className="inputAncho"
                              name="porque5"
                              type="text"
                              defaultValue={input.porque5}
                              cols="70"
                              rows="2"
                              onChange={handleChange}
                              placeholder="Porque"
                              readOnly={updatable}
                           ></textarea>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                     </tr>
                     <tr className="c62">
                        <td className="c16" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <p className="c7">
                              <span className="c8">
                                 Conclusi&oacute;n del an&aacute;lisis
                              </span>
                           </p>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                        <td className="c33" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <textarea
                              id="analisis"
                              name="analisis"
                              className="inputAncho"
                              type="text"
                              defaultValue={input.analisis}
                              onChange={handleChange}
                              placeholder="Ingrese la conclusion del analisis"
                              readOnly={updatable}
                           ></textarea>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                     </tr>
                  </table>
                  <p className="c2 c26">
                     <span className="c8"></span>
                  </p>
                  <ol className="c36 lst-kix_list_1-0" start="3">
                     <li className="c10 li-bullet-0">
                        <span className="c8">
                           Tipo de incumplimiento del producto no conforme.
                        </span>
                     </li>
                  </ol>
                  <p className="c23">
                     <span className="c12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Procedimiento&nbsp;&nbsp;
                     </span>
                     <input
                        onClick={() => marcar("A")}
                        className={
                           "xinput " +
                           (input.chkbox.substring(0, 1) === "X"
                              ? "textok"
                              : "textnormal")
                        }
                        type="text"
                        id="chkA"
                        value={chkA}
                     />
                     <span className="c12">
                        &nbsp;&nbsp;&nbsp;&nbsp;Especificaciones de
                        calidad&nbsp;&nbsp;
                     </span>
                     <input
                        onClick={() => marcar("B")}
                        className={
                           "xinput " +
                           (input.chkbox.substring(1, 2) === "X"
                              ? "textok"
                              : "textnormal")
                        }
                        type="text"
                        id="chkB"
                        value={chkB}
                     />
                     <span className="c12">
                        &nbsp;&nbsp;&nbsp;&nbsp;Proveedores&nbsp;&nbsp;
                     </span>
                     <input
                        onClick={() => marcar("C")}
                        className={
                           "xinput " +
                           (input.chkbox.substring(2, 3) === "X"
                              ? "textok"
                              : "textnormal")
                        }
                        type="text"
                        id={chkC}
                        value={chkC}
                     />
                  </p>
                  <p className="c23 c13">
                     <span className="c12"></span>
                  </p>
                  <ol className="c36 lst-kix_list_1-0" start="4">
                     <li className="c10 li-bullet-0">
                        <span className="c8">
                           Responsable del producto no conforme.
                        </span>
                     </li>
                  </ol>
                  <p className="c23">
                     <span className="c12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Operaciones&nbsp;&nbsp;
                     </span>
                     <input
                        onClick={() => marcar("D")}
                        className={
                           "xinput " +
                           (input.chkbox.substring(3, 4) === "X"
                              ? "textok"
                              : "textnormal")
                        }
                        type="text"
                        id="chkD"
                        value={chkD}
                     />
                     <span className="c12">
                        &nbsp;&nbsp;&nbsp;&nbsp;Calidad&nbsp;&nbsp;
                     </span>
                     <input
                        onClick={() => marcar("E")}
                        className={
                           "xinput " +
                           (input.chkbox.substring(4, 5) === "X"
                              ? "textok"
                              : "textnormal")
                        }
                        type="text"
                        id="chkE"
                        value={chkE}
                     />
                     <span className="c12">
                        &nbsp;&nbsp;&nbsp;&nbsp;Administraci&oacute;n&nbsp;&nbsp;
                     </span>
                     <input
                        onClick={() => marcar("F")}
                        className={
                           "xinput " +
                           (input.chkbox.substring(5, 6) === "X"
                              ? "textok"
                              : "textnormal")
                        }
                        type="text"
                        id="chkF"
                        value={chkF}
                     />
                  </p>
                  <p className="c23">
                     <p className="c23 c13">
                        <span className="c12"></span>
                     </p>
                     <span className="c12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nombre:&nbsp;&nbsp;
                     </span>
                     <input
                        className="inputAncho2"
                        type="text"
                        id="responsable"
                        name="responsable"
                        defaultValue={input.responsable}
                        onChange={handleChange}
                        placeholder="Ingrese nombre del Responsable"
                        readOnly={updatable}
                     />
                     <p className="c23 c13">
                        <span className="c12"></span>
                     </p>
                  </p>
                  <ol className="c36 lst-kix_list_1-0" start="5">
                     <li className="c10 li-bullet-0">
                        <span className="c8">
                           Disposici&oacute;n del producto no conforme.
                        </span>
                     </li>
                  </ol>
                  <p className="c23">
                     <span className="c12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Liberaci&oacute;n&nbsp;&nbsp;
                     </span>
                     <input
                        onClick={() => marcar("G")}
                        className={
                           "xinput " +
                           (input.chkbox.substring(6, 7) === "X"
                              ? "textok"
                              : "textnormal")
                        }
                        type="text"
                        id="chkG"
                        value={chkG}
                     />
                     <span className="c12">
                        &nbsp;&nbsp;&nbsp;&nbsp;Destrucci&oacute;n&nbsp;&nbsp;
                     </span>
                     <input
                        onClick={() => marcar("H")}
                        className={
                           "xinput " +
                           (input.chkbox.substring(7, 8) === "X"
                              ? "textok"
                              : "textnormal")
                        }
                        type="text"
                        id="chkH"
                        value={chkH}
                     />
                     <span className="c12">
                        &nbsp;&nbsp;&nbsp;&nbsp;Retrabajo&nbsp;&nbsp;
                     </span>
                     <input
                        onClick={() => marcar("I")}
                        className={
                           "xinput " +
                           (input.chkbox.substring(8, 9) === "X"
                              ? "textok"
                              : "textnormal")
                        }
                        type="text"
                        id="chkI"
                        value={chkI}
                     />
                  </p>
                  <p className="c23 c13">
                     <span className="c12"></span>
                  </p>
                  <ol className="c36 lst-kix_list_1-0" start="6">
                     <li className="c10 li-bullet-0">
                        <span className="c8">Plan de acci&oacute;n.</span>
                     </li>
                  </ol>
                  <table className="c51">
                     <tr className="c60">
                        <td className="c50 c59" colSpan="2" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <p className="c9">
                              <span className="c8">Actividad</span>
                           </p>
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                        <td className="c18" colSpan="1" rowSpan="1">
                           <p className="c9">
                              <span className="c8">Fecha compromiso</span>
                           </p>
                        </td>
                     </tr>
                     <tr className="c60">
                        <td className="c50" colSpan="2" rowSpan="1">
                           <p className="c7 c13">
                              <span className="c12"></span>
                           </p>
                           <input
                              id="actividad"
                              name="actividad"
                              className="inputAncho2"
                              type="text"
                              defaultValue={input.actividad}
                              onChange={handleChange}
                              placeholder="Numero de actividad"
                              readOnly={updatable}
                           ></input>
                           <p className="c7 c13">
                              <span className="c12"></span>
                           </p>
                        </td>
                        <td className="c55" colSpan="1" rowSpan="1">
                           <p className="c7 c13">
                              <span className="c12"></span>
                           </p>
                           <input
                              id="fact"
                              name="fact"
                              type="date"
                              onChange={handleChange}
                              value={input.fact}
                              readOnly={updatable}
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
                                 if (element !== "") {
                                    return (
                                       <a
                                          className="aText"
                                          href={element}
                                          target="_blank"
                                          rel="noreferrer"
                                       >
                                          Foto&nbsp;&nbsp;{i}&nbsp;
                                       </a>
                                    );
                                 } else {
                                    return null;
                                 }
                              })}
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
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
                  </table>

                  <p className="c23 c1">
                     <span className="c12"></span>
                  </p>
                  <br />
                  <table className="c65">
                     <tr className="c52">
                        <td className="c8">&nbsp;&nbsp;&nbsp;Prioridad:</td>
                        <td>
                           <select
                              name="prioridad"
                              id="prioridad"
                              value={input.prioridad}
                              onChange={handleChange}
                              placeholder="Seleccione Prioridad"
                              readOnly={updatable}
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
                        <td className="c8">Perfil:</td>
                        <td>
                           <select
                              id="perfil"
                              name="perfil"
                              onChange={handleChange}
                              value={input.perfil}
                              readOnly={updatable}
                           >
                              <option value="0">Seleccionar</option>
                              {perfil.map((perf) => {
                                 return (
                                    <option
                                       value={perf.id_perfil}
                                       key={perf.id_perfil}
                                    >{`${perf.description}`}</option>
                                 );
                              })}
                           </select>
                        </td>
                     </tr>
                  </table>
                  {input.nuevotck !== "" ? (
                     <>
                        <p className="c23 c13">
                           <span className="c12"></span>
                        </p>
                        <ol className="c36 lst-kix_list_1-0" start="7">
                           <li className="c10 li-bullet-0">
                              <span className="c8">Datos Ticket Hijo</span>
                           </li>
                        </ol>

                        <table className="c51">
                           <tr className="c52">
                              <td className="c65 c59" colSpan="1" rowSpan="1">
                                 <p className="c23 c13">
                                    <span className="c12"></span>
                                 </p>
                                 <p className="c39">
                                    <span className="c8">
                                       Descripci&oacute;n
                                    </span>
                                 </p>
                              </td>
                           </tr>
                           <tr className="c74">
                              <td className="c65" colSpan="1" rowSpan="1">
                                 <p className="c23 c13">
                                    <span className="c12"></span>
                                 </p>
                                 <textarea
                                    type="text"
                                    id="nvotck"
                                    name="nvotck"
                                    cols="120"
                                    rows="5"
                                    className="txtarea"
                                    onChange={handleChange}
                                    defaultValue={input.nuevotck}
                                    readOnly={updatableNewTck}                                                                        
                                    title={newTckTitle}
                                 />
                              </td>
                           </tr>
                        </table>
                     </>
                  ) : null}

                  <p className="c23 c13">
                     <span className="c12"></span>
                  </p>
                  <ol className="c36 lst-kix_list_1-0" start="7">
                     <li className="c10 li-bullet-0">
                        <span className="c8">
                           Verificaci&oacute;n del cierre.
                        </span>
                     </li>
                  </ol>
                  <table className="c51">
                     <tr className="c52">
                        <td className="c65 c59" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
                           <p className="c39">
                              <span className="c8">Conclusi&oacute;n</span>
                           </p>
                        </td>
                     </tr>
                     <tr className="c74">
                        <td className="c65" colSpan="1" rowSpan="1">
                           <p className="c23 c13">
                              <span className="c12"></span>
                           </p>
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
                  </table>

                  <p className="c23 c13">
                     <span className="c12"></span>
                  </p>
                  <div>
                     {btnGrabar ? (
                        <button className="nibbotBtn" onClick={() => grabar()}>
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
               </body>
            </div>
         </>
      );
   }
}
export default ABMTicket;
