import { useContext, useState, useEffect } from "react";
import { UsuarioContext } from "./UsuarioContext";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditForm from "./EditForm";
import { FcAcceptDatabase, FcSurvey } from "react-icons/fc";
import "../../../css/usuario.css"


const Usuario = ({ data }) => {
  const { deleteUsuario } = useContext(UsuarioContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const estilo = { fontSize: "200%", transition: "font-size 0.5s" };

  useEffect(() => {
    handleClose();
  }, [data]);

  return (
    <>
      <td>{data.usr_id}</td>
      <td className={parseInt(data.cia_id) === 1 ? "tdNormal" : "tdOtraCia"}>{data.name}</td>
      <td className="onlyScreen">{data.email}</td>
      <td className="onlyScreen">{data.perfil.description}</td>
      <td className="onlyScreen">{data.status.description}</td>
      <td>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Editar</Tooltip>}>
          <button
            onClick={handleShow}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            <FcAcceptDatabase style={estilo} />
          </button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Accesos</Tooltip>}>
          <Link
            to={"/abmmenu"}
            className="dLink"
            state={{
              idacceso: data.usr_id,
              nombre: data.name,
            }}
          >
              <FcSurvey style={estilo} />
              </Link>
        </OverlayTrigger>
      </td>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm theUsuario={data} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Usuario;
