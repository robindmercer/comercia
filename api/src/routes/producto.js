//****************/
// Productos
//****************/
const { Router, response } = require("express");
const { Producto } = require('../db')

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

// Getting all Productos from DB
// Search by Name
router.get("/", async function (req, res, next) {
   try {
      const { name } = req.query;
      sql = "select p.*,t.description EstProd from productos p";
      sql = sql + " join tabla t on t.id = 13 and t.cod = p.cod_status";
      if (name) {
         sql = sql + ` where p.name like '%${name}%' and p.cod_status <> 0`;
        } else {
        sql = sql + ` where p.cod_status <> 0`;        
      }
      const records = await seq.query(sql, {
        logging: console.log,
        type: QueryTypes.SELECT,
      });
      res.send(records);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/detail/:id", async function (req, res, next) {
    try {
      const { id } = req.params;
      
      sql = "select p.*,t.description EstProd from productos p";
      sql = sql + " join tabla t on t.id = 13 and t.cod = p.cod_status";
      sql = sql + ` where p.id = '%${id}%'`;
      sql = sql + `   and p.cod_status <> 0`;
      const records = await seq.query(sql, {
         logging: console.log,
         type: QueryTypes.SELECT,
      });
      res.send(records);
   } catch (error) {
      console.log(error);
   }
});

router.put("/", async function (req, res, next) {
   console.log(" req.body: ", req.body);
   const { name, description, price, dolar, cod_status } = req.body;
   if (!name || !description || !price || !dolar || !cod_status) {
      return res.send(
         "Falta información para poder darte de alta el Productoo"
      );
   }
   try {
      const newProducto = await Producto.create({
         name,
         description,
         price,
         dolar,
         cod_status: 1,
      });
      res.status(200).send(`Producto Creado : ${newProducto.id}`);
   } catch (error) {
      console.log("Error", req.body);
      next(error);
   }
});

router.post("/", async function (req, res, next) {
   const { id, name, description, price, dolar, cod_status } = req.body;
   console.log("Post Procuto req.body: ", req.body);
   if (!name || !description || !cod_status) {
      return res.send(
         "Falta información para poder darte de alta el Productoo"
      );
   }

   const producto = await Producto.findOne({
      where: { id: id },
   });
   console.log("producto: ", producto);

   if (!producto) {
      try {
         const newProducto = await Producto.create({
            name,
            description,
            price,
            dolar,
            cod_status: 1,
         });
         res.status(200).send("Producto Creado");
      } catch (error) {
         res.status(200).send("Producto ya creado");
         //      next(error)
      }
   } else {
      producto.name = name;
      producto.description = description;
      producto.cod_status = cod_status;
      producto.price = price;
      producto.dolar = dolar;
      if (producto.id) await producto.save();
      res.json(producto);
   }
});

router.put("/del/:id", async (req, res) => {
   const { id } = req.params;
   try {
      const newProducto = await Producto.findOne({
         where: { id },
      });
      newProducto.status = 2;
      if (id) await newProducto.save();
      res.json(newProducto);
   } catch (error) {
      res.send(error);
   }
});

router.delete("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      let eliminados = await Producto.destroy({
         where: { id },
      });
      res.send(`Deleted  ${eliminados} registro`);
   } catch (error) {
      console.log("error: ", error);
      res.send(error);
   }
});

module.exports = router;
