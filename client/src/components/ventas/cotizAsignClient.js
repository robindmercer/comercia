import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCliente, getClienteByName } from "../../actions/cliente";
import { cotiToFact } from "../../actions/factura";

import "../admin/condiciones/add.css"

const AsignCli = (cotid) => {
  // const { addCondicion } = useContext(CondicionContext);
  const [cliid, setCliid] = useState(0);
  const [onChange, setOnChange] = useState(false);
  const [ver,setVer] = useState(false)
  const { cliente } = useSelector((state) => state);
  const [nombre, setName] = useState("");
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    cli_id: '',
    cot_id: 0,
  });

  useEffect(() => {
    dispatch(getCliente());
}, [dispatch]);

  function handlePerfil(e) {
    e.preventDefault();
    console.log('e.target.value: ', e.target.value);
    setCliid(e.target.value)
    if (onChange) {
      setOnChange(false);
    } else {
      setOnChange(true);
    }    
    console.log('cliid: ', cliid);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setVer(false)
    if (cliid === 0 || cotid===0){
      setVer(true)
    } else {
    setInput(input.cli_id = cliid)
    setInput(input.cot_id = cotid.cotid)
    dispatch(cotiToFact(input));
    //console.log('input: ', input);
    window.location.href = '/factura';
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <table>
        {/* <tr  >
          <td className="td1">Cliente</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Nombre de Cliente *"
              name="cli_id"
              value={input.cli_id}
              onKeyPress={(e) => handleInputChange(e)}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </td>
        </tr> */}
        <tr>
          <td>Seleccion</td>
          <td>
          <select className="selWidth"
                  name="cliente"
                  id="cliente"
                  onChange={(e) => handlePerfil(e)}
                  value={input.cod_cliente}
                >
                  <option value="0">Seleccionar</option>
                  {cliente.map((perf) => {
                    return (
                          <option
                            value={perf.id}
                            key={perf.id}
                          >{`${perf.nombre}`}</option>                   
                          )
                  })}
                </select>
          </td>
        </tr>
      </table>
      <Button variant="success" type="submit" block>
        Asignar al Cliente
      </Button>
    </Form>
  );
};

export default AsignCli;
