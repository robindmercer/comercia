import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PutLang } from '../actions/lang';
//buscate esto return a value from a react modal

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, signo, message}) => {
  const { lang } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  function handleTipo(e) {
    e.preventDefault();
    dispatch(PutLang(e.target.value))
    console.log('lang: ', lang);
  }
  
  // console.log('del lang: ', lang);

    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cambio de Estado de Orden de Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-info">{message}
          </div>
          <div>Observacion</div>
          <div>
          <textarea
                  type="text"
                  id="observacion"
                  cols="30"
                  rows="5"
                  name="description"
                  className="txtarea"
                  onChange={(e) => handleTipo(e)}
                />          
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => confirmModal(id,signo) }>
            Grabar
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default DeleteConfirmation;