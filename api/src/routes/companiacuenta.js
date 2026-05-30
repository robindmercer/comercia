//****************/
// Cliente 
//****************/
const { Router, response } = require('express');
const router = Router();

require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const seq = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});


// Especial para atencion al cliente atc

router.get('/:id', async function (req, res, next) {
  console.log("cliente con :id")
  try {
    const { id } = req.params;
    
    sql='select compania.razsoc,cc.*, status.description as StsDesc '
    sql = sql + ' from compania_cuentas cc '
    sql = sql + ' join compania on cc.cia_id = compania.id'
    sql = sql + ' join status on status.id_status = cc.cod_status'
    sql = sql + ' where cc.cia_id = '+   id

    const records = await seq.query(sql,
      {
        //logging: console.log,
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
    const {id,cia_id,nacional,extranjero,nacionaling,extranjeroing,cod_status} = req.body
    sql=`insert into compania_cuentas (cia_id,nacional,extranjero,nacionaling,extranjeroing,cod_status) `
    sql+=  `values (${cia_id},'${nacional}','${extranjero}','${nacionaling}','${extranjeroing}',${cod_status})`
    const records = await seq.query(sql,
      {
        //logging: console.log,
        type: QueryTypes.INSERT
      });
      //console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log("Error:",error)
  }

})

router.put('/', async function (req, res, next) {
  try {
    const {id,cia_id,nacional,extranjero,nacionaling,extranjeroing,cod_status} = req.body

    sql=`update compania_cuentas set `
    sql+=  ` nacional='${nacional}',`
    sql+=  ` extranjero='${extranjero}',`
    sql+=  ` nacionaling='${nacionaling}',`
    sql+=  ` extranjeroing='${extranjeroing}',`
    sql+=  ` cod_status=${cod_status}`
    sql+=  ` where id = ${id}`
    const records = await seq.query(sql,
      {
        type: QueryTypes.INSERT
      });
    res.send(records)
  } catch (error) {
    console.log("Error:",error)
  }

})


module.exports = router;