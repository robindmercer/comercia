import { Form, Button } from "react-bootstrap";
import { TicketContext } from "./TicketContext";
import { useContext, useState } from "react";
import "./add.css"

const EditForm = ({ theTicketOC }) => {
  // const id = theTicketOC.id;

  const [description, setDescription] = useState(theTicketOC.description);
  
  const { updateTicketOC } = useContext(TicketContext);

  const updatedTicketOC = { description };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTicketOC(updatedTicketOC);
  };

  // function handleTipo(e) {
  //   e.preventDefault();
  //   // dispatch(PutLang(e.target.value))
  //   console.log('e.target.value: ', e.target.value);
  // }

  return (
    <Form onSubmit={handleSubmit}>
      <table>
      <tr>
          <td className="td1">Descripción&nbsp;</td>
          <td>
          <textarea
                  type="text"
                  id="description"
                  cols="30"
                  rows="5"
                  name="description"
                  className="txtarea"
                  onChange={(e) => setDescription(e.target.value)}
                /> 
          </td>
        </tr>      </table>
      <Button variant="success" type="submit" block>
        Grabar TicketOC
      </Button>
    </Form>
  );
};

export default EditForm;
