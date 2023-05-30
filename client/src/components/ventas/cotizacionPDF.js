// https://rawgit.com/MrRio/jsPDF/master/docs/index.html
// https://gaam-akhar.ir/assets/jspdf/docs/jsPDF.html
// Colores
// https://www.rapidtables.com/web/color/RGB_Color.html

import { jsPDF } from "jspdf";
import Imagen from "../../images/logos.png";
import ImagenWait from "../../images/Spinner-5.gif";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Acciones
import { getCotizacionDet } from "../../actions/cotizaciondet";
import { getCotizacionCab } from "../../actions/cotizacion";
import { getDetailIva } from "../../actions/tabla";
import { getUsuariomenId } from "../../actions/usuariomenu";
import { getCondicionesCot } from "../../actions/cotizacioncond";
import { getTablaAll } from "../../actions/tabla";
// Descuentos
//import { getDetail } from "../../actions/tabla";

// CSS

//const ref = React.createRef();
// var campos del PDF
var maxhor = 253
var xCliente = "Cliente";
var xFecha = "Fecha";
var xUnidad = "Unidad";
var xDescripcion = "Descripción";
var xPrecio = "Precio";
var xCant = "Cant";
// var xTotal = "Total";
var xIncluido = "Incluido";
var xTotOC = "TOTAL O.C.";
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
var xDescDescrip = "Descuento";
var xMoneda = "$";
var xCotizacion = "COTIZACION";
var xDireccion = "Direccion";
var xTelefono = "Telefono:";
// var xEmail = "E-Mail";
var xVendedor = "Vendedor";
var xFooter = ""
const FormcotizPDF = () => {
   // Manejo acceso del Usuario
   // const navigate = useNavigate();
   const id_usuario = localStorage.getItem("usuario");
   const { cotizacioncab } = useSelector((state) => state);
   const { cotizaciondet } = useSelector((state) => state);
   const { cotizacioncond } = useSelector((state) => state);
   // const { porciva } = useSelector((state) => state);
   // const estilo2 = { fontSize: "200%" };
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
      dispatch(getTablaAll());
      dispatch(getDetailIva(1));
      //dispatch(getDetail(2));
      dispatch(getCotizacionCab(state.idfact));
      dispatch(getCotizacionDet(state.idfact));
      dispatch(getCondicionesCot(state.idfact));
      dispatch(getUsuariomenId(id_usuario));
   }, [dispatch, id_usuario, state.idfact]);

   // console.log("actlogin: ", actlogin);
   if (cotizacioncab.length > 0) {
      if (cotizacioncab[0].moneda === 2) {
         xCliente = "Client";
         xFecha = "Date";
         xUnidad = "Units";
         xDescripcion = "Description";
         xPrecio = "Price";
         xCant = "Quantity";
         xTotPag = "Total Payment USD";
         xTotOC = "Total PURCHASE ORDER";
         xCond = "General Conditions";
         xImporte = "Subtotal";
         xIncluido = "Included";
         xIva = "Tax";
         xEngancheTit = "First Payment";
         xSaldo = "Finance";
         xPagosMens = "Monthy Payments";
         xInteres = "Interes Rate";
         xTablaId = 2;
         xTerminos = "Terms and Conditions";
         xDHL = "Shipping Costs";
         xMoneda = "USD ";
         xCotizacion = "QUOTATION";
         xDescDescrip = "Discount";
      }
      if (cotizacioncab[0].moneda === 2) {
         xTablaId = 11;
      }
      if (cotizacioncab[0].moneda === 2 && cotizacioncab[0].idioma === 1) {
         xTablaId = 10;      
      }
      if (pdfFilename === "cotizacion_"){
          pdfFilename = pdfFilename + state.idfact
      }
   }

   // Default export is a4 paper, portrait, using millimeters for units
   const downloadFileDocument = () => {
      const leftMargin = 5;
      const leftInput = 30;
      var xhor = 38;
      var xhorNew = 0;
      var xleft = 0;
      const doc = new jsPDF();

      header(doc, leftInput, leftMargin);
// Only First Header
      if (cotizacioncab[0].direccion !== "") {
         doc.setFont("Times", "normal");
         doc.text(`${xDireccion}`, leftMargin, xhor);
         doc.setFont("Times", "bold");
         doc.text(`${cotizacioncab[0].direccion}`, leftInput, xhor);
         xhor += 8;
      }
      if (cotizacioncab[0].telefono !== "") {
         doc.setFont("Times", "normal");
         doc.text(`${xTelefono}`, leftMargin, xhor);
         doc.setFont("Times", "bold");
         doc.text(`${cotizacioncab[0].telefono}`, leftInput, xhor);
         xleft = 100;
         xhorNew = 8;
      }
      if (cotizacioncab[0].email !== "") {
         doc.setFont("Times", "normal");
         doc.text(`E-Mail :`, leftMargin + xleft, xhor);
         doc.setFont("Times", "bold");
         doc.text(`${cotizacioncab[0].email}`, leftInput + xleft, xhor);
         xhorNew = 8;
         xleft = 0;
      }
      xhor += xhorNew;
      doc.setFont("Times", "normal");
      doc.text(`${xVendedor} :`, leftMargin, xhor);
      doc.setFont("Times", "bold");
      doc.text(`${actlogin[0].name}`, leftInput, xhor);
      doc.setFont("Times", "normal");
      doc.text("E-Mail :", leftMargin + 100, xhor);
      doc.setFont("Times", "bold");
      doc.text(`${actlogin[0].email}`, leftInput + 95, xhor);
      xhor += 8;
// end Only First Header
      unidades(doc, leftInput, leftMargin,xhor);
      xhor += 8;
//   Productos
      console.log('cotizaciondet: ', cotizaciondet);
      for (let prodIndx = 0; prodIndx < cotizaciondet.length; prodIndx++) {
         xProdName = cotizaciondet[prodIndx].name.replace("″", "'");
         xProdDescrip = cotizaciondet[prodIndx].description.replace("″", "'");
         if (cotizacioncab[0].moneda === 2) {
            xProdName = cotizaciondet[prodIndx].nameext.replace("″", "'");
         }
         if (cotizacioncab[0].moneda === 2) {
            xProdDescrip = cotizaciondet[prodIndx].descripext.replace("″", "'");
         }
         xhorNew = producto(doc, xProdName, xhor, leftMargin , 18);
         xhorNew = producto(doc, xProdDescrip, xhor, leftMargin + 43, 49);
         if (cotizaciondet[prodIndx].precio > 0) {
            doc.text(`${cotizaciondet[prodIndx].cantidad}`,leftMargin + 150,xhor,"right");
            doc.text(`${xMoneda}${dollarUSLocale.format(cotizaciondet[prodIndx].precio)}`,leftMargin + 175,xhor,"right");
            doc.text(`${xMoneda}${dollarUSLocale.format(cotizaciondet[prodIndx].total)}`,leftMargin + 200,xhor,"right");
         } else {
            doc.setFont("Times", "bold");
            doc.text(`${xIncluido}`, leftMargin + 160, xhor);
            doc.setFont("Times", "normal");
         }
         xhor = xhorNew + 5;
         if (xhor>maxhor){
            doc.addPage()
            header(doc, leftInput, leftMargin);
            xhor = 38;
            unidades(doc, leftInput, leftMargin,xhor);
            xhor += 8;
         }
      
      };
      doc.setDrawColor(243, 243, 243);
      doc.setLineWidth(0.5);
      doc.line(leftMargin, xhor + 2, 210, xhor + 2);
// Fin Productos
      xhor +=8
      doc.text(`Subtotal:`, 140, xhor);
      var xSub2 = cotizacioncab[0].subtotal
      var xIva2 = cotizacioncab[0].iva 
      var xDhl2 = cotizacioncab[0].dhl
      var xTot = cotizacioncab[0].total 
      doc.text(`${xMoneda}${dollarUSLocale.format(xSub2)}`,200,xhor,"right");
      xhor += 8;
      if (cotizacioncab[0].moneda !== 2) { 
         doc.text(`${xIva}`, 140, xhor);
         doc.text(`${xMoneda}${dollarUSLocale.format(xIva2)}`,200,xhor,"right");
         xhor += 8;
      }
      if (cotizacioncab[0].dhl > 0) {
         doc.text(`${xDHL}`, 140, xhor);
         doc.text(`${xMoneda}${dollarUSLocale.format(xDhl2)}`,200,xhor,"right" );
         xhor += 8;
      }
      doc.text(`${xTotPag}`, 140, xhor);
      doc.text(`${xMoneda}${dollarUSLocale.format(xTot)}`,200,xhor,"right");
      xhor += 8;

      if (cotizacioncab[0].observ !== "") {
         doc.text(`${cotizacioncab[0].observ}`, leftMargin, xhor);
         xhor += 8;
      }
      //   }
      doc.line(leftMargin, xhor + 2, 210, xhor + 2);
      xhor += 7;
      // Condiciones Generales
      if (
         cotizacioncond.length > 0 &&
         parseInt(cotizacioncond[0].cond_id) > 1
      ) {
         doc.setFont("Times", "bold");
         doc.text(`${xCond}`, leftMargin, xhor);
         doc.setFont("Times", "normal");
         xhor += 8;
         doc.text(`${xDescripcion}`, leftMargin+25, xhor);
         doc.text(`${xImporte}`, 200, xhor, "right");
         xhor += 8;
         for (let cotiInd = 0; cotiInd < cotizacioncond.length; cotiInd++) {
            var xEnganche = (cotizacioncab[0].total * cotizacioncond[cotiInd].enganche) / 100;
            var xFinanciar = cotizacioncab[0].total - xEnganche;
            var xAnos = cotizacioncond[cotiInd].meses / 12;
            var xPorMes = xFinanciar * (cotizacioncond[cotiInd].interes / 100) * xAnos;
            var xPagoMens = (xFinanciar + xPorMes) / cotizacioncond[cotiInd].meses;
            var xTotal = xPagoMens * cotizacioncond[cotiInd].meses;
            if (parseInt(cotizacioncond[cotiInd].cond_id) === 1) {
               doc.text(`${cotizacioncond[cotiInd].nombre}`, leftInput, xhor);
               doc.text(`${xTotPag}`, leftInput + 100, xhor);
               doc.text(`${dollarUSLocale.format(xTotal.toFixed())}`, 175, xhor);
               xhor += 6;
            }
            if (parseInt(cotizacioncond[cotiInd].cond_id) === 2) {
               xEnganche = 0;
               xFinanciar = 0;
               var xDescuento = (cotizacioncab[0].total * cotizacioncond[cotiInd].descuento) / 100;
               xTotal = cotizacioncab[0].total -
                       (cotizacioncab[0].total * cotizacioncond[cotiInd].descuento) / 100;

               doc.text(`${xTotOC}`, leftInput, xhor);
               doc.text(`${xMoneda}${dollarUSLocale.format(cotizacioncab[0].total)}`,200,xhor,"right");
               xhor += 6;
               doc.text(`${xDescDescrip} ${dollarUSLocale.format(cotizacioncond[cotiInd].descuento.toFixed())}`,leftInput,xhor);
               doc.text(`${xMoneda}${dollarUSLocale.format(xDescuento.toFixed())}`,200,xhor,"right");
               xhor += 6;
               doc.text(`${xTotPag}`, leftInput, xhor);
               doc.text(`${xMoneda}${dollarUSLocale.format(xTotal.toFixed())}`,200,xhor,"right");
            }
            if (parseInt(cotizacioncond[cotiInd].cond_id) > 2) {
               doc.text(`${xTotOC}`, leftInput, xhor);
               doc.text(`${xMoneda}${dollarUSLocale.format(xTot)}`,200,xhor,"right");
               xhor += 6;
               if (xEnganche !== 0) {
                  doc.text(`${xEngancheTit}`, leftInput, xhor);
                  doc.text(`${xMoneda}${dollarUSLocale.format(xEnganche.toFixed(0))}`,200,xhor,"right");
                  xhor += 6;
                  doc.text(`${xSaldo}`, leftInput, xhor);
                  doc.text(`${xMoneda}${dollarUSLocale.format(xFinanciar.toFixed(0))}`,200,xhor,"right");
                  xhor += 6;
                  doc.text(`${cotizacioncond[cotiInd].meses} ${xPagosMens}    ${xInteres} ${cotizacioncond[cotiInd].interes}% `, leftInput, xhor);
                  doc.text(`${xMoneda}${dollarUSLocale.format(xPagoMens.toFixed(0))}`,200,xhor,"right");
                  xhor += 6;
                  doc.text(`${xTotPag}`, leftInput, xhor);
                  doc.text(`${xMoneda}${dollarUSLocale.format(xTotal.toFixed(0))}`,200,xhor,"right");
                  xhor += 6;
               }
            }
         };
      }
      //* Terminos y condiciones

      if (xhor>maxhor){
         doc.addPage()
         header(doc, leftInput, leftMargin);
         doc.setFontSize(10);
         xhor = 38;
      } else {
         xhor += 3;
      }

      doc.setFont("Times", "bold");
      doc.text(`${xTerminos}`, leftMargin, xhor);
      doc.setFont("Times", "normal");
      xhor += 8;
      for (var i = 0; i < tabla.length; i++) {
        if (tabla[i].id === xTablaId && tabla[i].cod !== 0) {
            doc.text(`${tabla[i].description}`, leftMargin, xhor);
            xhor += 5;
         }
         if (tabla[i].id === 12 && tabla[i].cod === 1) {
            xFooter = tabla[i].description
         }
      }
      xhor += 5;
      doc.setDrawColor(0, 0, 193);
      doc.setLineWidth(0.5);
      doc.line(3, xhor, 200, xhor);
      xhor += 8;
      doc.text(`${xFooter}`, leftMargin, xhor);
      xhor +=5
      doc.line(3, xhor, 200, xhor);
      // Linea final
      doc.save(`${pdfFilename}.pdf`);
      window.location.href = "/cotizacion";
   };

   function producto (doc, texto, xHor, leftMargin, cantCaracteres) {
      var words = texto.split(" ");
      var muestro = "";
      for (var i = 0; i < words.length; i++) {
         if (muestro.length + words[i].length >= cantCaracteres) {
            doc.text(muestro, leftMargin, xHor);
            xHor = xHor + 5;
            muestro = words[i] + " ";
         } else {
            muestro = muestro + words[i] + " ";
         }
      }
      if (muestro !== " ") {
         doc.text(muestro, leftMargin, xHor);
         xHor += 5;
      }
      console.log("out: ", xHor);
      return xHor;
   };

   function unidades (doc, leftInput, leftMargin,xhor) {
      doc.setFontSize(10);
      doc.text(xUnidad, leftMargin, xhor);
      doc.text(xDescripcion, leftMargin + 43, xhor);
      doc.text(xCant, leftMargin + 140, xhor);
      doc.text(xPrecio, leftMargin + 175, xhor, "right");
      doc.text(xImporte, leftMargin + 195, xhor, "right");
      doc.setLineWidth(0.5);
      doc.line(leftMargin, xhor + 2, 205, xhor + 2);
      doc.setFont("Times", "normal");
   }
   function header (doc, leftInput, leftMargin) {
      doc.setDrawColor(0, 0, 193);
      doc.setLineWidth(1);
      doc.line(5, 3, 200, 3);
      doc.addImage(Imagen, "PNG", 5, 2, 50, 25);
      doc.setFont("Times", "bold");
      doc.setFontSize(20);
      doc.text(`${xCotizacion} N°: ${cotizacioncab[0].id}`, 100, 15);
      doc.setFontSize(12);
      doc.setFont("Times", "normal");
      doc.text(`${xCliente} : `, leftMargin, 30);
      doc.setFont("Times", "bold");
      doc.text(`${cotizacioncab[0].nombre}`, leftInput, 30);
      doc.setFont("Times", "normal");
      doc.text(`${xFecha} : `, leftMargin + 150, 30);
      doc.setFont("Times", "bold");
      doc.text(`${cotizacioncab[0].fecha}`, leftInput + 145, 30);

      doc.setFontSize(10);
   };

   if (
      cotizaciondet.length > 0 &&
      cotizacioncond.length > 0 &&
      cotizacioncab.length > 0 &&
      tabla.length > 0
   ) {
      downloadFileDocument();
   }
   return (
      <div id="element-to-hide" data-html2canvas-ignore="true">
         <div>&nbsp;</div>
         <div>&nbsp;</div>
         <h3>Generando PDF</h3>
         <p>Por Favor Espere... </p>
         <img src={ImagenWait} alt="waiting" />
      </div>
   );
};

export default FormcotizPDF;
