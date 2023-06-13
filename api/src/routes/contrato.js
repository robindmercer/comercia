//****************/
// contrato
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

router.get("/", async function (req, res, next) {
  try {
    const { id, cot_id,fac_id } = req.query;
    console.log("get Todos: ", req.query);
    sql = "";
    if (id) {
      sql = `select * from contrato`;
      sql = sql + ` where fac_id = ` + id;
      sql = sql + ` order by id`;
    } else {
      sql = `select * from contrato`;
    }
    const records = await seq.query(sql, {
      logging: console.log,
      type: QueryTypes.SELECT,
    });
    //console.log('records: ', records);
    res.send(records);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async function (req, res, next) {
  try {
    const { id, fac_id, nombre,rfc,claveelec,dircomp,moneda,importe,cedula,producto,serie,
      garantia,adicional,fecha,terminado,especial,punitorio } = req.body;
    sql = `insert into contrato (fac_id, nombre,rfc,claveelec,dircomp,moneda,importe,cedula,producto,serie,`
    sql = sql + ` garantia,adicional,fecha,terminado,especial,punitorio) `;
    sql = sql + `values ('${fac_id}','${nombre}','${rfc}','${claveelec}','${dircomp}'`
    sql = sql + `,'${moneda}','${importe}','${cedula}','${producto}','${serie}'`
    sql = sql + `,'${garantia}','${adicional}','${fecha}','${terminado}','${especial}','${punitorio}'`
    sql = sql + `) RETURNING id`;
    const records = await seq.query(sql, {
      logging: console.log,
      type: QueryTypes.INSERT,
    });
    //console.log('records: ', records);
    res.send(records);
  } catch (error) {
    console.log("Error:", error);
  }
});

router.put("/", async function (req, res, next) {
  try {
    const { id, fac_id, nombre,rfc,claveelec,dircomp,moneda,importe,cedula,producto,serie,
      garantia,adicional,fecha,terminado,especial,punitorio } = req.body;
    sql = `update contrato set `;
    sql = sql + ` texto='${texto}',`
    sql = sql + ` nombre='${nombre}',`;
    sql = sql + ` rfc='${rfc}',`;
    sql = sql + ` claveelec='${claveelec}',`;
    sql = sql + ` dircomp='${dircomp}',`;
    sql = sql + ` moneda='${moneda}',`;
    sql = sql + ` importe='${importe}',`;
    sql = sql + ` cedula='${cedula}',`;
    sql = sql + ` producto='${producto}',`;
    sql = sql + ` serie='${serie}',`;
    sql = sql + ` garantia='${garantia}',`;
    sql = sql + ` adicional='${adicional}',`;
    sql = sql + ` fecha='${fecha}',`;
    sql = sql + ` terminado='${terminado}',`;
    sql = sql + ` especial='${especial}',`;
    sql = sql + ` punitorio='${punitorio}'`;
    sql = sql + ` where fac_id='${fac_id}'`;

    const records = await seq.query(sql, {
      logging: console.log,
      type: QueryTypes.INSERT,
    });
    //console.log('records: ', records);
    res.send(records);
  } catch (error) {
    console.log("Error:", error);
  }
});

router.delete("/", async function (req, res, next) {
  try {
    const { id} = req.body;
    console.log('delete: ', req.body);
    sql = `delete from contrato `;
    sql = sql + ` where fac_id = ${id}`;
    const records = await seq.query(sql, {
      logging: console.log,
      type: QueryTypes.DELETE,
    });
    //console.log('records: ', records);
    res.send(records);
  } catch (error) {
    console.log("Error:", error);
  }
});


module.exports = router;
