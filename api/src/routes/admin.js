//****************/
// Tablas 
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

// Tablas de admin 
router.delete('/', async function (req, res, next) {
  try {
    const { tabla, campo, id, campoProd } = req.query;
    sql=`delete from ${tabla} where ${campo} = ${id} and ${campo} not in (select ${campoProd} from products)`    
    console.log(sql)
    const [records] = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.SELECT
      });
    res.send(records)
  } catch (error) {
    console.log(error)
  }

})
router.get('/', async function (req, res, next) {
  try {
    const { tabla, campo, id, campoProd } = req.query;
    sql=`select * from ${tabla} where ${campo} = ${id} and ${campo} in (select ${campoProd} from products)`    
    console.log(sql)
    const [records] = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.SELECT
      });
    res.send(records)
  } catch (error) {
    console.log(error)
  }

})

module.exports = router;