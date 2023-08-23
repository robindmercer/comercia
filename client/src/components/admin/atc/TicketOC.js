import {useContext, useState, useEffect} from 'react';
import {TicketContext} from './TicketContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm'
import { FcDeleteRow, FcAcceptDatabase,FcInternal } from 'react-icons/fc'



const TicketOC = ({data}) => {

    const {deleteTicket} = useContext(TicketContext)
    
    const {closeTicket} = useContext(TicketContext)

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };

    useEffect(() => {
        handleClose()
    }, [data])

    return (
        <>
            <td>{data.description}</td>
            <td>{data.alta}</td>
            <td>{data.cierre}</td>
            <td>{data.usr}
            </td>
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
                    <button onClick={() => deleteTicket(data.id)}  className="btn text-danger btn-act" data-toggle="modal"><FcDeleteRow  style={estilo} /></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Cerrar Ticket
                        </Tooltip>
                    }>
                    <button onClick={() => closeTicket(data.id)}  className="btn text-danger btn-act" data-toggle="modal"><FcInternal  style={estilo} /></button>
                </OverlayTrigger>
                
                
            </td>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Editar TicketOC
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditForm theTicketOC={data} />
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

export default TicketOC;