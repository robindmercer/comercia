//****************/
// FacturaMP
//****************/
const { Router, response } = require("express");
const router = Router();

require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const seq = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

router.get('/', async function (req, res, next) {
  try {
      sql="select facturas.id,to_char(facturas.fecha,'dd/mm/yyyy') as fecha,facturas.subtotal,facturas.iva,facturas.total,t.description as stsdes,"
      sql +=  " clientes.nombre,facturas.cod_status,facturas.observ,coalesce(control,'N') as Control, "
      sql +=  " now() as Hoy";
      sql +=  " from facturas"
      sql +=  " join clientes on clientes.id = facturas.cli_id "
      sql +=  " join tabla t   on t.id = 6 and t.cod = facturas.cod_status "
      sql +=  " where facturas.cod_status > 5" // Liberados Para arriba 
      const records = await seq.query(sql,
        {
          logging: console.log,
          type: QueryTypes.SELECT
        });      
      res.send(records)    
  } catch (error) {
    console.log(error)
  }

})



// Busca las materias primas de una factura
router.get("/fac", async function (req, res, next) {
  const { id } = req.query;
  if (id) {
    try {
      sql = "select 1 as Orden,fac_id,prodmp.prod_id,productos.name as ProdName , materiaprima.name,";
      sql +=  " materiaprima.description,materiaprima.udm,materiaprima.stock,prodmp.cantidad * factdet.cantidad as Pedido,";
      sql +=  " to_char(facturas.fecha,'dd/mm/yyyy') fecha, facturas.total,clientes.nombre,clientes.razsoc, ";
      sql +=  " now() as Hoy";
      sql +=  " from productos ";
      sql +=  " join prodmp on prodmp.prod_id = productos.id";
      sql +=  " join materiaprima on materiaprima.name = prodmp.mp_name";
      sql +=  " join factdet on fac_id = " + id; 
      sql +=  " join facturas on facturas.id = " + id; 
      sql +=  " join clientes on clientes.id = facturas.cli_id"; 
      sql +=  " where productos.id =  factdet.prod_id";
      sql +=  " UNION"
      sql +=  " select 2,fac_id,1000,'Resumen ----------------------------------------' , materiaprima.name, "
      sql +=  " materiaprima.description,materiaprima.udm,materiaprima.stock,"
      sql +=  " sum(prodmp.cantidad * factdet.cantidad) as Pedido, "
      sql +=  " '',0,'','',";
      sql +=  " now() as Hoy";
      sql +=  " from productos  "
      sql +=  " join prodmp on prodmp.prod_id = productos.id "
      sql +=  " join materiaprima on materiaprima.name = prodmp.mp_name "
      sql +=  " join factdet on fac_id = " + id;
      sql +=  " where productos.id =  factdet.prod_id "
      sql +=  " group by fac_id,materiaprima.name, "
      sql +=  " materiaprima.description,materiaprima.udm,materiaprima.stock"
      sql +=  " order by orden,prod_id"
      const records = await seq.query(sql, {
        //logging: console.log,
        type: QueryTypes.SELECT,
      });
      //console.log('records: ', records);
      res.send(records);
    } catch (error) {
      console.log(error);
    }
  }
});



// Busca las materias primas de una factura
router.put("/fac", async function (req, res, next) {
  const { id } = req.query;
  if (id) {
    try {
      sql = "update materiaprima set stock = stock - t1.pedido"
      sql +=  " from ("
        sql +=  " select fac_id, materiaprima.name, "
        sql +=  " sum(prodmp.cantidad * factdet.cantidad) as Pedido "
        sql +=  " from productos  "
        sql +=  " join prodmp on prodmp.prod_id = productos.id "
        sql +=  " join materiaprima on materiaprima.name = prodmp.mp_name "
        sql +=  " join factdet on fac_id = " + id;
        sql +=  " where productos.id =  factdet.prod_id "
        sql +=  " group by fac_id,materiaprima.name"
        sql +=  " ) t1"
        sql +=  " where t1.fac_id= " + id;
        sql +=  " and t1.name= materiaprima.name;"

        const records = await seq.query(sql, {
          //logging: console.log,
          type: QueryTypes.SELECT,
        });
        //console.log('records: ', records);
        res.send(records);
      } catch (error) {
        console.log(error);
      }
    }
  });
  
module.exports = router;
