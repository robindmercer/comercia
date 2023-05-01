import { Form, Button } from "react-bootstrap";

import { CondicionContext } from "./CondicionContext";
import { useContext, useState } from "react";
import "./add.css"

const EditForm = ({ theCondicion }) => {
  const id = theCondicion.id;

  const [nombre, setName] = useState(theCondicion.nombre);
  const [descuento, setDescuento] = useState(theCondicion.descuento);
  const [enganche, setEnganche] = useState(theCondicion.enganche);
  const [meses, setMeses] = useState(theCondicion.meses);
  const [interes, setInteres] = useState(theCondicion.interes);

  const { updateCondicion } = useContext(CondicionContext);

  const updatedCondicion = { id, nombre, descuento, enganche, meses, interes };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCondicion(updatedCondicion);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <table>
        <tr>
          <td className="td1">Descripción </td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Name *"
              name="nombre"
              value={nombre}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Descuento </td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Descuento *"
              name="descuento"
              value={descuento}
              onChange={(e) => setDescuento(e.target.value)}
              required
              />
          </td>
        </tr>
        <tr>
          <td className="td1">Enganche</td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Enganche"
              name="enganche"
              value={enganche}
              onChange={(e) => setEnganche(e.target.value)}
              />
          </td>
        </tr>
        <tr>
          <td className="td1">Meses </td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Meses"
              name="meses"
              value={meses}
              onChange={(e) => setMeses(e.target.value)}
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
              onChange={(e) => setInteres(e.target.value)}
            />
          </td>
        </tr>
      </table>
      <Button variant="success" type="submit" block>
        Edit Condicion
      </Button>
    </Form>
  );
};

export default EditForm;
