import { Form, Button } from "react-bootstrap";

import { ComentarioContext } from "./ComentarioContext";
import { useContext, useState } from "react";
import "./add.css"
import Cookies from 'universal-cookie'

const EditForm = ({ theComentario }) => {
  const cookies = new Cookies();
  const fac_id = cookies.get("fac_id");
  const usrid = cookies.get("usuario");
  const id = theComentario.id;
  
  const [texto, setName] = useState(theComentario.texto);

  const { updateComentario } = useContext(ComentarioContext);

  const updatedComentario = { id,fac_id,texto,usrid};

  const handleSubmit = (e) => {
    e.preventDefault();
    updateComentario(updatedComentario);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <table>
        <tr>
          <td className="td1">Texto</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Comentario *"
              name="texto"
              value={texto}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </td>
        </tr>
      </table>
      <Button variant="success" type="submit" block>
        Grabar Comentario
      </Button>
    </Form>
  );
};

export default EditForm;
