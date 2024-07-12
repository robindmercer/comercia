import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCotizacion, UpdateCotizacionSts } from "../../actions/cotizacion";
import { Link } from "react-router-dom";
import Header from "../Header";
import { FcAddDatabase, FcBusinessman, FcDiploma2,FcCancel,FcApproval,FcAbout} from "react-icons/fc";
import style from "../../css/cotizacion.module.css";
import { AccessCtrl } from "../../actions/index";
import DeleteConfirmation from "../DeleteConfirmation";

import { getTablaAll } from "../../actions/tabla";

import { Modal, Button} from 'react-bootstrap';
import AsignCli from './cotizAsignClient';
//import { getUsuariomenId } from "../../actions/usuariomenu";
// import { getDetail } from "../../actions/tabla";
// import crearMail from "../CrearMails";
// import { mailEnviar } from "../../actions/index";
import { GetMails } from "../../actions/usuario";
import { AddLogs } from "../../actions/logs";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import Cookies from 'universal-cookie'


const Cotizacion = () => {
  const cookies = new Cookies();

  // Modal 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  // end Modal 
  const idProg = 12;
  const id_usuario = cookies.get("usuario");
  const { cotizacion } = useSelector((state) => state);
  const { mails } = useSelector((state) => state);
  const { tabla } = useSelector((state) => state);

  const [onChange, setOnChange] = useState(false);
  // const actlogin = useSelector((state) => state.actlogin)
  // const usuariomenu = useSelector((state) => state.usuariomenu);
  const dispatch = useDispatch();
  const dollarUSLocale = Intl.NumberFormat("de-DE");
  const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
  const [acceso, setAcceso] = useState("");
  const [filtro, setFiltro] = useState("");
  const [cotid, setCotId] = useState(0);
  const [idCotiz, setIdCotiz] = useState(0);
  const [newStatus, setNewStatus] = useState(0);
  const [idMail, setIdMail] = useState(0);
  const [signo, setSigno] = useState('+');
  const [id, setId] = useState(null);
  // Delete Confirmation 
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  
  const { lang } = useSelector((state) => state);
  const hideConfirmationModal = () => {setDisplayConfirmationModal(false);};
  
  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id,accion,msg) => {
    setSigno(accion)
    setId(id);
    setDeleteMessage(msg);
    setDisplayConfirmationModal(true);
  };

  // Manejo de Botones a ver
  var toLink = "/cotizacionModif";
  var btnAddDatabase = false;
  var btnAsignarCli = false;
  var btnApproval = false 
  var btnCancel = true;
  var btnDiploma2 = false
  var btnLog = false 
  var verStatus = [];
  var muestroRegistro = false;

  // Control Botones a mostrar
  const asignarCli = (data) => {
    setCotId(data)
    handleShow()
  }
  const control = (data) => {
    btnAddDatabase = false;
    btnAsignarCli = false;
    btnApproval=false
    verStatus = [];
    btnDiploma2 = true;
    muestroRegistro = false;
    if (acceso === "A1") {
      // Gerencia All
      btnAddDatabase = true;
      btnAsignarCli = true;
      if (data.cod_status > 2) {
        btnCancel = true;
      }
      if (data.cod_status === 2) {
        btnApproval=true
      }
      verStatus.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 15);
    }
    if (acceso === "A2") {
      // Adminsitracion All
      btnAddDatabase = true;
      btnAsignarCli = true;
      btnCancel = true;
      verStatus.push(3, 4, 5, 6);
    }
    if (acceso === "A3") {
      // Ventas all
      btnAddDatabase = true;
      btnAsignarCli = true;
      btnCancel = true;
      if (data.cod_status === 2) {
        btnAsignarCli = false;
        btnAddDatabase = false;
        btnDiploma2=false;
      }
      if (data.cod_status === 3) {
        btnAsignarCli = true;
        btnAddDatabase = true;
      }
      verStatus.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 15);
    }




    if (acceso.substring(0, 1) === "C") {
      btnCancel = false;
      btnAsignarCli = false;      
      btnAddDatabase = true;
      toLink = "/formcotizacionPDF";
      verStatus.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 15);
    }
    if (verStatus.find((element) => element === data.cod_status)) {
      muestroRegistro = true;
    }
    if (data.logsts !== 0){
      btnLog = true
    } else {
      btnLog = false 
    }
    
    if (data.cod_status === 2) {
      btnDiploma2=false;
    }

    // console.log("verStatus: ", verStatus, acceso.substring(0, 1));
    // console.log("Muestro", data.id, data.cod_status, muestroRegistro);
  };
 
  useEffect(() => {
    console.log("Use Efect 1");
    dispatch(getTablaAll());
    dispatch(AccessCtrl(id_usuario));
    dispatch(getCotizacion());
    setAcceso(cookies.get("acceso"))
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

    if (accion === "-" ) {
      newStatus = found.cod_status - 1;
      console.log("newStatus: ", newStatus);
      paramMail = 2;
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
        newStatus = 3; // Aprobado Gerencia
        paramMail = 3;
      }
      // Gerencia no se controla
      if (acceso === "A1" && found.cod_status < 4) {
        control = "N";
        newStatus = 3; // Aprobado Gerencia
        paramMail = 2; // Administracion
      }
    }
    console.log("Log Data");
    console.log("usuario:", id_usuario);
    console.log("Cotizacion:", found.id, "Status", found.cod_status);
    console.log("Control:", control);
    console.log("newStatus: ", newStatus);
    console.log("paramMail: ", paramMail);
    if (found){
      var newLog = {
        doc_id: found.id,
        tipo_id: "COT",
        usr_id: id_usuario,
        cod_status: newStatus,
        observ: lang,
      };
    }
    setIdCotiz(id);
    setNewStatus(newStatus);
    setIdMail(paramMail);
    dispatch(AddLogs(newLog));    
    console.log("mails: ", mails);
    window.location.href = '/cotizacion';
  };

  function handleChange(e) {
    e.preventDefault();
    setFiltro(e.target.value)
    if (onChange) {
      setOnChange(false);
    } else {
      setOnChange(true);
    }

    console.log('Filtro: ', filtro,'e',e.target.value);

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
              <label htmlFor="filtro">Filtrar:&nbsp;</label>
                  <select
                      // className={style.facinput}
                      name="filtro"
                      id="filtro"
                      onChange={(e) => handleChange(e)}
                      //  value={0}
                      placeholder="Seleccione un Estado a Filtrar"
                    >
                      <option value="0">Seleccionar</option>
                      {tabla &&
                        tabla.map((tabla) => {
                          if (tabla.id === 6 && tabla.cod !== 0) {
                            return (
                              <option                                
                                value={tabla.cod}
                                key={tabla.cod}
                              >{`${tabla.description}`}</option>
                            );
                          } else {
                            return null;
                          }
                        })}{" "}
                    </select>
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
              <th className={style.solopc}>Id</th>
              <th className={style.solopc}>Fecha</th>
              <th>Nombre</th>
              {/* <th>Subtotal</th>
              <th>IVA</th> */}
              <th className={style.solopc}>Total</th>
              <th>Estado</th>
              <th className={style.soloph_acciones}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cotizacion &&
              cotizacion.map((data) => {
                // Manejo Botones
                muestroRegistro=true;
                control(data);
                if (filtro !=='' && filtro !=='0' ) {
                  if(parseInt(data.cod_status) !== parseInt(filtro)){
                    muestroRegistro=false
                  }
                }
                // console.log('data.cod_status: ', data.cod_status,muestroRegistro,filtro);
                if (muestroRegistro) {
                  return (
                    <tr key={data.id}>
                      <td className={style.solopc}>{data.id}</td>
                      <td className={style.solopc}>{data.fecha}</td>
                      <td className={style.soloph}>{data.nombre}</td>
                      {/* <td>{dollarUSLocale.format(data.subtotal)}</td>
                      <td>{dollarUSLocale.format(data.iva)}</td> */}
                      <td className={style.solopc}>{dollarUSLocale.format(data.total)}</td>
                      {data.cod_status === 2 && acceso === "A1" ? (
                        <td className={style.row_green}>{data.stsdes}</td>
                      ) : (
                        <td>{data.stsdes}</td>
                      )}
                      <td className={style.soloph_acciones}>
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
                        {btnDiploma2 ? (
                          <>
                            <Link
                              to={"/cotizacionPDF"}
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

                        &nbsp;&nbsp;
                        {btnCancel  && data.cod_status !== 15  ? (
                          <>
                            <FcCancel
                              style={estilo}
                              title="Eliminar Cotizacion"
                              // onClick={() => {
                              //   handleSubmit(data.id, "-");
                              onClick={() => {showDeleteModal(data.id,'-','Esta seguro/a de querer eliminar la Cotización?');
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

                        &nbsp;&nbsp;
                        {/* // si sos administrador o de ventas con status = 1 */}
                        {btnAsignarCli && data.cod_status !== 2 && data.cod_status !== 15 ? ( //
                          <>
                            <FcBusinessman
                              style={estilo}
                              title="Asignar a un Cliente"
                              onClick={() => {
                                asignarCli(data.id);
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
                        {/* // si sos administrador o de ventas con status = 1 */}
                        {btnApproval  ? ( //
                          <>
                            <FcApproval
                              style={estilo}
                              title="Aprobar"
                              // onClick={() => {handleSubmit(data.id, "+");}}
                              onClick={() => {showDeleteModal(data.id,'+','Esta seguro/a de autorizar la Cotizacion?');}}
                                onMouseEnter={({ target }) =>
                                (target.style.fontSize = "280%")
                              }
                              onMouseLeave={({ target }) =>
                                (target.style.fontSize = "200%")
                              }
                            />
                          </>
                        ) : null}                        
                        {btnLog ? (
                          <Link
                            to="/logs"
                            className="dLink"
                            state={{
                              idfact: data.id,
                              tipo:'COT'
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
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
          </tbody>

        </table>
        <div className="App">

    </div>
      </div>
      <DeleteConfirmation 
         animationType="slide"
         showModal={displayConfirmationModal} 
         confirmModal={(e) => {handleSubmit(id, signo)}} 
         hideModal={hideConfirmationModal} 
         id={id} message={deleteMessage}
         signo={signo}/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Asignar a Cliente
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AsignCli  cotid={cotid} />
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
