// eslint-disable-next-line
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { mailEnviar } from "../../actions/index";
import { GetMails } from "../../actions/usuario";

// Acciones
import { getFacturaDet } from "../../actions/factdet";
import { getFacturaCab, UpdateFactura,UpdateFacturaSts } from "../../actions/factura";
import { getDetailIva } from "../../actions/tabla";
import { getProducto } from "../../actions/producto";
//import { getClienteId } from "../../actions/cliente";
import {
  getCondiciones,
  getCondicionesFac,
  PostCondicionesFac,
} from "../../actions/condiciones";

import crearMail from "../CrearMails";
import { getUsuariomenId } from "../../actions/usuariomenu";
// Descuentos
import { getDetail } from "../../actions/tabla";

// Iconos
import { FcDeleteRow, FcAddRow, FcMinus } from "react-icons/fc";
import Header from "../Header";
// CSS
import "../../css/factdet.css";

// Modal
import OkForm from "../modal/OkForm";
import { Modal } from "react-bootstrap";

//const Formfactura = () => {
function Formfactura() {
  const navigate = useNavigate();
  // Manejo acceso del Usuario
  const usuariomenu = useSelector((state) => state.usuariomenu);
  const [acceso, setAcceso] = useState("");
  const idProg = 11;

  const id_usuario = localStorage.getItem("usuario");
  const { factcab } = useSelector((state) => state);
  const { factdet } = useSelector((state) => state);
  const { porciva } = useSelector((state) => state);
  // const tabla = useSelector((state) => state.tabla);
  const { producto } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  // const [idFact, setIdFact] = useState(0);
  // const [newStatus, setNewStatus] = useState(0);
  const [idMail, setIdMail] = useState(0);
  // Condiciones generales
  const { condiciones } = useSelector((state) => state);
  const { factcond } = useSelector((state) => state);
  //const { cliente } = useSelector((state) => state);

  const [onChange, setOnChange] = useState(false);
  const [onChangeDet, setOnChangeDet] = useState(false);

  const [subTotal, setSubTotal] = useState(0);
  const [saleTax, setSaleTax] = useState(0);
  const [tieneCG, setTieneCG] = useState(0);
  const [total, setTotal] = useState(0);
  const [saleDHL, setSaleDHL] = useState(0);
  const [btnAprobar, setBtnAprobar] = useState(true);
  const [btnGrabar, setbtnGrabar] = useState(true);
  const { mails } = useSelector((state) => state);

  // Formato Numeros
  const dollarUSLocale = Intl.NumberFormat("de-DE");

  // Estilos
  const estilo = { fontSize: "150%", transition: "font-size 0.5s" };
  

  // For Modal Only
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [rutaOk, setRutaOk] = useState("./factura");

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    console.log('useEffect: ', 99);
    handleClose();

    return () => {
      handleShowAlert();
    };
  }, [dispatch,showAlert]);
  // End Modal ------------------------------------------------

  // eslint-disable-next-line no-unused-vars
  const [inputDet, setInputDet] = useState({
    fac_id: 0,
    orden: 0,
    prod_id: 0,
    precio: 0,
    cantidad: 0,
    total: 0,
  });

  const [input, setInput] = useState({
    id: 0,
    subtotal: 0,
    iva: 0,
    total: 0,
    dhl: 0,
    observ: "",
  });

  const initialProductLine = {
    cantidad: 1,
    description: "",
    fac_id: 1,
    name: "",
    orden: factcab.length,
    precio: 0,
    prod_id: "",
    total: 0,
  };
  const initialFacdet = {
    id: 0,
    fac_id: state.idfact,
    cond_id: 0,
    descuento: 0,
    enganche: 0,
    meses: 0,
    interes: 0,
  };

  // var cantidad = []

  useEffect(() => {
    console.log("useEffect: 0");
 
    //dispatch(getDetail(1));
    dispatch(getProducto());
    dispatch(getDetailIva(1));
    dispatch(getDetail(2));
    dispatch(getFacturaCab(state.idfact));
    dispatch(getFacturaDet(state.idfact));
    dispatch(getUsuariomenId(id_usuario));
    dispatch(getCondiciones());
    dispatch(getCondicionesFac(state.idfact));
    //dispatch(getClienteId(state.idCli));
    // console.log("useeffect");
    if (usuariomenu) {
      for (var i = 0; i < usuariomenu.length; i++) {
        if (usuariomenu[i].nivel === idProg) {
          setAcceso(usuariomenu[i].accion);
        }
      }
    }
    if (factcab.length > 0) {
      console.log("factcab ok: ", factcab, " lenght ", factcab.length);
      setSaleDHL(factcab[0].dhl);
    }
  }, [dispatch, id_usuario]);

  // useEffect(() => {
  //   console.log("useEffect: change");

  //   if (onChange) {
  //   }
  // }, [onChange, factdet]);

  // Calculo subtotal
  useEffect(() => {
    console.log("useEffect: ", 1);
    let subTotal = 0;
    let iva = 0;
    let total = 0;
    if (factdet && porciva) {
      factdet.forEach((fact) => {
        const quantityNumber = parseFloat(fact.cantidad);
        const rateNumber = parseFloat(fact.precio);
        const amount =
          quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;
        subTotal += amount;
      });
      setSubTotal(subTotal);
      if (subTotal > 0) {
        if (factcab[0].moneda === 1) {
          iva = subTotal * (parseFloat(porciva[0].valor) / 100);
          setSaleTax(iva);
        }
        setSaleTax(iva);
        setSaleDHL(factcab[0].dhl);
        total = subTotal + iva + parseInt(factcab[0].dhl);
        setTotal(total);
      } else {
        setSaleTax(0);
        setTotal(0);
      }
    }
    console.log("total: ", total);
  }, [onChangeDet]);

  //console.log("cliente: ", cliente);
  // console.log("state.idCli: ", state.idCli);

  useEffect(() => {
    console.log("useEffect: ", 2);
    var aux = 0;
    var iva = 0;
    if (factdet && porciva) {
      factdet.forEach((fact) => {
        const quantityNumber = parseFloat(fact.cantidad);
        const rateNumber = parseFloat(fact.precio);
        const amount =
          quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;

        aux += amount;
      });

      // if (saleDHL > 0) {
      //   aux += parseInt(saleDHL);
      //   console.log("subTotal: ", subTotal);
      //   setSubTotal(aux);
      //   console.log("saleDHL d: ", saleDHL, subTotal);
      // } else {
      //   setSubTotal(aux);
      // }
      if (aux > 0) {
        if (factcab[0].moneda === 1) {
          iva = aux * (parseFloat(porciva[0].valor) / 100);
        }
        setSubTotal(aux);
        setSaleTax(iva);
        if (saleDHL.length === 0) setSaleDHL(0);
        var total = aux + iva + parseInt(saleDHL);
        setTotal(total);
        console.log("total: ", total);
      }
    }
  }, [saleDHL]);

  const handleRemove = (i) => {
    setBtnAprobar(false);
    console.log("handleRemove: ", btnAprobar);
    factdet.splice(i, 1);
    if (onChangeDet) {
      setOnChangeDet(false);
    } else {
      setOnChangeDet(true);
    }
  };

  const handleAdd = () => {
    setBtnAprobar(false);
    console.log("handleAdd: ", btnAprobar);
    factdet.push(initialProductLine);
    // console.log("factdet: ", factdet);
    if (onChangeDet) {
      setOnChangeDet(false);
    } else {
      setOnChangeDet(true);
    }
  };

  const handleFree = (i) => {
    setBtnAprobar(false);
    console.log("handleFree: ", btnAprobar);

    factdet[i].precio = -1;
    factdet[i].total = -1;
    if (onChangeDet) {
      setOnChangeDet(false);
    } else {
      setOnChangeDet(true);
    }
  };

  function handleTipo(e, i) {
    setBtnAprobar(false);
    console.log("handleTipo: ", btnAprobar);
    e.preventDefault();
    if (e.target.name === "dhl") {
      factcab[0].dhl = e.target.value;
      setSaleDHL(e.target.value);
    }
    // console.log("i: ", i);
    // console.log("e.target.name: ", e.target.name);
    // console.log("e.target.value: ", e.target.value);
    if (e.target.name === "miCheck") {
      for (var xcond = 0; xcond < condiciones.length; xcond++) {
        condiciones[xcond].sel = " ";
      }
      condiciones[i.i].sel = "S";
      console.log("miCheck condiciones: ", condiciones);
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }
    if (e.target.name === "CGdesc") {
      condiciones[i.i].descuento = e.target.value;
    }
    if (e.target.name === "CGenganche") {
      condiciones[i.i].enganche = e.target.value;
    }
    if (e.target.name === "CGmeses") {
      condiciones[i.i].meses = e.target.value;
    }
    if (e.target.name === "CGinter") {
      condiciones[i.i].interes = e.target.value;
    }
    if (e.target.name[0] === "C") {
      condiciones[i.i].sel = "S";
      console.log("C condiciones: ", condiciones);
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }
    if (e.target.name === "observ") {
      factcab[0].observ = e.target.value;
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }

    if (e.target.name === "cli_id") {
      console.log("busco", e.target.value);
      factcab[0].cli_id = e.target.value;
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }
    if (e.target.name === "quantity") {
      factdet[i.i].cantidad = e.target.value;
      factdet[i.i].total = factdet[i.i].cantidad * factdet[i.i].precio;
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }
    if (e.target.name === "prod_id") {
      if (e.target.value === "0") {
        handleRemove(i.i);
      } else {
        for (var z = 0; z < producto.length; z++) {
          if (parseInt(producto[z].id) === parseInt(e.target.value)) {
            factdet[i.i].fac_id = state.idfact;
            factdet[i.i].prod_id = e.target.value;
            factdet[i.i].name = producto[z].name;
            factdet[i.i].precio = producto[z].price;
            factdet[i.i].total = factdet[i.i].cantidad * factdet[i.i].precio;
          }
        }
      }
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }
  }

  const handleSubmit = () => {
    // //    setInput(input.dir_id = DirCode);
    //     setInput(input.cli_id = factcab[0].cli_id);
    //console.log('DirCode: ', DirCode);
    console.log("handleSubmit--------------------------------------");
    console.log("subTotal: ", subTotal.toFixed(0));
    console.log("saleTax: ", saleTax.toFixed(0));
    console.log("Total: ", total.toFixed(0));
    factcab[0].subtotal = subTotal.toFixed(0);
    factcab[0].iva = saleTax.toFixed(0);
    factcab[0].total = total.toFixed(0);
    console.log("factcab: ", factcab);
    const found = condiciones.find((element) => element.sel === "S");
    console.log("found: ", found);

    setInput((input.id = factcab[0].id));
    setInput((input.subtotal = subTotal.toFixed(0)));
    setInput((input.iva = saleTax.toFixed(0)));
    setInput((input.total = total.toFixed(0)));
    setInput((input.observ = factcab[0].observ));
    if (tieneCG === 1) {
      initialFacdet.id = 1; // si ya tiene una C.General grabada el id es siempre 1
    } else {
      initialFacdet.id = 0;
    }
    initialFacdet.fac_id = state.idfact;
    initialFacdet.cond_id = found.id;
    initialFacdet.descuento = found.descuento;
    initialFacdet.enganche = found.enganche;
    initialFacdet.meses = found.meses;
    initialFacdet.interes = found.interes;

    // console.log("state.idfact: ", state.idfact);
    // console.log("factcab: ", factcab);
    // console.log("factdet: ", factdet);
    // console.log("initialFacdet: ", initialFacdet);
    // console.log("input: ", input);
    // console.log("factcond: ", factcond);
    // console.log("condiciones: ", condiciones);
    // console.log("tieneCG",tieneCG );

    // if (factcab[0].subtotal === 0) {
    //   alert("La Orden de Compra no puede quedar en 0");
    //   return;
    // }
    dispatch(UpdateFactura(input, factdet, inputDet));
    dispatch(PostCondicionesFac(initialFacdet));
    handleShow();
    //window.location.href = "/factura";
  };

  // const handleApprove = () => {
  //   var control = "x";
  //   var newStatus = 0;
  //   var paramMail = 1;
  //   // // //setOnChange(false);
  //    const found = condiciones.find((element) => element.sel === "S");
  //    console.log("found: ", found);
  //    console.log('factcab: ', factcab);
  //    console.log('factdet: ', factdet);

  //   if (factcab[0].cod_status === 1) {
  //     for (var idx = 0; idx < factdet.length; idx++) {
  //       if (parseInt(factdet[idx].precio) === -1) {
  //         control = "S";
  //         newStatus = 2; // Espera Aprobacion
  //         paramMail = 1;
  //       }
  //     }
  //     if (
  //       found.des !== found.descuento ||
  //       found.eng !== found.enganche ||
  //       found.mes !== found.meses ||
  //       found.inte !== found.interes
  //     ) {
  //       control = "S";
  //       newStatus = 2; // Espera Aprobacion
  //       paramMail = 1;
  //     } else {
  //       if (control === "x") {
  //         control = "N";
  //         newStatus = 4; // Pendiente Admin
  //         paramMail = 3;
  //       }
  //     }
  //   }

  //   if (factcab[0].cod_status === 2 && control !== "S") {
  //     control = "N";
  //     newStatus = 4; // Pendiente Admin
  //     paramMail = 3;
  //   }
  //   if (factcab[0].cod_status === 4 && control !== "S") {
  //     control = "N";
  //     newStatus = 5; // Pendiente de pago
  //     paramMail = 3;
  //   }
  //   if (factcab[0].cod_status === 5 && control !== "S") {
  //     control = "N";
  //     newStatus = 6; // Liberado
  //     paramMail = 4; // Planeacion
  //   }
  //   // Gerencia no se controla
  //   if (acceso === "A" && factcab[0].cod_status < 4 && control !== "S") {
  //     control = "N";
  //     newStatus = 4; // Pendiente Admin
  //     paramMail = 2; // Administracion
  //   }

  //   // //setNewStatus(newStatus);
  //   dispatch(GetMails(paramMail));

  //   // console.log("Log Data");
  //   // console.log("usuario:", id_usuario);
  //   // console.log("Factura:", found.id, "Status", factcab[0].cod_status);
  //   // console.log("Control:", control);
  //   console.log("newStatus: ", newStatus);
  //   console.log("paramMail: ", paramMail);
  //   console.log("mails: ",mails);
  //   // //setIdFact(factcab[0].id);
  //   // setIdMail(paramMail);
  //   // dispatch(UpdateFacturaSts(factcab[0].id, newStatus)); // Espera Aprobacion

  //   for (var indxMail = 0; indxMail < mails.length; indxMail++) {
  //     console.log("enviar mail: ", mails[indxMail].email);
  //     dispatch(mailEnviar(crearMail(newStatus, mails[indxMail].email, found)));
  //   }
  //   dispatch(UpdateFacturaSts(factcab[0].id, newStatus)); // Espera Aprobacion
  //   handleShow();
  //   //window.location.href = "/factura";
  // };

  // console.log("total: ", total);
  // console.log("usuariomenu: ", usuariomenu);
  // console.log("acceso: ", acceso);
  console.log("condiciones: ", condiciones);

  if (factcond.length !== 0 && condiciones) {
    console.log("factcond: ", factcond);
    setTieneCG(1);
    for (var xi = 0; xi < condiciones.length; xi++) {
      if (factcond[0].cond_id === condiciones[xi].id) {
        condiciones[xi].descuento = factcond[0].descuento;
        condiciones[xi].enganche = factcond[0].enganche;
        condiciones[xi].meses = factcond[0].meses;
        condiciones[xi].interes = factcond[0].interes;
        condiciones[xi].sel = "S";
      } else {
        condiciones[xi].sel = " ";
      }
    }
    factcond.splice(0, factcond.length);
  }

  if (factcab.length > 0) {
    if (factcab[0].cod_status !== 1) {
      setbtnGrabar(false);
    }
    return (
      <>
        <Header />
        <div>
          <div className="cabecera ">
            <div className="row gap-1">
              <div className="row">
                <div className="col">
                  Cliente:&nbsp;
                  {/* <!--input className='input_fact'
                    type="text"
                    id="cli_id"
                    name="cli_id"
                    value={factcab[0].cli_id}
                    onChange={(e) => handleTipo(e, 0)}
                  /--> */}
                  &nbsp;{factcab[0].nombre}
                </div>
                <div className="col">Fecha: {factcab[0].fecha}</div>
              </div>
              <div className="row">
                <div className="col" colSpan="2">
                  <b>Domicilio</b>
                </div>
                <div className="col">
                  Estado :<b>{factcab[0].status}</b>{" "}
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-end">Calle</div>
                <div className="col-8 text-start" colSpan="2">
                  {factcab[0].calle}
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-end">Localidad CP</div>
                <div className="col-8 text-start" colSpan="2">
                  {factcab[0].localidad} ({factcab[0].cp})
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-end">Ciudad</div>
                <div className="col-8 text-start" colSpan="2">
                  {factcab[0].ciudad}
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-end">Pais</div>
                <div className="col-8 text-start" colSpan="2">
                  {factcab[0].pais}
                </div>
              </div>
            </div>
          </div>
          <br />
          <div>
            <div className="detalleCab divProd">
              <div className="detalle">
                <table className="table table-striped bg-white">
                  <thead>
                    <tr className="table-success">
                      <th>Id</th>
                      <th>Descripcion</th>
                      <th>Precio</th>
                      <th>Cantidades</th>
                      <th>Total</th>
                      <th colSpan={2}>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {factdet &&
                      factdet.map((fact, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <input
                                className="input_fact"
                                type="text"
                                id="prod_id"
                                name="prod_id"
                                value={fact.prod_id}
                                onChange={(e) => handleTipo(e, { i })}
                              />
                            </td>
                            <td>{fact.name}</td>
                            {fact.precio > 0 ? (
                              <td className="totaltr">
                                {dollarUSLocale.format(fact.precio)}
                              </td>
                            ) : (
                              <td className="incluido" colSpan={3}>
                                Incluido
                              </td>
                            )}
                            {fact.precio > 0 ? (
                              <td>
                                <input
                                  className="input_fact"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  value={fact.cantidad}
                                  onChange={(e) => handleTipo(e, { i })}
                                ></input>
                              </td>
                            ) : null}
                            {fact.precio > 0 ? (
                              <td className="totaltr">
                                {dollarUSLocale.format(fact.total)}
                              </td>
                            ) : null}
                            {acceso === "A" ? (
                              <td onClick={() => handleRemove(i)}>
                                <FcDeleteRow
                                  style={estilo}
                                  onMouseEnter={({ target }) =>
                                    (target.style.fontSize = "200%")
                                  }
                                  onMouseLeave={({ target }) =>
                                    (target.style.fontSize = "150%")
                                  }
                                />
                              </td>
                            ) : (
                              <td>&nbsp;</td>
                            )}
                            {acceso === "A" ? (
                              <td onClick={() => handleFree(i)}>
                                <FcMinus
                                  style={estilo}
                                  title="Precio 0"
                                  onMouseEnter={({ target }) =>
                                    (target.style.fontSize = "200%")
                                  }
                                  onMouseLeave={({ target }) =>
                                    (target.style.fontSize = "150%")
                                  }
                                />
                              </td>
                            ) : (
                              <td>&nbsp;</td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {acceso === "A" ? (
                  <div className="addprod">
                    <p onClick={() => handleAdd()}>
                      <FcAddRow
                        style={estilo}
                        onMouseEnter={({ target }) =>
                          (target.style.fontSize = "200%")
                        }
                        onMouseLeave={({ target }) =>
                          (target.style.fontSize = "150%")
                        }
                      />
                      Agregar Producto
                    </p>
                  </div>
                ) : null}
                <div className="addprod addprod2">
                  <textarea
                    type="text"
                    id="observ"
                    cols="80"
                    rows="5"
                    name="observ"
                    value={factcab[0].observ}
                    placeholder="Observaciones"
                    onChange={(e) => handleTipo(e)}
                    className="txtarea"
                  />
                </div>
                <div className="total">
                  <table>
                    <tbody>
                      <tr className="totaltr">
                        <td colSpan="3" className="totaltd1">
                          Subtotal:
                        </td>
                        <td className="totaltd2">
                          <b>{dollarUSLocale.format(subTotal)}</b>
                        </td>
                      </tr>
                      {factcab[0].moneda === 1 ? (
                        <tr className="totaltr">
                          <td colSpan="3" className="totaltd1">
                            IVA({porciva[0].valor}%)
                          </td>
                          <td className="totaltd2">
                            <b>{dollarUSLocale.format(saleTax.toFixed(0))}</b>
                          </td>
                        </tr>
                      ) : null}
                      {factcab[0].moneda > 1 ? (
                        <tr className="totaltr">
                          <td colSpan="3" className="totaltd1">
                            Costo de Envio:&nbsp;
                          </td>
                          <td>
                            <input
                              className="costoEnvio"
                              type="text"
                              id="dhl"
                              name="dhl"
                              value={factcab[0].dhl}
                              onChange={(e) => handleTipo(e, 0)}
                            />
                          </td>
                        </tr>
                      ) : null}
                      <tr className="totaltr">
                        <td colSpan="3" className="totaltd1">
                          <b>TOTAL A PAGAR</b>
                        </td>
                        <td className="totaltd2">
                          <b>{dollarUSLocale.format(total.toFixed(0))}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                {/* Condiciones Generales  */}
                <div className="addprod addprod2">
                  <table className="table table-striped bg-white">
                    <thead>
                      <tr className="table-success">
                        <th>Metodo de Pago</th>
                        <th>Descuento</th>
                        <th>Enganche</th>
                        <th>Meses</th>
                        <th>Interes Anual</th>
                        <th>Opcion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {condiciones &&
                        condiciones.map((cond, i) => {
                          if (cond.sel === "S") {
                            var xEnganche = (total * cond.enganche) / 100;
                            var xFinanciar = total - xEnganche;
                            var xAnos = cond.meses / 12;
                            var xPorMes =
                              xFinanciar * (cond.interes / 100) * xAnos;
                            var xPagoMens = (xFinanciar + xPorMes) / cond.meses;
                            var xTotal = xPagoMens * cond.meses;
                            if (cond.id === 1) {
                              xEnganche = 0;
                              xFinanciar = 0;
                              xTotal = total;
                              return (
                                <>
                                  <tr key={i * 10}>
                                    <td>{cond.nombre}</td>
                                    <td colSpan={4}>&nbsp;</td>
                                    <td>
                                      <input
                                        type="radio"
                                        id="miCheck"
                                        name="miCheck"
                                        checked
                                        onChange={(e) => handleTipo(e, { i })}
                                      ></input>
                                    </td>
                                  </tr>
                                  <tr key={121}>
                                    <td>&nbsp;</td>
                                    <td colSpan={3}>Total a Pagar</td>
                                    <td className="totaltr">
                                      {dollarUSLocale.format(xTotal.toFixed(0))}
                                    </td>
                                  </tr>
                                </>
                              );
                            }
                            if (cond.id === 2) {
                              xEnganche = 0;
                              xFinanciar = 0;
                              xTotal = total - (total * cond.descuento) / 100;
                            }
                            return (
                              <>
                                <tr key={i * 12}>
                                  <td>{cond.nombre}</td>
                                  <td>
                                    <input
                                      className="input_fact"
                                      type="text"
                                      id="CGdesc"
                                      name="CGdesc"
                                      value={cond.descuento}
                                      onChange={(e) => handleTipo(e, { i })}
                                    ></input>
                                    %
                                  </td>
                                  <td>
                                    <input
                                      className="input_fact"
                                      type="text"
                                      id="CGenganche"
                                      name="CGenganche"
                                      value={cond.enganche}
                                      onChange={(e) => handleTipo(e, { i })}
                                    ></input>
                                    %
                                  </td>
                                  <td>
                                    <input
                                      className="input_fact"
                                      type="text"
                                      id="CGmeses"
                                      name="CGmeses"
                                      value={cond.meses}
                                      onChange={(e) => handleTipo(e, { i })}
                                    ></input>
                                  </td>
                                  <td>
                                    <input
                                      className="input_fact"
                                      type="text"
                                      id="CGinter"
                                      name="CGinter"
                                      value={cond.interes}
                                      onChange={(e) => handleTipo(e, { i })}
                                    ></input>
                                    %
                                  </td>
                                  <td>
                                    <input
                                      type="radio"
                                      id="miCheck"
                                      name="miCheck"
                                      checked
                                      onChange={(e) => handleTipo(e, { i })}
                                    ></input>
                                  </td>
                                </tr>
                                <tr key={i * 13}>
                                  <td>&nbsp;</td>
                                  <td colSpan={3}>Total Factura</td>
                                  <td className="totaltr">
                                    {dollarUSLocale.format(total.toFixed(0))}
                                  </td>
                                </tr>
                                {xEnganche !== 0 ? (
                                  <>
                                    <tr key={i * 14}>
                                      <td>&nbsp;</td>
                                      <td colSpan={3}>Enganche</td>
                                      <td className="totaltr">
                                        {dollarUSLocale.format(
                                          xEnganche.toFixed(0)
                                        )}
                                      </td>
                                    </tr>
                                    <tr key={i * 15}>
                                      <td>&nbsp;</td>
                                      <td colSpan={3}>Saldo a financiar</td>
                                      <td className="totaltr">
                                        {dollarUSLocale.format(
                                          xFinanciar.toFixed(0)
                                        )}
                                      </td>
                                    </tr>
                                    <tr key={i * 16}>
                                      <td>&nbsp;</td>
                                      <td colSpan={2}>
                                        {cond.meses} Pagos Mensuales
                                      </td>
                                      <td>Interes del {cond.interes} %</td>
                                      <td className="totaltr">
                                        {dollarUSLocale.format(
                                          xPagoMens.toFixed(0)
                                        )}
                                      </td>
                                    </tr>
                                  </>
                                ) : null}
                                <tr key={i * 17}>
                                  <td>&nbsp;</td>
                                  <td colSpan={3}>Total a Pagar</td>
                                  <td className="totaltr">
                                    {dollarUSLocale.format(xTotal.toFixed(0))}
                                  </td>
                                </tr>
                              </>
                            );
                          } else {
                            return (
                              <tr key={i}>
                                <td>{cond.nombre}</td>
                                <td>
                                  <input
                                    className="input_fact"
                                    type="text"
                                    id="CGdesc"
                                    name="CGdesc"
                                    value={cond.descuento}
                                    onChange={(e) => handleTipo(e, { i })}
                                  ></input>
                                  %
                                </td>
                                <td>
                                  <input
                                    className="input_fact"
                                    type="text"
                                    id="CGenganche"
                                    name="CGenganche"
                                    value={cond.enganche}
                                    onChange={(e) => handleTipo(e, { i })}
                                  ></input>
                                  %
                                </td>
                                <td>
                                  <input
                                    className="input_fact"
                                    type="text"
                                    id="CGmeses"
                                    name="CGmeses"
                                    value={cond.meses}
                                    onChange={(e) => handleTipo(e, { i })}
                                  ></input>
                                </td>
                                <td>
                                  <input
                                    className="input_fact"
                                    type="text"
                                    id="CGinter"
                                    name="CGinter"
                                    value={cond.interes}
                                    onChange={(e) => handleTipo(e, { i })}
                                  ></input>
                                  %
                                </td>
                                <td>
                                  <input
                                    type="radio"
                                    id="miCheck"
                                    name="miCheck"
                                    onChange={(e) => handleTipo(e, { i })}
                                  ></input>
                                </td>
                              </tr>
                            );
                          }
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <br />
            <div className="footer">
              <table>
                <tbody>
                  <tr className="totaltr">
                    {acceso === "A" && btnGrabar ? (
                      <td>
                        <Button
                          variant="success"
                          type="submit"
                          block
                          onClick={handleSubmit}
                        >
                          Grabar
                        </Button>
                      </td>
                    ) : (
                      <td>&nbsp;</td>
                    )}
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td>
                      <Button
                        variant="primary"
                        type="submit"
                        block
                        onClick={() => {
                          navigate("/factura");
                        }}
                      >
                        Volver
                      </Button>
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    {/* {btnAprobar ? (
                      <td>
                        <Button
                          variant="success"
                          type="submit"
                          block
                          onClick={() => {
                            handleApprove();
                          }}
                        >
                          Aprobar
                        </Button>
                      </td>
                    ) : null} */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal show={show}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OkForm ruta={rutaOk} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    // console.log("Logeo de Errores");
    // console.log("factcab: ", factcab);
    // console.log("factdet: ", factdet);
    // console.log("initialFacdet: ", initialFacdet);
    // console.log("input: ", input);
    // console.log("factcond: ", factcond);
    // console.log("condiciones: ", condiciones);
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    return (
      <div>
        <h3>Cargando...</h3>
      </div>
    );
  }
}

export default Formfactura;
