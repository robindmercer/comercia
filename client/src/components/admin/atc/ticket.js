import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicket, CloseTicket } from "../../../actions/ticket";
import { getUsuariomenId } from "../../../actions/usuariomenu";
import { Link } from "react-router-dom";
import Header from "../../Header";
import {
   FcAbout,
   FcAddDatabase,
   FcDeleteRow,
   FcInternal,
   FcMultipleSmartphones,
} from "react-icons/fc";
import Cookies from "universal-cookie";
import "../../../css/all.css";
import TicketVer from "./TicketVer";


// import Modal from "../../components/modal"
const Tickets = () => {
   const cookies = new Cookies();
   const { ticket } = useSelector((state) => state);
   const dispatch = useDispatch();
   const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
   const [acceso, setAcceso] = useState("A");
   const id_usuario = cookies.get("usuario");
   const perfil = cookies.get("perfil");

   var fechaCierre = "";
   var bajaBtn = false 
   var detalle =""

   useEffect(() => {
      dispatch(getTicket());
      dispatch(getUsuariomenId(id_usuario));
      setAcceso(cookies.get("acceso"));
   }, [dispatch]);

   const [nombre, setName] = useState("");

   // cookies.remove('tckfac')
   // cookies.remove('tckraz')
   
   function handleInputChange(e) {
      if (e.key === "Enter") {
         dispatch(nombre);
         setName("");
      }
   }
   
   const handleClose = (id) => {
      dispatch(CloseTicket(id));
      window.location.href = "/TicketVer";
   };
   console.log('ticket: ', ticket);
   
   return (
      <>
         <Header />
         <div className="adminHeader  bg-white">
            <br />
            <div>
               <div className="divHeader">
                  <div>
                     <h2>Tickets</h2>
                  </div>
                  <div>
                     <Link
                        title="Datos"
                        to={"/ticketFormAlta"}
                        className="dLink"
                        state={{
                           id: 0,
                           tck_id: 1,
                           tck_linea: 1,
                           cli_id: 0,
                           cod_status: 1,
                           chkbox: "         ",
                           nuevotck: ''
                        }}
                     >
                        <FcAddDatabase
                           style={estilo}
                           title="Alta Ticket"
                           onMouseEnter={({ target }) =>
                              (target.style.fontSize = "280%")
                           }
                           onMouseLeave={({ target }) =>
                              (target.style.fontSize = "200%")
                           }
                        />
                     </Link>
                  </div>
               </div>
            </div>
            <table className="styled-table">
               <thead>
                  <tr>
                     {/* <th>Id</th> */}
                     <th>Numero Cliente</th>
                     <th>Razon Social</th>
                     <th>Tickets</th>
                     <th>Descripcion</th>
                     <th>Estado</th>
                     <th>Alta</th>
                     <th>Cierre</th>
                     <th>Area Responsable</th>
                     <th>Prioridad</th>
                     <th>Opciones</th>
                  </tr>
               </thead>
               <tbody>
                  {ticket &&
                     ticket.map((data) => {
                        fechaCierre = data.cierre;
                        if (data.tck_linea === 1 && 
                            parseInt(data.cerradas) + 1  === data.tot_lineas && 
                            data.conclusion !==''  ){
                           bajaBtn = true;
                        } else {
                           bajaBtn = false;
                        }

                        if (fechaCierre === "01/01/1900") {
                           fechaCierre = "- - - - -";
                        }
                        detalle = ""
                        if (data.cod_status === 2){
                           detalle = data.conclusion.substring(0, 40)
                        }

                        if (parseInt(perfil) === 1 || data.perfil===parseInt(perfil) || data.usr === id_usuario  ){
                           return (
                              <tr key={data.id}>
                                 <td>{data.cli_id}</td>
                                 <td>{data.razsoc}</td>
                                 <td>
                                    {data.id} / {data.tot_lineas}  - {data.cerradas}
                                 </td>
                                 <td title={detalle}>{ data.description.substring(0, 40)} </td>
                                 <td>{data.estado}</td>
                                 <td>{data.alta}</td>
                                 <td>{fechaCierre}</td>
                                 <td>{data.perfildes}</td>
                                 <td>{data.prioridaddes}</td>
                                 <td>
                                    <Link
                                       title="Datos"
                                       to={"/ticketForm"}
                                       className="dLink"
                                       state={{
                                          id: data.id,
                                          actividad: data.actividad,
                                          analisis: data.analisis,
                                          apellido: data.apellido,
                                          chkbox: data.chkbox,
                                          cierre: data.cierre,
                                          cli_id: data.cli_id,
                                          conclusion: data.conclusion,
                                          cod_status: data.cod_status,
                                          description: data.description,
                                          detecta: data.detecta,
                                          evi_act: data.evi_act,
                                          evidencia: data.evidencia,
                                          fact: data.fact,
                                          nombre: data.nombre,
                                          nuevotck: data.nuevotck,
                                          perfil: data.perfil,
                                          porque1: data.porque1,
                                          porque2: data.porque2,
                                          porque3: data.porque3,
                                          porque4: data.porque4,
                                          porque5: data.porque5,
                                          prioridad: data.prioridad,
                                          razsoc: data.razsoc,
                                          responsable: data.responsable,
                                          serie: data.serie,
                                          tck_id: data.tck_id,
                                          tck_linea: data.tck_linea,
                                          tot_lineas: data.tot_lineas,
                                       }}
                                    >
                                       {" "}
                                       <FcAddDatabase
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
                                    {fechaCierre === "- - - - -" ? (
                                       <>
                                          <FcDeleteRow
                                             style={estilo}
                                             title="Eliminar Ticket"
                                             onMouseEnter={({ target }) =>
                                                (target.style.fontSize = "280%")
                                             }
                                             onMouseLeave={({ target }) =>
                                                (target.style.fontSize = "200%")
                                             }
                                             // onClick={() => handleRemove(data.id)}
                                          />
                                          &nbsp;&nbsp;
                                          &nbsp;&nbsp;
                                          { bajaBtn ? (
                                          <FcInternal
                                             style={estilo}
                                             title="Cerrar Ticket"
                                             onMouseEnter={({ target }) =>
                                                (target.style.fontSize = "280%")
                                             }
                                             onMouseLeave={({ target }) =>
                                                (target.style.fontSize = "200%")
                                             }
                                             onClick={() => handleClose(data.id)}
                                             />
                                          ): null
                                       }
                                       </>
                                    ) : null}
                                    <Link
                                       title="Datos"
                                       to={"/ticketDet"}
                                       className="dLink"
                                       state={{
                                          id: data.id,
                                       }}
                                    >
                                       <FcMultipleSmartphones
                                          style={estilo}
                                          title="Ver Cadena"
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
                           );
                        } else {
                           return (null)
                        }

                     })}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default Tickets;
