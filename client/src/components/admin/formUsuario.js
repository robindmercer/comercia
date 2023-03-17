// eslint-disable-next-line array-callback-return
//robin
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { AddUsuario } from "../../actions/usuario";
//import Header from '../Header';
import '../../css/all.css'
import '../../css/formUsuario.css'
// Acciones
import { AccessCtrl } from '../../actions/index'
import { getPerfil } from '../../actions/perfil';
import { getStatus } from '../../actions/status';

export function validate(input) {
  let errors = {};
  if (input.usr_id === "") {
    errors.usr_id = "Debe indicar Id!";
  }

  if (input.name === "") {
    errors.name = "Debe Ingresar un nombre ";
  }

  if (input.email === "") {
    errors.email = "Debe Ingresar un Mail";
  }
  if (input.password === "") {
    errors.password = "Debe Ingresar una Clave";
  }
  return errors;
}

function ABMUsuario() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
 // const actlogin = useSelector((state) => state.actlogin)
  const perfil = useSelector((state) => state.perfil)
  const status = useSelector((state) => state.status)

  useEffect(() => {
    dispatch(getPerfil());
    dispatch(getStatus());
    dispatch(AccessCtrl(state.id));
  }, [dispatch, state.id]);

  const [input, setInput] = useState({
    id : state  ? state.id: 0,
    usr_id: state ? state.usr_id : "nada",
    name: state ? state.name : "",
    email: state ? state.email : "",
    password: state ? state.password :"",
    cod_perfil: state ? state.cod_perfil : "1",
    cod_status: state ? state.cod_status : "1",

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
      [e.target.name]: e.target.value.substring(4).trim(),
      cod_status: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handlePerfil(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value.substring(4).trim(),
      cod_perfil: e.target.value,
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
    console.log('input',input);
    dispatch(AddUsuario(input));
    window.location.href = '/usuarios';
  };

  console.log('input: ', input);

  return (
    <>
      
      <div >
        <div >
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="form-style-7"
          >
            <h1 className="justify-self-center">
              COMPLETE LOS SIGUIENTES CAMPOS:
            </h1>
            <br />
            <ul>
              <li>
                <label
                  htmlFor="usr_id"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Id:{" "}
                </label>
                <input
                  type="text"
                  id="usr_id"
                  name="usr_id"
                  value={input.usr_id}
                  onChange={handleChange}
                />
                <span>Ingrese ID del Usuario en caso de un ALTA de usuario asegurese que el id ingresado NO exista.</span>
                {errors.usr_id && <p className="text-red-500">{errors.usr_id}</p>}

              </li>

              <li>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nombre:{" "}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                />
                <span>Ingrese Nombre</span>
                {errors.nombre && <p className="text-red-500">{errors.nombre}</p>}
              </li>

              <li>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Mail:{" "}
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                />
                <span>Ingrese Mail</span>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </li>
              <li>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Clave de Acceso:{" "}
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                />
                <span>Ingrese clave de acceso</span>
                {errors.pass && <p className="text-red-500">{errors.pass}</p>}
              </li>              
              <li>
                <label
                  htmlFor="perfil"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Perfil:
                </label>
                <select
                  name="perfil"
                  id="perfil"
                  onChange={(e) => handlePerfil(e)}
                  value={input.cod_perfil}
                >
                  <option value="0">Seleccionar</option>
                  {perfil.map((perf) => {
                    return (
                          <option
                            value={perf.id_perfil}
                            key={perf.id_perfil}
                          >{`${perf.description}`}</option>                   
                          )
                  })}
                </select>
                <span>Seleccione un perfil</span>
                {errors.perfil && (
                  <p className="text-red-500">{errors.perfil}</p>
                )}
              </li>
              <li>
                <label
                  htmlFor="status"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Status:
                </label>
                <select 
                  name="status"
                  id="status"
                  onChange={(e) => handleStatus(e)}
                  value={input.cod_status}
                >
                  <option value="0">Seleccionar</option>
                  {status.map((sts) => {
                    return (
                          <option
                            value={sts.id_status}
                            key={sts.id_status}
                          >{`${sts.description}`}</option>
                           )                   
                  })}                </select>
                <span>Seleccione el Status del Usuario</span>
                {errors.status && (
                  <p className="text-red-500">{errors.status}</p>
                )}
              </li>
              <li>
                <button  className="nibbotBtn" 
                  type="submit"
                >
                  {state ? "GRABAR" : "AGREGAR"}
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="nibbotBtn" onClick={() => {navigate("/usuarios"); }}
                >
                  VOLVER
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </>
  );
}

export default ABMUsuario;
