//****************/
// Logs
//****************/
const { Router } = require("express");
const { Log } = require("../db");
const { Sequelize, Op } = require("sequelize");
const router = Router();


router.get("/", function (req, res, next) {
  console.log('get');
  try {
    Log.findAll().then((resp) => {
      resp.length
        ? res.send(resp)
        : res.send({ message: "No pude acceder a Log" });
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
});

router.get("/fac/:id", function (req, res, next) {
  try {
    console.log("req.params: ", req.params);
    const id = req.params;
    if (id) {
      Log.findAll({
        where: {
          fac_id: id,
        },
      }).then((resp) => {
        // console.log('resp1: ', resp);
        resp.length ? res.send(resp) : res.send({ usr_id: "0" });
      });
    }
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  const newpass = "nada";
  const { fac_id, usr_id, cod_status } = req.body;
  console.log("req.body: ", req.body);

  if (!fac_id || !usr_id || !cod_status) {
    return res.send("Falta información para poder darte de alta el Log");
  }
  try {
    const newLog = await Log.create({
      fac_id,
      usr_id,
      cod_status,
    });
    res.status(200).send("Log Creado");
  } catch (error) {
    res.status(200).send("Usario ya creado");
    //      next(error)
  }
});

module.exports = router;
