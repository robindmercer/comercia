import { Form, Button } from "react-bootstrap";

import { ComentarioContext } from "./ComentarioContext";
import { useContext, useState } from "react";
import "./add.css"
import Cookies from 'universal-cookie'

const AddForm = () => {
  let fecha = new Date().toLocaleDateString("en-GB");
  const cookies = new Cookies();
  const { addComentario } = useContext(ComentarioContext);

  const [newComentario, setNewComentario] = useState({
    fac_id: cookies.get("fac_id"),
    texto: "",
    usuario: cookies.get("usuario"),
    fecha: fecha,    
  });

  const onInputChange = (e) => {
    setNewComentario({ ...newComentario, [e.target.name]: e.target.value.replace("'","`") });
  };

  const { texto} = newComentario;

  const handleSubmit = (e) => {
    e.preventDefault();
    var newTexto = newComentario.texto
    newTexto = newTexto.replace("'","`")
    //addComentario(fac_id, texto);
    setNewComentario((newComentario.newComentario = newTexto));
    console.log('newComentario: ', newComentario);
    addComentario(newComentario);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <table>
        <tr  >
          <td className="td1">Texto</td>
          <td>
            <textarea
              className="td2Des"
              type="textarea"
              placeholder="Descripicion *"
              rows={7}
              name="texto"
              value={texto}
              onChange={(e) => onInputChange(e)}
              required
            />
          </td>
        </tr>
      </table>
      <Button variant="success" type="submit" block>
        Alta Comentario
      </Button>
    </Form>
  );
};

export default AddForm;
