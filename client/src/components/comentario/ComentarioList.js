import { Modal, Button} from 'react-bootstrap';
import {useContext, useEffect, useState } from 'react';
import {ComentarioContext} from './ComentarioContext';
import Comentario from './Comentario';
import AddForm from './AddForm';
import Pagination from './Pagination';
import Cookies from 'universal-cookie'

import { useDispatch } from "react-redux";
import { getComentarioID } from '../../actions/comentario';

const ComentarioList = () => {
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const fac_id = cookies.get("fac_id");
    console.log('List fac_id: ', fac_id);
    const {sortedComentario} = useContext(ComentarioContext);

    // const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);
    const [onChange, setOnChange] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ComentarioPerPage] = useState(5)

    // const handleShowAlert = () => {
    //     setShowAlert(true);
    //     setTimeout(()=> {
    //         setShowAlert(false);
    //     }, 2000)
    // }
    
    // useEffect(() => {
    //     handleClose();
        
    //     return () => {
    //         handleShowAlert();
    //         setOnChange(true)
    //     }
    // }, [sortedComentario])
    
    
    useEffect(() => {
        dispatch(getComentarioID(fac_id));
        console.log('obchabge fac_id: ', fac_id);
        setOnChange(false);
    }, [dispatch, fac_id, onChange])

    const indexOfLastComentario = currentPage * ComentarioPerPage;
    const indexOfFirstComentario = indexOfLastComentario - ComentarioPerPage;
    const currentComentario = sortedComentario.slice(indexOfFirstComentario, indexOfLastComentario);
    const totalPagesNum = Math.ceil(sortedComentario.length / ComentarioPerPage);


    return (
    <>
<br/>
    <div className="table-title">
        <div className="row">
            <div className="col-sm-6">
                <h2>Comentario {fac_id}</h2>
            </div>
            <div className="col-sm-6">
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Alta Comentario</span></Button>					
            </div>
        </div>
    </div>
<br/>
    {/* <Alert show={showAlert} variant="success">
        Comentario Actualizadas!
    </Alert> */}

    <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Texto</th>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Opciones</th>
            </tr>
        </thead>
        <tbody>

                {
                  currentComentario.map(data => (
                      <tr key={data.id}>
                        <Comentario data={data} />
                    </tr>
                  ))  
                }
                

        </tbody>
    </table>

    <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentComentario ={currentComentario}
                sortedComentario = {sortedComentario} />

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Agregar Comentario
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

export default ComentarioList;