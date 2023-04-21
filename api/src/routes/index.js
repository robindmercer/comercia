const { Router } = require('express');
const usuario  = require("./usuario");
const producto = require("./producto")
const productolang = require("./productolang")
const cliente = require("./cliente")
const direccion =  require("./direccion")

const admin = require("./admin");
const perfil = require("./perfil");
const Status = require("./status");
const perfilMenu = require("./perfilMenu");
const menu  = require("./usuariomenu");
//const menu  = require("./menu");
const tabla =require("./tablas")
const materiaprima = require("./materiaprima")
const factura =require("./factura")
const factdet =require("./factdet")
const facturaMP =require("./facturaMP")
const email = require('./send_mail')
const mpFactura =require("./mpFactura") // Materias primas utilizadas en una factura 
const condiciones = require("./condiciones") // condiciones generales de fecturacion 
const log = require ("./log")
const router = Router();

// Send Email
//router.use('/email', email)
// perfil
router.use('/perfil', perfil);
// perfilmenu
router.use('/perfilMenu', perfilMenu);
// Admin
router.use('/admin', admin);
// Usuario
router.use('/usuario', usuario);
// Producto
router.use('/producto', producto);
// Producto Lanf
router.use('/productolang', productolang);
// menu
router.use('/menu', menu);
// status
router.use('/status', Status);
// tablas
router.use('/tabla', tabla);
// cliente
router.use('/cliente', cliente);
// direccion 
router.use('/direccion', direccion);
// materiaprima
router.use('/materiaprima', materiaprima);
// Send Email
router.use('/email', email);
// factura
router.use('/factura', factura);
// factdet
router.use('/factdet', factdet);
//facturaMP
router.use('/facturaMP',facturaMP);
//mpFactura
router.use('/mpfactura',mpFactura);
//condiciones
router.use('/condiciones',condiciones);
//Log 
router.use('/log',log)
module.exports = router;
