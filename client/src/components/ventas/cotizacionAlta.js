// Cotizaciones Rapidas
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
// import Collapsible from "react-collapsible";
// Acciones
// import { getCotizacionDet } from '../../actions/factdet';
// import { getClienteId } from "../../actions/cliente";
// import { getDireccion } from "../../actions/direccion";
import { AddCotizacion } from "../../actions/cotizacion";
import { getProducto } from "../../actions/producto";
// import { getDetailIva, getTabla } from "../../actions/tabla";
// import { getUsuariomenId } from "../../actions/usuariomenu";
import { getCondiciones } from "../../actions/condiciones";

// Descuentos
import { getDetail } from "../../actions/tabla";

// Iconos
import { FcAddRow, FcDeleteRow, FcMinus } from "react-icons/fc";
import Header from "../Header";
// CSS
import "../../css/factdet.css";
//import { AddCotizacionDet } from "../../actions/cotizaciondet";
// Modal
import OkForm from "../modal/OkForm";
import { Modal, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
//import { getCondicionesCot } from "../../actions/cotizacioncond";

var xMoneda = "1";
var btnGrabar = false;
// var btnAgregar = false;
var btnEliminarReg = false;

const Formcotizacion = () => {
   const cookies = new Cookies();
   let fecha = new Date().toLocaleDateString("en-GB");
   const { condiciones } = useSelector((state) => state);
   const [showAlert, setShowAlert] = useState(false);
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);
   const { actlogin } = useSelector((state) => state);
   // const [windowSize, setWindowSize] = useState({});

   // useEffect(() => {
   //    window.addEventListener("resize", () => {
   //      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
   //    });
   //  }, [])
  
   //  if (windowSize) {
   //     console.log('windowSize.width: ', window.innerWidth);
      if (window.innerWidth < 1000) {
        window.location.href = "cotizacionAltaPh"
    }
   //  }


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

   // Manejo acceso del Usuario
   // const usuariomenu = useSelector((state) => state.usuariomenu);
   const [acceso, setAcceso] = useState("A");
   // const idProg = 11;
   // const id_usuario = cookies.get("usuario");
   const navigate = useNavigate();
   const { cliente } = useSelector((state) => state);
   const { factcab } = useSelector((state) => state);
   const { factdet } = useSelector((state) => state);

   const { producto } = useSelector((state) => state);
   const { tabla } = useSelector((state) => state);
   // const { idfact } = useSelector((state) => state)

   const dispatch = useDispatch();
   // const location = useLocation();
   // const { state } = location;
   const estilo = { fontSize: "150%", transition: "font-size 0.5s" };
   // const estilo2 = { fontSize: "200%" };

   const [onChange, setOnChange] = useState(false);
   // const [onIva, setOnIva] = useState(false)

   const [subTotal, setSubTotal] = useState(0);
   const [saleTax, setSaleTax] = useState(0);

   const [saleDHL, setSaleDHL] = useState(0);
   const [total, setTotal] = useState(0);
   const [mostrar, setMostrar] = useState(true);
   const [rutaOk, setRutaOk] = useState("./cotizacion");

   // Formato Numeros
   const dollarUSLocale = Intl.NumberFormat("de-DE");
   
   var dateInput = new Date(); // Example date, you can replace it with your own date

   var formattedDate = dateInput.toISOString().slice(0,10);
   //console.log(formattedDate);

   const [input, setInput] = useState({
      cli_id: 0,
      nombre: "",
      cot_id: 0,
      subtotal: 0,
      iva: 0,
      total: 0,
      observ: "",
      cod_status: 1,
      dhl: 0,
      moneda: 0,
      idioma: 0,
      telefono: "",
      direccion: "",
      email: "",
      vendedor: cookies.get("usuario"),
      fecha: new Date().toLocaleDateString("en-GB"),
      vencimiento: formattedDate,
      cia_id:1,
   });
   
   const [inputDet, setInputDet] = useState({
      cot_id: 0,
      orden: 0,
      prod_id: 0,
      precio: 0,
      cantidad: 0,
      total: 0,
      descto: 0
   });

   const initialProductLine = {
      prod_id: "",
      cantidad: 1,
      description: "",
      cot_id: 0,
      orden: factcab.length,
      precio: 0,
      total: 0,
      descto:0,
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
      cli_id: 9999,
      cot_id: 0,
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
      // btnAgregar = false;
      btnEliminarReg = false;
      if (acceso.substring(0, 1) === "A") {
         // Gerencia All
         // btnAgregar = true;
         btnEliminarReg = true;
      }
      if (acceso.substring(0, 1) === "C") {
         // Consulta
         btnGrabar = false;
         // btnAgregar = false;
         btnEliminarReg = false;
      }
      // console.log("control2: ", btnGrabar, btnAgregar, btnEliminarReg);
   };

   // var cantidad = []
   //console.log('factcab: ', factcab.length);
   if (factcab.length === 0) {
      factcab.push(initialHead);
   }

   useEffect(() => {
      //dispatch(getDetail(1));
      dispatch(getDetail(2));
      dispatch(getProducto());
      dispatch(getCondiciones());
      // dispatch(getClienteId(state.idCli));
      // dispatch(getDetailIva(1));
      //    dispatch(getUsuariomenId(id_usuario));
      dispatch(getDetail(18));
      setMostrar(true);
      setAcceso(cookies.get("acceso"));
      // return (
      //   dispatch(resetFact())
      //   )
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch]);

   // Calculo subtotal
   useEffect(() => {
      let subTotal = 0;
      let iva = 0;
      let total = 0;
      if (factdet && porciva) {
         factdet.forEach((fact) => {
            const quantityNumber = parseFloat(fact.cantidad);
            if (fact.precio > 0) {
               const rateNumber = parseFloat(fact.precio);
               var amount =
                  quantityNumber && rateNumber
                     ? quantityNumber * rateNumber 
                     : 0;
               if (fact.descto !== 0) {
                  amount = amount - (amount * fact.descto / 100)
               }
               subTotal += parseInt(amount);
            }
         });
         setSubTotal(subTotal);
         if (subTotal > 0) {
            if (xMoneda === "1") {
               iva = parseInt(subTotal * (parseFloat(porciva) / 100));
               setSaleTax(iva);
            }
            total = parseInt(subTotal + iva);
            setSaleTax(iva);
            setTotal(total);
         } else {
            setSaleTax(0);
            setTotal(0);
         }
      }
      //console.log('subTotal: ', subTotal,'Iva',iva);
   }, [onChange, factdet, porciva, cliente]);

   useEffect(() => {
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
         if (subTotal > 0) {
            if (xMoneda === "1") {
               iva = parseInt(aux * (parseFloat(porciva) / 100));
            }
            setSaleTax(iva);
            if (saleDHL.length === 0) setSaleDHL(0);
            var total = aux + iva + parseInt(saleDHL);
            setTotal(total);
         }
         if (iva < 0) {
            iva = 0;
            setSaleTax(iva);
            setTotal(0);
         }
      }
   }, [onChange, saleDHL]);

   const exitWindow = () => {
      window.location.href = "/cotizacion";
   };

   const handleRemove = (i) => {
      factdet.splice(i, 1);
      if (onChange) {
         setOnChange(false);
      } else {
         setOnChange(true);
      }
   };
   const handleFree = (i) => {
      factdet[i].precio = -1;
      factdet[i].total = -1;
      if (onChange) {
         setOnChange(false);
       } else {
         setOnChange(true);
      }
   };
   const getPrice = () => {
      for (var y = 0; y < factdet.length; y++) {
         for (var z = 0; z < producto.length; z++) {
            if (parseInt(producto[z].id) === parseInt(factdet[y].prod_id)) {
               // console.log(
               //    " in: ",
               //    producto[z].id,
               //    factdet[y].precio,
               //    "xMoneda",
               //    xMoneda,
               //    producto[z].dolar
               // );
               if (xMoneda === "2") {
                  factdet[y].precio = producto[z].dolar;
               } else {
                  factdet[y].precio = producto[z].price;
               }
               // console.log("out: ", factdet[y].precio);
            // factdet[y].total = factdet[y].cantidad * factdet[y].precio;
               factdet[y].total = parseInt(factdet[y].cantidad * (factdet[y].precio - (factdet[y].precio * (factdet[y].descto/100))));
            }
         }
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
      var newDate1 = fecha.split("/");
      const newdate = newDate1[2] + newDate1[1] + newDate1[0];
      //console.log('saleTax: ', saleTax);
      // console.log('Total: ', total);
      factcab[0].subtotal = subTotal;
      factcab[0].iva = saleTax.toFixed(0);
      factcab[0].total = parseInt(total)
      factcab[0].dir_id = parseInt(xMoneda);
      setInput((input.subtotal = subTotal));
      setInput((input.iva = saleTax));
      setInput((input.total = parseInt(total)));
      setInput((input.dir_id = 0));
      setInput((input.cli_id = 0));
      setInput((input.fecha = newdate));
      setInput((input.idioma = factcab[0].idioma));
      setInput((input.moneda = xMoneda));
      setInput((input.cia_id = actlogin[0]?.cia_id));

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
         if (
            found.des !== found.descuento ||
            found.eng !== found.enganche ||
            found.mes !== found.meses ||
            found.inte !== found.interes
         ) {
            input.cod_status = 2;
         }
      } else {
         condGral.id = 0;
         condGral.cot_id = 0;
         condGral.cond_id = 1;
         condGral.descuento = 0;
         condGral.enganche = 0;
         condGral.meses = 0;
         condGral.interes = 0;
      }
      console.log("factcab: ", factcab[0]);
      console.log("factdet: ", factdet);
      console.log("input: ", input);
      console.log("found: ", found);
      console.log("condGral: ", condGral);
      // sacado el 01/08/2023
      // if (subTotal === 0) {
      //    return alert("O/C no puede quedar en 0 (Cero)");
      // }
      //console.log('i f d',input, factdet, inputDet);
      dispatch(AddCotizacion(input, factdet, inputDet, condGral));
      handleShow();
      // setMostrar(false);
      //window.location.href = "/cotizacion";
      // console.log('resultado: ', resultado);

      // factdet.forEach((fact) => {
      //   xOrden += 1
      //   inputDet.cot_id = response.data[0][0].id
      //   inputDet.orden = xOrden
      //   inputDet.prod_id = fact.prod_id
      //   inputDet.precio = fact.precio
      //   inputDet.cantidad = fact.cantidad
      //   inputDet.total = fact.total
      //   console.log('Graba Productos ', inputDet);
      //   dispatch(AddCotizacionDet(fact))
      //   console.log('Detalle de Cotizacion ');
      // })
   };
   // async function Grabar(input){
   //   try {
   //     const values = dispatch(AddCotizacion2(input));
   //     console.log('Grabar2',values); // [resolvedValue1, resolvedValue2]
   //     return values
   //   } catch (error) {
   //     console.log(error); // rejectReason of any first rejected promise
   //     return 0
   //   }

   // }
   function handleTipo(e, i) {
      // if (e.key === "Enter") {
      //    console.log("hola", e.target.value,e.key)
      // }
      e.preventDefault(); 
      console.log("handleTipo: ", e.target.name, e.target.value,e.key);
      if (e.target.name === "telefono") {
         input.telefono = e.target.value;
         if (onChange) {
            setOnChange(false);
         } else {
            setOnChange(true);
         }
      }
      if (e.target.name === "direccion") {
         input.direccion = e.target.value;
         if (onChange) {
            setOnChange(false);
         } else {
            setOnChange(true);
         }
      }
      if (e.target.name === "email") {
         input.email = e.target.value;
         if (onChange) {
            setOnChange(false);
         } else {
            setOnChange(true);
         }
      }

      if (e.target.name === "nombre") {
         input.nombre = e.target.value;
         if (onChange) {
            setOnChange(false);
         } else {
            setOnChange(true);
         }
         //      console.log('input.nombre: ', input.nombre);
      }

      if (e.target.name === "vencimiento") {
         input.vencimiento = e.target.value;
         if (onChange) {
            setOnChange(false);
         } else {
            setOnChange(true);
         }
      }      
      if (e.target.name === "dhl") {
         input.dhl = e.target.value;
         //console.log("e.target.name: ", e.target.name, e.target.value, input);
         setSaleDHL(e.target.value);
      }
      if (e.target.name === "miCheck") {
         console.log('in: ', condiciones);
         // for (var xcond = 0; xcond < condiciones.length; xcond++) {
            //    condiciones[xcond].sel = " ";       
            // }
            if (condiciones[i.i].sel !== "S") {
               condiciones[i.i].sel = "S";
            } else {
               condiciones[i.i].sel = "";
            }
         console.log('out: ', condiciones[i.i].sel);
         //console.log("miCheck condiciones: ", condiciones);
         if (onChange) {
            setOnChange(false);
         } else {
            setOnChange(true);
         }
      }
      // if (e.target.name === "CGdesc") {
      //    condiciones[i.i].descuento = e.target.value.replace(",", ".");
      // }
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
      if (e.target.name === "selMoneda") {
         xMoneda = e.target.value;
         if (e.target.value > 0) btnGrabar = true;
         if (factdet) {
            getPrice();
         }
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
         // console.log('descto: ', factdet[i.i].descto);
         // console.log('total: ', factdet[i.i].total);
         if (onChange) {
            setOnChange(false);
         } else {
            setOnChange(true);
         }
      }
      if (e.target.name === "prod_id") {
         console.log(
            "e.target.name: ",
            e.target.name,
            e.target.value,i.i
         );
         if (e.target.value === "0") {
            handleRemove(i.i);
         } else {
            for (var z = 0; z < producto.length; z++) {
               if (parseInt(producto[z].id) === parseInt(e.target.value) ) {
                  if (producto[z].cod_status === 1 || producto[z].cod_status === 3){
                  factdet[i.i].prod_id = e.target.value;
                  factdet[i.i].name = producto[z].name;
                  if (xMoneda === "2") {
                     factdet[i.i].precio = producto[z].dolar;
                  } else {
                     factdet[i.i].precio = producto[z].price;
                  }
                  factdet[i.i].total =
                     parseInt(factdet[i.i].cantidad * factdet[i.i].precio - (factdet[i.i].precio * factdet[i.i].descto / 100 ));
                     break;
                  } else {

                     Swal.fire({
                        title: 'Aviso...',
                        text: `Producto ${producto[z].description} Congelado`,
                        icon: 'error', // You can customize the icon (info, success, warning, error, question)
                        confirmButtonText: 'OK',
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
         var lista =[]
         if (parseInt(e.target.value) === 1) {
            lista = [2,3,4,13,12,17,19,23,9,7,8]
            // console.log('factdet: ', factdet);
            //lista.push('9','7','8')
             agregar_prod(lista)
         }
         if (parseInt(e.target.value) === 25) {
            lista = [38,27,26,55,4,17,19,23,12,13,7,8,29,28]
            // console.log('factdet: ', factdet);
            //lista.push('9','7','8')
             agregar_prod(lista)
         }
         for (let indx = 0; indx < tabla.length; indx++) {
            if (parseInt(e.target.value) === tabla[indx].cod) {
               lista = "[" + tabla[indx].description + "]"
               lista = lista.replace(/\[|\]/g,'').split(',')
               agregar_prod(lista)
            }
         }

         if (onChange) {
            setOnChange(false);
         } else {
            setOnChange(true);
         }
      }
   }

   function agregar_prod(lista) {
      var indx = 0;
      console.log('Indice: ',indx, factdet[indx].prod_id );
      for (var indxLista = 0; indxLista < lista.length; indxLista++) {
         for (var zz = 0; zz < producto.length; zz++) {
            if (parseInt(producto[zz].id) === parseInt(lista[indxLista])) {
               var newPrecio = 0
               if (xMoneda === "2") {
                  newPrecio = producto[zz].dolar;
               } else {
                  newPrecio = producto[zz].price;
               }
               factdet.push({
                  prod_id: producto[zz].id,
                  cantidad: 1,
                  name: producto[zz].name,
                  cot_id: 0,
                  orden: producto[zz].orden,
                  precio: newPrecio,
                  total: parseInt(newPrecio),
                  descto:0
               }
               );
               console.log('Indice: ',indx, factdet[indx].prod_id );
               break;
            }
         }
      }
      console.log('factdet: ', factdet);
   }

   // console.log("Cliente_1: ", cliente, state.idCli);
   // console.log("acceso: ", acceso);
   // console.log("total: ", total);
   // console.log("saleDHL: ", saleDHL);
   // console.log("tabla: ", tabla);
   //console.log("input: ", input);
   if (!mostrar) {
      return (
         <>
            <div>Registro grabado</div>
            <div>
               <button
                  onClick={() => {
                     exitWindow();
                  }}
               ></button>
            </div>
         </>
      );
   }
   if (mostrar && factcab.length > 0) {
      control();
      return (
         <>
            <Header />
            <div>
               <div className="cabeceraAlta">
                  <div className="row gap-1">
                     <div className="row">
                        <div className="col">Cotizacion:&nbsp;</div>
                        <div className="col">Fecha: {fecha}</div>
                     </div>
                     <div>
                        <label htmlFor="nombre">Nombre : </label>
                        <input
                           className="input_text"
                           type="text"
                           id="nombre"
                           name="nombre"
                           value={input.nombre}
                           onChange={(e) => handleTipo(e, 0)}
                        ></input>
                        &nbsp;
                        <label htmlFor="nombre">Direccion : </label>
                        <input
                           className="input_text"
                           type="text"
                           id="direccion"
                           name="direccion"
                           value={input.direccion}
                           onChange={(e) => handleTipo(e, 0)}
                        ></input>
                        &nbsp;
                        <label htmlFor="nombre">Telefono : </label>
                        <input
                           className="input_text"
                           type="text"
                           id="telefono"
                           name="telefono"
                           value={input.telefono}
                           onChange={(e) => handleTipo(e, 0)}
                        ></input>
                     </div>
                     <div>
                        <label htmlFor="nombre">Email : </label>
                        <input
                           className="input_text_mail"
                           type="text"
                           id="email"
                           name="email"
                           value={input.email}
                           onChange={(e) => handleTipo(e, 0)}
                           ></input>
                        &nbsp;
                        <label htmlFor="vencimiento">Vencimiento&nbsp;</label>
                        <input
                           id="vencimiento"
                           name="vencimiento"
                           type="date"
                           value={input.vencimiento}
                           onChange={(e) => handleTipo(e)}
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
                                 <th>Descuento</th>
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
                                                onChange={(e) =>
                                                   handleTipo(e, { i })
                                                }
                                             />
                                          </td>
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
                                             <td>
                                                <input
                                                   className="input_fact"
                                                   type="text"
                                                   id="quantity"
                                                   name="quantity"
                                                   value={fact.cantidad}
                                                   onChange={(e) =>
                                                      handleTipo(e, { i })
                                                   }
                                                ></input>
                                             </td>
                                          ) : null}
                                          {fact.precio > 0 ? (
                                             <td>
                                                <input
                                                   className="input_fact"
                                                   type="text"
                                                   id="descuento"
                                                   name="descuento"
                                                   value={fact.descto}
                                                   onChange={(e) =>
                                                      handleTipo(e, { i })
                                                   }
                                                ></input>
                                             </td>
                                          ) : null}
                                          {fact.precio > 0 ? (
                                             <td className="totaltr">
                                                {dollarUSLocale.format(
                                                   fact.total
                                                )}
                                             </td>
                                          ) : null}
                                          {btnEliminarReg ? (
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
                                          ) : null}
                                          {acceso.substring(0, 1) === "A" ? (
                                             <td onClick={() => handleFree(i)}>
                                                <FcMinus
                                                   style={estilo}
                                                   title="Precio 0"
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
                              value={input.observ}
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

                                 <tr className="totaltr">
                                    <td colSpan="3" className="totaltd1">
                                       IVA({porciva}%)
                                    </td>
                                    <td className="totaltd2">
                                       {dollarUSLocale.format(
                                          saleTax.toFixed(0)
                                       )}
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
                                          value={factcab[0].dhl}
                                          onChange={(e) => handleTipo(e, 0)}
                                       />
                                    </td>
                                 </tr>

                                 <tr className="totaltr">
                                    <td colSpan="3">
                                       {xMoneda === 2 ? (
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
                                    {/* <!--th>Descuento</th--> */}
                                    <th>Enganche</th>
                                    <th>Meses</th>
                                    <th>Interes Anual</th>
                                    <th>Opcion</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {condiciones &&
                                    condiciones.map((cond, i) => {
                                       if (cond.sel === "S" && cond.id === 3) {
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
                                          var aux2 = (xPagoMens * cond.meses)
                                          aux2 += parseInt(saleDHL);
                                          var xTotal = parseInt(aux2) ;
                                          // console.log('xTotal robin: ', parseInt(xTotal),saleDHL);
                                          // if (cond.id === 1) {
                                          //    xEnganche = 0;
                                          //    xFinanciar = 0;
                                          //    xTotal = total;
                                          //    return (
                                          //       <>
                                          //          <tr key={i + 100}>
                                          //             <td>
                                          //                {cond.nombre} {i}
                                          //             </td>
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
                                          //                   parseInt(xTotal)
                                          //                )}
                                          //             </td>
                                          //          </tr>
                                          //       </>
                                          //    );
                                          // }
                                          // if (cond.id === 2) {
                                          //    xEnganche = 0;
                                          //    xFinanciar = 0;
                                          //    var aux = total - saleDHL
                                          //    console.log('aux0: ',aux,saleDHL);
                                          //    aux = parseInt(aux - (aux * cond.descuento) / 100);
                                          //    console.log('aux1: ', aux);
                                          //    aux += parseInt(saleDHL);
                                          //    console.log('aux2: ', aux,saleDHL);
                                          //    xTotal = parseInt(aux)
                                          //    console.log('xTotal: ', xTotal,aux,saleDHL);
                                          // }
                                          return (
                                             <>
                                                <tr key={i + 130}>
                                                   <td>{cond.nombre}</td>
                                                   {/* <td>
                                                      <input
                                                         className="input_fact"
                                                         type="text"
                                                         id="CGdesc"
                                                         name="CGdesc"
                                                         value={cond.descuento}
                                                         onChange={(e) =>
                                                            handleTipo(e, { i })
                                                         }
                                                      ></input>
                                                      %
                                                   </td> */}
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
                                                      Total Cotizacion
                                                   </td>
                                                   <td className="totaltr">
                                                      {dollarUSLocale.format(
                                                         parseInt(total - saleDHL)
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
                                                <tr key={i + 180}>
                                                   <td>&nbsp;</td>
                                                   <td colSpan={3}>
                                                      Total a Pagar
                                                   </td>
                                                   <td className="totaltr">
                                                      {dollarUSLocale.format(
                                                         parseInt(xTotal)
                                                      )}
                                                   </td>
                                                </tr>
                                             </>
                                          );
                                       } else {
                                          return (
                                             <tr key={i}>
                                                <td>{cond.nombre}</td>
                                                {/* <td>
                                                   <input
                                                      className="input_fact"
                                                      type="text"
                                                      id="CGdesc"
                                                      name="CGdesc"
                                                      value={cond.descuento}
                                                      onChange={(e) =>
                                                         handleTipo(e, { i })
                                                      }
                                                   ></input>
                                                   %
                                                </td> */}
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
                     <table>
                        <tbody>
                           <tr className="totaltr">
                              {acceso.substring(0, 1) === "A" && btnGrabar ? (
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
                              <td>
                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </td>
                              <td>
                                 <Button
                                    variant="primary"
                                    type="submit"
                                    block
                                    onClick={() => {
                                       navigate("/cotizacion");
                                    }}
                                 >
                                    Volver
                                 </Button>
                              </td>
                           </tr>
                        </tbody>
                     </table>{" "}
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
                  {/* <Button variant="secondary" onClick={handleClose}>
                     Cerrar
                  </Button> */}
               </Modal.Footer>
            </Modal>
         </>
      );
   } else {
      return (
         <div>
            <h3>Cargando...</h3>
         </div>
      );
   }
};

export default Formcotizacion;
