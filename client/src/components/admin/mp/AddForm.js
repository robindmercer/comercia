import { Form, Button } from "react-bootstrap";

import { MateriaprimaContext } from "./MateriaPrimaContext";
import { useContext, useState } from "react";
import "./add.css"
const AddForm = () => {
  const { addMateriaprima } = useContext(MateriaprimaContext);

  const [newMateriaprima, setNewMateriaprima] = useState({
    name: "",
    description: "",
    udm: "",
    stockmin: "",
    stock: "",
  });

  const onInputChange = (e) => {
    setNewMateriaprima({ ...newMateriaprima, [e.target.name]: e.target.value });
  };

  const { name, description, stockmin, udm, stock } = newMateriaprima;

  const handleSubmit = (e) => {
    e.preventDefault();
    //addMateriaprima(name, description, stockmin, udm);
    addMateriaprima(newMateriaprima);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <table>
        <tr  >
          <td className="td1">Codigo</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Codigo *"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Descripción&nbsp;</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Descripcion *"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Udm&nbsp;</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Udm"
              name="udm"
              value={udm}
              onChange={(e) => onInputChange(e)}
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Stock Minimo&nbsp;</td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Minimo"
              name="stockmin"
              value={stockmin}
              onChange={(e) => onInputChange(e)}
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
              onChange={(e) => onInputChange(e)}
              />
          </td>
        </tr>
      </table>
      <Button variant="success" type="submit" block>
        Alta MateriaPrima
      </Button>
    </Form>
  );
};

export default AddForm;
