//****************/
// Usuarios
//****************/
const { Router } = require("express");
const { Sequelize, Op } = require("sequelize");
const { Perfil } = require("../db");
const router = Router();

router.get("/", function (req, res, next) {
  try {
    const { id } = req.query;
 
    if (id) {
      Perfil.findByPk(id)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Perfil" });
      });
    } else {
      Perfil.findAll().then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Perfil" });
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;

    Perfil.findByPk(id).then((response) => {
      res.json(response);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  const { id_perfil, description } = req.body;
  console.log('req.body: ', req.body);

  if (!id_perfil || !description ) {
    return res.send("Falta información para poder darte de alta el Perfil");
  }
  // const perf = await Perfil.findOne({
  //   where: { id_perfil: id_perfil },
  // });

  const perf = await Perfil.findByPk(id_perfil)

  if (!perf) {
    try {
      const newPerf = await Perfil.create({
        id_perfil,
        description
      });
      res.status(200).send("Perfil Creado");
    } catch (error) {
      res.status(200).send(error);
      //      next(error)
    }
  }
  //  else {
  //     Perfil.full_name = full_name;
  //     Perfil.email = email;
  //     Perfil.role = role;
  //     if (id) await Perfil.save();
  //     res.json(usuario);
  // }
});

router.put("/", async (req, res) => {
  const { id_perfil, description } = req.body;
  try {
    const usuario = await Perfil.findOne({
      where: { id_perfil },
    });
    Perfil.description = description;
    if (id_perfil) await Perfil.save();
    res.json(usuario);
  } catch (error) {
    res.send(error);
  }
});

router.put("/Perfil", async (req, res) => {
  const { id, role } = req.query;

  try {
    const usuario = await Perfil.findOne({
      where: { id },
    });
    Perfil.role = role;
    if (id) await Perfil.save();
    res.json(usuario);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let eliminados = await Perfil.destroy({
      where: { id },
    });
    res.send(`Deleted  ${eliminados} registro`);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
