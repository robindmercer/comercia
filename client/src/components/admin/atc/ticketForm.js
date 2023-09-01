import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { FcHome, FcOk, FcLeft } from "react-icons/fc";
import { Link } from "react-router-dom";

import { AddTicket, UpdateTicket, getTicket } from "../../../actions/ticket";

import Header from "../../Header";
// Acciones

export function validate(input) {
   let errors = {};

   if (input.description === "") {
      errors.description = "Debe Ingresar una descripcion";
   }

   return errors;
}

function ABMTicket() {
   const cookies = new Cookies();
   const id_usuario = cookies.get("usuario");
   const location = useLocation();
   const { state } = location;
   const navigate = useNavigate();
   const dispatch = useDispatch();
   //const ticket = useSelector((state) => state.ticket)
   const status = useSelector((state) => state.status);
   const tabla = useSelector((state) => state.tabla);

   const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
   const [data, setData] = useState({
      sql1: "",
   });
   useEffect(() => {
      dispatch(getTicket(state.id));
   }, [dispatch, state.id]);

   const defaultMail = (id) => {
      if (id === 1) {
         setInput({ ...input, description: "Mail de Bienvenida" });
      }
      if (id === 2) {
         setInput({ ...input, description: "Curso de Entrenamiento" });
      }
      if (id === 3) {
         let clasificacion = window.prompt(
            "Ingrese la Clasificacion Obtenida (solo numeros enteros)"
         );
         setInput({ ...input, description: `Calificacion: ${clasificacion}` });
      }
   };

   const [input, setInput] = useState({
      id: state ? state.id : 0,
      fac_id: state ? state.fac_id : 0,
      description: state ? state.description : "",
      alta: new Date().toLocaleDateString("en-GB"),
      cierre: "19000101",
      usr: id_usuario,
      cod_status: 1,
   });

   const [errors, setErrors] = useState({});
   console.log("input: ", input);

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
      if (e.target.name === "description")
         setInput((input.description = e.target.value));
      setErrors(
         validate({
            ...input,
            [e.target.name]: e.target.value,
         })
      );
      console.log("handleTipo input: ", input);
   }

   function handleStatus(e) {
      e.preventDefault();
      console.log("e.target.name: ", e.target.name, e.target.value);
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
      if (input.id === 0) {
         dispatch(AddTicket(input));
         console.log('alta');
      } else {
         dispatch(UpdateTicket(input));
         console.log('modif');
      }
     window.location.href = '/TicketVer';
   };
   return (
      <>
         <Header />
         <div>
            <div>
               <form onSubmit={(e) => handleSubmit(e)} className="form_style">
                  <table>
                     <tbody>
                        <tr>
                           <td colSpan={2} className="tdCEnter">
                              COMPLETE LOS SIGUIENTES CAMPOS:
                           </td>
                        </tr>
                     <tr><td colSpan={2}>&nbsp;</td></tr>
                        <tr>
                           <td className="tdTitulo"><b>Descripcion: </b></td>
                           <td>
                              {/* <input
                                 className="tdBig"
                                 type="text"
                                 id="description"
                                 name="description"
                                 value={input.nombre}
                                 onChange={handleChange}
                                 placeholder="Ingrese Descripción"
                              /> */}
                           <textarea
                              type="text"
                              id="description"
                              cols="80"
                              rows="5"
                              name="description"
                              value={input.description}
                              placeholder="Ingrese datos del Ticket"
                              onChange={handleChange}
                              className="tdBig"
                           />


                              {errors.description && (
                                 <p className="text-red-500">
                                    {errors.description}
                                 </p>
                              )}
                           </td>
                        </tr>
                        </tbody>
                        </table>
                        <table>
                        <tbody>
                        <tr><td colSpan={4}>&nbsp;</td></tr>
                        <tr>
                           <td colSpan={1}>
                              <button
                                 className="nibbotBtn"
                                 onClick={() => {
                                    defaultMail(1);
                                 }}
                              >
                                 Mail
                              </button>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </td><td>
                              <button
                                 className="nibbotBtn"
                                 onClick={() => {
                                    defaultMail(2);
                                 }}
                              >
                                 Entrenamiento
                              </button>
                              </td><td>
                              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                              <button
                                 className="nibbotBtn"
                                 onClick={() => {
                                    defaultMail(3);
                                 }}
                                 >
                                 Clasificacion
                              </button>
                                 </td><td>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <button className="nibbotBtn" type="submit">Grabar                                 
                              </button>
                           </td>
                        </tr>
                        <tr><td colSpan={4}>&nbsp;</td></tr>
                        <tr>
                           <td>&nbsp;</td>
                           <td>
                              <Link
                                 title="Datos"
                                 to={"/ticketVer"}
                                 className="dLink"
                                 state={{
                                    fac_id: state.fac_id,
                                    razsoc: state.razsoc,
                                 }}
                              >
                                 <FcLeft
                                    style={estilo}
                                    onMouseEnter={({ target }) =>
                                       (target.style.fontSize = "280%")
                                    }
                                    onMouseLeave={({ target }) =>
                                       (target.style.fontSize = "200%")
                                    }
                                 />
                              </Link>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </form>
            </div>
         </div>
      </>
   );
}

export default ABMTicket;
