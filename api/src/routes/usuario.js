//****************/
// Usuarios
//****************/
const { Router } = require("express");
const { Usuario,Perfil,Status,Perfilmenu } = require("../db");
const { Sequelize, Op } = require("sequelize");
const router = Router();

router.get("/", function (req, res, next) {
  try {
    const { id } = req.query;
 
    if (id) {
      Usuario.findByPk(id)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Usuarios" });
      });
    } else {
      Usuario.findAll(
        { include: [
          {model: Perfil},
          {model: Status},
        ],}
      ).then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Usuario" });
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

    Usuario.findByPk(id).then((response) => {
      res.json(response);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/usr/:clave", function (req, res, next) {
  try {
    console.log('/usr/:clave req.params: ', req.params);
    const  usr_id  = req.params.clave;
    if (usr_id) {
      Usuario.findAll({
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
    console.log('/perfil/:perfil req.params: ', req.params);
    const  perfil  = req.params.perfil;
    if (perfil) {
      Usuario.findAll({
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
  console.log('Post usuarios: ', req.body);
  const newpass='nada'
  const { id, usr_id, name, email, password,cod_perfil,cod_status,cia_id } = req.body;

  if (!usr_id || !name || !email || !cod_perfil || !cod_status || !password) {
    return res.send("Falta información para poder darte de alta el Usuario");
  }
  const usuario = await Usuario.findOne({
    where: { usr_id: usr_id },
  });
  console.log('usuario: ', usuario);

  if (!usuario) {
    try {
      const newUsuario = await Usuario.create({
        usr_id,
        name,
        email,
        cod_perfil,
        cod_status,
        password,cia_id
      });
      res.status(200).send("Usuario Creado");
    } catch (error) {
      console.log('error: ', error);
      res.status(400).send("Error Usario");
      //      next(error)
    }
  }
   else {
    usuario.name = name;
    usuario.email = email;
    usuario.cod_perfil = cod_perfil;
    usuario.cod_status = cod_status;
    usuario.password = password;
    if (usuario.id) await usuario.save();
      res.json(usuario);
  }
});



router.put("/", async (req, res) => {
  console.log('Put uusario: ', req.body);
  const { id, usr_id, name, email, password,cod_perfil,cia_id,cod_status } = req.body;
  try {
    const usuario = await Usuario.findOne({
      where: { id : id },
    });
    usuario.usr_id = usr_id
    usuario.name =name
    usuario.email =email
    usuario.password =password
    usuario.cod_perfil =cod_perfil
    usuario.cod_status =cod_status
    usuario.cia_id = cia_id
    await usuario.save();
    res.status(200).send.json(usuario);
  } catch (error) {
    res.send('error'+error);
  }
});

router.put("/status/:id", async (req, res) => {
  console.log('status id: ', req.params.id);
  const  id  = req.params.id;
  try {
    const usuario = await Usuario.findOne({
      where: { id : id },
    });
    if (usuario.cod_status === 1  ){
      usuario.cod_status = 2
    }else {
      usuario.cod_status = 1
    }
    if (id) await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.send('error'+error);
  }
});
  


// router.delete("/:id", async (req, res) => {
//   let { id } = req.params;
//   try {
//     let eliminados = await Usuario.destroy({
//       where: { id },
//     });
//     res.send(`Deleted  ${eliminados} registro`);
//   } catch (error) {
//     res.send(error);
//   }
// });

module.exports = router;
