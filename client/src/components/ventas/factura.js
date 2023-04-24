import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFactura, UpdateFacturaSts } from "../../actions/factura";
import { Link } from "react-router-dom";
import Header from "../Header";
import {
  FcAddDatabase,
  FcApproval,
  FcDiploma2,
  FcCancel,
} from "react-icons/fc";
import style from "../../css/factura.module.css";
import { AccessCtrl } from "../../actions/index";
//import { getUsuariomenId } from "../../actions/usuariomenu";
// import { getDetail } from "../../actions/tabla";
// import crearMail from "../CrearMails";
// import { mailEnviar } from "../../actions/index";
import { GetMails } from "../../actions/usuario";

const Factura = () => {
  const idProg = 11;
  const id_usuario = localStorage.getItem("usuario");
  const { factura } = useSelector((state) => state);
  const { mails } = useSelector((state) => state);

  const [onChange, setOnChange] = useState(false);
  // const actlogin = useSelector((state) => state.actlogin)
  const usuariomenu = useSelector((state) => state.usuariomenu);
  const dispatch = useDispatch();
  const dollarUSLocale = Intl.NumberFormat("de-DE");
  const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
  const [acceso, setAcceso] = useState("");
  const [idFact, setIdFact] = useState(0);
  const [newStatus, setNewStatus] = useState(0);
  const [idMail, setIdMail] = useState(0);
  // const { tabla } = useSelector((state) => state);
  // Manejo de Botones a ver
  var toLink = "/formfactura";
  var btnAddDatabase = false;
  var btnApproval = false;
  var btnDiploma2 = false;
  var btnCancel = false;
  var verStatus = [];
  var muestroRegistro = false;

  // Control Botones a mostrar
  const control = (data) => {
    btnAddDatabase = false;
    btnApproval = false;
    btnDiploma2 = false;
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
      verStatus.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
    }
    if (acceso === "A2") {
      // Adminsitracion All
      btnAddDatabase = true;
      btnApproval = true;
      btnCancel = true;
      if (data.cod_status > 2) {
        btnDiploma2 = true;
      }
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
        btnDiploma2 = false;
      }
      if (data.cod_status > 2 && data.cod_status < 7) {
        btnApproval = false;
        btnAddDatabase = false;
        btnDiploma2 = true;
      }
      verStatus.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
    }
    if (acceso.substring(0, 1) === "C") {
      btnCancel = false;
      btnApproval = false;
      btnAddDatabase = true;
      btnDiploma2 = false;
      toLink = "/formfacturaPDF";
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
    dispatch(getFactura());
    //  dispatch(getUsuariomenId(id_usuario));
  }, [dispatch, id_usuario,onChange]);

  useEffect(() => {
    if (idFact > 0) {
      dispatch(UpdateFacturaSts(idFact, newStatus)); // Espera Aprobacion
      dispatch(GetMails(idMail));
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
      console.log("Use Efect 2",onChange);
    }
  }, [dispatch, idFact, idMail, newStatus]);
  
   const handleSubmit = (id, accion) => {
    var control = "x";
    var newStatus = 0;
    var paramMail = 1;
    setOnChange(false);
    const found = factura.find((element) => element.id === id);
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
    console.log("Factura:", found.id, "Status", found.cod_status);
    console.log("Control:", control);
    console.log("newStatus: ", newStatus);
    console.log("paramMail: ", paramMail);
    setIdFact(id);
    setNewStatus(newStatus);
    setIdMail(paramMail);

    console.log("mails: ", mails);
    // for (var x1 = 0; x1 < mails.length; x1++) {
    //   dispatch(mailEnviar(crearMail(newStatus, mails[x1].email, found)));
    // }

    // control = found.control;
    // if (control === "S") {
    //   dispatch(UpdateFacturaSts(id, newStatus)); // Espera Aprobacion
    //   // Perfil Administrador
    //   dispatch(GetMails(paramMail));
    //   console.log("mails: ", mails);
    //   // for (var x = 0; x < mails.length; x++) {
    //   //     dispatch(
    //   //     mailEnviar(crearMail("Espera Aprobación", mails[x].email, found))
    //   //     );
    //   // }
    // } else {
    //   dispatch(UpdateFacturaSts(id, 4)); // Pendiente Admin
    //   // Perfil Planeacion
    //   dispatch(GetMails(paramMail));
    //   console.log("mails 2: ", mails);
    //   // for (var x1 = 0; x1 < mails.length; x1++) {
    //   // dispatch(mailEnviar(crearMail("Confeccionado", mails[x1].email, found)));
    //   // }
    // }
    //console.log("mails 2: ", mails);
    // window.location.href = "/factura";
  };

  console.log("------------------------------");
  if (usuariomenu && acceso === "") {
    // console.log("usuariomenu: ", usuariomenu);
    for (var i = 0; i < usuariomenu.length; i++) {
      if (usuariomenu[i].nivel === idProg) {
        setAcceso(usuariomenu[i].accion + usuariomenu[i].cod_perfil);
      }
    }
  }
  // console.log("factura: ", factura);
  return (
    <>
      <Header />
      <div className={style.adminHeader}>
        <br />
        <h2>Ordenes de Compra</h2>
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
                              idCli: 0,
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
                              onClick={() => {
                                handleSubmit(data.id, "+");
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
                        {btnCancel && data.cod_status > 1 ? (
                          <>
                            <FcCancel
                              style={estilo}
                              title="Cancelar Ultimo Estado"
                              onClick={() => {
                                handleSubmit(data.id, "-");
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
    </>
  );
};

export default Factura;
