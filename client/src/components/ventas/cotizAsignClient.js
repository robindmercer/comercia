import { Form, Button } from "react-bootstrap";

import { useContext, useState } from "react";
import "../admin/condiciones/add.css"

const AsignCli = () => {
  // const { addCondicion } = useContext(CondicionContext);

  const [newCondicion, setNewCondicion] = useState({
    numero: "",
  });

  const onInputChange = (e) => {
    setNewCondicion({ ...newCondicion, [e.target.name]: e.target.value });
  };

  const { numero } = newCondicion;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('newCondicion: ', newCondicion);
    //addCondicion(nombre, descuento, meses, enganche);
    // addCondicion(newCondicion);
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
              placeholder="Numero de Cliente *"
              name="numero"
              value={numero}
              onChange={(e) => onInputChange(e)}
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
