//robin
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AddCompania, getCompania } from "../../../actions/compania";
import Header from "../../Header";
import "../../../css/all.css";
import "../../../css/formCompania.css";
// Acciones
//import { AccessCtrl } from '../../../actions/index'
import { getTablaAll } from "../../../actions/tabla";

import Cookies from "universal-cookie";

export function validate(input) {
   let errors = {};
   if (input.id === "") {
      errors.id = "Debe indicar Id!";
   }

   if (input.nombre === "") {
      errors.nombre = "Debe Ingresar un nombre ";
   }

   if (input.apellido === "") {
      errors.apellido = "Debe Ingresar una Descripcion";
   }
   if (input.razsoc === "") {
      errors.razsoc = "Debe Ingresar un Precio";
   }
   if (input.email === "") {
      errors.email = "Debe Ingresar un Dolar";
   }
   if (input.movil === "") {
      errors.movil = "Debe Ingresar un Orden";
   }
   return errors;
}

function ABMCompania() {
   const idProg = 3;
   const cookies = new Cookies();
   var btnGrabar = false;
   const location = useLocation();
   const { state } = location;

   const navigate = useNavigate();
   const dispatch = useDispatch();
   //const compania = useSelector((state) => state.compania)
   const tabla = useSelector((state) => state.tabla);

   // Accesos
   // const usuariomenu = useSelector((state) => state.usuariomenu);
   const [acceso, setAcceso] = useState("");

   if (acceso.substring(0, 1) === "A") {
      btnGrabar = true;
   }
   // Fin control Accesos
   useEffect(() => {
      dispatch(getTablaAll());
//dispatch(getCompania(state.id));
      setAcceso(cookies.get("acceso"));
   }, [dispatch, state.id]);

   const [input, setInput] = useState({
      id: state ? state.id : 0,
      nombre: state ? state.nombre : "",
      apellido: state ? state.apellido : "",
      razsoc: state ? state.razsoc : "",
      email: state ? state.email : "",
      movil: state ? state.movil : "",
      cod_status: state ? state.cod_status : "1",
      fijo: state ? state.fijo : "",
      rfc_cod: state ? state.rfc_cod : "",
   });

   const [errors, setErrors] = useState({});

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
   
   const handleSubmit = (e) => {
       e.preventDefault();
       console.log("input: ", input);
       dispatch(AddCompania(input));
       window.location.href = "/compania";
    };
    console.log('input: ', input);
   return (
      <>
         <Header />
         <div className="container">
            <div className="bg-white w-90">
               <form
                  onSubmit={(e) => handleSubmit(e)}
                  // className="form-style-Prod"
               >
                  <h1 className="justify-self-center">Datos de la Compania</h1>
                  <br />
                  <div>
                     {input.id !== 0 ? (
                        <div className="input-group mb-3">
                           <span class="input-group-text" id="basic-addon1">
                              ID:
                           </span>
                           <input
                              type="text"
                              id="id"
                              name="id"
                              value={input.id}
                              onChange={handleChange}
                              className="form-control"
                           />
                        </div>
                     ) : null}
                        <div className="input-group m-3">
                           <span className="input-group-text">Razon Social:</span>
                           <input
                              type="text"
                              id="razsoc"
                              name="razsoc"
                              value={input.razsoc}
                              onChange={handleChange}
                              className="form-control"
                           />
                        </div>

                     <div className="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">
                           Nombre:
                        </span>
                        <input
                           type="text"
                           id="nombre"
                           name="nombre"
                           value={input.nombre}
                           onChange={handleChange}
                           className="form-control"
                        />
                     </div>

                     <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                           Apellido:
                        </span>
                        <input
                           type="text"
                           id="apellido"
                           name="apellido"
                           value={input.apellido}
                           onChange={handleChange}
                           className="form_control"
                        />
                     </div>
                     <div className="d-flex p-1">
                        <div className="input-group m-3">
                           <span className="input-group-text">
                              Mail:
                           </span>
                           <label htmlFor="email"></label>
                           <input
                              type="text"
                              id="email"
                              name="email"
                              value={input.email}
                              onChange={handleChange}
                              className="form-control"
                           />
                        </div>
                     </div>
                     <div className="d-flex p-1">
                     <div className="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">
                           Fijo:
                        </span>
                        <input
                           type="text"
                           id="fijo"
                           name="fijo"
                           value={input.fijo}
                           onChange={handleChange}
                           className="form-control"
                           />
                     </div>
                           <div>
                           &nbsp;&nbsp;&nbsp;
                           </div>
                        <div className="input-group mb-3 w-40">
                           <span className="input-group-text">
                              Movil:
                           </span>
                           <input
                              type="text"
                              id="movil"
                              name="movil"
                              value={input.movil}
                              onChange={handleChange}
                              className="form-control"
                              />
                        </div>
                     </div>
                        <div className="input-group mb-3  w-40">
                           <span class="input-group-text" id="basic-addon1">
                              RFC_CODE:
                           </span>
                           <input
                              type="text"
                              id="rfc_cod"
                              name="rfc_cod"
                              value={input.rfc_cod}
                              onChange={handleChange}
                              className="form-control"
                           />
                        </div>

                     <div className="input-group mb-3 w-50">
                        <span className="input-group-text">Status:</span>
                        <select
                           name="cod_status"
                           id="cod_status"
                           onChange={(e) => handleChange(e)}
                           value={input.cod_status}
                           className="form-control"
                        >
                           <option value="0">Seleccionar</option>
                           {tabla &&
                              tabla.map((tabla) => {
                                 if (tabla.id === 13 && tabla.cod !== 0) {
                                    return (
                                       <option
                                          selected
                                          value={tabla.cod}
                                          key={tabla.cod}
                                       >{`${tabla.description}`}</option>
                                    );
                                 } else {
                                    return null;
                                 }
                              })}{" "}
                        </select>
                     </div>
                     <div>
                        {btnGrabar ? (
                           <button className="nibbotBtn" type="submit">
                              {state ? "GRABAR" : "AGREGAR"}
                           </button>
                        ) : null}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                           className="nibbotBtn"
                           onClick={() => {
                              navigate("/compania");
                           }}
                        >
                           VOLVER
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}

export default ABMCompania;
