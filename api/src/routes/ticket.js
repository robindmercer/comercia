//****************/
// ticket
//****************/
const { Router, response } = require("express");
//const { Factura } = require('../db')
const router = Router();

require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const seq = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);


router.get("/", async function (req, res, next) {
  try {
    sql ="select * from ticket ";
    const records = await seq.query(sql, {
      logging: console.log,
      type: QueryTypes.SELECT,
    });
    res.send(records);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fac/:id",async function (req, res, next) {
  try {
    const id = req.params;
    console.log("Log req.params: ", req.params,id.id);
      sql ="select l.id,l.fac_id,l.description," 
      sql = sql +" to_char(l.alta,'dd/mm/yyyy') as alta, " 
      sql = sql +" to_char(l.cierre,'dd/mm/yyyy') as cierre, " 
      sql = sql +" l.usr,l.cod_status, " 
      sql = sql +" t.description as Status"// c.nombre,c.apellido,c.razsoc"
      sql = sql +" from ticket l"
      sql = sql +" join tabla t on t.id = 14 and t.cod = l.cod_status"
      sql = sql +" where l.fac_id =" + id.id ;
      sql = sql +" order by id"
      const records = await seq.query(sql, {
        logging: console.log,
        type: QueryTypes.SELECT,
      });
      res.send(records);
    } catch (error) {
      console.log(error);
    }
  });
  
router.post("/", async function (req, res, next) {
  console.log("Ticket Post : ", req.body);
  const { fac_id, description, alta,cierre,usr, cod_status } = req.body;
  
  if (!fac_id || !description || !cod_status) {
    return res.send("Falta información para poder darte de alta el Log");
  }
  try {
    sql=`insert into ticket (fac_id, description,alta,cierre,usr,cod_status) values `
    sql = sql + `(${fac_id}, '${description}','${alta}','${cierre}', '${usr}', ${cod_status})`
    const records = await seq.query(sql, {
      logging: console.log,
      type: QueryTypes.INSERT,
    });
    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(400).json({ message: error });    
  }
});


router.delete('/:id', async function (req, res, next) {
  try {
    console.log('req.body: ', req.query,req.params);
    const { id } = req.params;
    sql=`delete from ticket where id = ${id}`    
    // console.log(sql)
    const [records] = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.DELETE
      });
    res.send(records)
  } catch (error) {
    console.log(error)
  }

})

router.put('/close/:id', async function (req, res, next) {
  try {
    console.log('close req.body: ', req.query,req.params);
    const { id } = req.params;
    sql=`update ticket set cierre = LOCALTIMESTAMP where id = ${id}`    
    const [records] = await seq.query(sql,
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
