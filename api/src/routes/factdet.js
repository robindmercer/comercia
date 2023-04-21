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

router.get('/', async function (req, res, next) {
  try {
    const {fac_id} = req.query;
    
    sql='select factdet.*,producto.name'
    sql = sql + ' from factdet'
    sql = sql + ' join producto on producto.id = factdet.prod_id'
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

router.get('/det', async function (req, res, next) {
  const {id} = req.query;
  if(id) {
    try {
      sql='select factdet.*,productos.name,productos.description,l.name nameExt,l.description descripExt from factdet '
      sql = sql + ' join productos on productos.id = factdet.prod_id'
      sql = sql + ' join productolang l on l.id = factdet.prod_id'
      sql = sql + ' where fac_id = ' + id
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
    res.status(200).send(`FacDet Created`);
  } catch (error) {
    console.log('Error', req.body)
    next(error)
  }
})

module.exports = router;