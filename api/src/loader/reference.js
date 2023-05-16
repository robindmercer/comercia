require('dotenv').config();
const { Usuario, Perfil, Status, Perfilmenu, Menu, Usuariomenu,  Tabla, Cliente} = require('../db')
const {Factcond,Condiciones, Direccion,Productolang,Producto,Materiaprima,Factura,Factdet,Prodmp } = require('../db');

async function refLoad() {

   Perfil.bulkCreate([
      { description: "Gerencia" },
      { description: "Administracion" },
      { description: "Ventas" },
      { description: "Planeación" },
      { description: "Manufactura" },
      { description: "Almacen" },
   ]).then(() => console.log('Perfil ha sido grabado'));

   Status.bulkCreate([
      { description: "Activo" },
      { description: "Congelado" },
      { description: "Confeccionado" },
   ]).then(() => console.log('Status ha sido grabado'));

   Usuario.bulkCreate([
      { usr_id: "RM",  name: "Robin Mercer",                     email: "robindmercer@gmail.com",    cod_perfil: '1', cod_status: '1', password: "pass1+" },
      { usr_id: "RDM", name: "Robin D Mercer",                   email: "robindmercer@yahoo.com.ar", cod_perfil: '3', cod_status: '1', password: "pass1+" },
      { usr_id: "DR",  name: "Dinora Castro Ríos",               email: "robindmercer@yahoo.com.ar", cod_perfil: '2', cod_status: '1', password: "pass1+" },
      { usr_id: "JC",  name: "Jennifer Areli Chavira",           email: "robindmercer@yahoo.com.ar", cod_perfil: '4', cod_status: '1', password: "pass1+" },
      { usr_id: "AC",  name: "Laura Alejandra Cortés Hernandez", email: "robindmercer@yahoo.com.ar", cod_perfil: '5', cod_status: '1', password: "pass1+" },
      { usr_id: "VG",  name: "Víctor Manuel Oviedo Govea",       email: "robindmercer@yahoo.com.ar", cod_perfil: '6', cod_status: '1', password: "pass1+" },
      { usr_id: "FC",  name: "Fernando Bravo Collar",            email: "robindmercer@yahoo.com.ar", cod_perfil: '4', cod_status: '1', password: "pass1+" },
      { usr_id: "DL",  name: "Diana Laura Torres López",         email: "robindmercer@yahoo.com.ar", cod_perfil: '4', cod_status: '1', password: "pass1+" },
      { usr_id: "AS",  name: "Ana Melisa Padrón Salazar",        email: "robindmercer@yahoo.com.ar", cod_perfil: '2', cod_status: '1', password: "pass1+" },
      { usr_id: "MT",  name: "Miriam Felicia Hernández Tovar",   email: "robindmercer@yahoo.com.ar", cod_perfil: '2', cod_status: '1', password: "pass1+" },
      { usr_id: "YG",  name: "Yolanda Hernandez García",         email: "robindmercer@yahoo.com.ar", cod_perfil: '5', cod_status: '1', password: "pass1+" },
      { usr_id: "VT",  name: "vt",         email: "robindmercer@yahoo.com.ar", cod_perfil: '3', cod_status: '1', password: "p1" },
      { usr_id: "AD",  name: "ad",         email: "robindmercer@yahoo.com.ar", cod_perfil: '2', cod_status: '1', password: "p1" },
      { usr_id: "MA",  name: "ma",         email: "robindmercer@yahoo.com.ar", cod_perfil: '5', cod_status: '1', password: "p1" },
      { usr_id: "AL",  name: "al",         email: "robindmercer@yahoo.com.ar", cod_perfil: '6', cod_status: '1', password: "p1" }
   ]).then(() => console.log('Usuario ha sido grabado'));

   Usuariomenu.bulkCreate([
      { usrid: "VT", nivel: 0,accion:"A"},
      { usrid: "VT", nivel: 1,accion:"C"},      
      { usrid: "VT", nivel: 3,accion:"C"},      // Productos 
      { usrid: "VT", nivel: 6,accion:"A"},      
      { usrid: "VT", nivel: 10,accion:"A"},      
      { usrid: "VT", nivel: 11,accion:"A"},      
      { usrid: "VT", nivel: 12,accion:"A"},      
      { usrid: "AD", nivel: 0,accion:"A"},
      { usrid: "AD", nivel: 1,accion:"C"},      
      { usrid: "AD", nivel: 6,accion:"A"},      
      { usrid: "AD", nivel: 10,accion:"A"},      
      { usrid: "AD", nivel: 11,accion:"A"},      
      { usrid: "AD", nivel: 12,accion:"A"},      
      { usrid: "MA", nivel: 0,accion:"A"},
      { usrid: "MA", nivel: 1,accion:"A"},
      { usrid: "MA", nivel: 3,accion:"A"},
      { usrid: "MA", nivel: 18,accion:"A"},
      { usrid: "MA", nivel: 19,accion:"A"},
      { usrid: "AL", nivel: 0,accion:"A"},
      { usrid: "AL", nivel: 20,accion:"A"},
      { usrid: "AL", nivel: 21,accion:"A"},
      { usrid: "RM", nivel: 0,accion:"A"},
      { usrid: "RM", nivel: 1,accion:"A"},
      { usrid: "RM", nivel: 2,accion:"A"},
      { usrid: "RM", nivel: 3,accion:"A"},
      { usrid: "RM", nivel: 4,accion:"A"},
      { usrid: "RM", nivel: 5,accion:"A"},
      { usrid: "RM", nivel: 6,accion:"A"},
      { usrid: "RM", nivel: 7,accion:"A"},
      { usrid: "RM", nivel: 8,accion:"A"},
      { usrid: "RM", nivel: 9,accion:"A"},
      { usrid: "RM", nivel: 10,accion:"A"},
      { usrid: "RM", nivel: 11,accion:"A"},
      { usrid: "RM", nivel: 12,accion:"A"},
      { usrid: "RM", nivel: 13,accion:"A"},
      { usrid: "RM", nivel: 14,accion:"A"},
      { usrid: "RM", nivel: 15,accion:"A"},
      { usrid: "RM", nivel: 18,accion:"A"},
      { usrid: "RM", nivel: 19,accion:"A"},
      { usrid: "RDM", nivel: 0,accion:"A"},      
      { usrid: "RDM", nivel: 1,accion:"C"},      
      { usrid: "RDM", nivel: 6,accion:"A"},      
      { usrid: "RDM", nivel: 10,accion:"A"},      
      { usrid: "RDM", nivel: 11,accion:"A"},      
      { usrid: "RDM", nivel: 12,accion:"A"},      
      { usrid: "YG", nivel: 0,accion:"A"},      
      { usrid: "YG", nivel: 1,accion:"A"},      
      { usrid: "YG", nivel: 5,accion:"A"},      
      { usrid: "YG", nivel: 10,accion:"C"},      
      { usrid: "YG", nivel: 11,accion:"C"},      
      { usrid: "FC", nivel: 0,accion:"A"},      
      { usrid: "DL", nivel: 0,accion:"A"},      
      { usrid: "JC", nivel: 0,accion:"A"},      
      { usrid: "DR", nivel: 0,accion:"A"},      
      { usrid: "VG", nivel: 0,accion:"A"},      
      { usrid: "AS", nivel: 0,accion:"A"},      
      { usrid: "MT", nivel: 0,accion:"A"},      
      { usrid: "AC", nivel: 0,accion:"A"},      
      { usrid: "AC", nivel: 1,accion:"C"},      
      { usrid: "AC", nivel: 6,accion:"C"},      
      { usrid: "AC", nivel: 10,accion:"A"},      
      { usrid: "AC", nivel: 11,accion:"A"},      
   ]).then(() => console.log('UsuarioMenu ha sido grabado'));
   
   Menu.bulkCreate([
      { description: "Logout",          nivel: '1', programa: "/" },
      { description: "Administración",  nivel: '2', programa: "/" },
      { description: "Clientes",        nivel: '2.1', programa: "/cliente" },
      { description: "Productos",       nivel: '2.2', programa: "/producto" },
      { description: "Materia Prima",   nivel: '2.3', programa: "/materiprima"},
      { description: "Ventas",          nivel: '3', programa: "/ventas" },
      { description: "Orden de Compra", nivel: '3.1', programa: "/factura" },
      { description: "Submenu",         nivel: '3.2', programa: "/factura" },
      { description: "Submenu.1",       nivel: '3.2.1', programa: "/factura" },
      { description: "Submenu.2",       nivel: '3.2.2', programa: "/factura" },
      { description: "Compras",         nivel: '4', programa: "/compras" },
   ]).then(() => console.log('Menu ha sido grabado'));

   Perfilmenu.bulkCreate([
      { id_perfilmenu: 1, id_menu: 1, nivel: "A" }, // Administracion
      { id_perfilmenu: 2, id_menu: 2, nivel: "A" }, // Ventas
      { id_perfilmenu: 3, id_menu: 3, nivel: "A" }, // Compras
   ]).then(() => console.log('Perfilmenu ha sido grabado'));

   Tabla.bulkCreate([
      { id: 1, cod: 0, description: "Iva", valor: 0, control : 'N', cod_status: 1 },
      { id: 1, cod: 1, description: "Iva", valor: 16, control : 'N', cod_status: 1 },
      { id: 2, cod: 0, description: "Descuentos", valor: 0, control : 'N', cod_status: 1 },
      { id: 2, cod: 1, description: "Pago Contado", valor: 10, control : 'N', cod_status: 1 },
      { id: 2, cod: 2, description: "Pago Contado", valor: 11, control : 'S', cod_status: 1 },
      { id: 2, cod: 3, description: "Pago Contado", valor: 12, control : 'S', cod_status: 1 },
      { id: 2, cod: 4, description: "Pago Contado", valor: 13, control : 'S', cod_status: 1 },
      { id: 2, cod: 5, description: "Pago Contado", valor: 14, control : 'S', cod_status: 1 },
      { id: 2, cod: 6, description: "Pago Contado", valor: 15, control : 'S', cod_status: 1 },
      { id: 2, cod: 7, description: "Pago 30 Dias", valor: 5, control : 'N', cod_status: 1 },
      { id: 2, cod: 8, description: "Bonificacion 100%", valor: 100, control : 'N', cod_status: 1 },
      { id: 3, cod: 0, description: "Tipo Cliente", valor: 0, control : 'N', cod_status: 1 },
      { id: 3, cod: 1, description: "Profesional", valor: 0, control : 'N', cod_status: 1 },
      { id: 3, cod: 2, description: "Paciente", valor: 0, control : 'N', cod_status: 1 },
      { id: 3, cod: 3, description: "Distribuidor", valor: 0, control : 'N', cod_status: 1 },
      { id: 3, cod: 4, description: "Otros", valor: 0, control : 'N', cod_status: 1 },
      { id: 4, cod: 0, description: "Tipo de Cambio", valor: 0, control : 'N', cod_status: 1 },
      { id: 4, cod: 1, description: "U$S", valor: 20.10, control : 'N', cod_status: 1 },
      { id: 4, cod: 2, description: "GPB", valor: 23, control : 'N', cod_status: 1 },
      { id: 5, cod: 0, description: "Tipo de Direcciones", valor: 0, control : 'N', cod_status: 1 },
      { id: 5, cod: 1, description: "Casa", valor: 0, control : 'N', cod_status: 1 },
      { id: 5, cod: 2, description: "Oficina", valor: 0, control : 'N', cod_status: 1 },
      { id: 5, cod: 3, description: "Deposito", valor: 0, control : 'N', cod_status: 1 },
      { id: 5, cod: 4, description: "Clinica", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 0, description: "Ordenes de Compra", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 1, description: "DRAFT", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 2, description: "Espera Aprobación", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 3, description: "Aprobado GC.", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 4, description: "Pendiente ADMIN.", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 5, description: "Pendiente Pago", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 6, description: "Liberado", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 7, description: "Almacen", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 8, description: "Manufactura", valor: 0, control : 'N', cod_status: 1 },
      { id: 7, cod: 0, description: "Idioma", valor: 0, control : 'N', cod_status: 1 },
      { id: 7, cod: 1, description: "Español", valor: 0, control : 'N', cod_status: 1 },
      { id: 7, cod: 2, description: "Ingles", valor: 0, control : 'N', cod_status: 1 },
      { id: 8, cod: 0, description: "Moneda", valor: 0, control : 'N', cod_status: 1 },
      { id: 8, cod: 1, description: "Peso Mex.", valor: 0, control : 'N', cod_status: 1 },
      { id: 8, cod: 2, description: "Dolar", valor: 0, control : 'N', cod_status: 1 },
      { id: 9, cod: 0, description: "Terminos y Condiciones Local", valor: 0, control : 'N', cod_status: 1 },
      { id: 9, cod: 1, description: "* Cotización expresada en pesos mexicanos. Los precios incluyen I.V.A.", valor: 0, control : 'N', cod_status: 1 },
      { id: 9, cod: 2, description: "* Envío por medio de DHL EXPRESS en un plazo de 15 a 45 días a partir de la confirmación de pago.", valor: 0, control : 'N', cod_status: 1 },
      { id: 9, cod: 3, description: "* Capacitación incluidas", valor: 0, control : 'N', cod_status: 1 },
      { id: 9, cod: 4, description: "* Certificaciones hasta 3 cupos incluidas", valor: 0, control : 'N', cod_status: 1 },
      { id: 10, cod: 0, description: "Terminos y Condiciones Internacional", valor: 0, control : 'N', cod_status: 1 },
      { id: 10, cod: 1, description: "* Cotización expresada en dólar americano.", valor: 0, control : 'N', cod_status: 1 },
      { id: 10, cod: 2, description: "* Envío por medio de DHL EXPRESS.", valor: 0, control : 'N', cod_status: 1 },
      { id: 10, cod: 3, description: "* Capacitación incluidas.", valor: 0, control : 'N', cod_status: 1 },
      { id: 10, cod: 4, description: "* Certificaciones hasta 3 cupos incluidas.", valor: 0, control : 'N', cod_status: 1 },      
      { id: 11, cod: 0, description: "Terminos y Condiciones Internacional ENG", valor: 0, control : 'N', cod_status: 1 },
      { id: 11, cod: 1, description: "* Price expressed in US dollars. .", valor: 0, control : 'N', cod_status: 1 },
      { id: 11, cod: 2, description: "* Shipping by DHL EXPRESS.", valor: 0, control : 'N', cod_status: 1 },
      { id: 11, cod: 3, description: "* Training included", valor: 0, control : 'N', cod_status: 1 },
      { id: 11, cod: 4, description: "* Certifications up to 3 places included", valor: 0, control : 'N', cod_status: 1 },
   ]).then(() => console.log('Tablas ha sido grabado'));

   Cliente.bulkCreate([
      { razsoc:"MEDINA",nombre: "JAVIER CEBALLOS"  ,apellido:"MEDINA", email: "cliente@gmail.com", movil: '123456789', fijo: '46661234', rfc_cod: 'rfc-1', idioma:1, moneda:1,cod_cliente: 1, cod_status: 1 },
      { razsoc:"RAZO SOLIS",nombre: "DRA. MARIA TERESA",apellido:"RAZO SOLIS", email: "cliente@gmail.com", movil: '123456789', fijo: '46661234', rfc_cod: 'rfc-2', idioma:1, moneda:1,cod_cliente: 2, cod_status: 1 },
      { razsoc:"VELA",nombre: "ING. JAVIER"      ,apellido:"VELA", email: "cliente@gmail.com", movil: '123456789', fijo: '46661234', rfc_cod: 'rfc-3', idioma:2, moneda:2,cod_cliente: 2, cod_status: 1 },
      { razsoc:"YPF",nombre: "YPF"              ,apellido:"", email: "YPF@gmail.com", movil: '123456789', fijo: '46661234', rfc_cod: 'rfc-4', idioma:2, moneda:2, cod_cliente: 1, cod_status: 1 },
   ]).then(() => console.log('Clientes grabados'));
  
   Direccion.bulkCreate([
      { cli_id:1, orden:1, calle: 'Corrientes 2166', localidad: 'Bella vista', cp: '1661', ciudad: 'Bella vista', pais: 'Argentina',cod_tipo:1,cod_status: 1 },
      { cli_id:1, orden:2, calle: 'Florida 229', localidad: 'C.A.B.A.', cp: '1231', ciudad: 'C.A.B.A.', pais: 'Argentina',cod_tipo:2,cod_status: 1 },
      { cli_id:2, orden:1, calle: 'corrientes 1234', localidad: 'Bella vista', cp: '1661', ciudad: 'Bella vista', pais: 'Argentina',cod_tipo:1,cod_status: 1 },
      { cli_id:3, orden:1, calle: '20 de Junio 321', localidad: 'Bella vista', cp: '1661', ciudad: 'Bella vista', pais: 'Argentina',cod_tipo:1,cod_status: 1 },
      { cli_id:4, orden:1, calle: 'Salta 252', localidad: 'Bella vista', cp: '1661', ciudad: 'Bella vista', pais: 'Argentina',cod_tipo:1,cod_status: 1 },
   ]).then(() => console.log('Direccion grabados'));

   Productolang.bulkCreate([
      {
         id: 1,
         lang: "ENG",
         name: "PROFESIONAL V22®",
         description: "PROFESSIONAL V21® - RB4 - PULSE Transcranial Magnetic Stimulation Unit (Li-rTMS) for professional use. Type of magnetic wave: Square / Max magnetic intensity: 300G / / Min magnetic intensity: 1 G / 0.1 mT / Max frequencies: 600 Hz / Min frequencies: 1 Hz / Duration: continuous / Manual programming of independent variables Frequency / Intensity / Selection parameter manual. Magnetic field detection system"
      },
      {
         id: 2,
         lang: "ENG",
         name: "COIL VCPRO® Figure 8 Main Treatment Coil",
         description: "Main treatment coil in the form of an eight COIL VCPRO® Coil with a diameter of 3.7″ each spiral– Induced magnetic field: Inverted cone– Weight: 1.5 Kg– Length: 9.6″– CM depth: 3.9″– Material: High-quality plastic resistance – Var. temperature: + 5.5 °C / +/- 5%– Application : Cranial"
      },
      {
         id: 3,
         lang: "ENG",
         name: "COIL VCPRO® Circular Treatment Main Coil",
         description: "Main treatment coil in the form of an eight COIL VCPRO® Coil with a diameter of 3.7″ each spiral– Induced magnetic field: Inverted cone– Weight: 1.5 Kg– Length: 9.6″– CM depth: 3.9″– Material: High-quality plastic resistance – Var. temperature: + 5.5 °C / +/- 5%– Application : Cranial"
      },
      {
         id: 4,
         lang: "ENG",
         name: "360 mechanical arm",
         description: "360° mechanical arm for multiple transcranial placement (CLAMP + ARM + LC)"
      },
      {
         id: 5,
         lang: "ENG",
         name: "HELMET® Multicoil Helmet",
         description: "HELMET® multi-coil helmet Transcranial Magnetic Neurostimulation Unit, integrated with 7 continuous type stimulation coils in the lobes: - Left and right frontal dorzolateral / central parietal / left and right temporal / left and right occipital. Therapy Frequencies: 1Hz to 600 Hz. Therapy Intensity: Intensity (0.05 mT to 5mT) Pulse: Continuous"
      },
      {  id: 6,
         lang: "ENG",
         name: "ACCESORIO XVT",
         description: "ACCESORIO XVT",
      },
      {
         id: 7,
         lang: "ENG",
         name: "Training program and professional certification as a Specialist in Transcranial Magnetic Stimulation",
         description: "Professional training and certification program. Acrinic digital modality for 3 people. Includes study material, classes in video format and exams 3"
      },
      {
         id: 8,
         lang: "ENG",
         name: "Warranty",
         description: "72-month performance warranty for main unit and accessories"
      },
      {
         id: 9,
         lang: "ENG",
         name: "V20 software (remote upgrade)",
         description: "SOFTWARE V20 monitoring system - with free remote update"
      },
   ]).then(() => console.log('ProductoLang ha sido grabado'));


   Producto.bulkCreate([
      {
         name: "PROFESIONAL V22®",
         description: "PROFESIONAL V21® - RB4 - Unidad de estimulación magnética transcraneal DE PULSO (Li-rTMS) para uso profesional. Tipo de onda magnética: Cuadrada / Intensidad magnética max: 300G / / Intensidad magnética min: 1 G / 0.1    mT / Frecuencias max: 600 Hz / Frecuencias min: 1 Hz / Duración: continua / Programación manual de variables independientes Frecuencia / Intensidad / Selección manual de parámetros. Sistema de detección de campo magnético",
         price: "246400",dolar:"2464",
         cod_status: '1'
      },
      {
         name: "Bobina principal de tratamiento en forma de ocho COIL  VCPRO®",
         description: "Bobina principal de tratamiento en forma de ocho COIL VCPRO® Bobina de 3.7″ de diámetro cada espiral– Campo magnético inducido: Cono invertido– Peso: 1.5 Kg– Longitud: 9.6″– Profundidad del CM: 3.9″– Material: Plástico de alta resistencia– Var. temperatura: + 5.5 °C / +/- 5%– Aplicación : Craneal",
         price: "14900",dolar:"1490",
         cod_status: '1'
      },
      {
         name: "Bobina principal de tratamiento circular COIL VCPRO®",
         description: "Bobina principal de tratamiento circular COIL VCPRO®Bobina de 6.5″ de diámetro– Campo magnético inducido: Conoidal– Peso: 1.9 Kg– Longitud: 12″– Profundidad del CM: 2.3″– Material: Plástico de alta resistencia– Var. temperatura: + 4 °C / +/- 5%– Aplicación : Craneal / Corporal",
         price: "14900",dolar:"1490",
         cod_status: '1'
      },
      {
         name: "Brazo mecanico 360",
         description: "Brazo mecanico 360° para multiple colocación transcranealCLAMP + ARM + LC)",
         price: "4200",dolar:"4200",
         cod_status: '1'
      },
      {
         name: "Casco multibobina HELMET®",
         description: "Casco multibobina HELMET® Unidad de Neuro- estimulación magnética transcraneal, integrado con 7 bobinas de estimulación de tipo continuo en los lóbulos:                    - Frontal Dorzolateral izquiero y derecho /parietal central/ temporal izquiero y derecho/occitipal izquierdo y derecho. Frecuencias de terapia: 1Hz a 600 Hz. Intensidad de terapia: Intensidad (0.05 mT a 5mT) Pulso: Continuo",
         price: "18879",dolar:"1887",
         cod_status: '1'
      },
      {
         name: "ACCESORIO XVT",
         description: "ACCESORIO XVT",
         price: "2544",dolar:"254",
         cod_status: '1'
      },
      {
         name: "Programa de capaciitación y certificación profesional como Especialista en Estimulación Magnetica Transcraneal",
         description: "Programa de capacitación y certificación profesional. Modalidad digital asicrinico para 3 personas. Incluye material de studio, clases en formato video y exámenes 3",
         price: "0",dolar:"0",
         cod_status: '1'
      },
      {
         name: "Garantía",
         description: "Garantía de 72 meses de buen funcionamiento para unidad principal y accesorios",
         price: "0",dolar:"0",
         cod_status: '1'
      },
      {
         name: "Software V20 (actualización remota)",
         description: "Sistema de monitoreo SOFTWARE V20 - con actualización remota sin cargo",
         price: "0",dolar:"0",
         cod_status: '1'
      },
   ]).then(() => console.log('Productos ha sido grabado'));

   Materiaprima.bulkCreate([
      { name:"NI0001", description:"Alambre magneto cobre awg 24",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0002", description:"Arnes x2",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0003", description:"Arnes x4",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0004", description:"Arnes x7",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0005", description:"Bascula",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0006", description:"Bobina 8",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0007", description:"Bobina circular",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0009", description:"Bocinas chicas",udm:"Pieza",stock:1,stockmin:4},
      { name:"NI0010", description:"Boton encendido",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0011", description:"Brazo mecanico",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0012", description:"Cable audio 3.5 mm",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0013", description:"Cable AWG 18",udm:"CM",stock:1000,stockmin:4},
      { name:"NI0014", description:"Cable de alimentacion ",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0015", description:"Cable de dos hilos AWG 18 con forro",udm:"CM",stock:1000,stockmin:4},
      { name:"NI0016", description:"Cable ethernet macho-hembra",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0017", description:"Cable usb macho-hembra",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0019", description:"Carpetas azules",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0020", description:"Cinta canela transparente",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0021", description:"Cinta de aislar ",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0022", description:"Cinta doble cara industrial",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0023", description:"Clamp bobina",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0024", description:"Clamp mesa",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0025", description:"Clip sujetador de presicion ",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0028", description:"Conector XLR para bobina",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0029", description:"Disco duro 1 tb",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0032", description:"Gabinete Focus",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0033", description:"Espatula Pretul",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0034", description:"Esponja cortada para maletin",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0035", description:"Flexor Pantalla",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0036", description:"Fuente de Poder",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0037", description:"Fusible 10 amperes",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0038", description:"Fusible 15A 250v(DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0039", description:"Fusible multimetro(DISCONTINUADO",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0040", description:"Fusible 6x30mm F2A250v (DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0041", description:"Gabinete Profesional",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0043", description:"Grip",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0044", description:"Iman Ferrita",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0045", description:"Kola loka",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0046", description:"Led rojo 5 mm(DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0047", description:"led ultrabrillante 3mm(DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0049", description:"Maletines equipo profesional",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0050", description:"Manuales equipo profesional",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0051", description:"Maquina para soldar",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0052", description:"MAT",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0054", description:"molde para mezcla plastiacero",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0056", description:"Panel Posterior",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0057", description:"Panel-Pantalla",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0058", description:"Pantalla Raspberry 7 ",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0059", description:"Papel china blanco",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0061", description:"Placa maletin",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0062", description:"Plastiacero",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0064", description:"Portaleds metal",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0065", description:"Panel Frontal",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0067", description:"Raspberry Pi 4",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0068", description:"Resistencia 1 OHM (DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0069", description:"Resistencia 1.5 ohms (DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0074", description:"Switch de balance rojo",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0076", description:"Tarjeta Audio",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0077", description:"Tarjeta micro SD 32gb",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0078", description:"Tarjeta Potencia",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0079", description:"Tarjeta Principal",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0080", description:"Terminal de ojillo desnuda",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0081", description:"Termofith 1/4",udm:"CM",stock:10,stockmin:4},
      { name:"NI0082", description:"Termofith 1/8",udm:"CM",stock:10,stockmin:4},
      { name:"NI0083", description:"Termofith 3/16",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0084", description:"Termofith 3/8(DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0085", description:"Termofith 5/16(DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0086", description:"Tomacorriente AC",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0087", description:"Tornillo m3 x 5mm",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0088", description:"Tornillo m2.5 x16 mm",udm:"Pieza",stock:3,stockmin:4},
      { name:"NI0091", description:"Tornillos m2.5 x 8mm con tuerca",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0094", description:"Tuerca m3(DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0095", description:"Ventilador 5V 400 MA",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0096", description:"Tapete magnetico antiestestatica",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0097", description:"Pulsera magnetica antiestatica",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0098", description:"cable auxiliar audio 3.5 mm ",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0099", description:"Cable usb a usb",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0100", description:"Placa Focus ",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0101", description:"Baterias Focus (DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0102", description:"Cable XLR",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0103", description:"Tuerca m4 estandar",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0104", description:"separador de plastico",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0105", description:"Almohadilla Nibbot",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0106", description:"Gorro Mediano Nibbot",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0107", description:"Gorro Chico Nibbot",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0108", description:"Casco",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0109", description:"Separador de laton 18 mm con tuerca",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0111", description:"Maquina de impresión",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0112", description:"kit de desarmadores Fumetax",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0113", description:"caimanes",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0114", description:"alambre magneto cobre awg 20",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0115", description:"Focus(DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0116", description:"Botones para Focus (DISCONTINUADO)",udm:"DISCONTINUADO",stock:10,stockmin:4},
      { name:"NI0117", description:"Termometro Profesional",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0118", description:"cargador Focus",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0119", description:"conector",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0120", description:"Pila 9v",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0121", description:"Amperimetro",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0122", description:" Adaptador Lector Tarjetas Usb Tipo-c",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0123", description:"cajas carton EP",udm:"Pieza",stock:10,stockmin:4},
      ]).then(() => console.log('Materias primas han sido grabadas'));  

   Prodmp.bulkCreate([
      { prod_id : 1 , mp_name:"NI0041", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0056", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0057", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0010", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0095", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0035", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0074", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0086", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0028", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0077", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0014", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0079", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0076", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0078", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0009", cantidad: 2 },
      { prod_id : 1 , mp_name:"NI0003", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0002", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0036", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0067", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0016", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0017", cantidad: 2 },
      { prod_id : 1 , mp_name:"NI0012", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0013", cantidad: 80 },
      { prod_id : 1 , mp_name:"NI0015", cantidad: 105 },
      { prod_id : 1 , mp_name:"NI0081", cantidad: 10 },
      { prod_id : 1 , mp_name:"NI0082", cantidad: 10 },
      { prod_id : 1 , mp_name:"NI0004", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0088", cantidad: 4 },
      { prod_id : 1 , mp_name:"NI0109", cantidad: 4 },
      { prod_id : 1 , mp_name:"NI0087", cantidad: 4 },
      { prod_id : 1 , mp_name:"NI0103", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0091", cantidad: 4 },
      { prod_id : 1 , mp_name:"NI0064", cantidad: 3 },
      { prod_id : 1 , mp_name:"NI0080", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0037", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0065", cantidad: 1 },
      { prod_id : 1 , mp_name:"NI0058", cantidad: 1 },
      { prod_id : 2 , mp_name:"NI0010", cantidad: 1 },
      { prod_id : 2 , mp_name:"NI0035", cantidad: 1 },
      { prod_id : 2 , mp_name:"NI0041", cantidad: 1 },
      { prod_id : 2 , mp_name:"NI0056", cantidad: 1 },
      { prod_id : 2 , mp_name:"NI0057", cantidad: 1 },
      { prod_id : 2 , mp_name:"NI0088", cantidad: 1 },
      { prod_id : 2 , mp_name:"NI0095", cantidad: 1 },
      { prod_id : 3 , mp_name:"NI0009", cantidad: 2 },
      { prod_id : 3 , mp_name:"NI0056", cantidad: 1 },
      { prod_id : 3 , mp_name:"NI0088", cantidad: 1 },
      { prod_id : 4 , mp_name:"NI0088", cantidad: 1 },
      { prod_id : 5 , mp_name:"NI0088", cantidad: 1 },
   ]).then(() => console.log('Prodmp ha sido grabado'));


   // Factura.bulkCreate([ 
   //    {cli_id: 1,dir_id: 1,dhl:0,subtotal: 284158,iva: 45465,total: 329623,observ:'Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.',cod_status: 1},
   //    {cli_id: 2,dir_id: 1,dhl:0,subtotal: 265279,iva: 42445,total: 307724,observ:'Algun Dato',cod_status: 1},
   //    {cli_id: 3,dir_id: 1,dhl:100,subtotal: 24600,iva: 0,total: 24500,observ:'Algun Dato',cod_status: 1},
   //    {cli_id: 4,dir_id: 1,dhl:100,subtotal: 14900,iva: 0,total: 15000,observ:'Algun Dato',cod_status: 1},
   // ]).then(() => console.log('Factura Grabada'));
      
   // Factdet.bulkCreate([
   //    {fac_id:1, orden:1, prod_id:1, precio:246400, cantidad:1,total:246400},
   //    {fac_id:1, orden:2, prod_id:2, precio:18879,  cantidad:2,total:37758},
   //    {fac_id:2, orden:1, prod_id:1, precio:246400, cantidad:1,total:246400},
   //    {fac_id:2, orden:2, prod_id:5, precio:18879,  cantidad:1,total:18879},
   //    {fac_id:3, orden:1, prod_id:1, precio:24600,      cantidad:1,total:24600},
   //    {fac_id:4, orden:1, prod_id:2, precio:14900,      cantidad:1,total:14900},
   // ]).then(() => console.log('Factura Det Grabada'));

   Condiciones.bulkCreate([
      {nombre:'Sin Descuento',descuento:0,enganche:0,meses:0,interes:0},
      {nombre:'Contado',descuento:15,enganche:0,meses:0,interes:0},
      {nombre:'Financiamiento 12 Meses',descuento:0,enganche:20,meses:12,interes:5},
      {nombre:'Financiamiento 24 Meses',descuento:0,enganche:20,meses:24,interes:5},

   ]).then(() => console.log('Condiciones grabados'));
  
   // Factcond.bulkCreate([
   //    {fac_id:1,cond_id:2,descuento:15,enganche:0,meses:0,interes:0},
   //    {fac_id:2,cond_id:2,descuento:15,enganche:0,meses:0,interes:0},
   //    {fac_id:3,cond_id:2,descuento:15,enganche:0,meses:0,interes:0},
   // ]).then(() => console.log('Factcond ha sido grabado'));


   return 'ok';
}

module.exports = refLoad;



