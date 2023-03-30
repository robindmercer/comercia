//robin
import React, { useState, useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { getMateriaprima, UpdateMateriaprima } from "../../actions/materiaprima";
import Header from '../Header';
import '../../css/all.css'

// Acciones
import { getStatus } from '../../actions/status';

export function validate(input) {
  let errors = {};

  if (input.cod === "") {
    errors.cod = "Debe Ingresar un codigo";
  }

  if (input.description === "") {
    errors.description = "Debe Ingresar una Descripción";
  }
  if (input.udm === "") {
    errors.udm = "Debe Ingresar un Valor";
  }
  if (input.stock === "") {
    errors.stock = "Debe Ingresar un Stock";
  }
  if (input.stockmin === "") {
    errors.stockmin = "Debe Ingresar un Stock Minimo";
  }

  return errors;
}

function ABMMateriaprima() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const status = useSelector((state) => state.status)

  useEffect(() => {
    dispatch(getStatus());
    dispatch(getMateriaprima(state.id));
  }, [dispatch, state.id]);

  const [input, setInput] = useState({
    name: state ? state.name : '',
    description: state ? state.description : "",
    udm: state ? state.udm : 0,
    stock: state ? state.stock:0,
    stockmin: state ? state.stockmin:0
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


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('input', input);
    dispatch(UpdateMateriaprima(input));
    navigate("/materiaprima");
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
                  htmlFor="name"
                >
                  Codigo:{" "}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                />
                <span>Ingrese Codigo de la Materia Prima</span>
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

              <li className="lbl-w-25">
                <label
                  htmlFor="udm"
                >
                  Unidad de Medida:{" "}
                </label>
                <input
                  type="text"
                  id="udm"
                  name="udm"
                  value={input.udm}
                  onChange={handleChange}
                />
                <span>Ingrese Unidad de Medida</span>
                {errors.udm && <p className="text-red-500">{errors.udm}</p>}
              </li>
              <li>
                <label
                  htmlFor="stockmin"
                >
                  Stock Minimo:{" "}
                </label>
                <input
                  type="text"
                  id="stockmin"
                  name="stockmin"
                  value={input.stockmin}
                  onChange={handleChange}
                />
                <span>Ingrese Stock Minimo</span>
                {errors.stockmin && <p className="text-red-500">{errors.stockmin}</p>}
              </li>
              <li>
                <label
                  htmlFor="stock"
                >
                  Stock :{" "}
                </label>
                <input
                  type="text"
                  id="stock"
                  name="stock"
                  value={input.stock}
                  onChange={handleChange}
                />
                <span>Ingrese Stock</span>
                {errors.stock && <p className="text-red-500">{errors.stock}</p>}

              </li>
              <li>
                <button className="nibbotBtn"
                  type="submit"
                >
                  {state ? "GRABAR" : "AGREGAR"}
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="nibbotBtn" onClick={() => { navigate("/materiaprima"); }}
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

export default ABMMateriaprima;
