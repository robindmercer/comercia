//robin
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
// Acciones
import { UpdateCotizacionSts } from "../../actions/cotizacion";
import { AddLogs } from "../../actions/logs";
//css
import "../../css/all.css";
import style from "../../css/cambioestado.module.css";

function LogsDetail() {
   const [loading, setLoading] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();
   const { state } = location;
   const dispatch = useDispatch();
   const { logs } = useSelector((state) => state);
   const dollarUSLocale = Intl.NumberFormat("de-DE");
   const [input, setInput] = useState({
      usr_id: state ? state.usr_id : "",
      found: state ? state.found : {},
      observ: "",
   });
   const grabar = async (accion) => {
      setLoading(true);
      console.log("input: ", input);
      var control = "x";
      var newStatus = 0;
      var paramMail = 1;
      let observacion = input.observ;

      if (accion === "-") {
        const confirmado = window.confirm("¿Está seguro que desea cancelar la cotización?");
      if (!confirmado) {
         return;
      }
         newStatus = input.found.cod_status - 1;
         console.log("newStatus: ", newStatus);
         paramMail = 2;
         control = "N";
         if (!observacion || observacion === "") {
            observacion = "Cancelado por el usuario";
         }
      }
      if (accion === "+") {
         if (input.found.cod_status === 1) {
            if (
               input.found.fde !== input.found.de ||
               input.found.fen !== input.found.en ||
               input.found.fme !== input.found.me ||
               input.found.finter !== input.found.inter
            ) {
               control = "S";
               newStatus = 2; // Espera Aprobacion
               paramMail = 1;
            } else {
               control = "N";
               newStatus = 4; // Pendiente Admin
               paramMail = 3;
            }
         }
         if (input.found.cod_status === 2) {
            control = "N";
            newStatus = 3; // Aprobado Gerencia
            paramMail = 3;
         }
         // Gerencia no se controla
         //   if (acceso === "A1" && input.found.cod_status < 4) {
         //     control = "N";
         //     newStatus = 3; // Aprobado Gerencia
         //     paramMail = 2; // Administracion
         //   }
      }
      //   console.log("Log Data");
      //   console.log("usuario:", input.usr_id);
      //   console.log(
      //      "Cotizacion:",
      //      input.found.id,
      //      "Status",
      //      input.found.cod_status
      //   );
      //   console.log("Control:", control);
      //   console.log("newStatus: ", newStatus);
      //   console.log("paramMail: ", paramMail);

      var newLog = {
         doc_id: input.found.id,
         tipo_id: "COT",
         usr_id: input.usr_id,
         cod_status: newStatus,
         observ: observacion,
      };
      console.log("newLog: ", newLog);
      await dispatch(UpdateCotizacionSts(input.found.id, newStatus));
      await dispatch(AddLogs(newLog));
      setLoading(false);
      console.log("input: ", input);
      navigate("/cotizacion");
   };
   function handleChange(e) {
      e.preventDefault();
      setInput({
         ...input,
         [e.target.name]: e.target.value,
      });
   }
   return (
      <>
         <Header />
         <div className="divHeader">
            <div>
               <h2>Cambio estado </h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
         </div>
         <div className={style.container}>
            <div>
               <div>
                  <span className="input-group-text">
                     Cotización : &nbsp;<b>{input.found.id}</b>
                  </span>
                  <br />
               </div>
            </div>
            <div>
               <div>
                  <span className="input-group-text">
                     Nombre :&nbsp;<b>{input.found.nombre}</b>
                  </span>
                  <br />
               </div>
            </div>
            <div>
               <div>
                  <span className="input-group-text">
                     Total :&nbsp;
                     <b>$ {dollarUSLocale.format(input.found.total)}</b>
                  </span>
                  <br />
               </div>
            </div>
            <div className="d-flex p-1 ">
               <div className="input-group w-50 p-2 flex-grow-1">
                  <span className="input-group-text">Observaciones:</span>
                  <textarea
                     type="text"
                     id="observ"
                     name="observ"
                     rows="2"
                     value={input.observ}
                     onChange={handleChange}
                     className="form-control"
                  />
               </div>
            </div>
            <hr />
            <div>
               <button
                  className="nibbotBtn"
                  onClick={() => grabar("-")}
                  disabled={loading}
                  aria-busy={loading}
               >
                  &nbsp;CANCELAR&nbsp;
               </button>
               &nbsp;&nbsp;&nbsp;
               <button
                  className="nibbotBtn"
                  onClick={() => navigate("/cotizacion")}
               >
                  &nbsp;Volver&nbsp;
               </button>
               &nbsp;&nbsp;&nbsp;
               <button
                  className="nibbotBtn"
                  onClick={() => grabar("+")}
                  disabled={loading}
                  aria-busy={loading}
               >
                  &nbsp;GRABAR&nbsp;
               </button>
            </div>
         </div>
      </>
   );
}

export default LogsDetail;
