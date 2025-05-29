import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AddCliente } from "../../../../src/actions/cliente";
import Cookies from "universal-cookie";

// Acciones
//import { AccessCtrl } from '../../../actions/index'
import { getTablaAll } from "../../../actions/tabla";
import { getCompania } from '../../../actions/compania'
import { AccessCtrl } from "../../../actions";
const EditForm2 = ({ theCliente }) => {
   console.log('theCliente: ', theCliente);
   const cookies = new Cookies();
   const compania = useSelector((state) => state.compania)
  const id_usuario = cookies.get("usuario");

   function validate(input) {
      let errors = {};
      if (input.id === "") {
         errors.id = "Debe indicar Id!";
      }

      if (input.razsoc === "") {
         errors.razsoc = "Debe Ingresar una razsoc";
      }
      return errors;
   }

   var btnGrabar = true;
   const location = useLocation();
   const { state } = location;
   const dispatch = useDispatch();
   const tabla = useSelector((state) => state.tabla);
   const { actlogin } = useSelector((state) => state);
   // const location = useLocation();
   // const { state } = location;
   
   //const clientes = useSelector((state) => state.clientes)

   // Accesos
   // const usuariomenu = useSelector((state) => state.usuariomenu);

   // Fin control Accesos
   useEffect(() => {
      dispatch(getTablaAll());
      dispatch(getCompania());
      dispatch(AccessCtrl(id_usuario));
   }, [dispatch]);

   const [input, setInput] = useState({
      id: theCliente ? theCliente.id: 0,
      cia_id: theCliente ?  theCliente.cia_id: 1,
      razsoc: theCliente ?  theCliente.razsoc: '',
      nombre: theCliente ?  theCliente.nombre: '',
      apellido: theCliente ?  theCliente.apellido: '',
      email: theCliente ?  theCliente.email: '',
      movil: theCliente ?  theCliente.movil: '',
      fijo: theCliente ?  theCliente.fijo: '',
      rfc_cod: theCliente ?  theCliente.rfc_cod: 0,
      idioma: theCliente ?  theCliente.idioma: 1,
      moneda: theCliente ?  theCliente.moneda: 1,
      cod_cliente: theCliente ?  theCliente.cod_cliente: 1,
      cod_status: theCliente ?  theCliente.cod_status: 1,
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
      if (actlogin[0].cia_id !== 1 ){
         input.cia_id = actlogin[0].cia_id
      }
      console.log("input: ", input);
      dispatch(AddCliente(input));
      // if (input.id === 0) {
      // } else {
      //   dispatch(UpdateClientes(input));
      // }
      // window.location.href = "/Cliente";
   };
   
   if (tabla) {
      if (tabla.length > 0 ) {
         input.idioma = 1
         input.moneda = 1
         input.cod_cliente = 1
         input.cod_status = 1
         console.log('entre');
      }
   }
   
   console.log('actlogin: ', actlogin);
   return (
      <>
         <div className="container">
            <div className="bg-white w-90">
               <form
                  onSubmit={(e) => handleSubmit(e)}
                  // className="form-style-Prod"
                  >
                  {/* <h1 className="justify-self-center">Datos del clientes</h1>
                  <br /> */}
                  <div>
                     {input.id !== 0 ? (
                        <div>
                           <span className="input-group-text">
                              Cliente id : {input.id}
                           </span>
                           <br />
                        </div>
                     ) : null}
                  </div>

                  <div className="input-group mb-3">
                     <span className="input-group-text">Razon Social </span>
                     <label htmlFor="razsoc"></label>
                     <input
                        type="text"
                        id="razsoc"
                        name="razsoc"
                        placeholder="Razon Social"
                        value={input.razsoc}
                        onChange={handleChange}
                        className="form-control"
                        required
                     />
                  </div>
                  <div className="input-group pt-2">
                     <span className="input-group-text">Nombre:</span>
                     <label htmlFor="nombre"></label>
                     <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={input.nombre}
                        onChange={handleChange}
                        className="form-control"
                     />
                  </div>
                  <div className="input-group pt-2">
                     <span className="input-group-text">Apellido:</span>
                     <label htmlFor="apellido"></label>
                     <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={input.apellido}
                        onChange={handleChange}
                        className="form-control"
                     />
                  </div>
                  <div className="input-group pt-2">
                     <span className="input-group-text">E-Mail:</span>
                     <label htmlFor="fijo"></label>
                     <input
                        type="text"
                        id="email"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                        className="form-control"
                     />
                  </div>
                  <div className="d-flex p-1 ">
                     <div className="input-group pt-2">
                        <span className="input-group-text">Tel.Movil:</span>
                        <input
                           type="text"
                           id="movil"
                           name="movil"
                           value={input.movil}
                           onChange={handleChange}
                           className="form-control"
                        />
                     </div>
                     <div className="input-group pt-2">
                        <span className="input-group-text">Tel. Fijo:</span>
                        <label htmlFor="fijo"></label>
                        <input
                           type="text"
                           id="fijo"
                           name="fijo"
                           value={input.fijo}
                           onChange={handleChange}
                           className="form-control"
                        />
                     </div>
                  </div>
                  <div className="d-flex p-1 ">
                     <div className="input-group pt-2">
                        <span className="input-group-text">Idioma:</span>
                        <label htmlFor="moneda"></label>
                        <select
                           name="idioma"
                           id="idioma"
                           onChange={(e) => handleChange(e)}
                           value={input.idioma}
                           className="form-control"
                        >
                           <option value="0">Seleccionar</option>
                           {tabla &&
                              tabla.map((tabla) => {
                                 if (tabla.id === 7 && tabla.cod !== 0) {
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
                     <div className="input-group pt-2">
                        <span className="input-group-text">Moneda:</span>
                        <label htmlFor="moneda"></label>
                        <select
                           name="moneda"
                           id="moneda"
                           onChange={(e) => handleChange(e)}
                           value={input.moneda}
                           className="form-control"
                        >
                           <option value="0">Seleccionar</option>
                           {tabla &&
                              tabla.map((tabla) => {
                                 if (tabla.id === 8 && tabla.cod !== 0) {
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
                  </div>
                  <div className="d-flex p-1 ">
                  <div className="input-group w-50 p-2">
                        <span className="input-group-text">Tipo de Cliente:</span>
                        <select
                           name="cod_cliente"
                           id="cod_cliente"
                           onChange={(e) => handleChange(e)}
                           value={input.cod_cliente}
                           className="form-control"
                        >
                           <option value="0">Seleccionar</option>
                           {tabla &&
                              tabla.map((tabla) => {
                                 if (tabla.id === 3 && tabla.cod !== 0) {
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
                     <div className="input-group w-50 p-2">
                        <span className="input-group-text">Codigo RFC:</span>
                        <input
                           type="text"
                           id="rfc_cod"
                           name="rfc_cod"
                           value={input.rfc_cod}
                           onChange={handleChange}
                           className="form-control"
                        />
                     </div>
                  </div>
                  { actlogin[0]?.cia_id === 1 ? (

                     <div className="input-group w-50 p-2">
                     <span className="input-group-text">Compania:</span>
                     <select
                        name="cia_id"
                        id="cia_id"
                        onChange={(e) => handleChange(e)}
                        value={input.cia_id}
                        className="form-control"
                     >
                        <option value="0">Seleccionar</option>
                        {compania &&
                           compania.map((cia) => {
                              // if (tabla.id === 13 && tabla.cod !== 0) {
                                 return (
                                    <option
                                       value={cia.id}
                                       key={cia.id}
                                       >{`${cia.razsoc}`}</option>
                                    );
                                    // } else {
                              //    return null;
                              // }
                           })}{" "}
                     </select>
                  </div>
                  ) : 
                     (null)
                  }

                  <div className="input-group w-50 p-2">
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
                          &nbsp;GRABAR&nbsp;
                        </button>
                     ) : null}
                  </div>
               </form>
            </div>
         </div>
      </>
   );
};

export default EditForm2;
