//****************/
// Factura 
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
    const {nombre} = req.query;
    console.log('get: ');

    sql = "select * from materiaprima order by name"

    if(nombre) {
      sql = `select * from materiaprima  where upper(description) like upper('%${nombre}%') order by name`
    }
    console.log('sql: ', sql);
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.SELECT
      });
    res.send(records)
  } catch (error) {
    console.log(error)
  }

})

router.post("/", async function (req, res, next) {
  const { name, description, udm,stock,stockmin } = req.body;
  console.log('Post Tabla: ', req.body);
  console.log('name: ', name);
  console.log('udm: ', udm);

  if (!name || !description || !udm) {
    return res.send("Falta información para poder darte de alta la Materia Prima");
  }
  if (id > 0){
    sql = `update materiaprima set description='${description}', udm='${udm}', stock=${stock},stockmin=${stockmin} where name= '${name}'`
  } else{
    sql = `insert into materiaprima (name,description,udm,stock,stockmin)  values('${name}', '${description}','${udm}',${stock},${stockmin})`
  }
  try {
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.SELECT
      });
    console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log('Error:',error)
  }
});

// Manejo Relacion Materia Prima con el producto
router.get('/prod', async function (req, res, next) {
  const { id } = req.query;
  if (id) {
    try {
      sql = 'select prodmp.mp_name,productos.name as ProdName , materiaprima.name,'
      sql = sql + ' materiaprima.description,materiaprima.udm,prodmp.cantidad'
      sql = sql + ' from productos '
      sql = sql + ' join prodmp on prodmp.prod_id = productos.id'
      sql = sql + ' join materiaprima on materiaprima.name = prodmp.mp_name'
      sql = sql + ' where productos.id = ' + id

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

router.delete('/prod', async function (req, res, next) {
  const { id } = req.query;
  if (id) {
    try {
      sql = 'delete from prodmp '
      sql = sql + ' where prodmp.prod_id = ' + id

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

router.put("/prod", async function (req, res, next) {
  const { prod_id,mp_name,cantidad } = req.body;
  console.log('put prodmp: ', req.body);
  console.log('id: ', prod_id);
  console.log('name: ', mp_name);
  console.log('udm: ', cantidad);

  if (!prod_id || !mp_name || !cantidad) {
    return res.send("Falta información para poder darte de alta la Materia Prima");
  }
  sql = `insert into prodmp (prod_id,mp_name,cantidad)  values('${prod_id}', '${mp_name}','${cantidad}')`
  console.log('sql: ', sql);
  try {
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.SELECT
      });
    console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log('Error:',error)
  }
});

module.exports = router;