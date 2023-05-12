//robin
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { getTabla, UpdateTabla } from "../../../actions/tabla";
import Header from '../../Header';
import '../../../css/all.css'

// Acciones
import { getStatus } from '../../../actions/status';

export function validate(input) {
  let errors = {};
  if (input.id === "") {
    errors.id = "Debe indicar Id!";
  }

  if (input.cod === "") {
    errors.cod = "Debe Ingresar un codigo";
  }

  if (input.description === "") {
    errors.description = "Debe Ingresar una Descripción";
  }

  if (input.control !== "N" && input.control !== "S") {
    errors.cod = "Codigo de control Debe ser S o N";
  }

  if (input.valor === "") {
    errors.valor = "Debe Ingresar un Valor";
  }

  return errors;
}

function ABMTabla() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status)

  useEffect(() => {
    dispatch(getStatus());
    dispatch(getTabla(state.id));
  }, [dispatch, state.id]);

  const [input, setInput] = useState({
    id : state  ? state.id: 0,
    cod: state ? state.cod : 0,
    description: state ? state.description : "",
    control: state ? state.control : "N",
    valor: state ? state.valor  : 0,
    cod_status: state ? state.cod_status : 1,
  });

  console.log('input: ', input);


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

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('input',input);
      dispatch(UpdateTabla(input));
      navigate("/tablas");
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
            <br />
            <ul>
              <li className="lbl-w-25">
                <label
                  htmlFor="id"
                >
                  Id:{" "}
                </label>
                <input
                  type="number"
                  id="id"
                  name="id"
                  value={input.id}
                  onChange={handleChange}
                />
                <span>Ingrese ID del Tabla</span>
                {errors.id && <p className="text-red-500">{errors.id}</p>}

              </li>
              <li  className="lbl-w-25">
                <label
                  htmlFor="cod"
                >
                  Codigo:{" "}
                </label>
                <input
                  type="number"
                  id="cod"
                  name="cod"
                  value={input.cod}
                  onChange={handleChange}
                />
                <span>Ingrese Codigo del Tabla</span>
                {errors.cod && <p className="text-red-500">{errors.cod}</p>}

              </li>
              <li>
                <label
                  htmlFor="description"
                >
                  Descripción:{" "}
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                />
                <span>Ingrese Descripción</span>
                {errors.description && <p className="text-red-500">{errors.description}</p>}
              </li>
              <li  className="lbl-w-25" >
                <label
                  htmlFor="control"
                >
                  Control:{" "}
                </label>
                <input
                  type="text"
                  id="control"
                  name="control"
                  value={input.control}
                  onChange={handleChange}
                />
                <span>Controlable (S/N)</span>
                {errors.control && <p className="text-red-500">{errors.control}</p>}
              </li>
              <li  className="lbl-w-25">
                <label
                  htmlFor="valor"
                >
                  Valor:{" "}
                </label>
                <input
                  type="number"
                  id="valor"
                  name="valor"
                  value={input.valor}
                  onChange={handleChange}
                />
                <span>Ingrese valor</span>
                {errors.valor && <p className="text-red-500">{errors.valor}</p>}
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
                            selected
                            value={sts.id_status}
                            key={sts.id_status}
                          >{`${sts.description}`}</option>
                        );
                  })}                </select>
                <span>Seleccione el Status del Tabla</span>
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
                <button className="nibbotBtn" onClick={() => {navigate("/tablas"); }}
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

export default ABMTabla;
