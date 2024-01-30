import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FcHome, FcOk, FcLeft,FcCancel } from "react-icons/fc";
import { Link } from "react-router-dom";

import { AddCliente, getCliente } from "../../../actions/cliente";
import { getTablaAll } from "../../../actions/tabla";
import { getStatus } from "../../../actions/status";
import { getDetailIva } from "../../../actions/tabla";
import { RunSqlPost } from "../../../actions/admin"


import Header from "../../Header";
import style from "../../../css/cliente.css";
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
  if (input.rfc_cod === "") {
    errors.rfc_cod = "Debe Ingresar codigo rfc";
  }

  return errors;
}

function ABMCliente() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const cliente = useSelector((state) => state.cliente)
  const status = useSelector((state) => state.status);
  const tabla = useSelector((state) => state.tabla);

  const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
  const [data, setData] = useState({
    sql1:""
 });   
  useEffect(() => {
    dispatch(getTablaAll());
    dispatch(getStatus());
    dispatch(getDetailIva(1));
    dispatch(getCliente(state.id));
  }, [dispatch, state.id]);

  const [input, setInput] = useState({
    id: state ? state.id : 0,
    razsoc: state ? state.razsoc : "",
    nombre: state ? state.nombre : "",
    apellido: state ? state.apellido : "",
    email: state ? state.email : "",
    movil: state ? state.movil : "",
    fijo: state ? state.fijo : "",
    rfc_cod: state ? state.rfc_cod : "",
    idioma: state ? state.idioma : 1,
    moneda: state ? state.moneda : 1,
    cod_cliente: state ? state.cod_cliente : 1,
    cod_status: state ? state.cod_status : 1,
  });

  const [errors, setErrors] = useState({});
  console.log("input: ", input);

  function cancelo(id){
    console.log('cancelo: ');
    setData(data.sql1=`update clientes set cod_status = 0 where  id = ${id}`)
    dispatch(RunSqlPost(data))
    window.location.href = "/cliente";
  }

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

  // function handleTipo(e) {
  //   console.log('e.target.value: ', e.target.name,e.target.value);
  //   e.preventDefault();
  //   if (e.target.name==="cod_cliente")   setInput(input.cod_cliente= e.target.value);
  //   if (e.target.name==="idioma")   setInput(input.idioma= e.target.value);
  //   if (e.target.name==="moneda")   setInput(input.moneda= e.target.value);
  //   if (e.target.name==="cod_status")   setInput(input.cod_status= e.target.value);
  //   setErrors(
  //     validate({
  //       ...input,
  //       [e.target.name]: e.target.value,
  //     })
  //     );
  //     console.log('handleTipo input: ', input);
  // }

  function handleStatus(e) {
    e.preventDefault();
    console.log('e.target.name: ', e.target.name,e.target.value);
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
    if (input.pais === ''){ return alert('Debe ingresar un Pais') }
    dispatch(AddCliente(input));
    //navigate("/cliente");
    window.location.href = "/cliente";
  };
  return (
    <>
      <Header />
      <div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)} className="form_style">
            <table>
            <tr >
              <td colSpan={2} className="tdCEnter">
              COMPLETE LOS SIGUIENTES CAMPOS:
              </td>
            </tr>
            {input.id !==0 ? (
              <tr>
                <td className="tdTitulo">Id: </td>
                <td className="tdSmall">
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={input.id}
                    onChange={handleChange}
                    placeholder="Ingrese ID del Cliente"
                    />
                  {errors.id && <p className="text-red-500">{errors.id}</p>}
                </td>
              </tr>
              ):null}

              <tr>
                <td className="tdTitulo">Razon Social: </td>
                <td >
                  <input
                    className="tdBig"
                    type="text"
                    id="razsoc"
                    name="razsoc"
                    value={input.razsoc}
                    onChange={handleChange}
                    placeholder="Ingrese Razon Social"
                  />
                  {errors.nombre && (
                    <p className="text-red-500">{errors.nombre}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td className="tdTitulo">Nombre: </td>
                <td >
                  <input
                    className="tdBig"
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={input.nombre}
                    onChange={handleChange}
                    placeholder="Ingrese Nombre"
                  />
                  {errors.nombre && (
                    <p className="text-red-500">{errors.nombre}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td className="tdTitulo">Apellido: </td>
                <td >
                  <input
                    className="tdBig"
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={input.apellido}
                    onChange={handleChange}
                    placeholder="Ingrese Nombre"
                  />
                  {errors.nombre && (
                    <p className="text-red-500">{errors.nombre}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td className="tdTitulo">Mail: </td>
                <td>
                  <input
                    className="tdBig"
                    type="text"
                    id="email"
                    cols="30"
                    rows="5"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    placeholder="Ingrese Mail"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td className="tdTitulo">Telefono Movil:</td>
                <td>
                  <input
                    className={style.facinput}
                    type="text"
                    id="movil"
                    name="movil"
                    value={input.movil}
                    onChange={handleChange}
                    placeholder="Ingrese Movil"
                  />
                  {errors.movil && (
                    <p className="text-red-500">{errors.movil}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td className="tdTitulo">Telefono Fijo:</td>
                <td>
                  <input
                    className={style.facinput}
                    type="text"
                    id="fijo"
                    name="fijo"
                    value={input.fijo}
                    onChange={handleChange}
                    placeholder="Ingrese Telefono Fijo"
                  />
                  {errors.fijo && <p className="text-red-500">{errors.fijo}</p>}
                </td>
              </tr>
              <tr>
                <td className="tdTitulo">Codigo RFC:</td>
                <td>
                  <input
                    className={style.facinput}
                    type="text"
                    id="rfc_cod"
                    name="rfc_cod"
                    value={input.rfc_cod}
                    onChange={handleChange}
                    placeholder="Ingrese codigo RFC"
                  />
                  {errors.rfc_cod && <p className="text-red-500">{errors.rfc_cod}</p>}
                </td>
              </tr>

              <tr>
                <td className="tdTitulo">Tipo de Cliente:</td>
                <td>
                  <select
                    className={style.facinput}
                    name="cod_cliente"
                    id="cod_cliente"
                    onChange={(e) => handleChange(e)}
                    value={input.cod_cliente}
                    placeholder="Seleccione el Tipo del Cliente"
                  >
                    <option value="0">Seleccionar</option>
                    {tabla &&
                      tabla.map((tabla) => {
                        if (tabla.id === 3 && tabla.cod !== 0) {
                          return (
                            <option
                              value={tabla.cod}
                              key={tabla.cod}
                            >{`${tabla.description}`}</option>
                          );
                        } else {
                          return null;
                        }
                      })}{" "}
                  </select>
                  {errors.tipocli && (
                    <p className="text-red-500">{errors.tipocli}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td className="tdTitulo">Idioma:</td>
                <td>
                  <select
                    className={style.facinput}
                    name="idioma"
                    id="idioma"
                    onChange={(e) => handleChange(e)}
                    value={input.idioma}
                    placeholder="Seleccione el Idioma"
                  >
                    <option value="0">Seleccionar</option>
                    {tabla &&
                      tabla.map((tabla) => {
                        if (tabla.id === 7 && tabla.cod !== 0) {
                          return (
                            <option
                              value={tabla.cod}
                              key={tabla.cod}
                            >{`${tabla.description}`}</option>
                          );
                        } else {
                          return null;
                        }
                      })}{" "}
                  </select>
                  {errors.idioma && (
                    <p className="text-red-500">{errors.idioma}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td className="tdTitulo">Moneda:</td>
                <td>
                  <select
                    className={style.facinput}
                    name="moneda"
                    id="moneda"
                    onChange={(e) => handleChange(e)}
                    value={input.moneda}
                    placeholder="Seleccione el moneda"
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
                  {errors.moneda && (
                    <p className="text-red-500">{errors.moneda}</p>
                  )}
                </td>
              </tr>

              <tr>
                <td  className="tdTitulo">Status:</td>
                <td>
                  <select
                    className={style.facinput}
                    name="cod_status"
                    id="cod_status"
                    onChange={(e) => handleStatus(e)}
                    value={input.cod_status}
                    placeholder="Seleccione el Status del Cliente"
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
                    })}{" "}
                  </select>
                  {errors.status && (
                    <p className="text-red-500">{errors.status}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td >
                <button className="botButton" type="submit">
                  {/* {state ? "GRABAR" : "AGREGAR"} */}
                  <FcOk
                    style={estilo}
                    onMouseEnter={({ target }) =>
                      (target.style.fontSize = "280%")
                    }
                    onMouseLeave={({ target }) =>
                      (target.style.fontSize = "200%")
                    }
                  />
                </button>
                &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                {input.id !==0 ? (
                <Link
                  to={"/direccion"}
                  className="dLink"
                  state={{
                    id: input.id,
                  }}
                >
                  {" "}
                  <FcHome
                    style={estilo}
                    onMouseEnter={({ target }) =>
                      (target.style.fontSize = "280%")
                    }
                    onMouseLeave={({ target }) =>
                      (target.style.fontSize = "200%")
                    }
                  />
                </Link>
                ) : null}
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                <FcLeft
                  style={estilo}
                  onMouseEnter={({ target }) =>
                  (target.style.fontSize = "280%")
                }
                  onMouseLeave={({ target }) =>
                  (target.style.fontSize = "200%")
                  }
                  onClick={() => {
                    navigate("/cliente");
                  }}
                />
                {input.id !==0 ? (
                  <FcCancel
                      style={estilo}
                      onMouseEnter={({ target }) =>
                        (target.style.fontSize = "280%")
                      }
                      onMouseLeave={({ target }) =>
                        (target.style.fontSize = "200%")
                      }
                      onClick={()=> cancelo(input.id)}
                  />
                ):null}
                  </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </>
  );
}

export default ABMCliente;
