import { Modal, Button, Alert} from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import {useContext, useEffect, useState } from 'react';
import {TicketContext} from './TicketContext';
import TicketOC from './TicketOC';
import AddForm from './AddForm';
import Pagination from './Pagination';

const TicketList = () => {
    const location = useLocation();
    const { state } = location;
    const {sortedTicket} = useContext(TicketContext);

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [ticketPerPage] = useState(10)

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(()=> {
            setShowAlert(false);
        }, 500)
    }

    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [sortedTicket])
    
    const indexOfLastTicketOC = currentPage * ticketPerPage;
    const indexOfFirstTicketOC = indexOfLastTicketOC - ticketPerPage;
    const currentTicketOC = sortedTicket.slice(indexOfFirstTicketOC, indexOfLastTicketOC);
    const totalPagesNum = Math.ceil(sortedTicket.length / ticketPerPage);

    console.log('currentTicketOC: ', currentTicketOC);
    
    return (
    <>
<br/>
    <div className="table-title">
        <div className="row">
            <div className="col-sm-6">
                <h3>Ticket OC {state.facid} - {state.razsoc}</h3>
            </div>
            <div className="col-sm-6">
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Alta TicketOC</span></Button>					
            </div>
        </div>
    </div>
<br/>
    <Alert show={showAlert} variant="success">
        Ticket Actualizado!
    </Alert>

    <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Descripcion</th>
                <th>Alta</th>
                <th>Cierre</th>
                <th>Usuario</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>

                {
                  currentTicketOC.map(data => (
                      <tr key={data.id}>
                        <TicketOC data={data} />
                    </tr>
                  ))  
                }
                

        </tbody>
    </table>

        <Pagination pages = {totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentTicketOC ={currentTicketOC}
        sortedTicket = {sortedTicket} />
        
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Agregar TicketOC
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddForm />
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

export default TicketList;