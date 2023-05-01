import { Modal, Button, Alert} from 'react-bootstrap';
import {useContext, useEffect, useState } from 'react';
import {MateriaprimaContext} from './MateriaPrimaContext';
import Materiaprima from './MateriaPrima';
import AddForm from './AddForm';
import Pagination from './Pagination';

const MateriaprimaList = () => {

    const {sortedMateriaprima} = useContext(MateriaprimaContext);

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [materiaprimaPerPage] = useState(10)

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
    }, [sortedMateriaprima])

    const indexOfLastMateriaprima = currentPage * materiaprimaPerPage;
    const indexOfFirstMateriaprima = indexOfLastMateriaprima - materiaprimaPerPage;
    const currentMateriaPrima = sortedMateriaprima.slice(indexOfFirstMateriaprima, indexOfLastMateriaprima);
    const totalPagesNum = Math.ceil(sortedMateriaprima.length / materiaprimaPerPage);


    return (
    <>
<br/>
    <div className="table-title">
        <div className="row">
            <div className="col-sm-6">
                <h2>MateriaPrima</h2>
            </div>
            <div className="col-sm-6">
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Alta Materiaprima</span></Button>					
            </div>
        </div>
    </div>
<br/>
    <Alert show={showAlert} variant="success">
        MateriaPrima Actualizadas!
    </Alert>

    <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th>Unidad de medida</th>
                <th>Stock Minimo</th>
                <th>Stock Actual</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>

                {
                  currentMateriaPrima.map(data => (
                      <tr key={data.id}>
                        <Materiaprima data={data} />
                    </tr>
                  ))  
                }
                

        </tbody>
    </table>

        <Pagination pages = {totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentMateriaPrima ={currentMateriaPrima}
        sortedMateriaprima = {sortedMateriaprima} />
        
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Agregar Materiaprima
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

export default MateriaprimaList;