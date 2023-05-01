import { Modal, Button, Alert} from 'react-bootstrap';
import {useContext, useEffect, useState } from 'react';
import {CondicionContext} from './CondicionContext';
import Condicion from './Condicion';
import AddForm from './AddForm';
import Pagination from './Pagination';

const CondicionList = () => {

    const {sortedCondiciones} = useContext(CondicionContext);

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [condicionesPerPage] = useState(5)

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(()=> {
            setShowAlert(false);
        }, 2000)
    }

    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [sortedCondiciones])

    const indexOfLastCondicion = currentPage * condicionesPerPage;
    const indexOfFirstCondicion = indexOfLastCondicion - condicionesPerPage;
    const currentCondiciones = sortedCondiciones.slice(indexOfFirstCondicion, indexOfLastCondicion);
    const totalPagesNum = Math.ceil(sortedCondiciones.length / condicionesPerPage);


    return (
    <>
<br/>
    <div className="table-title">
        <div className="row">
            <div className="col-sm-6">
                <h2>Condiciones</h2>
            </div>
            <div className="col-sm-6">
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Alta Condicion</span></Button>					
            </div>
        </div>
    </div>
<br/>
    <Alert show={showAlert} variant="success">
        Condiciones Actualizadas!
    </Alert>

    <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Descuento</th>
                <th>Enganche</th>
                <th>Meses</th>
                <th>Interes</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>

                {
                  currentCondiciones.map(data => (
                      <tr key={data.id}>
                        <Condicion data={data} />
                    </tr>
                  ))  
                }
                

        </tbody>
    </table>

    <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentCondiciones ={currentCondiciones}
                sortedCondiciones = {sortedCondiciones} />

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Agregar Condicion
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddForm />
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

export default CondicionList;