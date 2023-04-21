//****************/
// condiciones 
//****************/
const { Router, response } = require('express');
const router = Router();

require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE,DB_PORT } = process.env;

const seq = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

router.get('/', async function (req, res, next) {
  try {
    const {id,fac_id} = req.query;
    console.log('req.query: ', req.query);
    sql=""
    if(id) {
      sql=`select *,'' as sel,`
      sql = sql + ` descuento des,enganche eng, meses mes, interes inte `
      sql = sql + ` from condiciones`
      sql = sql + ` where id = `+   id 
      sql = sql + ` order by id`
    }
    if(fac_id) {
      sql=`select factcond.*,condiciones.nombre,'' as sel,`
      sql = sql + ` condiciones.descuento des,condiciones.enganche eng, condiciones.meses mes, condiciones.interes inte `
      sql = sql + ` from factcond `
      sql = sql + ` join condiciones on condiciones.id  = cond_id `
      sql = sql + ` where fac_id = `+   fac_id
    }
    if(!sql){
      sql=`select *,'' as sel,`
      sql = sql + ` descuento des,enganche eng, meses mes, interes inte `
      sql = sql + ` from condiciones`
    }
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.SELECT
      });
      //console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log(error)
  }

})
router.post('/', async function (req, res, next) {
  try {
    const {id,nombre,descuento,enganche,meses,interes} = req.body
    if (id != 0){
      sql=`update condiciones set `
      sql= sql + ` nombre='${nombre}',`
      sql= sql + ` descuento='${descuento}',`
      sql= sql + ` enganche='${enganche}',`
      sql= sql + ` meses='${meses}',`
      sql= sql + ` interes='${interes}'`
      sql= sql + ` where id = ${id}`
    } else {
      sql=`insert into condiciones (nombre,descuento, enganche,meses,interes) `
      sql= sql + `values ('${nombre}','${descuento}','${enganche}','${meses}','${interes}')`
    }
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.INSERT
      });
      //console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log("Error:",error)
  }
})
// Condicion Generada para una factura
router.post('/fact', async function (req, res, next) {
  try {
    const {id,fac_id,cond_id,descuento,enganche,meses,interes} = req.body
    console.log('POST req.body: ', req.body);
    if (id !== 0){
      sql=`update factcond set `
      sql= sql + ` cond_id='${cond_id}',`
      sql= sql + ` descuento='${descuento}',`
      sql= sql + ` enganche='${enganche}',`
      sql= sql + ` meses='${meses}',`
      sql= sql + ` interes='${interes}'`
      sql= sql + ` where fac_id = ${fac_id}`
    } else {
      sql=`insert into factcond (fac_id,cond_id,descuento, enganche,meses,interes) `
      sql= sql + `values ('${fac_id}','${cond_id}','${descuento}','${enganche}','${meses}','${interes}')`
    }
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.INSERT
      });
      //console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log("Error:",error)
  }

})



module.exports = router;