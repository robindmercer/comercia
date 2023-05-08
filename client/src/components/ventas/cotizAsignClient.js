import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { cotiToFact } from "../../actions/factura";
import { useState } from "react";
import "../admin/condiciones/add.css"

const AsignCli = (cotid) => {
  // const { addCondicion } = useContext(CondicionContext);
  const [cliid, setCliid] = useState(0);
  const [onChange, setOnChange] = useState(false);
  const [ver,setVer] = useState(false)
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    cli_id: 0,
    cot_id: 0,
  });

  function handleTipo(e, i) {
    e.preventDefault();
    if (e.target.name === "cli_id") {
      setCliid(e.target.value);
    }
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
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
    console.log('input: ', input);
    window.location.href = '/factura';
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <table>
        <tr  >
          <td className="td1">Cliente</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Codigo de Cliente *"
              name="cli_id"
              value={cliid}
              onChange={(e) => handleTipo(e)}
              required
            />
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
