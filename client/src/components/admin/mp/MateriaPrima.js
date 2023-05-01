import {useContext, useState, useEffect} from 'react';
import {MateriaprimaContext} from './MateriaPrimaContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm'
import { FcDeleteDatabase, FcAcceptDatabase } from 'react-icons/fc'



const Materiaprima = ({data}) => {

    const {deleteMateriaprima} = useContext(MateriaprimaContext)

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };

    useEffect(() => {
        handleClose()
    }, [data])

    return (
        <>
            <td>{data.name}</td>
            <td>{data.description}</td>
            <td>{data.udm}</td>
            <td>{data.stockmin}</td>
            <td>{data.stock}</td>
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
                    <button onClick={() => deleteMateriaprima(data.name)}  className="btn text-danger btn-act" data-toggle="modal"><FcDeleteDatabase  style={estilo} /></button>
                </OverlayTrigger>
                
                
            </td>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Edit Materiaprima
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditForm theMateriaprima={data} />
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

export default Materiaprima;