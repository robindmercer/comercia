//****************/
// Factura
//****************/
const { Compra, MateriaPrima } = require("../db.js");
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
      const { nombre } = req.query;
      console.log("get: ");

      sql = "select *,to_char(fecha,'dd/mm/yyyy') ff from compra order by id";

      if (nombre) {
         sql = `select * from compra  where upper(titulo) like upper('%${nombre}%') order by id`;
      }
      console.log("sql: ", sql);
      const records = await seq.query(sql, {
         //logging: console.log,
         type: QueryTypes.SELECT,
      });
      res.send(records);
   } catch (error) {
      console.log(error);
   }
});

router.post("/", async function (req, res, next) {
   var sqlDet=""
   var sqlUpd=""
   const { id, titulo, fecha, tipo, cod_status, compra } = req.body;
   console.log("Post Tabla: ", req.body);
   console.log("titulo: ", titulo);
   
   if (!titulo || !fecha) {
      return res.send(
         "Falta información para poder darte de alta la Materia Prima"
      );
   }
   
   sql = `insert into compra (titulo,fecha,tipo,cod_status)  values( '${titulo}','${fecha}',${tipo},${cod_status})  RETURNING id`;
   
   const records = await seq
   .query(sql, {
      //logging: console.log,
      type: QueryTypes.INSERT,
   })
   .then(function (compraIdCreated) {
      sqlUpd=`update materiaprima set stock=stock + nuevo`
      sqlUpd+= ` from compradet `
      sqlUpd+= `  where materiaprima.name=compradet.name`
      sqlUpd+= `    and compradet.compraid = ${compraIdCreated[0][0].id}`
      // console.log("compraIdCreated: ", compraIdCreated);
      sqlDet = `insert into compradet (compraid,name,anterior,nuevo,cod_status) values `;
      
      compra.map((serv, indx) => {
            sqlDet += `(${compraIdCreated[0][0].id},'${serv.name}',${serv.stock},${serv.cantidad},1),`;
            // console.log('serv.name: ', serv.name);
         });
         // console.log('sqlDet: ', sqlDet);
      });
    const records2 = await seq.query(sqlDet.slice(0,-1), {
      //logging: console.log,
      type: QueryTypes.INSERT,
   });
   const records3 = await seq.query(sqlUpd, {
      //logging: console.log,
      type: QueryTypes.UPDATE,
   });
   res.send("ok");
});

router.put("/", async function (req, res, next) {
   const { id, titulo, fecha, tipo, cod_status } = req.body;

   if (!titulo || !fecha) {
      return res.send(
         "Falta información para poder darte de alta la Materia Prima"
      );
   }
   sql = `update compra set titulo='${titulo}', fecha='${fecha}', tipo=${tipo},cod_status=${cod_status} where id= '${id}'`;
   try {
      const records = await seq.query(sql, {
         //logging: console.log,
         type: QueryTypes.SELECT,
      });
      console.log("records: ", records);
      res.send(records);
   } catch (error) {
      console.log("Error:", error);
   }
});

module.exports = router;
