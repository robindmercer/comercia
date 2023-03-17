//****************/
// Usuarios
//****************/
const { Router } = require("express");
const { Sequelize, Op } = require("sequelize");
const { ProductoLang } = require("../db");
const router = Router();

router.get("/", function (req, res, next) {
  try {
    
    const { id,lang } = req.body;
    console.log('req.body: ', req.body);
 
    if (id) {
      ProductoLang.findAll({
        where: {
          id: id,
          //lang : lang,
        },
      })
      .then((resp) => {
        resp.length
        ? res.send(resp)
        : res.send({ message: 'No pude acceder a productos' })
      })
    } else {
      ProductoLang.findAll().then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a ProductoLang" });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;

    ProductoLang.findByPk(id).then((response) => {
      res.json(response);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  const { id,name, description, lang  } = req.body;
  if (!name || !description || !lang ) {
    return res.send("Falta información para poder darte de alta el Productoo")
  }
  const producto = await ProductoLang.findOne({
    where: { id: id },
  });

  if (!producto) {
    try {
      const newProducto = await ProductoLang.create({
        name,
        description,
        lang
      });
      res.status(200).send("Producto Creado");
    } catch (error) {
      res.status(200).send("Producto ya creado");
      //      next(error)
    }
  }
   else {
    producto.name = name;
    producto.description = description;
    producto.lang = lang;
    if (producto.id) await producto.save();
      res.json(producto);
  }
});

module.exports = router;
