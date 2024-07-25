import { useContext, useState, useEffect } from "react";
import { ClienteContext } from "./ClienteContext";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditForm from "./EditForm2";
import { FcAcceptDatabase, FcHome } from "react-icons/fc";
import style from "../../../css/cliente.module.css";

const Cliente = ({ data }) => {
   const { deleteCliente } = useContext(ClienteContext);

   const [show, setShow] = useState(false);

   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   const estilo = { fontSize: "150%", transition: "font-size 0.5s" };

   useEffect(() => {
      handleClose();
   }, [data]);
   console.log("data: ", data);

   return (
      <>
         <td className={style.tdCli}>{data.id}</td>
         <td className={style.tdCli}>{data.razsoc}</td>
         <td className={style.tdCli}>{data.nombre}</td>
         <td className={style.tdCli}>{data.apellido}</td>
         <td>
            <OverlayTrigger
               overlay={<Tooltip id={`tooltip-top`}>Editar</Tooltip>}
            >
               <button
                  className={style.dbButton}
                  onClick={handleShow}
                  // className="btn text-warning btn-act"
                  data-toggle="modal"
               >
                  <FcAcceptDatabase style={estilo} />
               </button>
            </OverlayTrigger>
            <Link
               title="Dirección"
               to={"/direccion"}
               className="dLink"
               state={{
                  id: data.id,
               }}
            >&nbsp;&nbsp;&nbsp;
               <FcHome style={estilo}/>
            </Link>
         </td>

         <Modal show={show} onHide={handleClose} className="modal-lg">
            <Modal.Header closeButton>
               <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <EditForm theCliente={data} />
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

export default Cliente;
