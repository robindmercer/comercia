// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getCondiciones } from "../../actions/condiciones";

// Acciones
// import { getFacturaDet } from '../../actions/factdet';
import { getClienteId } from "../../actions/cliente";
import { getDireccion } from "../../actions/direccion";
import { AddFactura } from "../../actions/factura";
import { getProducto } from "../../actions/producto";
import { getDetailIva } from "../../actions/tabla";
import { getUsuariomenId } from "../../actions/usuariomenu";

// Descuentos
import { getDetail } from "../../actions/tabla";
// Modal
import OkForm from "../modal/OkForm";
import { Modal, Button } from "react-bootstrap";

// Iconos
import { FcAddRow, FcDeleteRow, FcLeft, FcOk } from "react-icons/fc";
import Header from "../Header";
// CSS
import "../../css/factdet.css";
import Cookies from 'universal-cookie'
var btnGrabar = false;
// var btnAgregar = false;
var btnEliminarReg = false;

const Formfactura = () => {
  const cookies = new Cookies();
  let fecha = new Date().toLocaleDateString("en-GB");

  // Manejo acceso del Usuario
  //const usuariomenu = useSelector((state) => state.usuariomenu);
  const [acceso, setAcceso] = useState("A");
  // const idProg = 11;

  const id_usuario = cookies.get("usuario");
  const navigate = useNavigate();
  const { cliente } = useSelector((state) => state);
  const { direccion } = useSelector((state) => state);
  const { factcab } = useSelector((state) => state);
  const { factdet } = useSelector((state) => state);
  const { porciva } = useSelector((state) => state);
  const { producto } = useSelector((state) => state);
  // const { tabla } = useSelector((state) => state);
  // const { idfact } = useSelector((state) => state)

  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const estilo = { fontSize: "150%", transition: "font-size 0.5s" };
  const estilo2 = { fontSize: "200%" };

  const [onChange, setOnChange] = useState(false);
  // const [onIva, setOnIva] = useState(false)

  const [subTotal, setSubTotal] = useState(0);
  const [DirCode, setDirCode] = useState(0);
  const [saleTax, setSaleTax] = useState(0);

  const [saleDHL, setSaleDHL] = useState(0);
  const [total, setTotal] = useState(0);
  const [mostrar, setMostrar] = useState(false);

  // Formato Numeros
  const dollarUSLocale = Intl.NumberFormat("de-DE");
  // Modal Funcitons -----------------------------------
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [rutaOk, setRutaOk] = useState("./factura");
  const { condiciones } = useSelector((state) => state);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleClose();

    return () => {
      handleShowAlert();
    };
  }, [showAlert]);
  // End Modal Funcitons -----------------------------------

  const [input, setInput] = useState({
    cli_id: 0,
    dir_id: 0,
    fac_id: 0,
    subtotal: 0,
    iva: 0,
    total: 0,
    observ: "",
    cod_status: 1,
    dhl: 0,
    moneda: 0,
    idioma: 0,
    fecha: new Date().toLocaleDateString("en-GB"),
  });

  const [inputDet, setInputDet] = useState({
    fac_id: 0,
    orden: 0,
    prod_id: 0,
    precio: 0,
    cantidad: 0,
    total: 0,
  });

  const initialProductLine = {
    prod_id: "",
    cantidad: 1,
    description: "",
    fac_id: 0,
    orden: factcab.length,
    precio: 0,
    total: 0,
  };

  const condGral = {
    id: 0,
    cot_id: 0,
    cond_id: 0,
    descuento: 0,
    enganche: 0,
    meses: 0,
    interes: 0,
  };
  const initialHead = {
    cli_id: state.idCli,
    dir_id: 0,
    fac_id: 0,
    subtotal: "0",
    iva: "0",
    descuento: "0",
    total: "0",
    observ: "",
    cod_status: 1,
    idioma: 0,
    moneda: 0,
    fecha: new Date().toLocaleDateString("en-GB"),
  };

  // Manejo de Botones a ver

  const control = () => {
    // btnGrabar = false;
    // console.log(
    //   "control1: ",
    //   btnGrabar,
    //   btnAgregar,
    //   btnEliminarReg,
    //   acceso.substring(0, 1)
    // );
    //btnAgregar = false;
    btnEliminarReg = false;
    if (acceso.substring(0, 1) === "A") {
      // Gerencia All
      //btnAgregar = true;
      btnEliminarReg = true;
    }
    if (acceso.substring(0, 1) === "C") {
      // Consulta
      btnGrabar = false;
      //btnAgregar = false;
      btnEliminarReg = false;
    }
    // console.log("control2: ", btnGrabar, btnAgregar, btnEliminarReg);
  };

  // var cantidad = []
  //console.log('factcab: ', factcab.length);
  if (factcab.length === 0) {
    factcab.push(initialHead);
    console.log("initialHead: ", initialHead);
  }

  useEffect(() => {
    dispatch(getCondiciones());
    dispatch(getDetail(2));
    dispatch(getProducto());
    dispatch(getClienteId(state.idCli));
    dispatch(getDireccion(state.idCli));
    dispatch(getDetailIva(1));
    dispatch(getUsuariomenId(id_usuario));
    setMostrar(true);
    setAcceso(cookies.get("acceso"))
    // return (
    //   dispatch(resetFact())
    //   )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // useEffect(() => {
  //   if (onChange) {
  //   }
  // }, [onChange, factdet])



  // Calculo subtotal
  useEffect(() => {
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
        if (cliente[0].moneda === 1) {
          iva = subTotal * (parseFloat(porciva[0].valor) / 100);
          setSaleTax(iva);
        }
        total = subTotal + iva;
        setTotal(total);
      } else {
        setSaleTax(0);
        setTotal(0);
      }
    }
  }, [onChange, factdet, porciva, cliente]);

  useEffect(() => {
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
      if (subTotal > 0) {
        if (cliente[0].moneda === 1) {
          iva = aux * (parseFloat(porciva[0].valor) / 100);
        }
        setSaleTax(iva);
        if (saleDHL.length === 0) setSaleDHL(0);
        var total = aux + iva + parseInt(saleDHL);
        setTotal(total);
      }
    }
  }, [onChange, saleDHL]);

  const handleRemove = (i) => {
    factdet.splice(i, 1);
    if (onChange) {
      setOnChange(false);
    } else {
      setOnChange(true);
    }
  };

  const handleAdd = () => {
    factdet.push(initialProductLine);
    //    console.log('factdet: ', factdet);
    if (onChange) {
      setOnChange(false);
    } else {
      setOnChange(true);
    }
  };
  const handleSubmit = () => {
    // console.log("SubMit");
    var newDate1 = fecha.split("/");
    const newdate = newDate1[2] + newDate1[1] + newDate1[0];
    // console.log('saleTax: ', saleTax);
    // console.log('Total: ', total);
    factcab[0].subtotal = subTotal;
    factcab[0].iva = saleTax;
    factcab[0].total = total;
    factcab[0].dir_id = parseInt(DirCode);
    setInput((input.subtotal = subTotal));
    setInput((input.iva = saleTax));
    setInput((input.total = total));
    setInput((input.dir_id = DirCode));
    setInput((input.cli_id = factcab[0].cli_id));
    setInput((input.fecha = newdate));
    setInput((input.idioma = cliente[0].idioma));
    setInput((input.moneda = cliente[0].moneda));
    //Condiciones Generales de Pago
    const found = condiciones.find((element) => element.sel === "S");
    console.log("found: ", found);
    if (found) {
      condGral.id = 0;
      condGral.cot_id = 0;
      condGral.cond_id = found.id;
      condGral.descuento = found.descuento;
      condGral.enganche = found.enganche;
      condGral.meses = found.meses;
      condGral.interes = found.interes;
    } else {
      condGral.id = 0;
      condGral.fac_id = 0;
      condGral.cond_id = 1;
      condGral.descuento = 0;
      condGral.enganche = 0;
      condGral.meses = 0;
      condGral.interes = 0;
    }
    // console.log("factcab: ", factcab[0]);
    // console.log("factdet: ", factdet);
    // console.log('cliente: ', cliente);
    // console.log("input: ", input);
    if (subTotal === 0) {
      return alert("O/C no puede quedar en 0 (Cero)");
    }
    //console.log('i f d',input, factdet, inputDet);
    dispatch(AddFactura(input, factdet, inputDet, condGral));
    handleShow();
    //window.location.href = "/factura";
  };

  function handleTipo(e, i) {
    e.preventDefault();
    if (e.target.name === "dhl") {
      input.dhl = e.target.value;
      console.log("e.target.name: ", e.target.name, e.target.value, input);
      setSaleDHL(e.target.value);
    }
    if (e.target.name === "dhl") {
      input.dhl = e.target.value;
      console.log("e.target.name: ", e.target.name, e.target.value, input);
      setSaleDHL(e.target.value);
    }
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
      condiciones[i.i].descuento = e.target.value.replace(",", ".");
    }
    if (e.target.name === "CGenganche") {
      condiciones[i.i].enganche = e.target.value.replace(",", ".");
    }
    if (e.target.name === "CGmeses") {
      condiciones[i.i].meses = e.target.value;
    }
    if (e.target.name === "CGinter") {
      condiciones[i.i].interes = e.target.value.replace(",", ".");
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
      input.observ = e.target.value;
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }
    if (e.target.name === "domi") {
      setDirCode(e.target.value);
      if (e.target.value > 0) btnGrabar = true;
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
      console.log("e.target.name: ", e.target.name, e.target.value, producto);
      if (e.target.value === "0") {
        handleRemove(i.i);
      } else {
        for (var z = 0; z < producto.length; z++) {
          if (parseInt(producto[z].id) === parseInt(e.target.value)) {
            factdet[i.i].prod_id = e.target.value;
            factdet[i.i].name = producto[z].name;
            if (cliente[0].moneda === 2) {
              factdet[i.i].precio = producto[z].dolar;
            } else {
              factdet[i.i].precio = producto[z].price;
            }
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
  
  // console.log("Cliente_1: ", cliente, state.idCli);
  console.log("acceso: ", acceso);
  console.log("total: ", total);
  console.log("saleDHL: ", saleDHL);
  
  // console.log('factcab: ', factcab);
  // console.log('factdet: ', factdet);
  // console.log('porciva: ', porciva,porciva.length);
  console.log("inp: ", input);
  //   if (porciva.length === 1){
    //     if (onIva) {
      //       setOnIva(false)
      //     } else {
        //       setOnIva(true)
        //     }
        // }
        console.log("cliente: ", cliente);
        console.log('condiciones: ', condiciones);
  if (mostrar && factcab.length > 0) {
    control();
    return (
      <>
        <Header />
        <div>
          <div className="cabeceraAlta">
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
                  &nbsp;{cliente[0].nombre}
                </div>
                {/* <div className='col'>Cliente:&nbsp;
                  <input className='input_fact'
                    type="text"
                    id="cli_id"
                    name="cli_id"
                    value={factcab[0].cli_id}
                    onChange={(e) => handleTipo(e, 0)}
                    />
                  &nbsp;{factcab[0].nombre}</div> */}
                <div className="col">Fecha: {fecha}</div>
              </div>
              <div>
                <label
                  htmlFor="tipocli"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Seleccione Domicilio:
                </label>
                <select name="domi" id="domi" onChange={(e) => handleTipo(e)}>
                  <option value="0">Seleccionar</option>
                  {direccion &&
                    direccion.map((direc) => {
                      return (
                        <option value={direc.orden} key={direc.orden}>{`${
                          direc.calle + " - " + direc.localidad
                        }`}</option>
                      );
                    })}
                </select>
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
                      <th>&nbsp;</th>
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
                            {btnEliminarReg ? (
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
                            ) : null}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
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
                <div className="addprod addprod2">
                  <textarea
                    type="text"
                    id="observ"
                    cols="80"
                    rows="5"
                    name="observ"
                    value={input ? input.observ : ""}
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
                          {dollarUSLocale.format(subTotal)}
                        </td>
                      </tr>
                      {cliente[0].moneda === 1 ? (
                        <tr className="totaltr">
                          <td colSpan="3" className="totaltd1">
                            IVA({porciva[0].valor}%)
                          </td>
                          <td className="totaltd2">
                            {dollarUSLocale.format(saleTax.toFixed(0))}
                          </td>
                        </tr>
                      ) : null}
                      {cliente[0].moneda > 0 ? (
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
                        <td colSpan="3">
                          {cliente[0].moneda === 2 ? (
                            <b>TOTAL A PAGAR USD.</b>
                          ) : (
                            <b>TOTAL A PAGAR</b>
                          )}
                        </td>
                        <td className="totaltd2">
                          {dollarUSLocale.format(total.toFixed(0))}
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
                            var xTotal2 = total
                            var xDescuento = (total * cond.descuento) / 100;
                            xTotal2 = xTotal2 - xDescuento
                            var xEnganche = (xTotal2 * cond.enganche) / 100;
                            var xFinanciar = xTotal2 - xEnganche;
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
                                  <tr key={i + 1}>
                                    <td>
                                      {cond.nombre} {i}
                                    </td>
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
                                  <tr key={i * 11}>
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
                                  <td colSpan={3}>Total Cotizacion</td>
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
                    {btnGrabar ? (
                      <td colSpan="3">
                        <FcOk
                          style={estilo2}
                          title="Grabar OC"
                          onClick={handleSubmit}
                        />
                      </td>
                    ) : null}
                    <td>
                      <FcLeft
                        style={estilo2}
                        title="Volver"
                        onClick={() => {
                          navigate("/cliente");
                        }}
                      />
                    </td>
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
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }
};

export default Formfactura;
