import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFacturaMP} from "../../actions/facturaMP";
import { Link } from "react-router-dom";
import Header from "../Header";
import { FcAddDatabase,FcCancel,FcDiploma2} from "react-icons/fc";
import style from "../../css/factura.module.css";
import { AccessCtrl } from "../../actions/index";
import { getUsuariomenId } from "../../actions/usuariomenu";
import DeleteConfirmation from "../DeleteConfirmation";
import { UpdateFacturaSts } from "../../actions/factura";
import { AddLogs } from "../../actions/logs";
import { GetMails } from "../../actions/usuario";
import crearMail from "../CrearMails";
import { mailEnviar } from "../../actions/index";

// import { getDetail } from "../../actions/tabla";





const Factura = () => {
  const idProg = 20;
  const id_usuario = localStorage.getItem("usuario");
  const { facturaMP } = useSelector((state) => state);
  const [idFact,setIdFact]=useState(0)
  const [newStatus, setNewStatus] = useState(0);
  const [idMail, setIdMail] = useState(0);
  //const { mails } = useSelector((state) => state);
  // const actlogin = useSelector((state) => state.actlogin)
  const usuariomenu = useSelector((state) => state.usuariomenu);
  const dispatch = useDispatch();
  const dollarUSLocale = Intl.NumberFormat("de-DE");
  const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
  const [acceso, setAcceso] = useState("A");
  // const { tabla } = useSelector((state) => state);
  
  // Status Change Confirmation 
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [id, setId] = useState(null);
  const { mails } = useSelector((state) => state);
  const btnDiploma2 = true;
  
  const hideConfirmationModal = () => {setDisplayConfirmationModal(false);};
  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(`Esta seguro/a de cambiar el status a la O.C.?`);
    setDisplayConfirmationModal(true);
  };

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
      observ:'',
    };

    console.log("log: ", newLog);
    dispatch(UpdateFacturaSts(found.id, newStatus)); // Espera Aprobacion
    dispatch(AddLogs(newLog));

    dispatch(GetMails(idMail));
    console.log("mails: ", mails);
    for (var index = 0; index < mails.length; index++) {
      console.log("enviar mail: ", mails[index].email);
      dispatch(mailEnviar(crearMail(newStatus, mails[index].email, found)));
    }
    //handleShow();
    //console.log("mails: ",idMail, mails);
    window.location.href = '/facturaMP';
  };

  useEffect(() => {
    console.log("Factura Use Efect");
    dispatch(AccessCtrl(id_usuario));
    dispatch(getFacturaMP());
    dispatch(getUsuariomenId(id_usuario));
    if (usuariomenu) {
      console.log('usuariomenu: ', usuariomenu);
      for (var i = 0; i < usuariomenu.length; i++) {
        if (usuariomenu[i].nivel === idProg) {
          setAcceso(usuariomenu[i].accion + usuariomenu[i].cod_perfil);
        }
      }
    }
  }, [dispatch, id_usuario]);

  // const handleSubmit = (id) => {
  //   var control = "x";
  //   const found = facturaMP.find((element) => element.id === id);
  //   control = found.control;
  //   if (control === "S") {
  //       // dispatch(UpdateFacturaSts(id,4))
  //     // Perfil Administrador
  //       dispatch(GetMails(1));
  //       for (var x = 0; x < mails.length; x++) {
  //           dispatch(
  //           mailEnviar(crearMail("Espera Aprobación", mails[x].email, found))
  //           );
  //       }
  //   } else {
  //       // dispatch(UpdateFacturaSts(id,3))
  //       // Perfil Planeacion
  //       dispatch(GetMails(3));
  //       console.log("mails 2: ", mails);
  //       for (var x1 = 0; x1 < mails.length; x1++) {
  //       dispatch(mailEnviar(crearMail("Confeccionado", mails[x1].email, found)));
  //       }
  //   }
  //   window.location.href = '/facturaMP';
  // };

console.log('facturaMP: ', facturaMP);
console.log("acceso: ", acceso);
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
                          idfact: data.id
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

                    </td>
                  </tr>
                );
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
