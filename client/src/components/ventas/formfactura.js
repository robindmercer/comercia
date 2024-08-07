// eslint-disable-next-line

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
// Acciones
import { getFacturaDet } from "../../actions/factdet";
import { getFacturaCab, UpdateFactura2 } from "../../actions/factura";
import { getDetailIva } from "../../actions/tabla";
import { getProducto } from "../../actions/producto";
//import { getClienteId } from "../../actions/cliente";
import { getCondiciones, getCondicionesFac } from "../../actions/condiciones";

import { getUsuariomenId } from "../../actions/usuariomenu";
// Descuentos
import { getDetail } from "../../actions/tabla";

// Iconos
import { FcDeleteRow, FcAddRow, FcOk, FcLeft } from "react-icons/fc";
import Header from "../Header";
// CSS
import "../../css/factdet.css";
import Cookies from "universal-cookie";
import controlAccesos from "../../controlAcceso";
//const Formfactura = () => {
function Formfactura() {
   const cookies = new Cookies();
   const navigate = useNavigate();
   // Manejo acceso del Usuario
   const usuariomenu = useSelector((state) => state.usuariomenu);
   const [acceso, setAcceso] = useState("A");
   const idProg = 11;

   const id_usuario = cookies.get("usuario");
   const { factcab } = useSelector((state) => state);
   const { factdet } = useSelector((state) => state);
   const { porciva } = useSelector((state) => state);
   // const tabla = useSelector((state) => state.tabla);
   const { producto } = useSelector((state) => state);
   const dispatch = useDispatch();
   const location = useLocation();
   const { state } = location;
   // Condiciones generales
   const { condiciones } = useSelector((state) => state);
   const { factcond } = useSelector((state) => state);
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

   // botones
   var btnAgregar = false; //true;
   var btnElimProd = false; //true;
   var btnGrabar = true;

   // eslint-disable-next-line no-unused-vars
   const [inputDet, setInputDet] = useState({
      fac_id: 0,
      orden: 0,
      prod_id: 0,
      precio: 0,
      cantidad: 0,
      total: 0,
      descto: 0,
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
      descto: 0,
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
      //dispatch(getDetail(1));
      dispatch(getProducto());
      dispatch(getDetailIva(1));
      dispatch(getDetail(2));
      dispatch(getFacturaCab(state.idfact));
      dispatch(getFacturaDet(state.idfact));
      dispatch(getUsuariomenId(id_usuario));
      dispatch(getCondiciones());
      dispatch(getCondicionesFac(state.idfact));
      setAcceso(cookies.get("acceso"));
      if (factcab.length > 0) {
         console.log("factcab ok: ", factcab, " lenght ", factcab.length);
         setSaleDHL(factcab[0].dhl);
      }
   }, []);

   useEffect(() => {
      if (onChange) {
      }
   }, [onChange, factdet]);

   // Calculo subtotal
   useEffect(() => {
      console.log("useEffect: ", 1);
      let subTotal = 0;
      let iva = 0;
      let total = 0;
      if (factcab) {
         if (factdet && porciva) {
            factdet.forEach((fact) => {
               if (fact.precio > 0) {
                  const quantityNumber = parseFloat(fact.cantidad);
                  const rateNumber = parseFloat(fact.precio);
                  var amount =
                     quantityNumber && rateNumber
                        ? quantityNumber * rateNumber
                        : 0;
                  if (fact.descto !== 0) {
                     amount = amount - (amount * fact.descto) / 100;
                  }
                  subTotal += amount;
               }
            });
            setSubTotal(subTotal);
            console.log("subTotal: ", subTotal);
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
               subTotal = 0;
               setSaleTax(0);
               setTotal(0);
            }
         }
      }
      console.log("total: ", total);
      console.log("factdet: ", factdet);
   }, [onChange, factdet]);

   useEffect(() => {
      console.log("useEffect: ", 2);
      var aux = 0;
      var iva = 0;
      if (factdet && porciva) {
         factdet.forEach((fact) => {
            const quantityNumber = parseFloat(fact.cantidad);
            const rateNumber = parseFloat(fact.precio);
            var amount =
               quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;
            if (fact.descto !== 0) {
               amount = amount - (amount * fact.descto / 100)
               } 
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
      // console.log("factdet: ", factdet);
      if (onChange) {
         setOnChange(false);
      } else {
         setOnChange(true);
      }
   };

   function handleTipo(e, i) {
      e.preventDefault();
      if (e.target.name === "dhl") {
         factcab[0].dhl = e.target.value;
         setSaleDHL(e.target.value);
      }
      // console.log("i: ", i);
      // console.log("e.target.name: ", e.target.name);
      // console.log("e.target.value: ", e.target.value);
      if (e.target.name === "miCheck") {
         // for (var xcond = 0; xcond < condiciones.length; xcond++) {
         //    condiciones[xcond].sel = " ";
         // }
         // condiciones[i.i].sel = "S";
         // console.log("miCheck condiciones: ", condiciones);
         if (condiciones[i.i].sel !== "S") {
            condiciones[i.i].sel = "S";
         } else {
            condiciones[i.i].sel = "";
         }

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
      if (e.target.name === "descuento") {
         factdet[i.i].descto = e.target.value;
         factdet[i.i].total = parseInt(factdet[i.i].cantidad * (factdet[i.i].precio - (factdet[i.i].precio * (e.target.value/100))));
         console.log('descto: ', factdet[i.i].descto);
         console.log('total: ', factdet[i.i].total);
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
                  if (producto[z].cod_status === 1) {
                     factdet[i.i].fac_id = state.idfact;
                     factdet[i.i].prod_id = e.target.value;
                     factdet[i.i].name = producto[z].name;
                     factdet[i.i].precio = producto[z].price;
                     factdet[i.i].total =
                        factdet[i.i].cantidad * factdet[i.i].precio - (factdet[i.i].precio * factdet[i.i].descto / 100 );;
                  } else {
                     Swal.fire({
                        title: "Aviso...",
                        text: `Producto ${producto[z].description} Congelado`,
                        icon: "error", // You can customize the icon (info, success, warning, error, question)
                        confirmButtonText: "OK",
                        // You can add more customization options as needed
                     }).then((result) => {
                        // Handle the result if needed
                        if (result.isConfirmed) {
                           // Code for 'OK' response
                        } else {
                           // Code for 'Cancel' response or other actions
                        }
                     });
                  }
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
      setInput((input.dhl = factcab[0].dhl));
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

      console.log("state.idfact: ", state.idfact);
      // console.log("factcab: ", factcab);
      console.log("input: ", input);
      console.log("factdet: ", factdet);
      console.log("initialFacdet: ", initialFacdet);
      // console.log("factcond: ", factcond);
      // console.log("condiciones: ", condiciones);
      // console.log("tieneCG",tieneCG );

      // if (factcab[0].subtotal === 0) {
      //   alert("La Orden de Compra no puede quedar en 0");
      //   return;
      // }
      // dispatch(UpdateFactura(input, factdet, inputDet));
      dispatch(UpdateFactura2(input, factdet, inputDet, initialFacdet));
      // dispatch(PostCondicionesFac(initialFacdet));
      //window.location.href = "/factura";
   };

   // console.log("total: ", total);
   // console.log("usuariomenu: ", usuariomenu);
   // console.log("acceso: ", acceso);
   // console.log("porciva: ", porciva);

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
      // } else {
      //   factcond.push(initialFacdet);
   }
   console.log("factcab", factcab);

   if (factcab.length > 0 && condiciones.length > 0) {
      if (factcab[0].cod_status > 2 && acceso === "A3") {
         btnAgregar = false;
         btnElimProd = false;
         btnGrabar = false;
      }
      if (factcab[0].cod_status >= 6 && acceso === "A2") {
         // administracion
         btnAgregar = false;
         btnElimProd = false;
         btnGrabar = false;
      }

      if (acceso === "A8") {
         // Calidad no puede modificar las OC.
         btnAgregar = false;
         btnElimProd = false;
         btnGrabar = false;
      }
      btnGrabar = controlAccesos(usuariomenu, idProg);
      return (
         <>
            <Header />
            <div>
               <div className="cabecera ">
                  <div className="row gap-1">
                     <div className="row">
                        <div className="col">
                           Cliente:&nbsp; &nbsp;{factcab[0].nombre}
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
                                 <th>Dto.</th>
                                 <th>Total</th>
                                 <th>&nbsp;</th>
                              </tr>
                           </thead>
                           <tbody>
                              {factdet &&
                                 factdet.map((fact, i) => {
                                    return (
                                       <tr key={i}>
                                          <td>{fact.prod_id}</td>
                                          <td>{fact.name}</td>
                                          {fact.precio > 0 ? (
                                             <td className="totaltr">
                                                {dollarUSLocale.format(
                                                   fact.precio
                                                )}
                                             </td>
                                          ) : (
                                             <td
                                                className="incluido"
                                                colSpan={3}
                                             >
                                                Incluido
                                             </td>
                                          )}
                                          {fact.precio > 0 ? (
                                             <td>{fact.cantidad}</td>
                                          ) : null}
                                          {fact.precio > 0 ? (
                                             <td>{fact.descto}</td>
                                          ) : null}                                             
                                          {fact.precio > 0 ? (
                                             <td className="totaltr">
                                                {dollarUSLocale.format(
                                                   fact.total
                                                )}
                                             </td>
                                          ) : null}
                                          {btnElimProd ? (
                                             <td
                                                onClick={() => handleRemove(i)}
                                             >
                                                <FcDeleteRow
                                                   style={estilo}
                                                   onMouseEnter={({ target }) =>
                                                      (target.style.fontSize =
                                                         "200%")
                                                   }
                                                   onMouseLeave={({ target }) =>
                                                      (target.style.fontSize =
                                                         "150%")
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
                        {btnAgregar ? (
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
                                          <b>
                                             {dollarUSLocale.format(
                                                saleTax.toFixed(0)
                                             )}
                                          </b>
                                       </td>
                                    </tr>
                                 ) : null}
                                 {factcab[0].moneda > 0 ? (
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
                                       <b>
                                          {dollarUSLocale.format(
                                             total.toFixed(0)
                                          )}
                                       </b>
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
                                          var xTotal2 = total - saleDHL;
                                          var xDescuento = 0
                                             // (total * cond.descuento) / 100;
                                          xTotal2 = xTotal2 - xDescuento;
                                          var xEnganche =
                                             (xTotal2 * cond.enganche) / 100;
                                          var xFinanciar = xTotal2 - xEnganche;
                                          var xAnos = cond.meses / 12;
                                          var xPorMes =
                                             xFinanciar *
                                             (cond.interes / 100) *
                                             xAnos;
                                          var xPagoMens =
                                             (xFinanciar + xPorMes) /
                                             cond.meses;
                                          var aux2 = xPagoMens * cond.meses;
                                          aux2 += parseInt(saleDHL);
                                          var xTotal = parseInt(aux2);
                                          // var xTotal = xPagoMens * cond.meses;
                                          // if (cond.id === 1) {
                                          //    xEnganche = 0;
                                          //    xFinanciar = 0;
                                          //    xTotal = total;
                                          //    return (
                                          //       <>
                                          //          <tr key={i + 100}>
                                          //             <td>{cond.nombre}</td>
                                          //             <td colSpan={4}>
                                          //                &nbsp;
                                          //             </td>
                                          //             <td>
                                          //                <input
                                          //                   type="checkbox"
                                          //                   id="miCheck"
                                          //                   name="miCheck"
                                          //                   checked
                                          //                   onChange={(e) =>
                                          //                      handleTipo(e, {
                                          //                         i,
                                          //                      })
                                          //                   }
                                          //                ></input>
                                          //             </td>
                                          //          </tr>
                                          //          <tr key={i + 120}>
                                          //             <td>&nbsp;</td>
                                          //             <td colSpan={3}>
                                          //                Total a Pagar
                                          //             </td>
                                          //             <td className="totaltr">
                                          //                {dollarUSLocale.format(
                                          //                   xTotal.toFixed(0)
                                          //                )}
                                          //             </td>
                                          //          </tr>
                                          //       </>
                                          //    );
                                          // }
                                          // if (cond.id === 2) {
                                          //    xEnganche = 0;
                                          //    xFinanciar = 0;
                                          //    var aux = total - saleDHL;
                                          //    aux = parseInt(
                                          //       aux -
                                          //          (aux * cond.descuento) / 100
                                          //    );
                                          //    aux += parseInt(saleDHL);
                                          //    xTotal = parseInt(aux);
                                          //    // xEnganche = 0;
                                          //    // xFinanciar = 0;
                                          //    // xTotal =
                                          //    //    total -
                                          //    //    (total * cond.descuento) / 100;
                                          // }
                                          return (
                                             <>
                                                <tr key={i + 130}>
                                                   <td>{cond.nombre}</td>
                                                   <td>
                                                      <input
                                                         className="input_fact"
                                                         type="text"
                                                         id="CGenganche"
                                                         name="CGenganche"
                                                         value={cond.enganche}
                                                         onChange={(e) =>
                                                            handleTipo(e, { i })
                                                         }
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
                                                         onChange={(e) =>
                                                            handleTipo(e, { i })
                                                         }
                                                      ></input>
                                                   </td>
                                                   <td>
                                                      <input
                                                         className="input_fact"
                                                         type="text"
                                                         id="CGinter"
                                                         name="CGinter"
                                                         value={cond.interes}
                                                         onChange={(e) =>
                                                            handleTipo(e, { i })
                                                         }
                                                      ></input>
                                                      %
                                                   </td>
                                                   <td>
                                                      <input
                                                         type="checkbox"
                                                         id="miCheck"
                                                         name="miCheck"
                                                         checked
                                                         onChange={(e) =>
                                                            handleTipo(e, { i })
                                                         }
                                                      ></input>
                                                   </td>
                                                </tr>
                                                <tr key={i + 140}>
                                                   <td>&nbsp;</td>
                                                   <td colSpan={3}>
                                                      Total Factura
                                                   </td>
                                                   <td className="totaltr">
                                                      {dollarUSLocale.format(
                                                         parseInt(
                                                            total - saleDHL
                                                         )
                                                      )}
                                                   </td>
                                                </tr>
                                                {xEnganche !== 0 ? (
                                                   <>
                                                      <tr key={i + 150}>
                                                         <td>&nbsp;</td>
                                                         <td colSpan={3}>
                                                            Enganche
                                                         </td>
                                                         <td className="totaltr">
                                                            {dollarUSLocale.format(
                                                               xEnganche.toFixed(
                                                                  0
                                                               )
                                                            )}
                                                         </td>
                                                      </tr>
                                                      <tr key={i + 160}>
                                                         <td>&nbsp;</td>
                                                         <td colSpan={3}>
                                                            Saldo a financiar
                                                         </td>
                                                         <td className="totaltr">
                                                            {dollarUSLocale.format(
                                                               xFinanciar.toFixed(
                                                                  0
                                                               )
                                                            )}
                                                         </td>
                                                      </tr>
                                                      <tr key={i + 170}>
                                                         <td>&nbsp;</td>
                                                         <td colSpan={2}>
                                                            {cond.meses} Pagos
                                                            Mensuales
                                                         </td>
                                                         <td>
                                                            Interes del{" "}
                                                            {cond.interes} %
                                                         </td>
                                                         <td className="totaltr">
                                                            {dollarUSLocale.format(
                                                               xPagoMens.toFixed(
                                                                  0
                                                               )
                                                            )}
                                                         </td>
                                                      </tr>
                                                   </>
                                                ) : null}
                                                <tr>
                                                   <td>&nbsp;</td>
                                                   <td colSpan={3}>
                                                      Total a Pagar
                                                   </td>
                                                   <td className="totaltr">
                                                      {dollarUSLocale.format(
                                                         xTotal.toFixed(0)
                                                      )}
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
                                                      id="CGenganche"
                                                      name="CGenganche"
                                                      value={cond.enganche}
                                                      onChange={(e) =>
                                                         handleTipo(e, { i })
                                                      }
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
                                                      onChange={(e) =>
                                                         handleTipo(e, { i })
                                                      }
                                                   ></input>
                                                </td>
                                                <td>
                                                   <input
                                                      className="input_fact"
                                                      type="text"
                                                      id="CGinter"
                                                      name="CGinter"
                                                      value={cond.interes}
                                                      onChange={(e) =>
                                                         handleTipo(e, { i })
                                                      }
                                                   ></input>
                                                   %
                                                </td>
                                                <td>
                                                   <input
                                                      type="checkbox"
                                                      id="miCheck"
                                                      name="miCheck"
                                                      onChange={(e) =>
                                                         handleTipo(e, { i })
                                                      }
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
                     <div>
                        <div>
                           <table>
                              <tbody>
                                 <tr className="totaltr">
                                    {btnGrabar ? (
                                       <td>
                                          <FcOk
                                             style={estilo2}
                                             title="Crear OC"
                                             onClick={handleSubmit}
                                          />
                                       </td>
                                    ) : (
                                       <td>&nbsp;</td>
                                    )}
                                    <td>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </td>
                                    <td>
                                       <FcLeft
                                          style={estilo2}
                                          title="Volver"
                                          onClick={() => {
                                             navigate("/factura");
                                          }}
                                       />
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </>
      );
   } else {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log("Logeo de Errores");
      console.log("factcab: ", factcab);
      console.log("factdet: ", factdet);
      console.log("initialFacdet: ", initialFacdet);
      console.log("input: ", input);
      console.log("factcond: ", factcond);
      console.log("condiciones: ", condiciones);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      return (
         <div>
            <h3>Cargando...</h3>
            {factcab.length > 0 ? (
               <p>Cabecara OC ok</p>
            ) : (
               <p>Buscando datos Cabecera</p>
            )}
            {factdet.length > 0 ? (
               <p>Productos ok</p>
            ) : (
               <p>Buscando Productos</p>
            )}
            {condiciones.length > 0 ? (
               <p>Condicion de Pago ok</p>
            ) : (
               <p>Buscando Condicion de Pago</p>
            )}
         </div>
      );
   }
}

export default Formfactura;
