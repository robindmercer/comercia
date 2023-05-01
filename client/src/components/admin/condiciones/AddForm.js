import { Form, Button } from "react-bootstrap";

import { CondicionContext } from "./CondicionContext";
import { useContext, useState } from "react";
import "./add.css"
const AddForm = () => {
  const { addCondicion } = useContext(CondicionContext);

  const [newCondicion, setNewCondicion] = useState({
    nombre: "",
    descuento: "",
    enganche: "",
    meses: "",
    interes: "",
  });

  const onInputChange = (e) => {
    setNewCondicion({ ...newCondicion, [e.target.name]: e.target.value });
  };

  const { nombre, descuento, meses, enganche, interes } = newCondicion;

  const handleSubmit = (e) => {
    e.preventDefault();
    //addCondicion(nombre, descuento, meses, enganche);
    addCondicion(newCondicion);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <table>
        <tr  >
          <td className="td1">Descripicion</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Descripicion *"
              name="nombre"
              value={nombre}
              onChange={(e) => onInputChange(e)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Descuento&nbsp;</td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Descuento *"
              name="descuento"
              value={descuento}
              onChange={(e) => onInputChange(e)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Enganche&nbsp;</td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Enganche"
              name="enganche"
              value={enganche}
              onChange={(e) => onInputChange(e)}
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Meses&nbsp;</td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Meses"
              name="meses"
              value={meses}
              onChange={(e) => onInputChange(e)}
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Interes </td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Interes"
              name="interes"
              value={interes}
              onChange={(e) => onInputChange(e)}
              />
          </td>
        </tr>
      </table>
      <Button variant="success" type="submit" block>
        Alta Condiciones
      </Button>
    </Form>
  );
};

export default AddForm;
