//****************/
// Usuarios
//****************/
const { Router } = require("express");
const { Sequelize, Op } = require("sequelize");
const { Productolang } = require("../db");
const router = Router();

router.get("/", function (req, res, next) {
  try {
    const { id,lang } = req.body;
    console.log('req.body: ', req.body);
 
    if (id) {
      Productolang.findAll({
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
      Productolang.findAll().then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Productolang" });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;

    Productolang.findByPk(id).then((response) => {
      res.json(response);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  const { id,name, description, lang  } = req.body;
  console.log('POST PRODUCTOLANG req.body: ', req.body);
  if (!name || !description || !lang ) {
    return res.send("Falta información para poder darte de alta el Productoo")
  }
  const productolang = await Productolang.findOne({
    where: { id: id },
  });

  if (!productolang) {
    try {
      const newProducto = await Productolang.create({
        id,
        lang,
        name,
        description,
      });
      res.status(200).send("Producto Lang Creado");
    } catch (error) {
      res.status(200).send(error);
      //      next(error)
    }
  }
   else {
    producto.name = name;
    producto.lang = lang;
    producto.description = description;
    if (producto.id) await producto.save();
      res.json(producto);
  }
});

module.exports = router;
