import { Form, Button } from "react-bootstrap";

import { UsuarioContext } from "./UsuarioContext";
import { useContext, useState } from "react";
import "./add.css"
const AddForm = () => {
  const { addUsuario } = useContext(UsuarioContext);

  const [newUsuario, setNewUsuario] = useState({
    id:0,
    name: "",
    usr_id: "",
    email: "",
    password: "",
    cod_perfil: "",
    cod_status: "1"
  });

  const onInputChange = (e) => {
    setNewUsuario({ ...newUsuario, [e.target.name]: e.target.value });
  };

  const { name, usr_id, password, email, cod_perfil } = newUsuario;

  const handleSubmit = (e) => {
    e.preventDefault();
    //addUsuario(name, usr_id, password, email);
    addUsuario(newUsuario);
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
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Usr_id&nbsp;</td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Usr_id *"
              name="usr_id"
              value={usr_id}
              onChange={(e) => onInputChange(e)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Email&nbsp;</td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Password&nbsp;</td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Perfil </td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Perfil"
              name="cod_perfil"
              value={cod_perfil}
              onChange={(e) => onInputChange(e)}
              />
          </td>
        </tr>
      </table>
      <Button variant="success" type="submit" block>
        Alta Usuarios
      </Button>
    </Form>
  );
};

export default AddForm;
