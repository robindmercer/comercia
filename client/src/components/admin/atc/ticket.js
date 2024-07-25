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
const Cliente = () => {
   const cookies = new Cookies();
   const { ticket } = useSelector((state) => state);
   const dispatch = useDispatch();
   const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
   const [acceso, setAcceso] = useState("A");
   const id_usuario = cookies.get("usuario");
   const perfil = cookies.get("perfil");
   var fechaCierre = "";
   // const usuariomenu = useSelector((state) => state.usuariomenu);
   // const { porciva } = useSelector((state) => state);
   // const idProg = 6; // es el nivel
   // const [openModal, SetOpenModal]=useState(false);

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
                     <th>Numero Ticket</th>
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
                        if (fechaCierre === "01/01/1900") {
                           fechaCierre = "- - - - -";
                        }

                        return (
                           <tr key={data.id}>
                              <td>{data.cli_id}</td>
                              <td>{data.razsoc}</td>
                              <td>
                                 {data.id} / {data.totlineas}
                              </td>
                              <td>{data.description.substring(0, 40)}</td>
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
                                       tck_id: data.tck_id,
                                       tck_linea: data.tck_linea,
                                       nombre: data.nombre,
                                       apellido: data.apellido,
                                       razsoc: data.razsoc,
                                       serie: data.serie,
                                       analisis: data.analisis,
                                       description: data.description,
                                       evidencia: data.evidencia,
                                       evi_act: data.evi_act,
                                       detecta: data.detecta,
                                       porque1: data.porque1,
                                       porque2: data.porque2,
                                       porque3: data.porque3,
                                       porque4: data.porque4,
                                       porque5: data.porque5,
                                       conclusion: data.conclusion,
                                       chkbox: data.chkbox,
                                       responsable: data.responsable,
                                       cli_id: data.cli_id,
                                       perfil: data.perfil,
                                       prioridad: data.prioridad,
                                       cod_status: data.cod_status,
                                       actividad: data.actividad,
                                       fact: data.fact,
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
                                       />{" "}
                                       &nbsp;&nbsp;
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
                     })}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default Cliente;
