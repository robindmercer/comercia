import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFactura, UpdateFacturaSts } from "../../actions/factura";
import { Link } from "react-router-dom";

import Header from "../Header";
import { FcAddDatabase, FcApproval, FcDiploma2, FcCancel, FcAbout,FcCopyright} from "react-icons/fc";
import style from "../../css/factura.module.css";
import { AccessCtrl } from "../../actions/index";
//import { getUsuariomenId } from "../../actions/usuariomenu";
// import { getDetail } from "../../actions/tabla";
// import crearMail from "../CrearMails";
import { mailEnviar } from "../../actions/index";
import { GetMails } from "../../actions/usuario";

// Modal
// import OkForm from "../modal/TraerCotiz";
// import { Modal, Button, Alert } from "react-bootstrap";
import crearMail from "../CrearMails";
import { AddLogs } from "../../actions/logs";
import DeleteConfirmation from "../DeleteConfirmation";
import Cookies from 'universal-cookie'

const Factura = () => {
  const cookies = new Cookies();
  const idProg = 11;
  const [idFact,setIdFact]=useState(0)
  // Delete Confirmation 
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [id, setId] = useState(null);
  const { lang } = useSelector((state) => state);

  const hideConfirmationModal = () => {setDisplayConfirmationModal(false);};
  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id,accion) => {
    setSigno(accion)
    setId(id);
    setDeleteMessage(`Esta seguro/a de cambiar el status a la O.C.?`);
    setDisplayConfirmationModal(true);
  };
  const id_usuario = cookies.get("usuario");
  const { factura } = useSelector((state) => state);
  const { mails } = useSelector((state) => state);
  
  const [onChange, setOnChange] = useState(false);
  // const actlogin = useSelector((state) => state.actlogin)
  // const usuariomenu = useSelector((state) => state.usuariomenu);
  const dispatch = useDispatch();
  const dollarUSLocale = Intl.NumberFormat("de-DE");
  const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
  const [acceso, setAcceso] = useState("");
  const [signo, setSigno] = useState('+');
  const [newStatus, setNewStatus] = useState(0);
  const [idMail, setIdMail] = useState(0);
  // const { tabla } = useSelector((state) => state);
  // Manejo de Botones a ver
  var toLink = "/formfactura";
  var btnAddDatabase = false;
  var btnApproval = false;
  var btnDiploma2 = false;
  var btnContrato = false 
  var btnCancel = false;
  var verStatus = [];
  var muestroRegistro = false;
  // For Modal Only ------------------------------------------------------
  // const [showAlert, setShowAlert] = useState(false);
  // const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);
  // const [rutaOk, setRutaOk] = useState("./factura");

  // // const [log, setLog] = useState({
  // //   doc_id: 0,
  // //   tipo_id: "FAC",
  // //   usr_id: id_usuario,
  // //   cod_status: 0,
  // // });

  // const handleShowAlert = () => {
  //   setShowAlert(true);
  //   setTimeout(() => {
  //     setShowAlert(false);
  //   }, 2000);
  // };

  // useEffect(() => {
  //   handleClose();

  //   return () => {
  //     handleShowAlert();
  //   };
  // }, [showAlert]);
  // End Modal ----------------------------------------------------

  // Control Botones a mostrar
  const control = (data) => {
    btnAddDatabase = false;
    btnApproval = false;
    btnDiploma2 = false;
    btnContrato = false;
    verStatus = [];
    muestroRegistro = false;
    if (acceso === "A1") {
      // Gerencia All
      btnAddDatabase = true;
      btnApproval = true;
      if (data.cod_status > 2) {
        btnDiploma2 = true;
        btnCancel = true;
      }
      if (data.cod_status > 3) {
        btnContrato = true;
      }
      verStatus.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
    }
    if (acceso === "A2") {
      // Administracion All
      btnAddDatabase = true;
      btnApproval = true;
      btnCancel = true;
      if (data.cod_status > 2) {
        btnDiploma2 = true;
      }
      if (data.cod_status > 3) {
        btnContrato = true;
      }
      if (data.cod_status > 5) {
        btnCancel = false;
      }
      verStatus.push(3, 4, 5, 6,7,8);
    }
    if (acceso === "A3") {
      // Ventas all
      btnAddDatabase = true;
      btnApproval = true;
      btnCancel = true;
      if (data.cod_status === 2) {
        btnApproval = false;
        btnAddDatabase = false;
        btnDiploma2 = false;
      }
      if (data.cod_status > 2 ) {
        btnApproval = false;
        btnDiploma2 = true;
        btnCancel = false;
      }
      if (data.cod_status > 3) {
        btnContrato = true;
      }
      verStatus.push(1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14);
    }
    if (acceso.substring(0, 1) === "C") {
      btnCancel = false;
      btnApproval = false;
      btnAddDatabase = true;
      btnDiploma2 = false;
      toLink = "/formfacturaPDF";
      verStatus.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
    }
    if (data.cod_status > 5) {
      btnApproval = false;
      btnAddDatabase = true;
      btnDiploma2 = true;
      verStatus.push(1, 2, 3, 4, 5, 6);
    }

    if (verStatus.find((element) => element === data.cod_status)) {
      muestroRegistro = true;
    }
    // console.log("Muestro", data.id, data.cod_status, muestroRegistro);
  };

  useEffect(() => {
    //console.log("Use Efect 1");
    dispatch(AccessCtrl(id_usuario));
    dispatch(getFactura());
    setAcceso(cookies.get("acceso"))
    //  dispatch(getUsuariomenId(id_usuario));
  }, [dispatch, id_usuario, onChange]);

  
  const handleSubmit = (id, signo) => {
    //console.log('handleSubmit: ',id,signo,lang);
    var control = "x";
    var newStatus = 0;
    var paramMail = 1;
    setOnChange(false);
    const found = factura.find((element) => element.id === id);
    //console.log("found: ", found);
    if (signo === "-" && found.cod_status > 1) {
      newStatus = found.cod_status - 1;
      paramMail = 2;
      if (newStatus < 4) {
        newStatus = 1;
        paramMail = 1;
      }
      control = "N";
      //console.log("newStatus: ", newStatus);
    }
    if (signo === "+") {
      if (found.cod_status === 1) {
        if (
          found.fde !== found.de ||
          found.fen !== found.en ||
          found.fme !== found.me ||
          found.finter !== found.inter
        ) {
          control = "S";
          newStatus = 2; // Espera Aprobacion
          paramMail = 1;
          //console.log("Espera Aprobacion");
        } else {
          control = "N";
          newStatus = 4; // Pendiente Admin
          paramMail = 3;
        }
      }
      if (found.cod_status === 2) {
        control = "N";
        newStatus = 4; // Pendiente Admin
        paramMail = 3;
      }
      if (found.cod_status === 4) {
        control = "N";
        newStatus = 5; // Pendiente de pago
        paramMail = 3;
      }
      if (found.cod_status === 5) {
        control = "N";
        newStatus = 6; // Liberado
        paramMail = 4; // Planeacion
      }
      // Gerencia no se controla
      if (acceso === "A1" && found.cod_status < 4) {
        control = "N";
        newStatus = 4; // Pendiente Admin
        paramMail = 2; // Administracion
      }
    }
    //console.log("Log Data");
    //console.log("usuario:", id_usuario);
    //console.log("Factura:", found.id, "Status", found.cod_status);
    //console.log("Control:", control);
    //console.log("newStatus: ", newStatus);
    //console.log("paramMail: ", paramMail);
    setIdFact(id);
    setNewStatus(newStatus);
    setIdMail(paramMail);

    // setLog((log.cod_status = newStatus));
    // setLog((log.doc_id = found.id));

    var newLog = {
      doc_id: found.id,
      tipo_id: "FAC",
      usr_id: id_usuario,
      cod_status: newStatus,
      observ: lang,
    };

    // console.log("log: ", newLog);
    dispatch(UpdateFacturaSts(found.id, newStatus)); // Espera Aprobacion
    dispatch(AddLogs(newLog));
    
    // dispatch(GetMails(idMail));
    //console.log("mails: ", mails);
    for (var index = 0; index < mails.length; index++) {
      console.log("enviar mail: ", mails[index].email);
      dispatch(mailEnviar(crearMail(newStatus, mails[index].email, found)));
    }
    //handleShow();
    //console.log("mails: ",idMail, mails);
    window.location.href = '/factura';
  };
  console.log('factura: ', factura);
  
  return (
    <>
      <Header />
      <div className={style.adminHeader}>
        <br />
        <div className="divHeader">
          <div>
            <h2>Ordenes de Compra</h2>
          </div>
          {/* <div>
            <button className="btn btn-success" onClick={() => handleShow()}>
              Traer Cotización
            </button>
          </div> */}
        </div>
        <table className={style.styledTable}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Subtotal</th>
              <th>IVA</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {factura &&
              factura.message === undefined &&
              factura.map((data) => {
                // Manejo Botones
                //console.log('data: ', data);
                control(data);
                if (muestroRegistro) {
                  return (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.fecha}</td>
                      <td>{data.nombre}</td>
                      <td>{dollarUSLocale.format(data.subtotal)}</td>
                      <td>{dollarUSLocale.format(data.iva)}</td>
                      <td>{dollarUSLocale.format(data.total)}</td>
                      {data.cod_status === 2 && acceso === "A1" ? (
                        <td className={style.row_green}>{data.stsdes}</td>
                      ) : (
                        <td>{data.stsdes}</td>
                      )}
                      <td>
                        {btnAddDatabase ? (
                          <Link
                            to={toLink}
                            className="dLink"
                            state={{
                              idfact: data.id,
                              idCli: data.cli_id,
                            }}
                          >
                            <FcAddDatabase
                              style={estilo}
                              title="Modificar"
                              onMouseEnter={({ target }) =>
                                (target.style.fontSize = "280%")
                              }
                              onMouseLeave={({ target }) =>
                                (target.style.fontSize = "200%")
                              }
                            />
                          </Link>
                        ) : null}
                        &nbsp;&nbsp;
                        {/* // si sos administrador o de ventas con status = 1 */}
                        {btnApproval ? ( //
                          <>
                            <FcApproval
                              style={estilo}
                              title="Aprobar"
                              // onClick={() => {handleSubmit(data.id, "+");}}
                              onClick={() => {showDeleteModal(data.id,'+');}}
                                onMouseEnter={({ target }) =>
                                (target.style.fontSize = "280%")
                              }
                              onMouseLeave={({ target }) =>
                                (target.style.fontSize = "200%")
                              }
                            />
                          </>
                        ) : null}
                        {btnDiploma2 ? (
                          <>
                            <Link
                              to={"/formfacturaPDF"}
                              className="dLink"
                              state={{
                                idfact: data.id,
                              }}
                            >
                              <FcDiploma2
                                style={estilo}
                                title="PDF"
                                onMouseEnter={({ target }) =>
                                  (target.style.fontSize = "280%")
                                }
                                onMouseLeave={({ target }) =>
                                  (target.style.fontSize = "200%")
                                }
                              />
                            </Link>
                          </>
                        ) : null}
                        {btnCancel ? (
                          <>
                            <FcCancel
                              style={estilo}
                              title="Cancelar Ultimo Estado"
                              // onClick={() => {
                              //   handleSubmit(data.id, "-");
                              onClick={() => {showDeleteModal(data.id,'-');
                              }}
                              onMouseEnter={({ target }) =>
                                (target.style.fontSize = "280%")
                              }
                              onMouseLeave={({ target }) =>
                                (target.style.fontSize = "200%")
                              }
                            />
                          </>
                        ) : null}
                        {btnDiploma2 ? (
                          <Link
                            to="/logs"
                            className="dLink"
                            state={{
                              idfact: data.id,
                              tipo:'FAC'
                            }}
                          >
                            <FcAbout
                              style={estilo}
                              title="Ver Logs"
                              onMouseEnter={({ target }) =>
                                (target.style.fontSize = "280%")
                              }
                              onMouseLeave={({ target }) =>
                                (target.style.fontSize = "200%")
                              }
                            />
                          </Link>
                        ) : null}
                        {btnContrato ? (
                          <>
                            <Link
                              to={"/contrato"}
                              className="dLink"
                              state={{
                                idfact: data.id,
                              }}
                            >
                              <FcCopyright
                                style={estilo}
                                title="Contrato"
                                onMouseEnter={({ target }) =>
                                  (target.style.fontSize = "280%")
                                }
                                onMouseLeave={({ target }) =>
                                  (target.style.fontSize = "200%")
                                }
                              />
                            </Link>
                          </>
                        ) : null}
                        &nbsp;&nbsp;
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
          </tbody>
        </table>
      </div>
      <DeleteConfirmation 
         animationType="slide"
         showModal={displayConfirmationModal} 
         confirmModal={(e) => {handleSubmit(id, signo)}} 
         hideModal={hideConfirmationModal} 
         id={id} message={deleteMessage}
         signo={signo}/>
      
      {/* <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Trear Cotización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OkForm ruta={rutaOk} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default Factura;
