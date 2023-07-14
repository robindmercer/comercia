//****************/
// comentario
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
    const { facid } = req.query;
    console.log("get Todos: ", req.query);
    sql = "";
    if (facid ) {
      sql = `select * from comentario`;
      sql = sql + ` where fac_id  = ` + facid ;
      sql = sql + ` order by id`;
    } else {
      sql = `select * from comentario`;
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
    const { fac_id , texto, usuario,fecha } = req.body;
    sql = `insert into comentario (fac_id , texto,usuario,fecha) `;
    sql = sql + `values ('${fac_id }','${texto}','${usuario}','${fecha}'`
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
    const { id,texto } = req.body;
    sql = `update comentario set `;
    sql = sql + ` texto='${texto}'`
    sql = sql + ` where id='${id}'`;

    const records = await seq.query(sql, {
      logging: console.log,
      type: QueryTypes.UPDATE,
    });
    //console.log('records: ', records);
    res.send(records);
  } catch (error) {
    console.log("Error:", error);
  }
});

router.delete("/", async function (req, res, next) {
  try {
    const { id} = req.query;
    
    sql = `delete from comentario `;
    sql = sql + ` where id = ${id}`;
    console.log('delete: ',id,sql);
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
