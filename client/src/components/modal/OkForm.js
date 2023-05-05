import { Form, Button } from "react-bootstrap";
import React from "react";
import "./ok.css";
const OkForm = ({ ruta }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = ruta;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td className="td1">Registro ha sido grabado con Exito</td>
          </tr>
        </tbody>
      </table>
      <Button variant="success" type="submit" block>
        Ok
      </Button>
    </Form>
  );
};

export default OkForm;
