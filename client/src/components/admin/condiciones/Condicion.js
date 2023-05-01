import {useContext, useState, useEffect} from 'react';
import {CondicionContext} from './CondicionContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm'
import { FcDeleteDatabase, FcAcceptDatabase } from 'react-icons/fc'



const Condicion = ({data}) => {

    const {deleteCondicion} = useContext(CondicionContext)

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };

    useEffect(() => {
        handleClose()
    }, [data])

    return (
        <>
            <td>{data.nombre}</td>
            <td>{data.descuento}</td>
            <td>{data.enganche}</td>
            <td>{data.meses}</td>
            <td>{data.interes}</td>
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>

                    <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><FcAcceptDatabase  style={estilo} /></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <button onClick={() => deleteCondicion(data.id)}  className="btn text-danger btn-act" data-toggle="modal"><FcDeleteDatabase  style={estilo} /></button>
                </OverlayTrigger>
                
                
            </td>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Edit Condicion
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditForm theCondicion={data} />
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close Button
                </Button>
        </Modal.Footer>
    </Modal>
        </>
    )
}

export default Condicion;