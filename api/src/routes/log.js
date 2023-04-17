//****************/
// Logs
//****************/
const { Router } = require("express");
const { Log,Perfil,Status,Perfilmenu } = require("../db");
const { Sequelize, Op } = require("sequelize");
const router = Router();

router.get("/", function (req, res, next) {
  try {
    const { id } = req.query;
 
    if (id) {
      Log.findByPk(id)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Logs" });
      });
    } else {
      Log.findAll(
        { include: [
          {model: Perfil},
          {model: Status},
        ],}
      ).then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Log" });
      });
    }
  } catch (error) {
    console.log('error: ', error);
    next(error);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;

    Log.findByPk(id).then((response) => {
      res.json(response);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/usr/:clave", function (req, res, next) {
  try {
    console.log('req.params: ', req.params);
    const  usr_id  = req.params.clave;
    if (usr_id) {
      Log.findAll({
        attributes: {exclude: ['id_status','id_perfil']},
        where: {
          usr_id: usr_id,
        },
         include: [
          {model: Perfil},
          {model: Status},
        ],
      }).then((resp) => {
    // console.log('resp1: ', resp);
        resp.length
          ? res.send(resp)
          : res.send({ usr_id: '0' });
      });
    }
  } catch (error) {
    console.log('error: ', error);
    next(error);
  }
});

router.get("/perfil/:perfil", function (req, res, next) {
  try {
    console.log('req.params: ', req.params);
    const  perfil  = req.params.perfil;
    if (perfil) {
      Log.findAll({
        attributes: {exclude: ['id_status','id_perfil']},
        where: {
          cod_perfil: perfil,
        },
         include: [
          {model: Perfil},
          {model: Status},
        ],
      }).then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ usr_id: '0' });
      });
    }
  } catch (error) {
    console.log('error: ', error);
    next(error);
  }
});


router.post("/", async function (req, res, next) {
  console.log('req.body: ', req.body);
  const newpass='nada'
  const { id, usr_id, name, email, password,cod_perfil,cod_status } = req.body;

  if (!usr_id || !name || !email || !cod_perfil || !cod_status || !password) {
    return res.send("Falta información para poder darte de alta el Log");
  }
  const log = await Log.findOne({
    where: { usr_id: usr_id },
  });
  console.log('log: ', log);

  if (!log) {
    try {
      const newLog = await Log.create({
        usr_id,
        name,
        email,
        cod_perfil,
        cod_status,
        password
      });
      res.status(200).send("Log Creado");
    } catch (error) {
      res.status(200).send("Usario ya creado");
      //      next(error)
    }
  }
   else {
    log.name = name;
    log.email = email;
    log.cod_perfil = cod_perfil;
    log.cod_status = cod_status;
    log.password = password;
    if (log.id) await log.save();
      res.json(log);
  }
});


router.put("/status/:id", async (req, res) => {
  console.log('status id: ', req.params.id);
  const  id  = req.params.id;
  try {
    const log = await Log.findOne({
      where: { id : id },
    });
    if (log.cod_status === 1  ){
      log.cod_status = 2
    }else {
      log.cod_status = 1
    }
    if (id) await log.save();
    res.json(log);
  } catch (error) {
    res.send('error'+error);
  }
});
  


// router.delete("/:id", async (req, res) => {
//   let { id } = req.params;
//   try {
//     let eliminados = await Log.destroy({
//       where: { id },
//     });
//     res.send(`Deleted  ${eliminados} registro`);
//   } catch (error) {
//     res.send(error);
//   }
// });

module.exports = router;
