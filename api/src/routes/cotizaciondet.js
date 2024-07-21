//****************/
// Cotizaciondet 
//****************/
const { Router, response } = require('express');
const { Cotizaciondet } = require('../db')
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


router.get('/all', async function (req, res, next) {
  try {
   
    sql='select * from cotizaciondet'
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


router.get('/', async function (req, res, next) {
  try {
    const {cot_id} = req.query;
    
    sql='select cotizaciondet.*,productos.name'
    sql = sql + ' from cotizaciondet'
    sql = sql + ' join productos on producto.sid = cotizaciondet.prod_id'
    if(cot_id) {
      sql = sql + ' where cot_id = '+   cot_id 
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

router.get('/det', async function (req, res, next) {
  const {id} = req.query;
  if(id) {
    try {
      sql=`select cotizaciondet.*,pr.name,pr.description,pr.id_interno,coalesce(l.name,'Falta') nameExt,coalesce(l.description,'SIN DESCRIPCION') descripExt from cotizaciondet `
      sql = sql + ' join productos pr on pr.id = cotizaciondet.prod_id'
      sql = sql + ' left join productolang l on l.id = cotizaciondet.prod_id'
      sql = sql + ' where cot_id = ' + id
      // sql = sql + " order by pr.orden,pr.id"
      sql = sql + " order by pr.orden,precio desc"      

      const records = await seq.query(sql,
        {
          logging: console.log,
          type: QueryTypes.SELECT
        });
      res.send(records)
    } catch (error) {
      console.log(error)
    }
  }
})

router.post('/', async function (req, res, next) {
  const { cot_id, orden, precio, prod_id, cantidad, total,descto } = req.body;
  console.log('Post Cotizacion det: ', req.body);
  if (!cot_id || !orden || !prod_id || !cantidad ) {
    return res.send("Falta información para poder darte de alta el Producto")
  }
  try {
    const newProduct = await Cotizaciondet.create({
      cot_id,
      orden,
      prod_id,
      precio,
      cantidad,
      total,
      descto,    
    })
    res.status(200).json({message:'cotizaciondet Creada'});
  } catch (error) {
    console.log('Error', req.body)
    res.status(400).json({message:'cotizaciondet No Creado'});
    console.log('Error', error)
    next(error)
  }
})

module.exports = router;