import { Form, Button } from "react-bootstrap";

import { UsuarioContext } from "./UsuarioContext";
import { useContext, useState } from "react";
import "./add.css"

const EditForm = ({ theUsuario }) => {
  const id = theUsuario.id;

  const [name, setName] = useState(theUsuario.name);
  const [usr_id, setUsr_id] = useState(theUsuario.usr_id);
  const [email, setEmail] = useState(theUsuario.email);
  const [password, setPassword] = useState(theUsuario.password);
  const [cod_perfil, setPerfil] = useState(theUsuario.cod_perfil);
  const [cod_status, setStatus] = useState(theUsuario.cod_status);
  const { updateUsuario } = useContext(UsuarioContext);

  const updatedUsuario = { id, name, usr_id, email, password, cod_perfil };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUsuario(updatedUsuario);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <table>
        <tr>
          <td className="td1">id </td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Usr_id *"
              name="usr_id"
              value={usr_id}
              onChange={(e) => setUsr_id(e.target.value)}
              required
              />
          </td>
        </tr>
        <tr>
          <td className="td1">Nombre </td>
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
          <td className="td1">Email</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </td>
        </tr>
        <tr>
          <td className="td1">Password </td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setPerfil(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Status </td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Status"
              name="cod_status"
              value={cod_status}
              onChange={(e) => setPerfil(e.target.value)}
            />
          </td>
        </tr>
      </table>
      <Button variant="success" type="submit" block>
        Grabar Usuario
      </Button>
    </Form>
  );
};

export default EditForm;
