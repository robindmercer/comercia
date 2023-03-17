//robin
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { AddProducto, getProducto } from "../../actions/producto";
import Header from '../Header';
import '../../css/all.css'
import '../../css/formProducto.css'
// Acciones
//import { AccessCtrl } from '../../actions/index'
import { getStatus } from '../../actions/status';

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

  return errors;
}

function ABMProducto() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const producto = useSelector((state) => state.producto)
  const status = useSelector((state) => state.status)

  useEffect(() => {
    dispatch(getStatus());
    dispatch(getProducto(state.id));
  }, [dispatch, state.id]);

  const [input, setInput] = useState({
    id: state ? state.id : 0,
    name: state ? state.name : "",
    description: state ? state.description : "",
    price: state ? state.price : 0,
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
    dispatch(AddProducto(input));
    window.location.href = '/producto';
  };
  return (
    <>
      <Header />
      <div >
        <div >
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="form-style-Prod"
          >
            <h1 className="justify-self-center">
              Datos del Producto
            </h1>
            <br />
            <ul>
              <li  className='lblId'>
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
                <span>Ingrese ID del Producto</span>
                {errors.id && <p className="text-red-500">{errors.id}</p>}

              </li>

              <li>
                <label
                  htmlFor="name"
                >
                  Titulo:{" "}
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
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Descripción de producto:{" "}
                </label>
                <textarea
                  type="text"
                  id="description"
                  cols="30"
                  rows="5"
                  name="description"
                  value={input.description}
                  onChange={handleChange} 
                  className="txtarea"
                />
                <span>Ingrese Descripción</span>
                {errors.description && <p className="text-red-500">{errors.description}</p>}
              </li>
              <li className='lbl-w-50'>
                <label htmlFor="precio" >
                  Precio:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={input.price}
                  onChange={handleChange}
                />
                <span>Ingrese Precio</span>
                {errors.price && (
                  <p className="text-red-500">{errors.price}</p>
                )}
              </li>
              <li  className='lbl-w-50'>
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
                  {status.map((sts, index) => {
                        return (
                          <option
                            selected
                            value={sts.id_status}
                            key={index}
                          >{`${sts.description}`}</option>
                        )
                  })}                </select>
                <span>Seleccione el Status del Producto</span>
                {errors.status && (
                  <p className="text-red-500">{errors.status}</p>
                )}
              </li>
              <li>
                <button
                  className="nibbotBtn"
                  type="submit"
                >
                  {state ? "GRABAR" : "AGREGAR"}
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="nibbotBtn" onClick={() => {navigate("/producto"); }}
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

export default ABMProducto;
