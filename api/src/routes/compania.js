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

router.get('/bckp', async function (req, res, next) {
  try {
    sql='select * from compania'
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

// Especial para atencion al cliente atc

router.get('/:id', async function (req, res, next) {
  console.log("cliente con :id")
  try {
    const { id } = req.params;
    
    sql='select compania.*,status.description as StsDesc '
    sql = sql + ' from compania'
    sql = sql + ' join status on status.id_status = compania.cod_status'
    sql = sql + ' where compania.id = '+   id

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


router.get('/', async function (req, res, next) {
  //console.log("cliente generico")
  try {
    const {busco} = req.body;
    const {nombre} = req.query;
    var xand=" where "
    sql='select compania.*,status.description as StsDesc, '
    sql = sql + ' from compania'
    sql = sql + ' join status on status.id_status = compania.cod_status'
    if(busco) {
      sql = sql + ' where compania.id = '+   busco 
      xand = ' and '
    }
    if(nombre) {
      sql = sql + ` where upper(compania.nombre) like upper('%${nombre}%')`
      xand = ' and '
    }
    sql = sql + xand + ' compania.cod_status > 0 order by nombre'
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
    const {id,razsoc,nombre,apellido,email,movil,fijo,rfc_cod,cod_cliente,cod_status} = req.body
    console.log('req.body: ', req.body);
    if (id != 0){
      sql=`update compania set `
      sql= sql + ` razsoc='${razsoc}',`
      sql= sql + ` nombre='${nombre}',`
      sql= sql + ` apellido='${apellido}',`
      sql= sql + ` email='${email}',`
      sql= sql + ` movil='${movil}',`
      sql= sql + ` fijo='${fijo}',`
      sql= sql + ` rfc_cod='${rfc_cod}',`
      sql= sql + ` cod_status=${cod_status}`
      sql= sql + ` where id = ${id}`
    } else {
      sql=`insert into compania (razsoc,nombre,apellido,email,movil,fijo,rfc_cod,cod_status) `
      sql= sql + `values ('${razsoc}','${nombre}','${apellido}','${email}','${movil}','${fijo}','${rfc_cod}',${cod_status})`
    }
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


module.exports = router;