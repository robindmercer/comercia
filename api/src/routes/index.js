const { Router } = require('express');
const usuario  = require("./usuario");
const producto = require("./producto")
const productoLang = require("./productoLang")
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

const email = require('./send_mail')

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
router.use('/productoLang', productoLang);
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

module.exports = router;
