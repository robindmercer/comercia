require('dotenv').config();
const { Usuario, Perfil, Status, Perfilmenu, Menu, Usuariomenu,  Tabla, Cliente} = require('../db')
const { Direccion,ProductoLang,Producto,Materiaprima,Factura,Factdet,Prodmp } = require('../db');

async function refLoad() {

   Perfil.bulkCreate([
      { description: "Administrador" },
      { description: "Ventas" },
      { description: "Compras" },
   ]).then(() => console.log('Perfil ha sido grabado'));

   Status.bulkCreate([
      { description: "Activo" },
      { description: "Congelado" },
      { description: "Confeccionado" },
   ]).then(() => console.log('Status ha sido grabado'));

   Usuario.bulkCreate([
      { usr_id: "RM",  name: "Robin Mercer",   email: "COMERC@gmail.com", cod_perfil: '1', cod_status: '1', password: "pass1+" },
      { usr_id: "RDM", name: "Robin D Mercer", email: "rdm@gmail.com",    cod_perfil: '1', cod_status: '1', password: "pass1+" },
      { usr_id: "LF",  name: "Luis Fernando",  email: "lfr@gmail.com",    cod_perfil: '2', cod_status: '1', password: "pass1+" },
      { usr_id: "MM",  name: "Miriam",         email: "miriam@gmail.com", cod_perfil: '2', cod_status: '1', password: "pass1+" },
   ]).then(() => console.log('Usuario ha sido grabado'));

   Usuariomenu.bulkCreate([
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
      { usrid: "RM", nivel: 16,accion:"A"},
      { usrid: "RM", nivel: 17,accion:"A"},

      { usrid: "LF", nivel: 10,accion:"C"},
      { usrid: "LF", nivel: 11,accion:"C"},
      { usrid: "LF", nivel: 12,accion:"C"},
      { usrid: "LF", nivel: 13,accion:"C"},
      { usrid: "LF", nivel: 14,accion:"C"},
      { usrid: "LF", nivel: 15,accion:"C"},
      { usrid: "RDM", nivel: 16,accion:"A"},      
      { usrid: "RDM", nivel: 17,accion:"A"},      
      { usrid: "RDM", nivel: 10,accion:"C"},      
      { usrid: "RDM", nivel: 11,accion:"C"},      
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
      { id: 4, cod: 0, description: "Tipo de Cambio", valor: 0, control : 'N', cod_status: 1 },
      { id: 4, cod: 1, description: "U$S", valor: 20.10, control : 'N', cod_status: 1 },
      { id: 4, cod: 2, description: "GPB", valor: 23, control : 'N', cod_status: 1 },
      { id: 5, cod: 0, description: "Tipo de Direcciones", valor: 0, control : 'N', cod_status: 1 },
      { id: 5, cod: 1, description: "Casa", valor: 0, control : 'N', cod_status: 1 },
      { id: 5, cod: 2, description: "Oficina", valor: 0, control : 'N', cod_status: 1 },
      { id: 5, cod: 3, description: "Deposito", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 0, description: "Ordenes de Compra", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 1, description: "En Ingreso", valor: 0, control : 'N', cod_status: 1 },
      { id: 6, cod: 2, description: "Aprobada", valor: 0, control : 'N', cod_status: 1 },
   ]).then(() => console.log('Tablas ha sido grabado'));

   Cliente.bulkCreate([
      { nombre: "Cliente 1", email: "cliente@gmail.com", movil: '123456789', fijo: '46661234', rfc_cod: 'rfc-1', cod_cliente: 1, cod_status: 1 },
      { nombre: "Cliente 2", email: "cliente@gmail.com", movil: '123456789', fijo: '46661234', rfc_cod: 'rfc-2', cod_cliente: 2, cod_status: 1 },
      { nombre: "Cliente 3", email: "cliente@gmail.com", movil: '123456789', fijo: '46661234', rfc_cod: 'rfc-3', cod_cliente: 2, cod_status: 1 },
      { nombre: "YPF", email: "YPF@gmail.com", movil: '123456789', fijo: '46661234', rfc_cod: 'rfc-4', cod_cliente: 1, cod_status: 1 },
   ]).then(() => console.log('Clientes grabados'));
  
   Direccion.bulkCreate([
      { cli_id:1, orden:1, calle: 'Corrientes 2166', localidad: 'Bella vista', cp: '1661', ciudad: 'Bella vista', pais: 'Argentina',cod_tipo:1,cod_status: 1 },
      { cli_id:1, orden:2, calle: 'Florida 229', localidad: 'C.A.B.A.', cp: '1231', ciudad: 'C.A.B.A.', pais: 'Argentina',cod_tipo:2,cod_status: 1 },
      { cli_id:2, orden:1, calle: 'corrientes 1234', localidad: 'Bella vista', cp: '1661', ciudad: 'Bella vista', pais: 'Argentina',cod_tipo:1,cod_status: 1 },
   ]).then(() => console.log('Direccion grabados'));

   ProductoLang.bulkCreate([
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
         price: "246400",
         cod_status: '1'
      },
      {
         name: "Bobina principal de tratamiento en forma de ocho COIL  VCPRO®",
         description: "Bobina principal de tratamiento en forma de ocho COIL VCPRO® Bobina de 3.7″ de diámetro cada espiral– Campo magnético inducido: Cono invertido– Peso: 1.5 Kg– Longitud: 9.6″– Profundidad del CM: 3.9″– Material: Plástico de alta resistencia– Var. temperatura: + 5.5 °C / +/- 5%– Aplicación : Craneal",
         price: "14900",
         cod_status: '1'
      },
      {
         name: "Bobina principal de tratamiento circular COIL VCPRO®",
         description: "Bobina principal de tratamiento circular COIL VCPRO®Bobina de 6.5″ de diámetro– Campo magnético inducido: Conoidal– Peso: 1.9 Kg– Longitud: 12″– Profundidad del CM: 2.3″– Material: Plástico de alta resistencia– Var. temperatura: + 4 °C / +/- 5%– Aplicación : Craneal / Corporal",
         price: "14900",
         cod_status: '1'
      },
      {
         name: "Brazo mecanico 360",
         description: "Brazo mecanico 360° para multiple colocación transcranealCLAMP + ARM + LC)",
         price: "4200",
         cod_status: '1'
      },
      {
         name: "Casco multibobina HELMET®",
         description: "Casco multibobina HELMET® Unidad de Neuro- estimulación magnética transcraneal, integrado con 7 bobinas de estimulación de tipo continuo en los lóbulos:                    - Frontal Dorzolateral izquiero y derecho /parietal central/ temporal izquiero y derecho/occitipal izquierdo y derecho. Frecuencias de terapia: 1Hz a 600 Hz. Intensidad de terapia: Intensidad (0.05 mT a 5mT) Pulso: Continuo",
         price: "18879",
         cod_status: '1'
      },
      {
         name: "ACCESORIO XVT",
         description: "ACCESORIO XVT",
         price: "2544",
         cod_status: '1'
      },
      {
         name: "Programa de capaciitación y certificación profesional como Especialista en Estimulación Magnetica Transcraneal",
         description: "Programa de capacitación y certificación profesional. Modalidad digital asicrinico para 3 personas. Incluye material de studio, clases en formato video y exámenes 3",
         price: "0",
         cod_status: '1'
      },
      {
         name: "Garantía",
         description: "Garantía de 72 meses de buen funcionamiento para unidad principal y accesorios",
         price: "0",
         cod_status: '1'
      },
      {
         name: "Software V20 (actualización remota)",
         description: "Sistema de monitoreo SOFTWARE V20 - con actualización remota sin cargo",
         price: "0",
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
      { name:"NI0009", description:"Bocinas chicas",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0010", description:"Boton encendido",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0011", description:"Brazo mecanico",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0012", description:"Cable audio 3.5 mm",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0013", description:"Cable AWG 18",udm:"CM",stock:10,stockmin:4},
      { name:"NI0014", description:"Cable de alimentacion ",udm:"Pieza",stock:10,stockmin:4},
      { name:"NI0015", description:"Cable de dos hilos AWG 18 con forro",udm:"CM",stock:10,stockmin:4},
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
      { name:"NI0088", description:"Tornillo m2.5 x16 mm",udm:"Pieza",stock:10,stockmin:4},
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
      { prod_id : 1 , mp_id:35, cantidad: 1 },
      { prod_id : 1 , mp_id:46, cantidad: 1 },
      { prod_id : 1 , mp_id:47, cantidad: 1 },
      { prod_id : 1 , mp_id:9, cantidad: 1 },
      { prod_id : 1 , mp_id:73, cantidad: 1 },
      { prod_id : 1 , mp_id:29, cantidad: 1 },
      { prod_id : 1 , mp_id:57, cantidad: 1 },
      { prod_id : 1 , mp_id:68, cantidad: 1 },
      { prod_id : 1 , mp_id:24, cantidad: 1 },
      { prod_id : 5 , mp_id:4, cantidad: 2 },
      { prod_id : 5 , mp_id:5, cantidad: 1 },
      { prod_id : 5 , mp_id:6, cantidad: 1 },
      { prod_id : 6 , mp_id:1, cantidad: 1 },
      { prod_id : 6 , mp_id:2, cantidad: 1 },
   ]).then(() => console.log('Prodmp ha sido grabado'));


   Factura.bulkCreate([
      {cli_id: 1,dir_id: 1,subtotal: 284158,iva: 45465,descuento: 0, desc_id: 0,total: 329623,observ:'Algun Dato',cod_status: 1},
      {cli_id: 2,dir_id: 1,subtotal: 265279,iva: 42445,descuento: 0, desc_id: 0,total: 307724,observ:'Algun Dato',cod_status: 2},
   ]).then(() => console.log('Factura Grabada'));
      
   Factdet.bulkCreate([
      {fac_id:1, orden:1, prod_id:1, precio:246400, cantidad:1,total:246400},
      {fac_id:1, orden:2, prod_id:5, precio:18879,  cantidad:2,total:37758},
      {fac_id:1, orden:3, prod_id:6, precio:0,      cantidad:1,total:0},
      {fac_id:2, orden:1, prod_id:1, precio:246400, cantidad:1,total:246400},
      {fac_id:2, orden:2, prod_id:5, precio:18879,  cantidad:1,total:18879},
   ]).then(() => console.log('Factura Det Grabada'));


   return 'ok';
}

module.exports = refLoad;



