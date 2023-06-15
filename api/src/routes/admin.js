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
// Ejemplo de Uso 
// { "sql1":"insert into condiciones (nombre,descuento,enganche,meses,interes) values ",
//   "sql2":"('nom1',1,2,3,4);('nom2',1,2,3,4)"
//  }

router.post('/insert', async function (req, res, next) {
  const { sql1,sql2 } = req.body;
  // console.log('sql: ', sql);
  // console.log('sql2:0 ', sql2[0]);
  // console.log('sql2:1 ', sql2[1]);
  // console.log('sql2.length: ', sql2.length);
  var sql3= sql2.split(";")
  for (var i = 0; i < sql3.length-1; i++) {
    var element = sql1 + sql3[i];
    console.log('element: ', element);
    try {
      const [records] = await seq.query(element,
        {
          logging: console.log,
          type: QueryTypes.INSERT
        });
      } catch (error) {
        console.log(error)
      }
    }
    res.send("OK")
    
  })

router.post('/update', async function (req, res, next) {
  const { sql1,sql2,sql3,sql4 } = req.body;
  console.log('Admin Update ', req.body);
  console.log('sql: ', sql1);
  
    try {
      const [records] = await seq.query(sql1,
        {
          logging: console.log,
          type: QueryTypes.SELECT
        });
        if (sql1) {
          const [records2] = await seq.query(sql2,
            {
              logging: console.log,
              type: QueryTypes.SELECT
            });    
            return res.send("OK")
        }
        res.send("OK")
      } catch (error) {
        console.log(error)
      }
    }
)


module.exports = router;