import {useContext, useState, useEffect} from 'react';
import {ComentarioContext} from './ComentarioContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm'
import { FcDeleteDatabase, FcAcceptDatabase } from 'react-icons/fc'
import Cookies from 'universal-cookie'


    
    
 const Comentario = ({data}) => {
    const cookies = new Cookies();
    const [usuario, setUsuario] = useState("");
    const {deleteComentario} = useContext(ComentarioContext)
    
    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };
    
    useEffect(() => {
        setUsuario(cookies.get("usuario"))
        handleClose()
    }, [data])
    
    console.log('usuario: ', usuario,data.usuario);
    return (
        <>
            <td>{data.texto}</td>
            <td>{data.fecha}</td>
            <td>{data.usuario}</td>
            {data.usuario ===  usuario ? (
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Editar
                        </Tooltip>
                    }>

                    <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><FcAcceptDatabase  style={estilo} /></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Eliminar
                        </Tooltip>
                    }>
                    <button onClick={() => deleteComentario(data.id)}  className="btn text-danger btn-act" data-toggle="modal"><FcDeleteDatabase  style={estilo} /></button>
                </OverlayTrigger>
                
            </td>
                ): <td>&nbsp;</td>}

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Editar Comentario
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditForm theComentario={data} />
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
        </Modal.Footer>
    </Modal>
        </>
    )
}

export default Comentario;