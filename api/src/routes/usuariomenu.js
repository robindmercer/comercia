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
    sql="select * from usuariomenus"
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
    sql=`select * from usuariomenus where id = ${id}`
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
      sql = `select a.*,cod_perfil from usuariomenus a`
      sql = sql + ` join Usuarios on usr_id = usrid`
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

// router.post("/", async function (req, res, next) {
//   const { id, usr_id, name, email, Perfil,status,pass } = req.body;
//   console.log('req.body: ', req.body);

//   if (!id || !usr_id || !name || !email || !Perfil || !status || !pass) {
//     return res.send("Falta información para poder darte de alta el Menu");
//   }
//   sql = "update usuariomenus set "
//   sql = sql + `name = '${name}`
//   sql = sql + `fullname = '${name}`
//   const Menu = await Menu.findOne({
//     where: { id: id },
//   });

//   if (!Menu) {
//     try {
//       const newMenu = await Menu.create({
//         usr_id,
//         name,
//         email,
//         Perfil,
//         status,
//         pass
//       });
//       res.status(200).send("Menu Created");
//     } catch (error) {
//       res.status(200).send("Usario ya creado");
//       //      next(error)
//     }
//   }
  //  else {
  //     Menu.full_name = full_name;
  //     Menu.email = email;
  //     Menu.role = role;
  //     if (id) await Menu.save();
  //     res.json(Menu);
  // }


router.put("/", async (req, res) => {
  const { usrid, nivel, accion } = req.body;
  console.log('req.body: ', req.body);
  try {
    sql = `insert into usuariomenus (usrid,nivel,accion) values ('${usrid}', ${nivel}, '${accion}')`
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

router.delete("/", async (req, res) => {
  const { usrid, nivel, accion } = req.body;
  try {
    sql = 'Delete usuariomenus ' 
    sql = sql  + ` where usrid:'${usrid}' and nivel:${nivel}`
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

module.exports = router;
