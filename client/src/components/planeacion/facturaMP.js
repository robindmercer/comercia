import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFacturaMP} from "../../actions/facturaMP";
import { Link } from "react-router-dom";
import Header from "../Header";
import { FcAddDatabase,FcCancel,FcDiploma2, FcAbout} from "react-icons/fc";
import style from "../../css/factura.module.css";
import { AccessCtrl } from "../../actions/index";
import { getUsuariomenId } from "../../actions/usuariomenu";
import DeleteConfirmation from "../DeleteConfirmation";
import { UpdateFacturaSts2 } from "../../actions/factura";
import { AddLogs } from "../../actions/logs";
import { GetMails } from "../../actions/usuario";
import crearMail from "../CrearMails";
import { mailEnviar } from "../../actions/index";
import Cookies from 'universal-cookie'
// import { getDetail } from "../../actions/tabla";

const Factura = () => {
  const cookies = new Cookies();
  const idProg = 20;
  const id_usuario = cookies.get("usuario");
  const { facturaMP } = useSelector((state) => state);
  const [idFact,setIdFact]=useState(0)
  const [newStatus, setNewStatus] = useState(0);
  const [idMail, setIdMail] = useState(0);
  //const { mails } = useSelector((state) => state);
  // const actlogin = useSelector((state) => state.actlogin)
  // const usuariomenu = useSelector((state) => state.usuariomenu);
  const dispatch = useDispatch();
  const dollarUSLocale = Intl.NumberFormat("de-DE");
  const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
  const [acceso, setAcceso] = useState("A");
  const [signo, setSigno] = useState('+');
  // const { tabla } = useSelector((state) => state);
  
  // Status Change Confirmation 
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [id, setId] = useState(null);
  const { lang } = useSelector((state) => state);
  const { mails } = useSelector((state) => state);
  const btnDiploma2 = true;
  
  const hideConfirmationModal = () => {setDisplayConfirmationModal(false);};
  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id,accion) => {
    setSigno(accion)
    setId(id);
    setDeleteMessage(`Esta seguro/a de cambiar el status a la O.C. : ${id}`);
    setDisplayConfirmationModal(true);
  };
  var verStatus = [];
  var muestroRegistro = false;

 // Control Botones a mostrar
 const control = (data) => {
  verStatus = [];
  muestroRegistro = false;
  // Gerencia
  if (acceso === "A1") {
    verStatus.push(7,8,9,10,11,12,13,14);
  }
  // Almacen
  if (acceso === "A6") {
    verStatus.push(6,7,9,13,14);
  }
  // Manufactura
  if (acceso === "A5") {
    verStatus.push(8,10,12);
  }
  //Calidad
  if (acceso === "A8") {
    verStatus.push(11,13);
  }

  if (verStatus.find((element) => element === data.cod_status)) {
    muestroRegistro = true;
  }
  //console.log("Muestro", data.id, data.cod_status, muestroRegistro);
};


// solo para rechazos 
  const handleSubmit = (id) => {
    var control = "x";
    var newStatus = 0;
    var paramMail = 1;
    const found = facturaMP.find((element) => element.id === id);
    console.log("found: ", found);
    if (found.cod_status > 1) {
      newStatus = found.cod_status - 1;
      paramMail = 2;
      if (newStatus < 4) {
        newStatus = 1;
        paramMail = 1;
      }
      control = "N";
      console.log("newStatus: ", newStatus);
    }
    if (found.cod_status === 8)  newStatus = 9;//Rechazado Manufactura.
    if (found.cod_status === 11) newStatus = 12;//Rechazado Calidad
    if (found.cod_status === 12) newStatus = 9;//Rechazado Manuf.

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
      observ:lang,
    };

    console.log("log: ", newLog);
    // dispatch(UpdateFacturaSts(found.id, newStatus)); // Espera Aprobacion
    // dispatch(AddLogs(newLog));
    dispatch(UpdateFacturaSts2(newLog));

    // dispatch(GetMails(idMail));
    // console.log("mails: ", mails);
    // for (var index = 0; index < mails.length; index++) {
    //   console.log("enviar mail: ", mails[index].email);
    //   dispatch(mailEnviar(crearMail(newStatus, mails[index].email, found)));
    // }
    // //handleShow();
    // console.log("mails: ",idMail, mails);
    // console.log("newLog: ",newLog);
     window.location.href = '/facturaMP';
  };

  useEffect(() => {
    console.log("Factura Use Efect");
    dispatch(AccessCtrl(id_usuario));
    dispatch(getFacturaMP());
    dispatch(getUsuariomenId(id_usuario));
    setAcceso(cookies.get("acceso"))
  }, [dispatch, id_usuario]);

// console.log('facturaMP: ', facturaMP);
// console.log("acceso: ", acceso);
  return (
    <>
      <Header />
      <div className={style.adminHeader}>
        <br />
        <h2>Pendientes de Entrega</h2>
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
            {facturaMP &&
              facturaMP.map((data) => {
                control(data);
                if (muestroRegistro) {
                return (
                  <tr key={data.id} className="style.row">
                    <td>{data.id}</td>
                    <td>{data.fecha}</td>
                    <td>{data.nombre}</td>
                    <td>{dollarUSLocale.format(data.subtotal)}</td>
                    <td>{dollarUSLocale.format(data.iva)}</td>
                    <td>{dollarUSLocale.format(data.total)}</td>
                    <td>{data.stsdes}</td>
                    <td>
                      <Link
                        to={"/formfacturaMP"}
                        className="dLink"
                        state={{
                          idfact: data.id,
                          sts:data.cod_status
                        }}
                      >
                        <FcAddDatabase
                          style={estilo}
                          title="Ver MP."
                          onMouseEnter={({ target }) =>
                            (target.style.fontSize = "280%")
                          }
                          onMouseLeave={({ target }) =>
                            (target.style.fontSize = "200%")
                          }
                        />
                      </Link>
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

                      {btnDiploma2 ? (
                          <>
                            <Link
                              to={"/planeacionPdf"}
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
                      &nbsp;
                      <>
                            <FcCancel
                              style={estilo}
                              title="Cancelar Ultimo Estado"
                              // onClick={() => {
                              //   handleSubmit(data.id, "-");
                              onClick={() => {showDeleteModal(data.id,'-');}}
                              onMouseEnter={({ target }) =>
                                (target.style.fontSize = "280%")
                              }
                              onMouseLeave={({ target }) =>
                                (target.style.fontSize = "200%")
                              }
                            />
                          </>

                    </td>
                  </tr>
                )
              } else {
                return null;
              };
              })}
          </tbody>
        </table>
      </div>
      <DeleteConfirmation 
         showModal={displayConfirmationModal} 
         confirmModal={() => {handleSubmit(id)}} 
         hideModal={hideConfirmationModal} 
         id={id} message={deleteMessage}
      />
    </>
  );
};

export default Factura;
