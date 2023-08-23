import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FcHome, FcOk, FcLeft, FcBusinessman } from "react-icons/fc";
import { Link } from "react-router-dom";
import { getTicket } from "../../../actions/ticket";

import { RunSqlPost } from "../../../actions/admin";

import Header from "../../Header";
import style from "../../../css/cliente.css";
// Acciones

export function validate(input) {
   let errors = {};
   if (input.id === "") {
      errors.id = "Debe indicar Id!";
   }

   if (input.nombre === "") {
      errors.nombre = "Debe Ingresar un nombre ";
   }

   if (input.email === "") {
      errors.email = "Debe Ingresar un Mail";
   }
   if (input.movil === "") {
      errors.movil = "Debe Ingresar un telefono movil";
   }

   if (input.fijo === "") {
      errors.fijo = "Debe Ingresar telefono Fijo";
   }
   if (input.rfc_cod === "") {
      errors.rfc_cod = "Debe Ingresar codigo rfc";
   }

   return errors;
}
function ABMCliente() {
   const location = useLocation();
   const { state } = location;
   const navigate = useNavigate();
   const dispatch = useDispatch();
   //const cliente = useSelector((state) => state.cliente)
   const status = useSelector((state) => state.status);
   const ticket = useSelector((state) => state.ticket);

   const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
   const [data, setData] = useState({
      sql1: "",
   });

   const [input, setInput] = useState({
      facid: state ? state.facid : 0,
      description: "",
      alta: Date(),
      cierre:1900011,
      usr:'RM',
      cod_status:1,
   });

   const [errors, setErrors] = useState({});
   console.log("tabla: ", input);

   useEffect(() => {
      dispatch(getTicket(state.facid));
   }, [dispatch]);

   function createTicket(id) {
      if (id === 1) setInput(input.description="Mail Bienvenida")
      if (id === 2) setInput(input.description="Mail Curso Entrenamiento")
      console.log('input: ', input);
      alert(id);
   }

   function handleChange(e) {
      e.preventDefault();
      setInput({
         ...input,
         [e.target.name]: e.target.value,
      });
      setErrors(
         validate({
            ...input,
            [e.target.name]: e.target.value,
         })
      );
   }

   function handleTipo(e) {
      console.log("e.target.value: ", e.target.name, e.target.value);
      e.preventDefault();
      if (e.target.name === "cod_cliente")
         setInput((input.cod_cliente = e.target.value));
      if (e.target.name === "idioma") setInput((input.idioma = e.target.value));
      if (e.target.name === "moneda") setInput((input.moneda = e.target.value));
      if (e.target.name === "cod_status")
         setInput((input.cod_status = e.target.value));
      setErrors(
         validate({
            ...input,
            [e.target.name]: e.target.value,
         })
      );
      console.log("input: ", input);
   }

   function handleStatus(e) {
      e.preventDefault();
      setInput({
         ...input,
         cod_status: e.target.value,
      });
      setErrors(
         validate({
            ...input,
            [e.target.name]: e.target.value,
         })
      );
   }
   // function handlePerfil(e) {
   //   e.preventDefault();
   //   setInput({
   //     ...input,
   //     [e.target.name]: e.target.value.substring(4).trim(),
   //     cod_perfil: e.target.value,
   //   });
   //   setErrors(
   //     validate({
   //       ...input,
   //       [e.target.name]: e.target.value,
   //     })
   //   );
   // }
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("input", input);
      if (input.pais === "") {
         return alert("Debe ingresar un Pais");
      }
      //dispatch(AddCliente(input));
      //navigate("/cliente");
      // window.location.href = "/cliente";
   };
   console.log("ticket: ", ticket);
   return (
      <>
         <Header />
         <div>
            <div>
               <form>
                  <table>
                     <tbody>
                        <tr>
                           <td colSpan={3} className="tdCEnter">
                              COMPLET LOS SIGUIENTES CAMPOS:
                           </td>
                        </tr>
                        <tr>
                           <td className="tdTitulo">Razon Social: </td>
                           <td className="tdTitulo">{input.razsoc}</td>
                           <td className="tdTitulo"> </td>
                        </tr>
                        <tr>
                           <td className="tdTitulo">Factura: </td>
                           <td className="tdTitulo">{input.facid}</td>
                           <td className="tdTitulo"> </td>
                        </tr>
                        <tr>
                           <td className="tdTitulo">
                              <button
                                 className="nibbotBtn"
                                 onClick={() => {
                                    createTicket(1,state.facid);
                                 }}
                              >
                                 Bienvenida
                              </button>
                           </td>
                           <td className="tdTitulo">
                              <button
                                 className="nibbotBtn"
                                 onClick={() => {
                                    createTicket(2,state.facid);
                                 }}
                              >
                                 Curso de Entrenamiento
                              </button>
                           </td>
                           <td className="tdTitulo">
                              <button
                                 className="nibbotBtn"
                                 onClick={() => {
                                    createTicket(3,state.facid);
                                 }}
                              >
                                 Clasificacion
                              </button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <table className="styled-table">
                     <thead>
                        <tr>
                           <th>Fecha ALta</th>
                           <th>Descripcion</th>
                           <th>Usuario</th>
                           <th>Fecha Cierre</th>
                           <th>Opciones</th>
                        </tr>
                     </thead>
                     <tbody>
                        {ticket &&
                           ticket.map((data) => {
                              return (
                                 <tr key={data.id}>
                                    {/* <td>{data.id}</td> */}
                                    <td>{data.alta}</td>
                                    <td>{data.description}</td>
                                    <td>{data.usr}</td>
                                    <td>{data.cierre}</td>
                                    <td>
                                       <Link
                                          title="Datos"
                                          to={"/formticketAtc"}
                                          className="dLink"
                                          state={{
                                             facid: data.fac_id,
                                             razsoc: data.razsoc,
                                          }}
                                       >
                                          {" "}
                                          <FcBusinessman
                                             style={estilo}
                                             onMouseEnter={({ target }) =>
                                                (target.style.fontSize = "280%")
                                             }
                                             onMouseLeave={({ target }) =>
                                                (target.style.fontSize = "200%")
                                             }
                                          />
                                       </Link>
                                       &nbsp;&nbsp;
                                    </td>
                                 </tr>
                              );
                           })}
                     </tbody>
                  </table>
                  <table>
                     <tbody>
                        <tr>
                           <td className="tdTitulo">&nbsp;</td>
                           <td className="tdTitulo">
                              <button
                                 className="botButton"
                                 onClick={(e) => handleSubmit(e)}
                              >
                                 {/* {state ? "GRABAR" : "AGREGAR"} */}
                                 <FcOk
                                    style={estilo}
                                    onMouseEnter={({ target }) =>
                                       (target.style.fontSize = "280%")
                                    }
                                    onMouseLeave={({ target }) =>
                                       (target.style.fontSize = "200%")
                                    }
                                 />
                              </button>
                              &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                              <Link
                                 to={"/direccion"}
                                 className="dLink"
                                 state={{
                                    id: input.id,
                                 }}
                              >
                                 {" "}
                                 <FcHome
                                    style={estilo}
                                    onMouseEnter={({ target }) =>
                                       (target.style.fontSize = "280%")
                                    }
                                    onMouseLeave={({ target }) =>
                                       (target.style.fontSize = "200%")
                                    }
                                 />
                              </Link>
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                              <FcLeft
                                 style={estilo}
                                 onMouseEnter={({ target }) =>
                                    (target.style.fontSize = "280%")
                                 }
                                 onMouseLeave={({ target }) =>
                                    (target.style.fontSize = "200%")
                                 }
                                 onClick={() => {
                                    navigate("/ticket");
                                 }}
                              />
                           </td>
                           <td className="tdTitulo">&nbsp;</td>
                        </tr>
                     </tbody>
                  </table>
               </form>
            </div>
         </div>
      </>
   );
}

export default ABMCliente;
