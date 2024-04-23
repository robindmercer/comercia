import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { jsPDF } from "jspdf";
import Imagen from "../../images/LogoNibbot.png";
import ImagenWait from "../../images/Spinner-5.gif";

// Acciones
import { getFacturaDet } from "../../actions/factdet";
import { getFacturaCab } from "../../actions/factura";
import { getDetailIva } from "../../actions/tabla";
import { getUsuariomenId } from "../../actions/usuariomenu";
import { getCondicionesFac } from "../../actions/condiciones";
import { getTablaAll } from "../../actions/tabla";
// Descuentos
import { getDetail } from "../../actions/tabla";
import Cookies from 'universal-cookie'
// var campos del PDF
var maxhor = 253
var pdfFilename = "Orden de Compra_"
var xCliente = "Cliente";
var xFecha = "Fecha";
var xCalle = "Calle";
var xLocalidad = "Localidad CP";
var xCiudad = "Ciudad";
var xPais = "Pais";
var xUnidad = "Unidad";
var xDescripcion = "Producto";
var xDescripcion2 = "Descripción";
var xPrecio = "Precio";
var xCant = "Cant";
var xTablaPago = 15
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
var xOrden = "Orden de Compra";
var xCotiz = "COTIZACION";
var xMoneda = "$";
var xVendedor = "Vendedor";
var xDscto = "Dto."
var kl = 0
// var xFooter = ""
var xTotOC = "TOTAL O.C.";
var xDescDescrip = "Descuento";
const FormfacturaPDF = () => {
   const cookies = new Cookies();
   // Manejo acceso del Usuario
   // const navigate = useNavigate();
   const id_usuario = cookies.get("usuario");
   const { factcab } = useSelector((state) => state);
   const { factdet } = useSelector((state) => state);
   // const { porciva } = useSelector((state) => state);
   const { factcond } = useSelector((state) => state);
   
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
      dispatch(getFacturaCab(state.idfact));
      dispatch(getFacturaDet(state.idfact));
      dispatch(getCondicionesFac(state.idfact));
      dispatch(getUsuariomenId(id_usuario));
      dispatch(getTablaAll());
      //setInput(input.fac_id=1)
      // return (
      //   dispatch(resetFact())
      // )
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   //console.log("formFactura---------------------------------------------------");
   //console.log("state.idfact ", state.idfact);
   //console.log("tabla: ", tabla);
   //console.log("usuariomenu: ", usuariomenu);
   //console.log("//console.log('factcond: ', factcond);: ", acceso);
   //console.log("factcab: ", factcab);
   //console.log("factdet: ", factdet);
   //console.log('factcond: ', factcond);
   //console.log("formFactura---------------------------------------------------");

   if (factcab.length > 0) {
      if (factcab[0].idioma === 2 ) {
         xCliente = "Client";
         xFecha = "Date";
         xTablaPago = 16
         xCalle = "Street";
         xLocalidad = "Postal Code";
         xCiudad = "City";
         xPais = "Country";
         xUnidad = "Units";
         xDescripcion = "Product";
         xDescripcion2 = "Description";
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
         xOrden = "Pusrchase";
         xCotiz = "QUOTATION"
         xMoneda = "USD ";
         xTotOC = "Total PURCHASE ORDER";
         xDescDescrip = "Discount";
         xDscto = "Dis."
      }
      if (factcab[0].moneda === 2) {
         xTablaId = 11;
      }
      if (factcab[0].moneda === 2 && factcab[0].idioma === 1) {
         xTablaId = 10;
      }
      if (pdfFilename === "Orden de Compra_"){
         pdfFilename = pdfFilename + state.idfact
     }
   }
   
   const downloadFileDocument = () => {
      const leftMargin = 5;
      const leftInput = 30;
      var xhor = 38;
      var xhorNew = 0;
      // var xleft = 0;
      const doc = new jsPDF({compress : true});

      header(doc, leftInput, leftMargin);

// Only First Header
      doc.setFont("Times", "normal");
      doc.text(`${xCalle} : `, leftMargin, xhor);
      doc.setFont("Times", "bold");
      doc.text(`${factcab[0].calle}`, leftInput+5, xhor);
      xhor+=8
      doc.setFont("Times", "normal");
      doc.text(`${xLocalidad} : `, leftMargin, xhor);
      doc.setFont("Times", "bold");
      doc.text(`${factcab[0].localidad} (${factcab[0].cp})`, leftInput+5, xhor);
      xhor+=8
      doc.setFont("Times", "normal");
      doc.text(`${xCiudad} : `, leftMargin, xhor);
      doc.setFont("Times", "bold");
      doc.text(`${factcab[0].ciudad}`, leftInput+5, xhor);
      doc.setFont("Times", "normal");
      doc.text(`${xPais} : `, leftMargin + 130, xhor);
      doc.setFont("Times", "bold");
      doc.text(`${factcab[0].pais}`, leftInput + 125, xhor);
      xhor += 8;
      doc.setFont("Times", "normal");
      doc.text(`${xVendedor} :`, leftMargin, xhor);
      doc.setFont("Times", "bold");
      doc.text(`${actlogin[0].name}`, leftInput+5, xhor);
      doc.setFont("Times", "normal");
      doc.text("E-Mail :", leftMargin + 100, xhor);
      doc.setFont("Times", "bold");
      doc.text(`${actlogin[0].email}`, leftInput + 95, xhor);
      xhor += 8;
// end Only First Header
      unidades(doc, leftInput, leftMargin,xhor);
      xhor += 8;
//   Productos
      for (let prodIndx = 0; prodIndx < factdet.length; prodIndx++) {
         kl += 1

         xProdName = factdet[prodIndx].name;
         xProdDescrip = factdet[prodIndx].description;
         if (factcab[0].moneda === 2) {
            xProdName = factdet[prodIndx].nameext;
         }
         if (factcab[0].moneda === 2) {
            xProdDescrip = factdet[prodIndx].descripext;
         }
         xhorNew = producto(doc, kl + ' ', xhor, leftMargin , 5);
         xhorNew = producto(doc, `${factdet[prodIndx].id_interno} `, xhor, leftMargin + 5 , 18);
         xhorNew = producto(doc, xProdName, xhor, leftMargin + 22, 18);
         xhorNew = producto(doc, xProdDescrip, xhor, leftMargin + 57, 49);
         if (factdet[prodIndx].precio > 0) {
            doc.text(`${factdet[prodIndx].cantidad}`,leftMargin + 148,xhor,"right");
            doc.text(`${xMoneda}${dollarUSLocale.format(factdet[prodIndx].precio)}`,leftMargin + 165,xhor,"right");
            doc.text(`${dollarUSLocale.format(factdet[prodIndx].descto)}%`,leftMargin + 182,xhor,"right");
            doc.text(`${xMoneda}${dollarUSLocale.format(factdet[prodIndx].total)}`,leftMargin + 200,xhor,"right");
         } else {
            doc.setFont("Times", "bold");
            doc.text(`${xIncluido}`, leftMargin + 160, xhor);
            doc.setFont("Times", "normal");
         }
         xhor = xhorNew + 5;
         if (xhor>maxhor){
            doc.addPage()
            header(doc, leftInput, leftMargin);
            xhor = 40;
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
      var xSub2 = factcab[0].subtotal
      var xIva2 = factcab[0].iva 
      var xDhl2 = 0
      xDhl2 = factcab[0].dhl
      var xTot = factcab[0].total 
      doc.text(`${xMoneda}${dollarUSLocale.format(xSub2)}`,200,xhor,"right");
      xhor += 8;
      if (factcab[0].moneda !== 2) { 
         doc.text(`${xIva}`, 140, xhor);
         doc.text(`${xMoneda}${dollarUSLocale.format(xIva2)}`,200,xhor,"right");
         xhor += 8;
      }
      if (factcab[0].dhl > 0) {
         doc.text(`${xDHL}`, 140, xhor);
         doc.text(`${xMoneda}${dollarUSLocale.format(xDhl2)}`,200,xhor,"right" );
         xhor += 8;
      }
      doc.text(`${xTotPag}`, 140, xhor);
      doc.text(`${xMoneda}${dollarUSLocale.format(xTot)}`,200,xhor,"right");
      xhor += 8;

      if (factcab[0].observ !== "") {
         doc.text(`${factcab[0].observ}`, leftMargin, xhor);
         xhor += 8;
      }
      //   }
      doc.line(leftMargin, xhor + 2, 210, xhor + 2);
      xhor += 7;
      // Condiciones Generales
      if (
         factcond.length > 0 &&
         parseInt(factcond[0].cond_id) > 1
      ) {
         doc.setFont("Times", "bold");
         doc.text(`${xCond}`, leftMargin, xhor);
         
         //console.log('xCond: ', xCond);
         //console.log('xDescripcion: ', xDescripcion);
         //console.log('xImporte: ', xImporte);

         doc.setFont("Times", "normal");
         xhor += 8;
         doc.text(`${xDescripcion}`, leftMargin+25, xhor);
         doc.text(`${xImporte}`, 200, xhor, "right");
         var xTotal2 = 0
         var xDescuento = 0
         
         xhor += 8;
         for (let cotiInd = 0; cotiInd < factcond.length; cotiInd++) {
            xTotal2 = factcab[0].total - xDhl2
            xDescuento = (xTotal2 * factcond[cotiInd].descuento) / 100;
            var xEnganche = (xTotal2 * factcond[cotiInd].enganche) / 100;
            var xFinanciar = xTotal2 - xEnganche;
            var xAnos = factcond[cotiInd].meses / 12;
            var xPorMes = 
                  xFinanciar * 
                  (factcond[cotiInd].interes / 100) * xAnos;
            var xPagoMens = (xFinanciar + xPorMes) / factcond[cotiInd].meses;
            
            var xTotal = (xPagoMens * factcond[cotiInd].meses) 
            xTotal += parseInt(xDhl2);
            if (parseInt(factcond[cotiInd].cond_id) === 1) {
               doc.text(`${factcond[cotiInd].nombre}`, leftInput, xhor);
               doc.text(`${xTotPag}`, leftInput + 100, xhor);
               doc.text(`${dollarUSLocale.format(parseInt(xTotal))}`, 175, xhor);
               xhor += 6;
            }
            if (parseInt(factcond[cotiInd].cond_id) === 2) {
               xEnganche = 0;
               xFinanciar = 0;
               xDescuento = (factcab[0].total * factcond[cotiInd].descuento) / 100;
               xTotal = factcab[0].total - factcab[0].dhl -
               (factcab[0].total * factcond[cotiInd].descuento) / 100;
               
               doc.text(`${xTotOC}`, leftInput, xhor);
               doc.text(`${xMoneda}${dollarUSLocale.format(factcab[0].total - factcab[0].dhl)}`,200,xhor,"right");
               xhor += 6;
               doc.text(`${xDescDescrip} ${dollarUSLocale.format(factcond[cotiInd].descuento)}`,leftInput,xhor);
               doc.text(`${xMoneda}${dollarUSLocale.format(xDescuento.toFixed())}`,200,xhor,"right");
               xhor += 6;
               doc.text(`${xTotPag}`, leftInput, xhor);
               doc.text(`${xMoneda}${dollarUSLocale.format(parseInt(xTotal))}`,200,xhor,"right");
            }
            if (parseInt(factcond[cotiInd].cond_id) > 2) {
               
               //console.log('xTotOC: ', xTotOC);
               //console.log('xMoneda: ', xMoneda);
               //console.log('xTot: ', xTot);
               //console.log('xEngancheTit: ', xEngancheTit);
               //console.log('% enganche: ', factcond[cotiInd].enganche);
               //console.log('dhl: ', factcab[0].dhl);
               //console.log('xEnganche: ', xEnganche);
               //console.log('xDescuento: ', xDescuento);
               //console.log('xSaldo: ', xSaldo);
               //console.log('xFinanciar: ', xFinanciar);
               //console.log('factcond[cotiInd].meses: ', factcond[cotiInd].meses);
               //console.log('factcond[cotiInd].interes: ', factcond[cotiInd].interes);
               //console.log('xPagoMens: ', xPagoMens);
               //console.log('xTotPag: ', xTotPag);
               //console.log('xTotal: ', xTotal);
               //console.log('leftInput: ', leftInput);
               
               doc.text(`${xTotOC}`, leftInput, xhor);
               doc.text(`${xMoneda}${dollarUSLocale.format(xTot- xDhl2)}`,200,xhor,"right");
               xhor += 6;
               if (xEnganche !== 0) {
                  doc.text(`${xEngancheTit}`, leftInput, xhor);
                  doc.text(`${xMoneda}${dollarUSLocale.format(xEnganche.toFixed(0))}`,200,xhor,"right");
                  xhor += 6;
                  doc.text(`${xSaldo}`, leftInput, xhor);
                  doc.text(`${xMoneda}${dollarUSLocale.format(xFinanciar.toFixed(0))}`,200,xhor,"right");
                  xhor += 6;
                  doc.text(`${factcond[cotiInd].meses} ${xPagosMens}    ${xInteres} ${factcond[cotiInd].interes}% `, leftInput, xhor);
                  doc.text(`${xMoneda}${dollarUSLocale.format(xPagoMens.toFixed(0))}`,200,xhor,"right");
                  xhor += 6;
                  // console.log('xhor: ', xhor);
                  doc.text(`${xTotPag}`, leftInput, xhor);
                  doc.text(`${xMoneda}${dollarUSLocale.format(parseInt(xTotal))}`,200,xhor,"right");
                  xhor += 6;
               }
            }
         };
      }
      xhor += 2;
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
            console.log('Terminos: ', tabla[i].description,xhor);
            doc.text(`${tabla[i].description}`, leftMargin, xhor);
            xhor += 5;
         }
      }
// Fin Terminos y condiciones 
      if (xhor>maxhor){
         doc.addPage()
         header(doc, leftInput, leftMargin);
         doc.setFontSize(10);
         xhor = 38;
      } else {
         xhor += 5;
      }
// Control de Pagina antes del Detalle de pago       
      if (parseInt(xhor) > 240){
         doc.addPage()
         header(doc, leftInput, leftMargin);
         doc.setFontSize(10);
         doc.setFont("Times", "normal");
         xhor = 38;
      }         
      linea(doc,xhor)
      xhor +=5
      for (var ii = 0; ii < tabla.length; ii++) {
         if (tabla[ii].id === xTablaPago && tabla[ii].cod !== 0) {
            if (parseInt(tabla[ii].valor)>=10){ doc.setFontSize(parseInt(tabla[ii].valor)); }
            if (tabla[ii].control==='B'){ doc.setFont("Times", "bold"); }
            doc.text(`${tabla[ii].description}`, leftMargin, xhor);
            console.log('description: ', tabla[ii].description,tabla[ii].valor,xhor);
            if (xhor>maxhor){
               doc.addPage()
               header(doc, leftInput, leftMargin);
               doc.setFontSize(10);
               doc.setFont("Times", "normal");
               xhor = 34;
               linea(doc,xhor)
               xhor = 40;
            } else {
               xhor += 5;
            }             
            if (parseInt(tabla[ii].valor)>=10){ doc.setFontSize(parseInt(10)); }
            if (tabla[ii].control==='B'){ doc.setFont("Times", "normal");}
         }
      }    
//Footer        
      for (var xindx = 0; xindx < tabla.length; xindx++) {
         if (tabla[xindx].id === 12 && tabla[xindx].cod !== 0) {
             doc.text(`${tabla[xindx].description}`, leftMargin, xhor);
             xhor += 5;
          }
       }
      doc.line(3, xhor, 200, xhor);
      // Linea final
      doc.save(`${pdfFilename}.pdf`);
      window.location.href = "/factura";
   };
   function linea(doc,xhor){
      doc.setDrawColor(0, 0, 193);
      doc.setLineWidth(0.5);
      doc.line(3, xhor, 200, xhor);
   }

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
      //console.log("out: ", xHor);
      return xHor;
   };

   function unidades (doc, leftInput, leftMargin,xhor) {
      doc.setFontSize(10);
      doc.text('#', leftMargin, xhor);
      doc.text(xUnidad, leftMargin, xhor);
      doc.text(xDescripcion, leftMargin + 22, xhor);
      doc.text(xDescripcion2, leftMargin + 57, xhor);
      doc.text(xCant, leftMargin + 140, xhor);
      doc.text(xPrecio, leftMargin + 165, xhor, "right");
      doc.text(xDscto, leftMargin + 180, xhor, "right");
      doc.text(xImporte, leftMargin + 195, xhor, "right");
      doc.setLineWidth(0.5);
      doc.line(leftMargin, xhor + 2, 205, xhor + 2);
      doc.setFont("Times", "normal");
   }
   function header (doc, leftInput, leftMargin) {
      //console.log('leftMargin: ', leftMargin);
      //console.log('leftInput: ', leftInput);
      //console.log('xOrden: ', xOrden);
      //console.log('xCliente: ', xCliente);
      //console.log('xFecha: ', xFecha);
      doc.setDrawColor(0, 0, 193);
      doc.setLineWidth(1);
      doc.line(5, 3, 200, 3);
      doc.addImage(Imagen, "PNG", 5, 2, 60, 20);
      doc.setFont("Times", "bold");
      doc.setFontSize(20);
      doc.text(`${xOrden} N°: ${factcab[0].id}`, 100, 15);
      doc.setFontSize(12);
      doc.text(`${xCotiz} N°: ${factcab[0].cot_id}`, 120, 22);
      doc.setFont("Times", "normal");
      doc.text(`${xCliente} : `, leftMargin, 30);
      doc.setFont("Times", "bold");
      doc.text(`${factcab[0].nombre}`, leftInput, 30);
      doc.setFont("Times", "normal");
      doc.text(`${xFecha} : `, leftMargin + 150, 30);
      doc.setFont("Times", "bold");
      doc.text(`${factcab[0].fecha}`, leftInput + 145, 30);
      doc.setFontSize(10);

   };

   if (
      factdet.length > 0 &&
      factcab.length > 0 &&
      // factcond.length > 0 &&
      tabla.length > 0
      ) {
         downloadFileDocument();
      }
      //console.log('factdet: ', factdet);
      //console.log('factcond: ', factcond);
      //console.log('factcab: ', factcab);
      //console.log('tabla: ', tabla);
   return (
      <div id="element-to-hide" data-html2canvas-ignore="true">
         <div>&nbsp;</div>
         <div>&nbsp;</div>
         <h3>Generando PDF</h3>
         {factcab.length  > 0 ? (<p>Cabecera ok</p>) : (<p>Buscando Cabecera</p>)}
         {factdet.length  > 0 ? (<p>Productos ok</p>) : (<p>Buscando Productos</p>)}
         {/* {factcond.length > 0 ? (<p>C.pago ok</p>) : (<p>Buscando C.Pago</p>)  } */}
         {tabla.length    > 0 ? (<p>Tablas ok</p>) : (<p>Busando Tablas</p>)}
      
         <p>Por Favor Espere... </p>
         <img src={ImagenWait} alt="waiting" />
      </div>
   );


};

export default FormfacturaPDF;
