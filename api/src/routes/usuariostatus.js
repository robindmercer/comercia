//****************/
// Menus
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

// Busca todos 
router.get('/', async function (req, res, next) {
  try {
    sql="select * from usuariostatus JOIN TABLA ON ID = 21 AND COD = COD_STATUS"
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

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    sql=`select * from usuariostatus where id = ${id}`
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

router.get("/usr/:clave", async function (req, res, next) {
  try {
    const  usrid  = req.params.clave;
    if (usrid) {
      sql = `select a.*,cod_perfil,tabla.description from usuariostatus a`
      sql = sql + ` join Usuarios on usr_id = usrid`
      sql = sql + ` join tabla on tabla.id = 21 and tabla.cod = a.cod_status`
      sql = sql + ` where usrid = '${usrid}'`
      const records = await seq.query(sql,
        {
          // logging: console.log,
          type: QueryTypes.SELECT
        });      
      res.send(records)    
    }
        }  catch (error) {
      console.log(error)
      }
    }
)

router.post("/", async function (req, res, next) {
  const { id, usrid, tipo, cod_status, accion } = req.body;
  console.log('req.body: ', req.body);

  if (!usrid || !tipo || !cod_status || !accion) {
    console.log('accion: ', accion);
    console.log('cod_status: ', cod_status);
    console.log('tipo: ', tipo);
    console.log('usrid: ', usrid);
    console.log('id: ', id);
    res.status(400).json({message:"Falta información para poder darte de alta el UsuarioStatus"})
    return;
  }

  if (id === 0) {
    try {
      sql  = `insert into usuariostatus (usrid,tipo,cod_status,accion) values `
      sql += `('${usrid}', '${tipo}', ${cod_status}, '${accion}')`
      const records = await seq.query(sql,
        {  
          logging: console.log,
          type: QueryTypes.INSERT
        });
      console.log('records: ', records);  
      res.status(200).send("usuario Status Created");
    } catch (error) {
      console.log('error: ', error);
      res.status(400).send(`Error : ${error}`);
    }
  } else {
      sql= `update usuariostatus set usrid = '${usrid}', tipo = '${tipo}', cod_status = ${cod_status}, accion = '${accion}' where id = ${id}`
      const records = await seq.query(sql,
        {
          logging: console.log,
          type: QueryTypes.UPDATE
        });
      console.log('records: ', records  );
      res.json(records);
  }   
}) 


router.put("/", async (req, res) => {
  const { usrid, tipo, cod_status, accion } = req.body;
  console.log('req.body: ', req.body);
  try {
    sql = `insert into usuariostatus (usrid,tipo,cod_status,accion) values ('${usrid}', '${tipo}', ${cod_status}, '${accion}')`
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.UPDATE
      });
      //console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log(error)
  }
}) 

router.delete("/:id", async (req, res) => {
  const  id  = req.params.id;
  console.log('Delete id: ', id);

  try {
    sql = 'Delete from usuariostatus ' 
    sql = sql  + ` where id = ${id}`
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.UPDATE
      });
    res.send(records)
  } catch (error) {
    console.log(error)
  }
}) 

module.exports = router;
