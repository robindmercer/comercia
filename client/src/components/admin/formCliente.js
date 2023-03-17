//robin
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { AddCliente, getCliente } from "../../actions/cliente";
import { getDetail } from '../../actions/tabla';
import { getStatus } from '../../actions/status';
import { FcHome, FcOk, FcLeft } from 'react-icons/fc'

import Header from '../Header';
import '../../css/all.css'
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
  if (input.rfc === "") {
    errors.rfc = "Debe Ingresar codigo rfc";
  }

  return errors;
}

function ABMCliente() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const cliente = useSelector((state) => state.cliente)
  const status = useSelector((state) => state.status)
  const tabla = useSelector((state) => state.tabla)

  const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };

  useEffect(() => {
    dispatch(getDetail(3));
    dispatch(getStatus());
    dispatch(getCliente(state.id));
  }, [dispatch, state.id]);

  const [input, setInput] = useState({
    id: state ? state.id : 0,
    nombre: state ? state.nombre : "",
    email: state ? state.email : "",
    movil: state ? state.movil : "",
    fijo: state ? state.fijo : "",
    rfc_cod: state ? state.rfc_cod : "",
    cod_cliente: state ? state.cod_cliente : "1",
    cod_status: state ? state.cod_status : "1",

  });

  const [errors, setErrors] = useState({});
  console.log('input: ', input);

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
    e.preventDefault();
    setInput({
      ...input,
      cod_cliente: e.target.value,
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
    console.log('input', input);
    dispatch(AddCliente(input));
    //navigate("/cliente");
    window.location.href = '/cliente';
  };
  return (
    <>
      <Header />
      <div >
        <div >
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="form-style-list"
          >
            <h1 className="justify-self-center">
              COMPLETE LOS SIGUIENTES CAMPOS:
            </h1>
            <ul>
              <li className='lblId'>
                <label
                  htmlFor="id"
                >
                  Id:{" "}
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={input.id}
                  onChange={handleChange}
                />
                <span>Ingrese ID del Cliente</span>
                {errors.id && <p className="text-red-500">{errors.id}</p>}

              </li>

              <li>
                <label
                  htmlFor="nombre"
                >
                  Razon Social:{" "}
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={input.nombre}
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
                  cols="30"
                  rows="5"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  className="txtarea"
                />
                <span>Ingrese Mail</span>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </li>
              <li className='lbl-w-50'>
                <label htmlFor="movil" >
                  Telefono Movil:
                </label>
                <input
                  type="text"
                  id="movil"
                  name="movil"
                  value={input.movil}
                  onChange={handleChange}
                />
                <span>Ingrese Movil</span>
                {errors.movil && (
                  <p className="text-red-500">{errors.movil}</p>
                )}
              </li>
              <li className='lbl-w-25'>
                <label htmlFor="fijo" >
                  Telefono Fijo:
                </label>
                <input
                  type="text"
                  id="fijo"
                  name="fijo"
                  value={input.fijo}
                  onChange={handleChange}
                />
                <span>Ingrese Fijo</span>
                {errors.fijo && (
                  <p className="text-red-500">{errors.fijo}</p>
                )}
              </li>
              <li className='lbl-w-50'>
                <label htmlFor="rfc" >
                  Codigo RFC:
                </label>
                <input
                  type="text"
                  id="rfc_cod"
                  name="rfc_cod"
                  value={input.rfc_cod}
                  onChange={handleChange}
                />
                <span>Ingrese codigo RFC</span>
                {errors.rfc && (
                  <p className="text-red-500">{errors.rfc}</p>
                )}
              </li>

              <li className='lbl-w-50'>
                <label
                  htmlFor="tipocli"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Tipo de Cliente:
                </label>
                <select
                  name="cod"
                  id="tipocli"
                  onChange={(e) => handleTipo(e)}
                  value={input.cod_cliente}
                >
                  <option value="0">Seleccionar</option>
                  {tabla && tabla.map((tabla) => {
                        return (
                          <option
                            selected
                            value={tabla.cod}
                            key={tabla.cod}
                          >{`${tabla.description}`}</option>
                        );
                  })}                </select>
                <span>Seleccione el Tipo del Cliente</span>
                {errors.tipocli && (
                  <p className="text-red-500">{errors.tipocli}</p>
                )}
              </li>


              <li className='lbl-w-50'>
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
                          selected
                            value={sts.id_status}
                            key={sts.id_status}
                          >{`${sts.description}`}</option>
                        );
                  })}                </select>
                <span>Seleccione el Status del Cliente</span>
                {errors.status && (
                  <p className="text-red-500">{errors.status}</p>
                )}
              </li>
              <li>
                <button className="botButton"
                  type="submit"
                >
                  {/* {state ? "GRABAR" : "AGREGAR"} */}
                <FcOk style={estilo}
                  onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                  onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
                </button>
                &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                <Link
                  to={'/direccion'}
                  className="dLink"
                  state={
                    {
                      id: input.id,
                    }
                  }
                > <FcHome style={estilo}
                  onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                  onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
                </Link>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                <FcLeft style={estilo}
                  onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                  onMouseLeave={({ target }) => target.style.fontSize = "200%"}
                  onClick={() => { navigate("/cliente"); }} />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </>
  );
}

export default ABMCliente;
