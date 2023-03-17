require('dotenv').config();
const { Usuario, Perfil, Status, Perfilmenu, Menu, Usuariomenu,  Tabla, Cliente} = require('../db')
const { Direccion } = require('../db');

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

   return 'ok';
}

module.exports = refLoad;



