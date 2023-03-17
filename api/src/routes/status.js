//****************/
// Usuarios
//****************/
const { Router } = require("express");
const { Sequelize, Op } = require("sequelize");
const { Status } = require("../db");
const router = Router();

router.get("/", function (req, res, next) {
  try {
    const { id } = req.query;
 
    if (id) {
      Status.findByPk(id)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Status" });
      });
    } else {
      Status.findAll().then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Status" });
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;

    Status.findByPk(id).then((response) => {
      res.json(response);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  const { id_status, description } = req.body;
  console.log('req.body: ', req.body);

  if (!id_status || !description ) {
    return res.send("Falta información para poder darte de alta el Status");
  }
  // const perf = await Status.findOne({
  //   where: { id_status: id_status },
  // });

  const perf = await Status.findByPk(id_status)

  if (!perf) {
    try {
      const newPerf = await Status.create({
        id_status,
        description
      });
      res.status(200).send("Status Creado");
    } catch (error) {
      res.status(200).send(error);
      //      next(error)
    }
  }
  //  else {
  //     Status.full_name = full_name;
  //     Status.email = email;
  //     Status.role = role;
  //     if (id) await Status.save();
  //     res.json(usuario);
  // }
});

router.put("/", async (req, res) => {
  const { id_status, description } = req.body;
  try {
    const usuario = await Status.findOne({
      where: { id_status },
    });
    Status.description = description;
    if (id_status) await Status.save();
    res.json(usuario);
  } catch (error) {
    res.send(error);
  }
});

router.put("/Status", async (req, res) => {
  const { id, role } = req.query;

  try {
    const usuario = await Status.findOne({
      where: { id },
    });
    Status.role = role;
    if (id) await Status.save();
    res.json(usuario);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let eliminados = await Status.destroy({
      where: { id },
    });
    res.send(`Deleted  ${eliminados} registro`);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
