import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCotizacion, UpdateCotizacionSts } from "../../actions/cotizacion";
import { Link } from "react-router-dom";
import Header from "../Header";
import { FcAddDatabase, FcBusinessman} from "react-icons/fc";
import style from "../../css/factura.module.css";
import { AccessCtrl } from "../../actions/index";

import { Modal, Button, Alert} from 'react-bootstrap';
import AsignCli from './cotizAsignClient';
//import { getUsuariomenId } from "../../actions/usuariomenu";
// import { getDetail } from "../../actions/tabla";
// import crearMail from "../CrearMails";
// import { mailEnviar } from "../../actions/index";
import { GetMails } from "../../actions/usuario";

const Cotizacion = () => {
  // Modal 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  // end Modal 
  const idProg = 12;
  const id_usuario = localStorage.getItem("usuario");
  const { cotizacion } = useSelector((state) => state);
  const { mails } = useSelector((state) => state);

  const [onChange, setOnChange] = useState(false);
  // const actlogin = useSelector((state) => state.actlogin)
  const usuariomenu = useSelector((state) => state.usuariomenu);
  const dispatch = useDispatch();
  const dollarUSLocale = Intl.NumberFormat("de-DE");
  const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
  const [acceso, setAcceso] = useState("");
  const [idCotiz, setIdCotiz] = useState(0);
  const [newStatus, setNewStatus] = useState(0);
  const [idMail, setIdMail] = useState(0);
  // const { tabla } = useSelector((state) => state);
  // Manejo de Botones a ver
  var toLink = "/cotizacionModif";
  var btnAddDatabase = false;
  var btnApproval = false;
  var btnCancel = false;
  var verStatus = [];
  var muestroRegistro = false;

  // Control Botones a mostrar
  const control = (data) => {
    btnAddDatabase = false;
    btnApproval = false;
    verStatus = [];
    muestroRegistro = false;
    if (acceso === "A1") {
      // Gerencia All
      btnAddDatabase = true;
      btnApproval = true;
      if (data.cod_status > 2) {
        btnCancel = true;
      }
      verStatus.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
    }
    if (acceso === "A2") {
      // Adminsitracion All
      btnAddDatabase = true;
      btnApproval = true;
      btnCancel = true;
      verStatus.push(3, 4, 5, 6);
    }
    if (acceso === "A3") {
      // Ventas all
      btnAddDatabase = true;
      btnApproval = true;
      btnCancel = true;
      if (data.cod_status === 2) {
        btnApproval = false;
        btnAddDatabase = false;
      }
      if (data.cod_status > 2 && data.cod_status < 7) {
        btnApproval = false;
        btnAddDatabase = false;
      }
      verStatus.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
    }
    if (acceso.substring(0, 1) === "C") {
      btnCancel = false;
      btnApproval = false;
      btnAddDatabase = true;
      toLink = "/formcotizacionPDF";
      verStatus.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
    }
    if (verStatus.find((element) => element === data.cod_status)) {
      muestroRegistro = true;
    }
    // console.log("verStatus: ", verStatus, acceso.substring(0, 1));
    // console.log("Muestro", data.id, data.cod_status, muestroRegistro);
  };

  useEffect(() => {
    console.log("Use Efect 1");
    dispatch(AccessCtrl(id_usuario));
    dispatch(getCotizacion());
    //  dispatch(getUsuariomenId(id_usuario));
  }, [dispatch, id_usuario, onChange]);

  useEffect(() => {
    console.log("Use Efect 2", onChange);
    if (idCotiz > 0) {
      dispatch(UpdateCotizacionSts(idCotiz, newStatus)); // Espera Aprobacion
      dispatch(GetMails(idMail));
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }
  }, [idCotiz, idMail, newStatus]);

  const handleSubmit = (id, accion) => {
    var control = "x";
    var newStatus = 0;
    var paramMail = 1;
    setOnChange(false);
    const found = cotizacion.find((element) => element.id === id);
    console.log("found: ", found);
    if (accion === "-" && found.cod_status > 1) {
      newStatus = found.cod_status - 1;
      console.log("newStatus: ", newStatus);
      paramMail = 2;
      if (newStatus < 4) {
        newStatus = 1;
        paramMail = 1;
      }
      control = "N";
    }
    if (accion === "+") {
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
    console.log("Log Data");
    console.log("usuario:", id_usuario);
    console.log("Cotizacion:", found.id, "Status", found.cod_status);
    console.log("Control:", control);
    console.log("newStatus: ", newStatus);
    console.log("paramMail: ", paramMail);
    setIdCotiz(id);
    setNewStatus(newStatus);
    setIdMail(paramMail);

    console.log("mails: ", mails);
  };

  console.log("------------------------------",acceso);
  if (usuariomenu && acceso === "") {
    // console.log("usuariomenu: ", usuariomenu);
    for (var i = 0; i < usuariomenu.length; i++) {
      if (usuariomenu[i].nivel === idProg) {
        setAcceso(usuariomenu[i].accion + usuariomenu[i].cod_perfil);
      }
    }
  }
  console.log("cotizacionss: ", cotizacion);
  return (
    <>
      <Header />
      <div className={style.adminHeader}>
        <br />
        <div className="divHeader">
          <div>
            <h2>Cotizaciones</h2>
          </div>
          <div>
            {acceso.substring(0,1) === "A" ? (
              <Link
                to={"/cotizacionAlta"}
                className="btn btn-success"
                state={{
                  id: 0
                }}
              >Nueva
              </Link>
            ) : null}
          </div>
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
            {cotizacion &&
              cotizacion.map((data) => {
                // Manejo Botones
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
                              idCotiz: data.id
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
                            <FcBusinessman
                              style={estilo}
                              title="Asignar a un Cliente"
                              onClick={() => {
                                handleShow();
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Agregar Condicion
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AsignCli />
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
        </Modal.Footer>
    </Modal>      
    </>
  );
};

export default Cotizacion;
