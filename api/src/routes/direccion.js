//****************/
// Direccion 
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
    const {cli_id} = req.query;
    
    sql='select direccion.*,clientes.nombre,status.description as stsdesc, tabla.description as tipo'
    sql = sql + ' from direccion'
    sql = sql + ' join clientes on clientes.id = direccion.cli_id'
    sql = sql + ' join status on status.id_status = direccion.cod_status'
    sql = sql + ' join tabla on tabla.id = 5 and tabla.cod = direccion.cod_tipo'
    if(cli_id) {
      sql = sql + ' where cli_id = '+   cli_id 
    }
    sql = sql + ' order by orden'
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

router.get('/bckp', async function (req, res, next) {
  try {
    
    sql='select * from direccion'
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
    const {id,cli_id,orden, calle,localidad,cp,ciudad,pais,cod_tipo,cod_status} = req.body
    if (id != 0){
      sql=`update direccion set `
      sql= sql + ` calle='${calle}',`
      sql= sql + ` localidad='${localidad}',`
      sql= sql + ` cp='${cp}',`
      sql= sql + ` ciudad='${ciudad}',`
      sql= sql + ` pais='${pais}',`
      sql= sql + ` cod_tipo=${cod_tipo},`
      sql= sql + ` cod_status=${cod_status}`
      sql= sql + ` where id = ${id}`
    } else {
      sql=`insert into direccion (cli_id,orden, calle,localidad,cp,ciudad,pais,cod_tipo,cod_status) `
      sql= sql + `values ('${cli_id}','${orden}','${calle}','${localidad}','${cp}','${ciudad}','${pais}',${cod_tipo},${cod_status})`
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