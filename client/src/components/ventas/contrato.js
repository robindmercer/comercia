import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFacturaCab } from "../../actions/factura";
import { useLocation } from "react-router-dom";
import style from "../../css/contrato.module.css";
import { jsPDF } from "jspdf";
import Imagen from "../../images/LogoNibbot.png";
import Header from "../Header";
import { AddContrato, getContratoID } from "../../actions/contrato";

function Contrato() {
   const { factcab } = useSelector((state) => state);
   const { contrato } = useSelector((state) => state);
   const lineSpacing = 15;
   const firstLineAfterHeader = 120
   const margenIzquierdo = 20
   const endX = 560;
   const maxHorizontal = 800
   const dispatch = useDispatch();
   const location = useLocation();
   const { state } = location;
   const [tipo , setTipo]= useState('')
   const [onChange, setOnChange] = useState(false)

   useEffect(() => {
      if (onChange) {
      }
    }, [onChange])

    useEffect(() => {
      dispatch(getFacturaCab(state.idfact));
      dispatch(getContratoID(state.idfact));
   }, [dispatch, state.idfact]);
   var meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Agust",
      "October",
      "November",
      "Dicember",
   ];
   var diaHoy = new Date().toLocaleDateString("en-GB");
   const d = new Date();
   let month = d.getMonth();
   let day = d.getDate();
   let anio = d.getFullYear();
   // console.log("diaHoy: ", diaHoy, day, meses[month], anio);
   var mon = "$";
   var textoIni = "";
   var txtAdicional = "";
   var clausulas = "";
   const getTextoArrendamiento = () => {
      textoIni = "Contrato entre <strong>NIBBOT INTERNATIONAL</strong> y @nombre con fecha @fecha<br/>"
      textoIni += "Mediante la presente se deja constancia del contrato de Arrendamiento celebrado entre las partes:<br/>"
      textoIni += "La empresa que ofrece el servicio / producto:<br/>"
      textoIni += "<strong>NIBBOT INTERNATIONAL</strong> con RFC NIN180922KJ2, debidamente constituida con domicilio fiscal en Dr.  Gabriel Martínez No 14 - Colonia Centro, S.L.P. - 79610, considerado a partir de ahora la empresa y,<br/>"
      textoIni += "Especialista médico, Comprador, Arrendador:<br/>"
      textoIni += "<strong>@nombre</strong> con domicilio particular establecido en Calle @dircomp, CLAVE DE ELECTOR @claveelec considerado a partir de ahora el Arrendador, con fecha @fecha.<br/>"
      textoIni += "<br/>En donde se establece la Renta del Equipo PROFESSIONAL NIBBOT, a un precio establecido de @moneda @importe (<strong>@impLetras</strong> @monletra).<br/>"
      textoIni += "<br/>Datos del producto:<br/>Nombre del producto: @producto<br/>No. Serie: @serie<br/>Garantía: @garantia<br/>"
      txtAdicional = "<br/>@adicional<br/><br/>";
      clausulas =  "                                                           <strong>C L Á U S U L A S</strong><br/><br/>";
      clausulas += "<strong>La empresa<strong><br/><br/>";
      clausulas += "La empresa se compromete a hacer entrega de la unidad y accesorios en un plazo no mayor a los 5 días de confirmado el primer pago correspondiente al plan aprobado de Arrendamiento, o al pago total del equipo. La modalidad de entrega será vía correo DHL servicio postal o presencial si así se establece.<br/><br/>"
      clausulas += "La empresa garantiza el correcto funcionamiento, calibración y los más altos estándares de calidad de la unidad y accesorios que el comprador va a recibir en el plazo mencionado en el apartado anterior<br/><br/>" 
      clausulas += "La empresa no se hace responsable y no entra en garantía si el equipo tuvo mal uso, fue negligencia del comprador, o no siguió las indicaciones correspondientes dadas en su capacitación.<br/><br/>" 
      clausulas += "La empresa pone a disposición el contacto directo de nuestro departamento:<br/>"  
      clausulas += "     Atención a clientes:  info@nibbot.com.mx<br/><br/>"
      clausulas += "<strong>Arrendador</strong><br/><br/><br/>"
      clausulas += "El Arrendador se compromete a dar buen uso del equipo adquirido.<br/><br/>"
      clausulas += "El Arrendador declara que conoce y está interesado en adquirir el producto en el estado físico que se encuentra y que tiene la capacidad para hacer frente a sus obligaciones establecidas en el presente Contrato, así como el cumplimiento de pago total o parcial del equipo adquirido.<br/><br/>"
      clausulas += "El Arrendador se da por enterado que, en caso de existir mora de más de 30 días a partir de la fecha de pago vencida, la empresa tiene la libertad de efectuar el corte de servicio vía remota, generando un cargo de reconexión de @moneda @punitorio (<strong>@punitLetras</strong> @monletra), hasta que el saldo de mora sea cubierto.<br/><br/>"
      clausulas +=
         "ARRENDADOR                                                                     ARRENDATARIO<br/>";
      clausulas += "<br/><br/><br/><br/><br/>";
      clausulas += "____________________________                                 _____________________________<br/>";
      clausulas +="Lic. Dinora Castro Ríos                                                        @nombre<br/>";
      clausulas +="Coordinador Administrativo                                                    @especial<br/>";
      clausulas += "NIBBOT INTERNATIONAL SAS<br/>";
      
   }
   const getTextoContrato = () => {
      textoIni = "Contrato entre <strong>NIBBOT INTERNATIONAL</strong> y @nombre con fecha @fecha<br/>";
      textoIni += "Mediante la presente se deja constancia del Contrato de venta celebrado entre las partes:<br/>";
      textoIni += "La empresa que ofrece el servicio / producto:<br/>";
      textoIni += "<strong>NIBBOT INTERNATIONAL</strong> con RFC <strong>NIN180922KJ2</strong>, debidamente constituida con domicilio fiscal en Dr.  Gabriel Martínez No 14 - Colonia Centro, S.L.P. - 79610, considerado a partir de ahora la empresa y<br/>";
      textoIni += "Especialista médico, Comprador:<br/>";
      textoIni += "@nombre con RFC @rfc y domicilio particular establecido en @dircomp,";
      textoIni += "Clave de Elector @claveelec y No. DE Cédula profesional @cedula considerado a partir de ahora el comprador, con fecha @fecha.<br/><br/>";
      textoIni += "En donde se establece la compra de los productos detallado a continuación según la Cotización CT-@coti, a un precio establecido de @moneda @importe (<strong>@impLetras</strong> @monletra).<br/>";
      textoIni += "<br/>Datos del producto:<br/>Nombre del producto: @producto<br/>No. Serie: @serie<br/>Garantía: @garantia<br/>";
      txtAdicional = "<br/>@adicional<br/><br/>";
      clausulas =  "                                                           <strong>C L Á U S U L A S</strong><br/><br/>";
      clausulas += "<strong>La empresa</strong><br/><br/>";
      clausulas += "La empresa se compromete a hacer entrega de la unidad y accesorios en un plazo no mayor a los 45 días de confirmado el primer pago correspondiente al plan aprobado de financiamiento, o al pago total del equipo. La modalidad de entrega será vía correo DHL servicio postal.<br/><br/>";
      clausulas += "La empresa garantiza el correcto funcionamiento, calibración y los más altos estándares de calidad de la unidad y accesorios que el comprador va a recibir en el plazo mencionado en el apartado anterior.<br/><br/>";
      clausulas += "La empresa se compromete a poner a disposición del comprador las herramientas de capacitación, material bibliográfico, tutoría profesional y asistencia técnica para promover la debida certificación profesional en el curso de capacitación en Estimulación Magnética Transcraneal.<br/><br/>";
      clausulas += "La empresa se compromete a hacer válida la garantía de buen funcionamiento correspondiente al producto comprado descrito en la cotización mencionada en el presente contrato, de la unidad principal y accesorios, ofreciendo cobertura total para el comprador (Solo si es defecto de ensamble)<br/><br/>";
      clausulas += "La empresa no se hace responsable y no entra en garantía si el equipo tuvo mal uso, fue negligencia del comprador, o no siguió las indicaciones correspondientes dadas en su capacitación, así como en el manual de usuario.<br/><br/>";
      clausulas += "La empresa pone a disposición del comprador, base de datos profesional de consulta bibliográfica, comunidad profesional equipada con TMS, Soporte Técnico, Asesoría profesional y área de Investigación y Nuevos Proyectos.<br/><br/>";
      clausulas += "La empresa pone a disposición el contacto directo de nuestro departamento:<br/>";
      clausulas += "   # Atención a clientes:  info@nibbot.com.mx<br/><br/>";
      clausulas += "La empresa emitirá la facturación en modalidad de gastos en general en cada pago realizado por el cliente, esto únicamente aplicable cuando el financiamiento sea mayor a 6 meses. O cuando el cliente lo requiera.<br/>";
      clausulas += "<br/>";
      clausulas += "<strong>Especialista Médico</strong><br/><br/>";
      clausulas += "El comprador se compromete a dar buen uso del equipo adquirido siguiendo el manual de usuario.<br/>";
      clausulas += "El comprador garantiza el cumplimiento de los términos y condiciones en su garantía.<br/>";
      clausulas += "El comprador declara que conoce y está interesado en adquirir el producto en el estado físico que se encuentra y que tiene la capacidad para hacer frente a sus obligaciones establecidas en el presente Contrato, así como el cumplimiento de pago total o parcial del equipo adquirido.<br/>";
      clausulas += "El comprador se da por enterado que, en caso de existir mora de más de 30 días a partir de la fecha de pago vencida, la empresa tiene la libertad de efectuar el corte de servicio vía remota, generando un cargo de reconexión de $2,500.00 (dos mil quinientos pesos) mexicanos, hasta que el saldo de mora sea cubierto.<br/>";
      clausulas += "El comprador se da por enterado que, en caso de existir una mora por más de 90 días, la empresa puede cancelar el servicio vía remota y solicitar la devolución de la unidad, debiéndose pagar un cargo por cancelación del contrato, equivalente a un 40% del valor de la orden de compra, menos el importe abonado hasta la fecha de cancelación.<br/>";
      clausulas += "<br/>";

      clausulas +=
         "EL VENDEDOR                                                                     EL COMPRADOR<br/>";
      clausulas += "<br/><br/><br/><br/><br/>";
      clausulas +=
         "____________________________                                 _____________________________<br/>";
      clausulas +=
         "Lic. Dinora Castro Ríos                                                        @nombre<br/>";
      clausulas +=
         "Coordinador Administrativo                                                    @especial<br/>";
      clausulas += "NIBBOT INTERNATIONAL SAS<br/>";
   };
   var writtenNumber = require("written-number");
   writtenNumber.defaults.lang = "es";

   const [input, setInput] = useState({
      texto: "",
      fac_id : state.idfact,
      nombre: factcab.length > 0 ? factcab[0].nombre : "",
      rfc: "",
      claveelec: "",
      dircomp: factcab.length > 0 ? factcab[0].calle + " " + factcab[0].ciudad : "",
      moneda: mon,
      importe: factcab.length > 0 ? factcab[0].total : "",
      cedula: "",
      producto: "",
      serie: "",
      garantia: "",
      adicional: "",
      fecha:  day + " de " + meses[month] + " de " + anio,
      terminado: "",
      especial: "",
      punitorio: "",
   });
   if (factcab.length > 0) {
      // console.log("factcab ok: ", factcab, " lenght ", factcab.length);
      if (factcab[0].moneda === 2) {
         mon = "USD";
      }
      const cambiarTexto = () => {
         textoIni = textoIni.replace("@coti", factcab[0].id);
         textoIni = textoIni.replaceAll(
            "@fecha",
            "<strong>" + input.fecha + "</strong>"
         );
         if (input.nombre !== "") {
            textoIni = textoIni.replaceAll(
               "@nombre",
               "<strong>" + input.nombre + "</strong>"
            );
            clausulas = clausulas.replaceAll(
               "@nombre",
               "<strong>" + input.nombre + "</strong>"
            );
         }
         if (input.especial !== "") {
            clausulas = clausulas.replaceAll(
               "@especial",
               "<strong>" + input.especial + "</strong>"
            );
         }

         if (input.rfc !== "")
            textoIni = textoIni.replace(
               "@rfc",
               "<strong>" + input.rfc + "</strong>"
            );
         if (input.moneda !== "") {
            textoIni = textoIni.replace(
               "@moneda",
               "<strong>" + input.moneda + "</strong>"
            );
            textoIni = textoIni.replace(
               "@importe",
               "<strong>" + Intl.NumberFormat('de-DE').format(input.importe) + "</strong>"
            );
            textoIni = textoIni.replace(
               "@impLetras",
               writtenNumber(input.importe)
            );
            if (input.moneda === "$") {
               textoIni = textoIni.replace(
                  "@monletra",
                  "<strong>Pesos</strong> 00/100 M.N."
               );
            } else {
               textoIni = textoIni.replace(
                  "@monletra",
                  "<strong>Dolares</strong>"
               );
            }
         }
         if (input.dircomp !== "")
            textoIni = textoIni.replace(
               "@dircomp",
               "<strong>" + input.dircomp + "</strong>"
            );
         if (input.cedula !== "")
            textoIni = textoIni.replace(
               "@cedula",
               "<strong>" + input.cedula + "</strong>"
            );
         if (input.claveelec !== "")
            textoIni = textoIni.replace(
               "@claveelec",
               "<strong>" + input.claveelec + "</strong>"
            );
         if (input.producto !== "")
            textoIni = textoIni.replace(
               "@producto",
               "<strong>" + input.producto + "</strong>"
            );
         if (input.serie !== "")
            textoIni = textoIni.replace(
               "@serie",
               "<strong>" + input.serie + "</strong>"
            );
         if (input.garantia !== "")
            textoIni = textoIni.replace(
               "@garantia",
               "<strong>" + input.garantia + "</strong>"
            );
         // if (input.adicional !== "") {
         //    txtAdicional = txtAdicional.replace(
         //       "@adicional",
         //       "<strong>" + input.adicional + "<strong>"
         //    );
         //    textoIni += txtAdicional;
         // }
         if (input.punitorio !== "") {
            clausulas = clausulas.replace(
               "@punitorio",
               "<strong>" + Intl.NumberFormat('de-DE').format(input.punitorio) + "</strong>"
            );
            clausulas = clausulas.replace(
               "@punitLetras",
               writtenNumber(input.punitorio)
            );
            clausulas = clausulas.replace(
               "@moneda",
               "<strong>" + input.moneda + "</strong>"
            );
         }
         if (input.moneda === "$") {
            clausulas = clausulas.replace(
               "@monletra",
               "<strong>Pesos</strong> 00/100 M.N."
            );
         } else {
            clausulas = clausulas.replace(
               "@monletra",
               "<strong>Dolares</strong>"
            );
         }
         clausulas = clausulas.replaceAll("</div>","")

         var datosAdic = document.getElementById("adicional").innerHTML;
         datosAdic = datosAdic.replaceAll("</div>","")
         datosAdic = datosAdic.replaceAll("&nbsp;"," ")
         datosAdic = datosAdic.replaceAll('<b style="color: var(--bs-body-color); font-size: var(--bs-body-font-size);"','<b')
         datosAdic = datosAdic.replaceAll('<span style="color: var(--bs-body-color); font-size: var(--bs-body-font-size); font-weight: var(--bs-body-font-weight);','')
         datosAdic = datosAdic.replaceAll('</span>','')
         datosAdic = datosAdic.replaceAll('b>">','b>')
         datosAdic = datosAdic.replaceAll('<br>','')

         //console.log('datosAdic: ', datosAdic);
         if (datosAdic !== "") {
            txtAdicional = txtAdicional.replace("@adicional",datosAdic );
            textoIni += txtAdicional;
         }

         // console.log('textoIni: ', textoIni);
         // console.log('txtAdicional: ', txtAdicional);
         // console.log('clausulas: ', clausulas);


         // setInput({
         //    
         //    texto: textoIni,
         // });
      };
      //https://www.youtube.com/watch?v=qEhhMZ0ObEw

      const generarPdf = () => {
         // setup config
         dispatch(AddContrato(input))
         console.log('generarPdf: ', input);
         if ( tipo === "Arrendamiento"){
            getTextoArrendamiento()
         }else {
            getTextoContrato()
         }         
         cambiarTexto()
         
         const lineSpacing = 15;
         const doc = new jsPDF("p", "pt");
         header(doc);

         let startX = margenIzquierdo;
         let startY = firstLineAfterHeader;

         doc.setLineWidth(1);
         doc.setDrawColor("#ff0000");

         //         var txt = input.texto.split("\n");
         var texto = document.getElementById("contrato").innerHTML;
         texto = texto + clausulas;
         console.log("texto in: ", texto);
         texto = texto.replaceAll("<br>", "\n");
         texto = texto.replaceAll("<br/>", "\n");
         texto = texto.replaceAll("<div>", "\n");
         texto = texto.replaceAll("</div>", "");
         texto = texto.replaceAll("<strong>", "|");
         texto = texto.replaceAll("</strong>", "|");
         texto = texto.replaceAll("<b>", "|");
         texto = texto.replaceAll("</b>", "|");
         //console.log("texto out: ", texto);
         var txt = texto.split("\n");
         for (var i = 0; i < txt.length; i++) {
            //console.log("startY 0: ", startY);
            startY = printCharacters(doc, txt[i], startY, startX, endX);
            startY += lineSpacing;
            //console.log("startY 1: ", startY);
         }
         doc.save(`test.pdf`);
      };
      const header = (doc) => {
         doc.setDrawColor(0, 0, 193);
         doc.setLineWidth(0.01);
         doc.line(10, 1.5, 570, 1.5);
         doc.addImage(Imagen, "PNG", 10, 1, 145, 60);
         doc.setFont("Helvetica", "bold");
         doc.setFontSize(30);
         doc.text(`C O N T R A T O`, 200, 40);
         doc.line(10, 65, 560, 65);
         doc.setFontSize(18);
         if ( tipo === "Arrendamiento"){
            doc.text(`Contrato de Arrendamiento N°: ` + factcab[0].id, 250, 90);
         }else {
            doc.text(`Contrato de Venta N°: ` + factcab[0].id, 290, 90);
         }
         doc.setFont("Helvetica", "normal").setFontSize(13);
      };
      function printCharacters(doc, text, startY, startX, width) {
         var totline = doc.getTextWidth(text)
//         console.log('totline: ', totline,startY,text);
         if (startY >= 760 && totline > 1500 ){
            doc.addPage();
            header(doc);
            startY = firstLineAfterHeader;
         }
         var palabras = text.split(" ");
         const boldStr = "bold";
         const normalStr = "normal";
         var isBold = false;
         var sacoBold = false;
         for (var i = 0; i < palabras.length; i++) {
            var element = palabras[i];
            if (element.indexOf("|") >= 0) {
               if (isBold) {
                  sacoBold = true;
                  isBold = false;
               } else {
                  doc.setFont("Helvetica", boldStr);
                  isBold = true;
               }
               element = element.replace("|", "");
            }

            if (element.indexOf("|") >= 0) {
               sacoBold = true;
               isBold = false;
               element = element.replace("|", "");
            }

            doc.text(element, startX, startY);
            //console.log('element: ', element,startY);
            startX += doc.getTextWidth(element) + doc.getTextWidth(" ");
            if (sacoBold) {
               doc.setFont("Helvetica", normalStr);
               sacoBold = false;
            }

            if (i < palabras.length - 1) {
               if (
                  startX +
                     doc.getTextWidth(palabras[i + 1]) +
                     doc.getTextWidth(" ") >
                  width
               ) {
                  startY += lineSpacing;
                  startX = margenIzquierdo;
                  //console.log("salto");
               }
            }
         }
         if (startY > maxHorizontal) {
            doc.addPage();
            header(doc);
            startY = firstLineAfterHeader;
         }
         return startY;
      }

      const traerDatos = () => {
         if (contrato.length > 0){
            console.log('contrato: ', contrato);
          //  setInput(input.nombre = contrato[0].nombre)
         // setInput({nombre: contrato[0].nombre});
          input.rfc =  contrato[0].rfc
          input.especial = contrato[0].especial
          input.claveelec = contrato[0].claveelec
         //  setInput({dircomp: contrato[0].dircomp});
         //  setInput({moneda: contrato[0].moneda});
         //  setInput({importe:contrato[0].importe});
           input.cedula  = contrato[0].cedula
           input.producto= contrato[0].producto
           input.serie   = contrato[0].serie
          input.garantia = contrato[0].garantia
          document.getElementById("adicional").innerHTML = contrato[0].adicional
          if (onChange) {
            setOnChange(false)
        } else {
            setOnChange(true)
        }
         //  setInput({adicional: contrato[0].adicional});
         //  setInput({fecha: contrato[0].fecha});
         //  setInput({terminado: contrato[0].terminado});
         //  setInput({especial: contrato[0].especial});
         //  setInput({punitorio: contrato[0].punitorio});
      }         
         console.log('Input: ', input);
      }

      const crearContrato = () => {
         // const doc = new jsPDF("p", "pt");
         // console.log(doc.getFontList())
         setTipo("Contrato")
         getTextoContrato()
         cambiarTexto();
         var txt = textoIni;
         document.getElementById("contrato").innerHTML = txt;
      };

      const arrendamiento = () => {
         setTipo("Arrendamiento")
         getTextoArrendamiento()
         cambiarTexto();
         var txt = textoIni;
         document.getElementById("contrato").innerHTML = txt;
         // console.log('clausulas: ', clausulas);
      };

      function handleChange(e) {
         e.preventDefault();
         setInput({
            ...input, 
            [e.target.name]: e.target.value,
         });
      }
      


      return (
         <>
         <Header />
 
         <div className={style.docum}>
            <div className={style.cuerpo}>
               <div className={style.divRight}>
                  <table>
                     <tr>
                        <td>Cliente</td>
                        <td>
                           {" "}
                           <input
                              className={style.inputAncho}
                              type="text"
                              id="nombre"
                              name="nombre"
                              value={input.nombre}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>Especialidad</td>
                        <td>
                           {" "}
                           <input
                              className={style.inputAncho}
                              type="text"
                              id="especial"
                              name="especial"
                              value={input.especial}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>Fecha</td>
                        <td>
                           {" "}
                           <input
                              type="text"
                              id="fecha"
                              name="fecha"
                              value={input.fecha}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>RFC Cliente</td>
                        <td>
                           <input
                              type="text"
                              id="rfc"
                              name="rfc"
                              value={input.rfc}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>Clave Elector</td>
                        <td>
                           <input
                              type="text"
                              id="claveelec"
                              name="claveelec"
                              value={input.claveelec}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>Direccion Cliente</td>
                        <td>
                           <input
                              className={style.inputAncho}
                              type="text"
                              id="dircomp"
                              name="dircomp"
                              value={input.dircomp}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>Moneda</td>
                        <td>
                           <input
                              type="text"
                              id="moneda"
                              name="moneda"
                              value={input.moneda}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>Importe</td>
                        <td>
                           <input
                              className={style.inputImp}
                              type="text"
                              id="importe"
                              name="importe"
                              value={input.importe}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>Producto</td>
                        <td>
                           <input
                              className={style.inputAncho}
                              type="text"
                              id="producto"
                              name="producto"
                              value={input.producto}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>Serie</td>
                        <td>
                           <input
                              type="text"
                              id="serie"
                              name="serie"
                              value={input.serie}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>Garantia</td>
                        <td>
                           <input
                              type="text"
                              id="garantia"
                              name="garantia"
                              value={input.garantia}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>Cedula</td>
                        <td>
                           <input
                              type="text"
                              id="cedula"
                              name="cedula"
                              value={input.cedula}
                              onChange={handleChange}
                           />
                        </td>
                     </tr>
                     <tr>
                        <td>Punitorio</td>
                        <td>
                           <input
                              type="text"
                              id="punitorio"
                              name="punitorio"
                              value={input.punitorio}
                              onChange={handleChange}
                           /> (solo Arredamientos)
                        </td>
                     </tr>                     
                     <tr>
                        <td>Datos Adicionales</td>
                        <td>
                           {/* {" "}
                           <textarea
                              type="text"
                              id="adicional"
                              cols="50"
                              rows="10"
                              name="adicional"
                              value={input.adicional}
                              onChange={handleChange}
                              className="txtarea"
                           /> */}
                           <div
                              className={style.editable2}
                              contentEditable="true"
                              id="adicional"
                           ></div>

                        </td>
                     </tr>
                  </table>
               </div>
               <div
                  className={style.editable}
                  contentEditable="true"
                  id="contrato"
               ></div>
            </div>
            <div className={style.cuerpo}>
               { contrato.length > 0 ? 
               (
                  <div>
                  <button className='nibbotBtn' onClick={() => traerDatos()}>Traer Datos del Contrato</button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
               ):(null)}
               <button className='nibbotBtn' onClick={() => crearContrato()}>Ver Contrato</button>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <button className='nibbotBtn' onClick={() => arrendamiento()}>Arrendamiento</button>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;             
               <button className='nibbotBtn' onClick={() => generarPdf()}>Generar PDF</button>
            </div>
         </div>
         </>
      );
   } else {
      return <h3>Cargando...</h3>;
   }
}

export default Contrato;
