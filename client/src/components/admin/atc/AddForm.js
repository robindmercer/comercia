import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Cookies from 'universal-cookie'
import { TicketContext } from "./TicketContext";
import { useContext, useState } from "react";
import "./add.css"

const AddForm = () => {
  const location = useLocation();
  const { state } = location;
  const cookies = new Cookies();
  const id_usuario = cookies.get("usuario");
  const { addTicket } = useContext(TicketContext);

  const [newTicket, setNewTicket] = useState({
    fac_id: state ? state.facid : 0,
    description: "",
    alta:  new Date().toLocaleDateString("en-GB"),
    cierre: "01/01/1900",
    usr: id_usuario,
    cod_status: 1 ,
  });

  const onInputChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
    console.log('newTicket: ', newTicket);
  };

  const { description, alta, cierre, Usr,cod_status } = newTicket;

  // function handleTipo(e) {
  //   e.preventDefault();
  //   // dispatch(PutLang(e.target.value))
  //   setNewTicket((newTicket.description = e.target.value));
  //   console.log('e.target.value: ', e.target.value,newTicket);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    //addTicket(name, description, stockmin, udm);
    addTicket(newTicket);
  };
  
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
                  onChange={(e) => onInputChange(e)}
                /> 
          </td>
        </tr>
      </table>
      <Button variant="success" type="submit" block>
        Alta Ticket
      </Button>
    </Form>
  );
};

export default AddForm;
