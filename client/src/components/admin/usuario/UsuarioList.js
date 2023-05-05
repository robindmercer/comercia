import { Modal, Button, Alert} from 'react-bootstrap';
import {useContext, useEffect, useState } from 'react';
import {UsuarioContext} from './UsuarioContext';
import Usuario from './Usuario';
import AddForm from './AddForm';
import Pagination from './Pagination';

const UsuarioList = () => {

    const {sortedUsuarios} = useContext(UsuarioContext);

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [usuariosPerPage] = useState(10)

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
    }, [sortedUsuarios])

    const indexOfLastUsuario = currentPage * usuariosPerPage;
    const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
    const currentUsuarios = sortedUsuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);
    const totalPagesNum = Math.ceil(sortedUsuarios.length / usuariosPerPage);

    console.log('currentUsuarios: ', currentUsuarios);

    return (
    <>
<br/>
    <div className="table-title">
        <div className="row">
            <div className="col-sm-6">
                <h2>Usuarios</h2>
            </div>
            <div className="col-sm-6">
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Alta Usuario</span></Button>					
            </div>
        </div>
    </div>
<br/>
    <Alert show={showAlert} variant="success">
        Usuarios Actualizadas!
    </Alert>

    <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Usr_id</th>
                <th>Email</th>
                <th>Perfil</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>

                {
                  currentUsuarios.map(data => (
                      <tr key={data.id}>
                        <Usuario data={data} />
                    </tr>
                  ))  
                }
                

        </tbody>
    </table>

    <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentUsuarios ={currentUsuarios}
                sortedUsuarios = {sortedUsuarios} />

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Agregar Usuario
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

export default UsuarioList;