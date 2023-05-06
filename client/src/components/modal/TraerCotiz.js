import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cotiToFact } from "../../actions/factura";

import "./ok.css";
const OkForm = ({ ruta }) => {

  const [cliid, setCliid] = useState(0);
  const [cotid, setCotid] = useState(0);
  const [onChange, setOnChange] = useState(false);
  const [ver,setVer] = useState(false)
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    cli_id: 0,
    cot_id: 0,
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setVer(false)
    if (cliid === 0 || cotid===0){
      setVer(true)
    } else {
    setInput(input.cli_id = cliid)
    setInput(input.cot_id = cotid)
    dispatch(cotiToFact(input));
    window.location.href = ruta;
    }
  };


  function handleTipo(e, i) {
    e.preventDefault();
    if (e.target.name === "cli_id") {
      setCliid(e.target.value);
    }
    if (e.target.name === "cot_id") {
      setCotid(e.target.value);
    }
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td className="td1">Ingrese Numero del Cliente</td>
            <td>
            <input
                  className="input_number"
                  type="text"
                  id="cli_id"
                  name="cli_id"
                  onChange={(e) => handleTipo(e, 0)}
                ></input>              
            </td>
          </tr>
          <tr>
            <td className="td1">Numero de Cotizacion</td>
            <td>
            <input
                  className="input_number"
                  type="text"
                  id="cot_id"
                  name="cot_id"
                  onChange={(e) => handleTipo(e, 0)}
                ></input>              
            </td>
          </tr>
          {ver ? (
            <tr className="errorestr">
              <td className="errores" colSpan={2}>Debe ingresar los dos campos</td> 
            </tr>
          ):null
        }
        </tbody>
      </table>
      <Button variant="success" type="submit" block>
        Ok
      </Button>
    </Form>
  );
};

export default OkForm;

