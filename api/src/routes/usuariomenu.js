//****************/
// Menus
//****************/
const { Router } = require("express");
const { Menu,Usuariomenu } = require("../db");
const { Sequelize, Op } = require("sequelize");
const router = Router();

// Busca todos 
router.get('/', function (req, res, next) {
  try {
    const  usrid  = req.params.clave;
    
    Usuariomenu.findAll()
      .then((resp) => {
        resp.length
          ? res.status(200).send(resp)
          : res.status(404).json({message:'Error para mostrar las categorias'});
      })
  } catch (error) {
    next(error)
  }
})

router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;

    Usuariomenu.findByPk(id).then((response) => {
      res.json(response);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/usr/:clave", function (req, res, next) {
  try {
    const  usrid  = req.params.clave;
    if (usrid) {
      Usuariomenu.findAll({
        where: {
          usrid: usrid,
        },
      }).then((resp) => {
//        console.log('resp1: ', resp);
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Menus" });
      });
    }
  } catch (error) {
    console.log('error: ', error);
    // next(error);
  }
});

router.post("/", async function (req, res, next) {
  const { id, usr_id, name, email, Perfil,status,pass } = req.body;
  console.log('req.body: ', req.body);

  if (!id || !usr_id || !name || !email || !Perfil || !status || !pass) {
    return res.send("Falta información para poder darte de alta el Menu");
  }
  const Menu = await Menu.findOne({
    where: { id: id },
  });

  if (!Menu) {
    try {
      const newMenu = await Menu.create({
        usr_id,
        name,
        email,
        Perfil,
        status,
        pass
      });
      res.status(200).send("Menu Created");
    } catch (error) {
      res.status(200).send("Usario ya creado");
      //      next(error)
    }
  }
  //  else {
  //     Menu.full_name = full_name;
  //     Menu.email = email;
  //     Menu.role = role;
  //     if (id) await Menu.save();
  //     res.json(Menu);
  // }
});

router.put("/", async (req, res) => {
  const { usrid, nivel, accion } = req.body;
  console.log('req.body: ', req.body);
  try {
    const Menu = await Usuariomenu.findOne({
      where:  {usrid:usrid,nivel:nivel }
    });
    if (Menu) {
      Menu.accion = accion;
      console.log("lo encontre")
      await Menu.save();
    } else {
      const newMenu = await Usuariomenu.create({
        usrid,
        nivel,
        accion,
      });     
    }
    res.json(Menu);
  } catch (error) {
    console.log('error: ', error);
    res.send(error);
  }
});

router.delete("/", async (req, res) => {
  const { usrid, nivel, accion } = req.body;
  try {
    let eliminados = await Usuariomenu.destroy({
            where:  {usrid:usrid,nivel:nivel }      
    });
    res.send(`Deleted  ${eliminados} registro`);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
