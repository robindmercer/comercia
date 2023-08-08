// eslint-disable-next-line

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
// Acciones
import { getCotizacionCab, UpdateCotizacion } from "../../actions/cotizacion";
import { getCotizacionDet } from "../../actions/cotizaciondet";

import { getDetailIva } from "../../actions/tabla";
import { getProducto } from "../../actions/producto";
//import { getClienteId } from "../../actions/cliente";

import { getCondiciones, PostCondicionesCot } from "../../actions/condiciones";
import { getCondicionesCot } from "../../actions/cotizacioncond";

import { getUsuariomenId } from "../../actions/usuariomenu";
// Descuentos
import { getDetail } from "../../actions/tabla";

// Iconos
import { FcDeleteRow, FcAddRow, FcOk, FcLeft, FcMinus } from "react-icons/fc";
import Header from "../Header";
// CSS
import "../../css/factdet.css";

// Modal
import OkForm from "../modal/OkForm";
import { Modal, Button, Alert } from "react-bootstrap";
import Cookies from 'universal-cookie'

function Formcotizacion() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  // Manejo acceso del Usuario
  // const usuariomenu = useSelector((state) => state.usuariomenu);
  const [acceso, setAcceso] = useState("A");
  const idProg = 11;

  const id_usuario = cookies.get("usuario");
  const { cotizacioncab } = useSelector((state) => state);
  const { cotizaciondet } = useSelector((state) => state);
  const { cotizacioncond } = useSelector((state) => state);

  const tabla = useSelector((state) => state.tabla);
  const { producto } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  // Condiciones generales
  const { condiciones } = useSelector((state) => state);
  //const { cliente } = useSelector((state) => state);

  const [onChange, setOnChange] = useState(false);

  const [subTotal, setSubTotal] = useState(0);
  const [saleTax, setSaleTax] = useState(0);
  const [tieneCG, setTieneCG] = useState(0);
  const [total, setTotal] = useState(0);
  const [saleDHL, setSaleDHL] = useState(0);
  // Formato Numeros
  const dollarUSLocale = Intl.NumberFormat("de-DE");
  // Estilos
  const estilo = { fontSize: "150%", transition: "font-size 0.5s" };
  const estilo2 = { fontSize: "200%" };

  // For Modal Only
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [rutaOk, setRutaOk] = useState("./cotizacion");

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

  const porciva = cookies.get("porciva");

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
    fecha: "",
    nombre: "",
    moneda: 1,
    telefono:'',
    direccion:'',
    email:'',
    vendedor:cookies.get("usuario"),

  });

  const initialProductLine = {
    cantidad: 1,
    description: "",
    fac_id: 1,
    name: "",
    orden: cotizacioncab.length,
    precio: 0,
    prod_id: "",
    total: 0,
  };
  const initialFacdet = {
    id: 0,   //0 nueva condicion 1 ya tiene condicion es para el insert o update 
    fac_id: state.idCotiz,
    cond_id: 0,
    descuento: 0,
    enganche: 0,
    meses: 0,
    interes: 0,
  };

  // var cantidad = []

  useEffect(() => {
    //dispatch(getDetail(1));
    dispatch(getProducto());
    dispatch(getDetailIva(1));
    dispatch(getDetail(2));
    dispatch(getCotizacionCab(state.idCotiz));
    dispatch(getCotizacionDet(state.idCotiz));
    dispatch(getUsuariomenId(id_usuario));
    dispatch(getCondiciones());
    dispatch(getCondicionesCot(state.idCotiz));
    dispatch(getDetail(8));
    //dispatch(getClienteId(state.idCli));
    // console.log("useeffect");
    setAcceso(cookies.get("acceso"))
    console.log("state.idCotiz: ", state.idCotiz);
    if (cotizacioncab.length > 0) {
      console.log(
        "cotizacioncab ok: ",
        cotizacioncab,
        " lenght ",
        cotizacioncab.length
      );
      setSaleDHL(cotizacioncab[0].dhl);
    }
  }, [dispatch, id_usuario]);

  useEffect(() => {
    if (onChange) {
    }
  }, [onChange, cotizaciondet]);

  // Calculo subtotal
  useEffect(() => {
    console.log("useEffect: ", 1);
    let subTotal = 0;
    let iva = 0;
    let total = 0;
    if (cotizaciondet && porciva) {
      cotizaciondet.forEach((fact) => {
        const quantityNumber = parseFloat(fact.cantidad);
        if (fact.precio > 0) {
          const rateNumber = parseFloat(fact.precio);
          const amount =
            quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;
          subTotal += amount;
        }
      });
      setSubTotal(subTotal);
      if (subTotal > 0) {
        if (cotizacioncab[0].moneda === 1) {
          iva = subTotal * (parseFloat(porciva) / 100);
          setSaleTax(iva);
        }
        setSaleTax(iva);
        setSaleDHL(cotizacioncab[0].dhl);
        total = subTotal + iva + parseInt(cotizacioncab[0].dhl);
        setTotal(total);
      } else {
        setSaleTax(0);
        setTotal(0);
      }
    }
    console.log("total: ", total);
  }, [onChange, cotizaciondet]);

  //console.log("cliente: ", cliente);
  // console.log("state.idCli: ", state.idCli);

  useEffect(() => {
    console.log("useEffect: ", 2);
    var aux = 0;
    var iva = 0;
    if (cotizaciondet && porciva) {
      cotizaciondet.forEach((fact) => {
        const quantityNumber = parseFloat(fact.cantidad);
        if (fact.precio > 0) {
          const rateNumber = parseFloat(fact.precio);
          const amount =
            quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;
          aux += amount;
        }
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
        if (cotizacioncab[0].moneda === 1) {
          iva = aux * (parseFloat(porciva) / 100);
        }
        setSubTotal(aux);
        setSaleTax(iva);
        if (saleDHL.length === 0) setSaleDHL(0);
        var total = aux + iva + parseInt(saleDHL);
        setTotal(total);
        console.log("total: ", total);
      }
    }
  }, [onChange, saleDHL]);

  const handleRemove = (i) => {
    cotizaciondet.splice(i, 1);
    if (onChange) {
      setOnChange(false);
    } else {
      setOnChange(true);
    }
  };
  const handleFree = (i) => {
    cotizaciondet[i].precio = -1;
    cotizaciondet[i].total = -1;
    if (onChange) {
      setOnChange(false);
    } else {
      setOnChange(true);
    }
  };
  const handleAdd = () => {
    cotizaciondet.push(initialProductLine);
    // console.log("cotizaciondet: ", cotizaciondet);
    if (onChange) {
      setOnChange(false);
    } else {
      setOnChange(true);
    }
  };

  function handleTipo(e, i) {
    e.preventDefault();
    if (e.target.name === "dhl") {
      cotizacioncab[0].dhl = e.target.value;
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
      cotizacioncab[0].observ = e.target.value;
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }

    if (e.target.name === "cli_id") {
      console.log("busco", e.target.value);
      cotizacioncab[0].cli_id = e.target.value;
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }
    if (e.target.name === "quantity") {
      cotizaciondet[i.i].cantidad = e.target.value;
      cotizaciondet[i.i].total =
        cotizaciondet[i.i].cantidad * cotizaciondet[i.i].precio;
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
            cotizaciondet[i.i].fac_id = state.idCotiz;
            cotizaciondet[i.i].prod_id = e.target.value;
            cotizaciondet[i.i].name = producto[z].name;
            cotizaciondet[i.i].precio = producto[z].price;
            cotizaciondet[i.i].total =
              cotizaciondet[i.i].cantidad * cotizaciondet[i.i].precio;
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
    //     setInput(input.cli_id = cotizacioncab[0].cli_id);
    //console.log('DirCode: ', DirCode);
    console.log("handleSubmit--------------------------------------");
    // console.log("subTotal: ", subTotal.toFixed(0));
    // console.log("saleTax: ", saleTax.toFixed(0));
    // console.log("Total: ", total.toFixed(0));
    if (cotizacioncab[0].subtotal === 0) {
      alert("La Orden de Compra no puede quedar en 0");
      return;
    }
    cotizacioncab[0].subtotal = subTotal.toFixed(0);
    cotizacioncab[0].iva = saleTax.toFixed(0);
    cotizacioncab[0].total = total.toFixed(0);
    console.log("cotizacioncab: ", cotizacioncab);
    const found = condiciones.find((element) => element.sel === "S");
    console.log("found: ", found);

    setInput((input.id = cotizacioncab[0].id));
    setInput((input.subtotal = subTotal.toFixed(0)));
    setInput((input.iva = saleTax.toFixed(0)));
    setInput((input.total = total.toFixed(0)));
    setInput((input.observ = cotizacioncab[0].observ));
    setInput((input.nombre = cotizacioncab[0].nombre));
    setInput((input.moneda = cotizacioncab[0].moneda));
    // Grabo Cabecera y detalles
    dispatch(UpdateCotizacion(input, cotizaciondet, inputDet));
    
    if (found) {
      if (tieneCG === 1) {
        initialFacdet.id = 1; // si ya tiene una C.General grabada el id es siempre 1
      } else {
        initialFacdet.id = 0;
      }
      initialFacdet.fac_id = state.idCotiz;
      initialFacdet.cond_id = found.id;
      initialFacdet.descuento = found.descuento;
      initialFacdet.enganche = found.enganche;
      initialFacdet.meses = found.meses;
      initialFacdet.interes = found.interes;
      dispatch(PostCondicionesCot(initialFacdet));
    }
    console.log("state.idCotiz: ", state.idCotiz);
    console.log("input: ", input);
    console.log("cotizaciondet: ", cotizaciondet);
    console.log('inputDet: ', inputDet);
    
    console.log("cotizacioncab: ", cotizacioncab);
    console.log("initialFacdet: ", initialFacdet);
    console.log("cotizacioncond: ", cotizacioncond);
    console.log("condiciones: ", condiciones);
    console.log("tieneCG", tieneCG);
    console.log("handleSubmit END");

    handleShow();
    //window.location.href = "/cotizacion";
  };

  // console.log("total: ", total);
  // console.log("usuariomenu: ", usuariomenu);
  // console.log("acceso: ", acceso);

  if (cotizacioncond.length !== 0 && condiciones) {
    console.log("cotizacioncond: ", cotizacioncond,cotizacioncond.length);
    console.log("condiciones: ", condiciones);
    setTieneCG(1);
    for (var xi = 0; xi < condiciones.length; xi++) {
      if (cotizacioncond[0].cond_id === condiciones[xi].id) {
        condiciones[xi].descuento = cotizacioncond[0].descuento;
        condiciones[xi].enganche = cotizacioncond[0].enganche;
        condiciones[xi].meses = cotizacioncond[0].meses;
        condiciones[xi].interes = cotizacioncond[0].interes;
        condiciones[xi].sel = "S";
      } else {
        condiciones[xi].sel = " ";
      }
    }
    cotizacioncond.splice(0, cotizacioncond.length);
    // } else {
    //   cotizacioncond.push(initialFacdet);
  }
  // console.log("cotizacioncab", cotizacioncab);
  // console.log("cotizacioncab: ", cotizacioncab);
  // console.log("cotizaciondet: ", cotizaciondet);
  // console.log("cotizacioncond: ", cotizacioncond);
  // console.log("use efect")
  // console.log('id_usuario: ', id_usuario);
  // console.log('cotizaciondet: ', cotizaciondet);
  // console.log('cotizaciondet: ', cotizaciondet);

  if (cotizacioncab.length > 0) {
    return (
      <>
        <Header />
        <div>
          <div className="cabeceraAlta ">
            <div className="row gap-1">
              <div className="row">
                <div className="col">
                  Cotizacion : &nbsp;{cotizacioncab[0].id}
                </div>
                <div className="col">Fecha:{cotizacioncab[0].fecha}</div>
              </div>
              <div>
                <label htmlFor="nombre">Nombre : </label>
                <input
                  className="input_text"
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={cotizacioncab[0].nombre}
                  onChange={(e) => handleTipo(e, 0)}
                ></input>
                <label htmlFor="nombre">Direccion : </label>
                <input
                  className="input_text"
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={cotizacioncab[0].direccion}
                  onChange={(e) => handleTipo(e, 0)}
                ></input>&nbsp;
                <label htmlFor="nombre">Telefono : </label>
                <input
                  className="input_text"
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={cotizacioncab[0].telefono}
                  onChange={(e) => handleTipo(e, 0)}
                ></input>&nbsp;
                <label htmlFor="nombre">Email : </label>
                <input
                  className="input_text"
                  type="text"
                  id="email"
                  name="email"
                  value={cotizacioncab[0].email}
                  onChange={(e) => handleTipo(e, 0)}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="tipocli"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Seleccione Moneda:
                </label>
                <select
                  name="selMoneda"
                  id="selMoneda"
                  value={parseInt(cotizacioncab[0].moneda)}
                  onChange={(e) => handleTipo(e)}
                >
                  <option value="0">Seleccionar</option>
                  <option value="1">Peso Mex.</option>
                  <option value="2">Dolar</option>
                  {/* {tabla &&
                    tabla.map((tabla) => {
                      if (tabla.id === 8 && tabla.cod !== 0) {
                        return (
                          <option
                            value={tabla.cod}
                            key={tabla.cod}
                          >{`${tabla.description}`}</option>
                        );
                      } else {
                        return null;
                      }
                    })} */}
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
                      <th colSpan={2}>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cotizaciondet &&
                      cotizaciondet.map((fact, i) => {
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
                                  title="Eliminar Producto"
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
                            {acceso === "A" && fact.precio > 0 ? (
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
                    value={cotizacioncab[0].observ}
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
                        <tr className="totaltr">
                          <td colSpan="3" className="totaltd1">
                            IVA({porciva}%)
                          </td>
                          <td className="totaltd2">
                            <b>{dollarUSLocale.format(saleTax.toFixed(0))}</b>
                          </td>
                        </tr>
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
                              value={cotizacioncab[0].dhl}
                              onChange={(e) => handleTipo(e, 0)}
                            />
                          </td>
                        </tr>
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
                                  <tr key={i + 100}>
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
                                  <tr key={i + 200}>
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
                                <tr key={i + 300}>
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
                                <tr key={i + 400}>
                                  <td>&nbsp;</td>
                                  <td colSpan={3}>Total Cotizacion</td>
                                  <td className="totaltr">
                                    {dollarUSLocale.format(total.toFixed(0))}
                                  </td>
                                </tr>
                                {xEnganche !== 0 ? (
                                  <>
                                    <tr key={i + 500}>
                                      <td>&nbsp;</td>
                                      <td colSpan={3}>Enganche</td>
                                      <td className="totaltr">
                                        {dollarUSLocale.format(
                                          xEnganche.toFixed(0)
                                        )}
                                      </td>
                                    </tr>
                                    <tr key={i + 600}>
                                      <td>&nbsp;</td>
                                      <td colSpan={3}>Saldo a financiar</td>
                                      <td className="totaltr">
                                        {dollarUSLocale.format(
                                          xFinanciar.toFixed(0)
                                        )}
                                      </td>
                                    </tr>
                                    <tr key={i + 700}>
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
                                <tr key={i +800}>
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
                              <tr key={i+900}>
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
            <div  className="footer">
              <table>
                <tbody>
                  <tr className="totaltr">
                    {acceso.substring(0,1) === "A" ? (
                      <td>
                        <Button
                          variant="success"
                          type="submit"
                          block
                          onClick={handleSubmit}>
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
                          navigate("/cotizacion");}}>
                        Volver
                      </Button>                      
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
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log("Logeo de Errores");
    console.log("state.idCotiz: ", state.idCotiz);
    console.log("cotizacioncab: ", cotizacioncab);
    console.log("cotizaciondet: ", cotizaciondet);
    console.log("initialFacdet: ", initialFacdet);
    console.log("input: ", input);
    console.log("cotizacioncond: ", cotizacioncond);
    console.log("condiciones: ", condiciones);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  }
}

export default Formcotizacion;
