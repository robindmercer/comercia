import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Pdf from "react-to-pdf";
// Iconos
import { FcLeft } from "react-icons/fc";

// Acciones
import { getCotizacionDet } from "../../actions/cotizaciondet";
import { getCotizacionCab } from "../../actions/cotizacion";
import { getDetailIva } from "../../actions/tabla";
import { getUsuariomenId } from "../../actions/usuariomenu";
import { getCondicionesCot } from "../../actions/cotizacioncond";
import { getTablaAll } from "../../actions/tabla";
// Descuentos
import { getDetail } from "../../actions/tabla";

// CSS
import style from "../../css/Pdf.module.css";

import imagen from "../../images/LogoNibbot.png";

const ref = React.createRef();
// var campos del PDF
var xCliente = "Cliente";
var xFecha = "Fecha";
var xUnidad = "Unidad";
var xDescripcion = "Descripción";
var xPrecio = "Precio";
var xCant = "Cant";
var xTotal = "Total";
var xIncluido = "Incluido";
var xTotPag = "TOTAL A PAGAR";
var xCond = "Condiciones Generales";
var xImporte = "Importe";
var xIva = "Iva";
var xProdName = "";
var xProdDescrip = "";
var xEngancheTit = "Enganche";
var xSaldo = "Saldo a financiar";
var xPagosMens = "Pagos Mensuales";
var xInteres = "Interes del";
var xTablaId = 9;
var xTerminos = "Terminos y Condiciones";
var xDHL = "Costos de Envio";
var pdfFilename = "cotizacion_";
var xMoneda = "$";
var xCotizacion="COTIZACION"
var xDireccion="Direccion"
var xTelefono="Telefono:"
var xEmail = "E-Mail";
var xVendedor = "Vendedor";

