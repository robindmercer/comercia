import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketRepCli, getTicket } from "../../../actions/ticket";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import Header from "../../Header";
import { FcPrint } from "react-icons/fc";
import Cookies from "universal-cookie";
import style from "../../../css/repCli.module.css";
import TicketVer from "./TicketVer";

// import Modal from "../../components/modal"
const RepTicketDet = () => {
   const location = useLocation();
   const { state } = location;
   const { ticket } = useSelector((state) => state);
   const dispatch = useDispatch();
   var facAnt = "";
   var fechaCierre = "";
   useEffect(() => {
      dispatch(getTicketRepCli(state.cli_id));
   }, []);

   const [nombre, setName] = useState("");
   if (ticket.length > 0) {
      console.log("ticket", state.cli_id, ticket);
      return (
         <>
            <Header />
            <div className={style.header}>
               <div>
                  <h1>Reporte Tickets</h1>
               </div>

               <div className={style.divReporte}>
                  <div className={style.divDatos}>
                     <div>
                        <h2>&nbsp;&nbsp;Datos del Cliente</h2>
                     </div>
                     <div className={style.divHeader}>
                        <div className={style.divTitle300}>
                           Datos de facturación
                        </div>
                        <div className={style.divTitle300}>
                           Datos de contacto
                        </div>
                        <div className={style.divTitle300}>
                           Fecha de creación del cliente
                        </div>
                        <div className={style.divTitle80}>
                           Numero de cliente
                        </div>
                        <div className={style.divTitle80}>
                           Nombre y apellido
                        </div>
                     </div>
                     <div className={style.divDetail}>
                        <div className={style.divmid80}>
                           <b>{ticket[0].razsoc}</b>
                           <br />
                           <b>{ticket[0].calle}</b>
                           <br />
                           <b>{ticket[0].localidad}</b>
                           <br />
                        </div>
                        <div className={style.divmid80}>
                           Email:<b>{ticket[0].email}</b>
                           <br />
                           Fijo:<b>{ticket[0].fijo}</b>
                           <br />
                           Movil:<b>{ticket[0].Movil}</b>
                           <br />
                        </div>
                        <div className={style.divmid80}>
                           <b>{ticket[0].fecha}</b>
                        </div>
                        <div className={style.divmid80}>
                           <b>{state.cli_id}</b>
                        </div>
                        <div className={style.divmid80}>
                           <b>
                              {ticket[0].nombre} {ticket[0].apellido}
                           </b>
                        </div>
                     </div>
                  </div>
               </div>
               <br />
               <div>
                  <div className={style.divDatos}>
                     <div>
                        <h2>&nbsp;&nbsp;Datos de operaciones</h2>
                     </div>
                     <div className={style.divHeader}>
                        <div className={style.divTitle80}>Número OC</div>
                        <div className={style.divTitle80}>Estado OC</div>
                        <div className={style.divTitle100}>
                           Fecha creación de OC
                        </div>
                        <div className={style.divTitle100}>
                           Número de Grantía de OC
                        </div>
                        <div className={style.divTitle100}>
                           Guia DHL / Otros
                        </div>
                     </div>
                     {ticket &&
                        ticket.map((data) => {
                           if (facAnt !== data.fac && data.fac !== 0) {
                              facAnt = data.fac;
                              return (
                                 <>
                                    <div className={style.divDetail}>
                                       <div className={style.divmid80}>
                                          {data.fac}
                                       </div>
                                       <div className={style.divmid80}>
                                          {data.facdes}
                                       </div>
                                       <div className={style.divmid100}>
                                          {data.fecha}
                                       </div>
                                       <div className={style.divmid100}>
                                          65487
                                       </div>
                                       <div className={style.divmid100}>
                                          N/A
                                       </div>
                                    </div>
                                 </>
                              );
                           } else {
                              return null;
                           }
                        })}
                  </div>
               </div>
               <br />
               <div className={style.divDatos}>
                  <div>
                     <h2>&nbsp;&nbsp;Datos de Tickets</h2>
                  </div>
                  <div className={style.divHeader}>
                     <div className={style.divTitle80}>Numero de Ticket</div>
                     <div className={style.divTitle80}>Fecha Alta</div>
                     <div className={style.divTitle80}>Fecha Cierre</div>
                     <div className={style.divTitle80}>Estado del Ticket</div>
                     <div className={style.divTitle100}>Descripcion</div>
                     <div className={style.divTitle100}>Area responsable</div>
                  </div>
                  {ticket &&
                     ticket.map((data) => {
                        fechaCierre = data.cierre;
                        if (fechaCierre === "01/01/1900") {
                           fechaCierre = "- - - - -";
                        }                        
                           return (
                              <>
                                 <div className={style.divDetail}>
                                    <div className={style.divmid80}>{data.tck_id}-{data.tck_linea}</div>
                                    <div className={style.divmid80}>{data.alta}</div>
                                    <div className={style.divmid80}>{fechaCierre}</div>
                                    <div className={style.divmid80}>{data.tickdes}</div>
                                    <div className={style.divmid100}>{data.description}</div>
                                    <div className={style.divmid100}>{data.pdes}</div>
                                 </div>
                              </>
                           );
                        })}                    
               </div>
            </div>
         </>
      );
   } else {
      return <div>Cargando...</div>;
   }
};

export default RepTicketDet;
