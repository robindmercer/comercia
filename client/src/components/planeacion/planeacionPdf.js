import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { jsPDF } from "jspdf";
import Imagen from "../../images/LogoNibbot.png";
import ImagenWait from "../../images/Spinner-5.gif";

// Acciones
import { getFacturaCab } from "../../actions/factura";
import { getDetailIva } from "../../actions/tabla";
import { getUsuariomenId } from "../../actions/usuariomenu";
import { getTablaAll } from "../../actions/tabla";
import { getFacturaMPId } from "../../actions/facturaMP";
// Descuentos
import { getDetail } from "../../actions/tabla";

// var campos del PDF
var maxhor = 263
var pdfFilename = "Orden de Producción_"
var xCliente = "Cliente";
var xFecha = "Fecha";
var xOrden = "ORDEN DE PRODUCCIÓN";
var xVendedor = "Vendedor";
var prodAnt = "";
// var xMoneda = "$";

const FormfacturaPDF = () => {
   // Manejo acceso del Usuario
   // const navigate = useNavigate();
   const id_usuario = localStorage.getItem("usuario");
   const { factcab } = useSelector((state) => state);

   // const { porciva } = useSelector((state) => state);
   const { facturaMP } = useSelector((state) => state);
   
   const tabla = useSelector((state) => state.tabla);
   const actlogin = useSelector((state) => state.actlogin);

   const dispatch = useDispatch();

   const location = useLocation();
   const { state } = location;

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
      dispatch(getFacturaMPId(state.idfact));
      dispatch(getUsuariomenId(id_usuario));
      dispatch(getTablaAll());
   }, [dispatch, id_usuario, state.idfact]);

   // console.log(
   //    "formFactura---------------------------------------------------"
   // );
   // console.log("state.idfact ", state.idfact);
   // console.log("tabla: ", tabla);
   // console.log("factcab: ", factcab);
   // console.log('facturaMP: ', facturaMP);
   // console.log(
   //    "formFactura---------------------------------------------------"
   // );

   if (factcab.length > 0) {
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
      doc.text(`${xVendedor} :`, leftMargin, xhor);
      doc.setFont("Times", "bold");
      doc.text(`${actlogin[0].name}`, leftInput+5, xhor);
      doc.setFont("Times", "normal");
      doc.text("E-Mail :", leftMargin + 100, xhor);
      doc.setFont("Times", "bold");
      doc.text(`${actlogin[0].email}`, leftInput + 95, xhor);
      xhor += 8;
      xhor += 8;
      //   Productos
      for (let prodIndx = 0; prodIndx < facturaMP.length; prodIndx++) {
         // Nombre del Producto
         if (prodAnt !== facturaMP[prodIndx].prodname){
            unidades(doc, leftInput, leftMargin,xhor);
            xhor +=8
            doc.setTextColor(0,0,200);
            doc.text(`Producto: ${facturaMP[prodIndx].prodname}`,leftMargin ,xhor);
            doc.setTextColor(0,0,0);
            xhor +=8
            prodAnt = facturaMP[prodIndx].prodname
         }
         doc.text(`${facturaMP[prodIndx].name}`,leftMargin + 10,xhor,"right");
         xhorNew = producto(doc, facturaMP[prodIndx].description, xhor, leftMargin+20 , 50);
         doc.text(`${facturaMP[prodIndx].udm}`,leftMargin + 125,xhor,"right");
         doc.text(`${facturaMP[prodIndx].pedido}`,leftMargin + 150,xhor,"right");
         doc.text(`${facturaMP[prodIndx].stock}`,leftMargin + 175,xhor,"right");
         if (facturaMP[prodIndx].pedido > facturaMP[prodIndx].stock){
            doc.setDrawColor(255, 0, 0); // draw red lines
            doc.setLineWidth(0.1);
            doc.line(leftMargin, xhor+1, 200, xhor+1);
            doc.setDrawColor(0, 0, 193);
            // xhor+=1
         }
         xhor = xhorNew + 3;
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
      xhor +=5
      // doc.setFillColor(255, 0, 0);
      // doc.rect(20, xhor, 170, 8);
      doc.text('INGENIERO DE MANUFACTURA		CONTROL DE CALIDAD		RESPONSABLE DE ALMACÉN',22,xhor+4)
      xhor +=8
      doc.setFillColor(82, 70, 255);    
      doc.rect(20, xhor, 170, 8,"F");
      doc.setFont("Times", "bold");
      doc.setTextColor(255,255,255)
      doc.text('NOMBRE Y FIRMA DE ENTREGA AL DEPARTAMENTO',leftMargin+50,xhor+5)
// Fin Productos
      xhor +=8
      
      // Linea final
      doc.save(`${pdfFilename}.pdf`);
      window.location.href = "/factura";
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
      //console.log("out: ", xHor);
      return xHor;
   };

   function unidades (doc, leftInput, leftMargin,xhor) {
      doc.setFontSize(10);
      doc.text("Id MP", leftMargin, xhor);
      doc.text("Materio Prima", leftMargin + 43, xhor);
      doc.text("UDM", leftMargin + 125, xhor, "right");
      doc.text("PEDIDO", leftMargin + 150, xhor, "right");
      doc.text("Stock", leftMargin + 175, xhor, "right");
      doc.setLineWidth(0.5);
      doc.line(leftMargin, xhor + 2, 205, xhor + 2);
      doc.setFont("Times", "normal");
   }

   function header (doc, leftInput, leftMargin) {
      // console.log('leftMargin: ', leftMargin);
      // console.log('leftInput: ', leftInput);
      // console.log('xOrden: ', xOrden);
      // console.log('xCliente: ', xCliente);
      // console.log('xFecha: ', xFecha);
      doc.setDrawColor(0, 0, 193);
      doc.setLineWidth(1);
      doc.line(5, 3, 200, 3);
      doc.addImage(Imagen, "PNG", 5, 2, 60, 20);
      doc.setFont("Times", "bold");
      doc.setFontSize(20);
      doc.text(`${xOrden} N°: ${factcab[0].id}`, 90, 15);
      doc.setFontSize(12);
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
      factcab.length > 0 &&
      facturaMP.length > 0 &&
      tabla.length > 0
      ) {
         downloadFileDocument();
      }

      console.log('facturaMP: ', facturaMP);
      console.log('factcab: ', factcab);
      console.log('tabla: ', tabla);
   return (
      <div id="element-to-hide" data-html2canvas-ignore="true">
         <div>&nbsp;</div>
         <div>&nbsp;</div>
         <h3>Generando PDF</h3>
         {factcab.length  > 0 ? (<p>Cabecera ok</p>) : (<p>Buscando Cabecera</p>)}
         {facturaMP.length > 0 ? (<p>MP ok</p>) : (<p>Buscando M.P.</p>)  }
         {tabla.length    > 0 ? (<p>Tablas ok</p>) : (<p>Busando Tablas</p>)}
     
         <p>Por Favor Espere... </p>
         <img src={ImagenWait} alt="waiting" />
      </div>
   );


};

export default FormfacturaPDF;