const FormcotizPDF = () => {
   // Manejo acceso del Usuario
   const navigate = useNavigate();
   const id_usuario = localStorage.getItem("usuario");
   const { cotizacioncab } = useSelector((state) => state);
   const { cotizaciondet } = useSelector((state) => state);
   const { cotizacioncond } = useSelector((state) => state);
   const { porciva } = useSelector((state) => state);
   const estilo2 = { fontSize: "200%" };
   const tabla = useSelector((state) => state.tabla);
   const actlogin = useSelector((state) => state.actlogin);
   const dispatch = useDispatch();

   // const [subTotal, setSubTotal] = useState(0);
   // const [saleTax, setSaleTax] = useState(0);
   // const [saleDesc, setSaleDesc] = useState(0);
   // const [total, setTotal] = useState(0);

   const location = useLocation();
   const { state } = location;
   // Formato Numeros
   const dollarUSLocale = Intl.NumberFormat("de-DE");

   // eslint-disable-next-line no-unused-vars
   const [inputDet, setInputDet] = useState({
      fac_id: 0,
      orden: 0,
      prod_id: 0,
      precio: 0,
      cantidad: 0,
      total: 0,
   });

   useEffect(() => {
      dispatch(getDetailIva(1));
      dispatch(getDetail(2));
      dispatch(getCotizacionCab(state.idfact));
      dispatch(getCotizacionDet(state.idfact));
      dispatch(getCondicionesCot(state.idfact));
      dispatch(getUsuariomenId(id_usuario));
      dispatch(getTablaAll());
      //setInput(input.fac_id=1)
      // return (
      //   dispatch(resetFact())
      // )
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch, id_usuario]);

   function imprimir(){
         document.querySelector("#left").style.display='none';
         document.querySelector("#imprimir").style.display='none';
         window.print()
         document.querySelector("#left").style.display='';
         document.querySelector("#imprimir").style.display='';
   }



   console.log(
      "formFactura---------------------------------------------------"
   );
   console.log("state.idfact ", state.idfact);
   console.log("tabla: ", tabla);
   // console.log("usuariomenu: ", usuariomenu);
   console.log("actlogin: ", actlogin);
   console.log("cotizacioncab: ", cotizacioncab);
   console.log("cotizaciondet: ", cotizaciondet);
   console.log(
      "formFactura---------------------------------------------------"
   );

   if (cotizacioncab.length > 0) {
      if (cotizacioncab[0].moneda === 2) {
         xCliente = "Client";
         xFecha = "Date";
         xUnidad = "Units";
         xDescripcion = "Description";
         xPrecio = "Price";
         xCant = "Amount";
         xTotPag = "Total Payment USD";
         xCond = "General Conditions";
         xImporte = "Amount";
         xIncluido = "Included";
         xIva = "Tax";
         xEngancheTit = "First Payment";
         xSaldo = "Finance";
         xPagosMens = "Monthy Payments";
         xInteres = "Interes Rate";
         xTablaId = 2;
         xTerminos = "Conditions";
         xDHL = "Shipping Costs";
         xMoneda = "USD";
         xCotizacion="QUOTATION"
      }
      if (cotizacioncab[0].moneda === 2) {
         xTablaId = 11;
      }
      if (cotizacioncab[0].moneda === 2 && cotizacioncab[0].idioma === 1) {
         xTablaId = 10;
      }
   }

   // console.log("xTablaId: ", xTablaId);
   console.log('cotizacioncond: ', cotizacioncond);
   if (cotizacioncab.length > 0) {
      if (pdfFilename === "cotizacion_") {
         pdfFilename = pdfFilename + cotizacioncab[0].id;
      }
      return (
         <>
            <div ref={ref} className={style.Post}>
               <div className={style.hr}>
                  &nbsp;
               </div>
               <div>
                  <div className={style.row}>
                     <div>
                        <img height="49px" width="200px" src={imagen} alt="" />
                     </div>
                     <div>

                     <div className={style.titNumber}>&nbsp;<b>{xCotizacion} N°: {cotizacioncab[0].id}</b></div>
                     </div>
                  </div>
               </div>
               <div className={style.cabecera}>
                  <div>
                     <div className={style.colCab3}>
                        <div>
                           {xCliente} : &nbsp;<b>{cotizacioncab[0].nombre}</b>
                        </div>
                        <div>
                           <div>
                              {xFecha}: <b>{cotizacioncab[0].fecha}</b>
                           </div>
                        </div>
                     </div>
                     {cotizacioncab[0].direccion !==''  ? (
                        <div className={style.colCab0}>
                           <div>
                              {xDireccion}: <b>{cotizacioncab[0].direccion}</b>
                           </div>
                        </div>
                     ):null}
                     <div className={style.colCab3}>
                        {cotizacioncab[0].telefono !==''  ? (
                              <div>
                                 {xTelefono}: <b>{cotizacioncab[0].telefono}</b>
                              </div>
                        ):null}
                        {cotizacioncab[0].email !==''  ? (
                              <div>
                                 {xEmail}: <b>{cotizacioncab[0].email}</b>
                           </div>
                        ):null}
                     </div>
                     <div className={style.colCab3}>
                        <div>
                                 {xVendedor}: <b>{actlogin[0].name}</b>
                        </div>
                        <div>
                                 Email: <b>{actlogin[0].email}</b>
                        </div>
                     </div>
                  </div>
               </div>
               <br />
               <div className={style.detalleCab}>
                  <div className={style.detalle}>
                     <table className="table table-striped bg-white">
                        <thead>
                           <tr className={style.unidades}>
                              <th>{xUnidad}</th>
                              <th>{xDescripcion}</th>
                              <th>{xCant}</th>
                              <th>{xPrecio}</th>
                              <th>{xTotal}</th>
                           </tr>
                        </thead>
                        <tbody>
                           {cotizaciondet &&
                              cotizaciondet.map((fact, i) => {
                                 xProdName = fact.name;
                                 xProdDescrip = fact.description;
                                 if (cotizacioncab[0].moneda === 2)
                                    xProdName = fact.nameext;
                                 if (cotizacioncab[0].moneda === 2)
                                    xProdDescrip = fact.descripext;
                                 return (
                                    <tr key={i}>
                                       <td>{xProdName}</td>
                                       <td>{xProdDescrip}</td>
                                       {fact.precio > 0 ? (
                                          <td>{fact.cantidad}</td>
                                       ) : null}
                                       {fact.precio > 0 ? (
                                          <td className="totaltr">{xMoneda}
                                             {dollarUSLocale.format(
                                                fact.precio
                                             )}
                                          </td>
                                       ) : (
                                          <td
                                             className={style.incluido}
                                             colSpan={3}
                                          >
                                             {xIncluido}
                                          </td>
                                       )}
                                       {fact.precio > 0 ? (
                                          <td className="totaltr">{xMoneda}
                                             {dollarUSLocale.format(fact.total)}
                                          </td>
                                       ) : null}
                                    </tr>
                                 );
                              })}
                        </tbody>
                     </table>
                     <div className="total">
                        <table>
                           <tbody>
                              <tr className="totaltr">
                                 <td colSpan="3" className="totaltd1">
                                    Subtotal:
                                 </td>
                                 <td className="totaltd2">{xMoneda}
                                    {dollarUSLocale.format(
                                       cotizacioncab[0].subtotal
                                    )}
                                 </td>
                              </tr>
                              {cotizacioncab[0].moneda !== 2 ? (
                                 <tr className="totaltr">
                                    <td colSpan="3" className="totaltd1">
                                       {xIva}({porciva[0].valor}%)
                                    </td>
                                    <td className="totaltd2">{xMoneda}
                                       {dollarUSLocale.format(
                                          cotizacioncab[0].iva
                                       )}
                                    </td>
                                 </tr>
                              ) : null}
                              {cotizacioncab[0].dhl > 0 ? (
                                 <tr className="totaltr">
                                    <td colSpan="3" className="totaltd1">
                                       {xDHL}
                                    </td>
                                    <td className="totaltd2">{xMoneda}
                                       {dollarUSLocale.format(
                                          cotizacioncab[0].dhl
                                       )}
                                    </td>
                                 </tr>
                              ) : null}
                              <tr className="totaltr">
                                 <td colSpan="3">
                                    <b>{xTotPag}</b>
                                 </td>
                                 <td className="totaltd2">{xMoneda}
                                    {dollarUSLocale.format(
                                       cotizacioncab[0].total
                                    )}
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                     {cotizacioncab[0].observ !== "" ? (
                        <div className={style.cabecera}>
                           <p className={style.addprod2p}>
                              {cotizacioncab[0].observ}
                           </p>
                        </div>
                     ) : null}
                  </div>
               </div>
               {/* Condiciones Generales  */}
               {cotizacioncond.length > 0 &&
                  parseInt(cotizacioncond[0].cond_id) > 1 ? (
                  <div  className={style.cabeceraCondGral}>
                     <table>
                        <thead>
                           <tr >
                              <th colSpan={3}>{xCond}</th>
                           </tr>
                           <tr >
                              <th>{xDescripcion}</th>
                              <th>&nbsp;</th>
                              <th>{xImporte}</th>
                           </tr>
                        </thead>
                        <tbody>
                           {cotizacioncond &&
                              cotizacioncond.map((cond, i) => {
                                 console.log("cond: ", cond);
                                 console.log('cond.cond_id: ', cond.cond_id);
                                 var xEnganche = (cotizacioncab[0].total * cond.enganche) /100;
                                 var xFinanciar = cotizacioncab[0].total - xEnganche;
                                 var xAnos = cond.meses / 12;
                                 var xPorMes =xFinanciar * (cond.interes / 100) * xAnos;
                                 var xPagoMens =(xFinanciar + xPorMes) / cond.meses;
                                 var xTotal = xPagoMens * cond.meses;
                                 if (cond.cond_id === 1) {
                                    xEnganche = 0;
                                    xFinanciar = 0;
                                    xTotal = cotizacioncab[0].total;
                                    return (
                                       <>
                                          <tr key={i * 10}>
                                             <td>{cond.nombre}</td>
                                             <td colSpan={2}>&nbsp;</td>
                                          </tr>
                                          <tr>
                                             <td>{xTotPag}</td>
                                             <td className="totaltr">
                                                {dollarUSLocale.format(xTotal)}
                                             </td>
                                          </tr>
                                       </>
                                    );
                                 }
                                 if (cond.cond_id === 2) {
                                    xEnganche = 0;
                                    xFinanciar = 0;
                                    var xDescuento =
                                       (cotizacioncab[0].total *
                                          cond.descuento) /
                                       100;
                                    xTotal =
                                       cotizacioncab[0].total -
                                       (cotizacioncab[0].total *
                                          cond.descuento) /
                                          100;
                                    return (
                                       <>
                                          <tr>
                                             <td colSpan={2}>Total Factura</td>
                                             <td className="totaltr">
                                                {dollarUSLocale.format(
                                                   cotizacioncab[0].total
                                                )}
                                             </td>
                                          </tr>
                                          <tr>
                                             <td colSpan={2}>
                                                Descuento{" "}
                                                {dollarUSLocale.format(
                                                   cond.descuento.toFixed(0)
                                                )}
                                                %
                                             </td>
                                             <td className="totaltr">
                                                {dollarUSLocale.format(
                                                   xDescuento.toFixed(0)
                                                )}
                                             </td>
                                          </tr>
                                          <tr>
                                             <td colSpan={2}>{xTotPag}</td>
                                             <td className="totaltr">
                                                {dollarUSLocale.format(
                                                   xTotal.toFixed(0)
                                                )}
                                             </td>
                                          </tr>
                                       </>
                                    );
                                 }
                                 if (parseInt(cond.cond_id) > 2) {
                                    console.log('mayor a 3');
                                    return (
                                       <>
                                          <tr>
                                             <td colSpan={2}>Total</td>
                                             <td className="totaltr">
                                                {dollarUSLocale.format(
                                                   cotizacioncab[0].total
                                                )}
                                             </td>
                                          </tr>
                                          {xEnganche !== 0 ? (
                                             <>
                                                <tr>
                                                   <td colSpan={2}>
                                                      {xEngancheTit}
                                                   </td>
                                                   <td className="totaltr">
                                                      {dollarUSLocale.format(
                                                         xEnganche.toFixed(0)
                                                      )}
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td colSpan={2}>{xSaldo}</td>
                                                   <td className="totaltr">
                                                      {dollarUSLocale.format(
                                                         xFinanciar.toFixed(0)
                                                      )}
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td>
                                                      {cond.meses} {xPagosMens}
                                                   </td>
                                                   <td>
                                                      {xInteres} {cond.interes}{" "}
                                                      %
                                                   </td>
                                                   <td className="totaltr">
                                                      {dollarUSLocale.format(
                                                         xPagoMens.toFixed(0)
                                                      )}
                                                   </td>
                                                </tr>
                                             </>
                                          ) : null}
                                          <tr>
                                             <td colSpan={2}>{xTotPag}</td>
                                             <td className="totaltr">
                                                {dollarUSLocale.format(
                                                   xTotal.toFixed(0)
                                                )}
                                             </td>
                                          </tr>
                                       </>
                                    );
                                 }
                              })}
                        </tbody>
                     </table>
                  </div>
               ) : null}
               <div className={style.terminos}>
                  <table >
                     <thead>
                        <th>{xTerminos}</th>
                     </thead>
                     {tabla &&
                        tabla.map((tabla) => {
                           if (tabla.id === xTablaId && tabla.cod !== 0) {
                              return (
                                 <tr>
                                    <td>{`${tabla.description}`}</td>
                                 </tr>
                              );
                           } else {
                              return null;
                           }
                        })}
                  </table>
               </div>
               <div className={style.nibbot}>
                  {/* <p>
                     NIBBOT INTERNATIONAL - RFC NIN180922KJ2 - San Luis, S.L.P.
                     info@nibbot.com.mx (55) 8842 7884
                  </p> */}
                  {tabla &&
                        tabla.map((tabla) => {
                           if (tabla.id === 12 && tabla.cod === 1) {
                              return (
                                    <p>{`${tabla.description}`}</p>
                              );
                           } else {
                              return null;
                           }
                        })}                  
               </div>
            <div className={style.hr}>&nbsp;</div>
            </div>
            <div id="left">
               <FcLeft
                  style={estilo2}
                  title="Volver"
                  onClick={() => {
                     navigate("/cotizacion");
                  }}
               />
            </div>
            {/* <Pdf targetRef={ref} filename={pdfFilename}>
               {({ toPdf }) => <button onClick={toPdf}>Crear PDF</button>}
            </Pdf> */}
            <div id="imprimir">
            {/* <button className="dontPrint" onClick={() => window.print()}> Capture as PDF </button> */}
            <button className="dontPrint" onClick={() => imprimir()}> Capture as PDF </button>
            </div>
         </>
      );
   } else {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log("Logeo de Errores");
      console.log("cotizacioncab: ", cotizacioncab);
      console.log("cotizaciondet: ", cotizaciondet);
      console.log("cotizacioncond: ", cotizacioncond);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      return (
         <div>
            <h3>Cargando...</h3>
         </div>
      );
   }
};

export default FormcotizPDF;
