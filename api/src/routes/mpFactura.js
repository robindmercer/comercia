//****************/
// MPFactura
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

// Busca las materias primas de una factura
router.get("/fac", async function (req, res, next) {
  const { id } = req.query;
  if (id) {
    try {
      sql = "select prodmp.prod_id,productos.name as ProdName , materiaprima.name,";
      sql = sql + " materiaprima.description,materiaprima.udm,materiaprima.stock,prodmp.cantidad * factdet.cantidad as Pedido";
      sql = sql + " from productos ";
      sql = sql + " join prodmp on prodmp.prod_id = productos.id";
      sql = sql + " join materiaprima on materiaprima.name = prodmp.mp_name";
      sql = sql + " join factdet on fac_id = " + id;
      sql = sql + " where productos.id =  factdet.prod_id";
      sql = sql + " order by productos.id";

      const records = await seq.query(sql, {
        logging: console.log,
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
