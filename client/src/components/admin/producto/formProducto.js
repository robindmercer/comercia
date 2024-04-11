//robin
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AddProducto, getProducto } from "../../../actions/producto";
import Header from "../../Header";
import "../../../css/all.css";
import "../../../css/formProducto.css";
// Acciones
//import { AccessCtrl } from '../../../actions/index'
import { getTablaAll } from "../../../actions/tabla";

import Cookies from "universal-cookie";

export function validate(input) {
   let errors = {};
   if (input.id === "") {
      errors.id = "Debe indicar Id!";
   }

   if (input.name === "") {
      errors.name = "Debe Ingresar un nombre ";
   }

   if (input.description === "") {
      errors.description = "Debe Ingresar una Descripcion";
   }
   if (input.price === "") {
      errors.price = "Debe Ingresar un Precio";
   }
   if (input.dolar === "") {
      errors.dolar = "Debe Ingresar un Dolar";
   }
   if (input.orden === "") {
      errors.orden = "Debe Ingresar un Orden";
   }
   return errors;
}

function ABMProducto() {
   const idProg = 3;
   const cookies = new Cookies();
   var btnGrabar = false;
   const location = useLocation();
   const { state } = location;

   const navigate = useNavigate();
   const dispatch = useDispatch();
   //const producto = useSelector((state) => state.producto)
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
      dispatch(getProducto(state.id));
      setAcceso(cookies.get("acceso"));
   }, [dispatch, state.id]);

   const [input, setInput] = useState({
      id: state ? state.id : 0,
      name: state ? state.name : "",
      description: state ? state.description : "",
      price: state ? state.price : 0,
      dolar: state ? state.dolar : 0,
      orden: state ? state.orden : "A1",
      cod_status: state ? state.cod_status : "1",
      id_interno: state ? state.id_interno : "",
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
      dispatch(AddProducto(input));
      window.location.href = "/producto";
   };
   return (
      <>
         <Header />
         <div className="container">
            <div className="bg-white w-90">
               <form
                  onSubmit={(e) => handleSubmit(e)}
                  // className="form-style-Prod"
               >
                  <h1 className="justify-self-center">Datos del Producto</h1>
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
                        <div className="input-group mb-3">
                           <span class="input-group-text" id="basic-addon1">
                              Codigo de Producto:
                           </span>
                           <input
                              type="text"
                              id="id_interno"
                              name="id_interno"
                              value={input.id_interno}
                              onChange={handleChange}
                              className="form-control"
                           />
                        </div>

                     <div className="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">
                           Titulo:
                        </span>
                        <input
                           type="text"
                           id="name"
                           name="name"
                           value={input.name}
                           onChange={handleChange}
                           className="form-control"
                        />
                     </div>

                     <div className="input-group mb-3">
                        <span className="input-group-text">
                           Descripción de producto:
                        </span>
                        <textarea
                           type="text"
                           id="description"
                           cols="70"
                           rows="5"
                           name="description"
                           value={input.description}
                           onChange={handleChange}
                           className="form_control"
                        />
                     </div>
                     <div className="d-flex p-1">
                        <div className="input-group m-3">
                           <span className="input-group-text">Precio:</span>
                           <input
                              type="number"
                              id="price"
                              name="price"
                              value={input.price}
                              onChange={handleChange}
                              className="form-control"
                           />
                        </div>
                        <div className="input-group m-3">
                           <span className="input-group-text">
                              Precio Dolar:
                           </span>
                           <label htmlFor="dolar"></label>
                           <input
                              type="number"
                              id="dolar"
                              name="dolar"
                              value={input.dolar}
                              onChange={handleChange}
                              className="form-control"
                           />
                        </div>
                     </div>
                     <div className="input-group mb-3 w-50">
                        <span className="input-group-text">
                           Orden del Producto:
                        </span>
                        <input
                           type="text"
                           id="orden"
                           name="orden"
                           value={input.orden}
                           onChange={handleChange}
                           className="form-control"
                        />&nbsp;&nbsp;(Solo letras)
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
                        <h4>* Acuerdese de grabar la definicion en INGLES de este producto</h4>
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
                              navigate("/producto");
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

export default ABMProducto;
