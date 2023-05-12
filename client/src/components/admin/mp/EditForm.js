import { Form, Button } from "react-bootstrap";

import { MateriaprimaContext } from "./MateriaPrimaContext";
import { useContext, useState } from "react";
import "./add.css"

const EditForm = ({ theMateriaprima }) => {
  // const id = theMateriaprima.id;

  const [name, setName] = useState(theMateriaprima.name);
  const [description, setDescription] = useState(theMateriaprima.description);
  const [udm, setUdm] = useState(theMateriaprima.udm);
  const [stockmin, setStockmin] = useState(theMateriaprima.stockmin);
  const [stock, setStock] = useState(theMateriaprima.stock);

  const { updateMateriaprima } = useContext(MateriaprimaContext);

  const updatedMateriaprima = { name, description, udm, stockmin, stock };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMateriaprima(updatedMateriaprima);
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
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Descuento </td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Descuento *"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              />
          </td>
        </tr>
        <tr>
          <td className="td1">Udm</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Udm"
              name="udm"
              value={udm}
              onChange={(e) => setUdm(e.target.value)}
              />
          </td>
        </tr>
        <tr>
          <td className="td1">Stockmin </td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Stockmin"
              name="stockmin"
              value={stockmin}
              onChange={(e) => setStockmin(e.target.value)}
              />
          </td>
        </tr>
        <tr>
          <td className="td1">Stock </td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Stock"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </td>
        </tr>
      </table>
      <Button variant="success" type="submit" block>
        Grabar Materiaprima
      </Button>
    </Form>
  );
};

export default EditForm;
