const { Router } = require('express');
const usuario  = require("./usuario");
const producto = require("./producto")
const productolang = require("./productoLang")
const cliente = require("./cliente")
const direccion =  require("./direccion")
const contrato =  require("./contrato")

const admin = require("./admin");
const perfil = require("./perfil");
const Status = require("./status");
const perfilMenu = require("./perfilMenu");
const menu  = require("./usuariomenu");
//const menu  = require("./menu");
const tabla =require("./tablas")
const materiaprima = require("./materiaprima")
const factura =require("./factura")
const factcond =require("./factcond")
const factdet =require("./factdet")
// const email = require('./send_mail')
const facturaMP =require("./facturaMP") // Materias primas utilizadas en una factura 
const condiciones = require("./condiciones") // condiciones generales de fecturacion 
const cotizacion =require("./cotizacion")
const cotizaciondet =require("./cotizaciondet")
const cotizacioncond =require("./cotizacioncond")
const comentario = require("./comentario")

const log = require ("./log")
const upload = require("./upload")
const ticket = require("./ticket")
const compra = require("./compra")
const compania = require("./compania")
const router = Router();
// Send Email
// router.use('/email', email)
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
// factura
router.use('/factura', factura);
// factdet
router.use('/factdet', factdet);


router.use('/facturaMP',facturaMP);             //facturaMP
router.use('/condiciones',condiciones);         //condiciones
router.use('/cotizacion',cotizacion)            // Cotizaciones 
router.use('/cotizaciondet',cotizaciondet)      // CotizacionesDet
router.use('/cotizacioncond',cotizacioncond)      // CotizacionesDet
router.use('/log',log)                          //Log 
router.use('/upload',upload)
router.use('/contrato',contrato)
router.use('/comentario',comentario)
router.use('/factcond',factcond)
router.use('/ticket',ticket)
router.use('/compra',compra)
router.use('/compania',compania)
module.exports = router;
