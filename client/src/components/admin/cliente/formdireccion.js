// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { AddDireccion, getDireccion } from "../../../actions/direccion";
import Header from '../../Header';
import '../../../css/formdireccion.css'

import { getStatus } from '../../../actions/status';
import { getDetail } from '../../../actions/tabla';

export function validate(input) {
  let errors = {};
  if (input.id === "") {
    errors.id = "Debe indicar Id!";
  }

  if (input.calle === "") {
    errors.calle = "Debe Ingresar un nombre ";
  }

  if (input.localidad === "") {
    errors.localidad = "Debe Ingresar una Descripcion";
  }
  if (input.cp === "") {
    errors.cp = "Debe Ingresar un Precio";
  }

  return errors;
}

function ABMDireccion() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const direccion = useSelector((state) => state.direccion)
  const status = useSelector((state) => state.status)
  const tabla = useSelector((state) => state.tabla)
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getStatus());
    dispatch(getDetail(5));
    dispatch(getDireccion(state.id));
  }, [dispatch,state.id]);
  
  console.log('frm dir state.id: ', state.id);

  const [input, setInput] = useState({
    id: state ? state.id : 0,
    cli_id: state ? state.cli_id : 0,
    orden: state ? state.orden : 0,
    calle: state ? state.calle : "",
    localidad: state ? state.localidad : "",
    ciudad: state ? state.ciudad : "",
    pais: state ? state.pais : "",
    cp: state ? state.cp : 0,
    cod_status: state ? state.cod_status : "1",
    cod_tipo: state ? state.cod_tipo : "1",

  });

  console.log('input: ', input);

  // function handleTipo(e) {
  //   e.preventDefault();
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });
  //   setErrors(
  //     validate({
  //       ...input,
  //       [e.target.name]: e.target.value,
  //     })
  //   );
  // }

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
        [e.target.calle]: e.target.value,
      })
    );
  }
  function handleTipoDom(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.calle]: e.target.value.substring(4).trim(),
      cod_tipo: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.calle]: e.target.value,
      })
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('input', input);
    if (input.calle === "") {
      return alert("Debe Ingresar un Calle");
    }
  
    if (input.localidad === "") {
      return alert("Debe Ingresar una Localidad");
    }
    if (input.cp === "") {
      return alert("Debe Ingresar el codigo postal");
    }
    if (input.ciudad === "") {
      return alert("Debe Ingresar la Cuidad");
    }
    if (input.pais === "") {
      return alert("Debe Ingresar el Pais");
    }
  

    dispatch(AddDireccion(input));
    window.location.href = "/cliente";
  };
  return (
    <>
      <Header />
      <div >
        <div className='divForm'>
          <form className='formDir'
            onSubmit={(e) => handleSubmit(e)}
          >
            <br></br>
            <h5>
              COMPLETE LOS SIGUIENTES CAMPOS:
            </h5>
            <br />
            <table>
              <tr >
                <td className='td1'
                  htmlFor="id"
                >
                 Cliente Id:&nbsp;&nbsp;
                </td>
                <td>
                  {input.cli_id}
                </td>
              </tr>

              <tr >
                <td className='td1'>
                  Calle:&nbsp;&nbsp;
                </td>
                <td className='td2'>
                  <input
                    type="text"
                    id="calle"
                    name="calle"
                    value={input.calle}
                    onChange={handleChange}
                  /></td>
              </tr>

              <tr >
                <td className='td1'>
                  Localidad:&nbsp;&nbsp;
                </td>
                <td className='td2'>
                  <input
                    type="text"
                    id="localidad"
                    name="localidad"
                    value={input.localidad}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr  >
                <td className='td1' htmlFor="cp" >
                  Codigo Postal:&nbsp;&nbsp;
                </td>
                <td className='td2Short'>
                  <input
                    type="text"
                    id="cp"
                    name="cp"
                    value={input.cp}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr className='lbl-w-50'>
                <td className='td1' htmlFor="ciudad" >
                  Ciudad:&nbsp;&nbsp;
                </td>
                <td className='td2'>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={input.ciudad}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr className='lbl-w-50'>
                <td className='td1' htmlFor="pais" >
                  Pais:&nbsp;&nbsp;
                </td>
                <td className='td2'>

                  <input
                    type="text"
                    id="pais"
                    name="pais"
                    value={input.pais}
                    onChange={handleChange}
                  />
                </td>
              </tr>

              <tr className='lbl-w-50'>
                <td className='td1'
                  htmlFor="tipoDom"
                >
                  Tipo Domicilio:&nbsp;&nbsp;
                </td>
                <td className='td2'>

                  <select
                    name="cod"
                    id="tipoDom"
                    onChange={(e) => handleTipoDom(e)}
                    value={parseInt(input.cod_tipo)}
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
                    })}                
                    </select>
                </td>
              </tr>
              <tr className='lbl-w-50'>
                <td className='td1'
                  htmlFor="status"
                >
                  Status:&nbsp;&nbsp;
                </td>
                <td className='td2'>

                  <select
                    calle="status"
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
                    })}
                    </select>
                </td>
              </tr>
            </table>
            <br />
            <table>
              <tr>
                <button
                  className="nibbotBtn"
                  type="submit"
                >
                  {state ? "GRABAR" : "AGREGAR"}
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="nibbotBtn" onClick={() => { navigate("/cliente"); }}
                >
                  VOLVER
                </button>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </>
  );
}

export default ABMDireccion;
