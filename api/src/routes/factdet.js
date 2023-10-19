//****************/
// Factdet 
//****************/
const { Router, response } = require('express');
const { Factdet } = require('../db')
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
// aparentemente no esta en uso 
router.get('/', async function (req, res, next) {
  try {
    const {fac_id} = req.query;
    
    sql='select factdet.*,productos.name,productos.cod_status'
    sql = sql + ' from factdet'
    sql = sql + ' join productos on productos.id = factdet.prod_id'
    if(fac_id) {
      sql = sql + ' where fac_id = '+   fac_id 
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

router.get('/all', async function (req, res, next) {
  try {
    console.log("fACTdET all");    
    sql='select *'
    sql = sql + ' from factdet'
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
      sql = 'select factdet.*,p.name,p.description,coalesce(l.name,p.name) nameExt,'
      sql = sql + ' coalesce(l.description,p.description) descripExt,p.cod_status EstProd from factdet '
      sql = sql + ' join productos p on p.id = factdet.prod_id'
      sql = sql + ' left join productolang l on l.id = factdet.prod_id'
      sql = sql + ' where fac_id = ' + id
      sql = sql + ' order by p.orden,p.id'
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
  }
})

router.post('/', async function (req, res, next) {
  const { fac_id, orden, precio, prod_id, cantidad, total } = req.body;
  console.log('Post FACTDET req.body: ', req.body);
  if (!fac_id || !orden || !prod_id || !cantidad ) {
    return res.send("Falta información para poder darte de alta el Producto")
  }
  try {
    const newProduct = await Factdet.create({
      fac_id,
      orden,
      prod_id,
      precio,
      cantidad,
      total    
    })
    res.status(200).json({message:'FactDet Creada'});
  } catch (error) {
    res.status(400).json({message:'FactDet No Creado'});
    console.log('Error', req.body)
    next(error)
  }
})

module.exports = router;