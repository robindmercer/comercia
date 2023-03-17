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
          : res.send({ message: "No pude acceder a Perfils" });
      });
    } else {
      Perfil.findAll().then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Usuario" });
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

router.get("/usr/:clave", function (req, res, next) {
  try {
    const  usr_id  = req.params.clave;
    if (usr_id) {
      Perfil.findAll({
        where: {
          usr_id: usr_id,
        },
      }).then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Perfils" });
      });
    }
  } catch (error) {
    console.log('error: ', error);
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  const { id, usr_id, name, email, id_perfil,id_status,pass } = req.body;
  console.log('req.body: ', req.body);

  if (!id || !usr_id || !name || !email || !id_perfil || !id_status || !pass) {
    return res.send("Falta información para poder darte de alta el Perfil");
  }
  const usuario = await Perfil.findOne({
    where: { id: id },
  });

  if (!usuario) {
    try {
      const newUsuario = await Perfil.create({
        usr_id,
        name,
        email,
        id_perfil,
        id_status,
        pass
      });
      res.status(200).send("Usuario Created");
    } catch (error) {
      res.status(200).send("Usario ya creado");
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
  const { id, email, full_name, role } = req.body;
  try {
    const usuario = await Perfil.findOne({
      where: { id },
    });
    Perfil.full_name = full_name;
    Perfil.email = email;
    Perfil.role = role;
    if (id) await Perfil.save();
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
