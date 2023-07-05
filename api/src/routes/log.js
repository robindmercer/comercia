//****************/
// Logs
//****************/
const { Router, response } = require("express");
//const { Factura } = require('../db')
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
    sql ="select * from logs ";
    const records = await seq.query(sql, {
      logging: console.log,
      type: QueryTypes.SELECT,
    });
    res.send(records);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fac/:id",async function (req, res, next) {
  try {
    const id = req.params;
    console.log("Log req.params: ", req.params,id.id);
      sql ="select l.*,t.description as Status, u.name,p.description" 
      sql = sql +" from logs l"
      sql = sql +" join tabla t on t.id = 6 and t.cod = l.cod_status"
      sql = sql +" join usuarios u on u.usr_id = l.usr_id"
      sql = sql +" join perfils  p on p.id_perfil = u.cod_perfil"
      sql = sql +" where doc_id =" + id.id ;
      sql = sql +" order by fecha desc "
      const records = await seq.query(sql, {
        logging: console.log,
        type: QueryTypes.SELECT,
      });
      res.send(records);
    } catch (error) {
      console.log(error);
    }
  });
  
router.post("/", async function (req, res, next) {
  console.log("Log Post : ", req.body);
  const { doc_id, tipo_id, usr_id, cod_status,observ } = req.body;

  if (!doc_id || !usr_id || !cod_status) {
    return res.send("Falta información para poder darte de alta el Log");
  }
  try {
    sql=`insert into logs (doc_id, tipo_id, usr_id, cod_status,observ,fecha) values `
    sql = sql + `(${doc_id}, '${tipo_id}', '${usr_id}', ${cod_status},'${observ}',now())`
    const records = await seq.query(sql, {
      logging: console.log,
      type: QueryTypes.INSERT,
    });
    res.send(records);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
