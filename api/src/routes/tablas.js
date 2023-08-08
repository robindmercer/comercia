//****************/
// Tablas
//****************/
const { Router } = require("express");
const { Sequelize, Op } = require("sequelize");
const { Tabla, Status } = require("../db");
const router = Router();

router.get("/", function (req, res, next) {
  try {
    const { id } = req.query;

    if (id) {
      Tabla.findByPk(id)
        .then((resp) => {
          resp.length
            ? res.send(resp)
            : res.send({ message: "No pude acceder a Tabla" });
        });
    } else {
      Tabla.findAll({
        where: {
          cod: 0,
        },
        include: [
          { model: Status },
        ],
      }
      ).then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Tabla" });
      });
    }
  } catch (error) {
    next(error);
  }
});

// Busca todos los datos de la tabla 
// despues con un map busco lo que necesito 
// asi accedo una sola vez 
router.get("/all", function (req, res, next) {
  try {
    const { id } = req.query;

    if (id) {
      Tabla.findByPk(id)
        .then((resp) => {
          resp.length
            ? res.send(resp)
            : res.send({ message: "No pude acceder a Tabla" });
        });
    } else {
      Tabla.findAll({
        include: [
          { model: Status },
        ],
        order: [
          ["description", "ASC"],
        ],
      }
      ).then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Tabla" });
      });
    }
  } catch (error) {
    next(error);
  }
});


router.get("/cod/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    console.log('Tablas id: ', id);

    Tabla.findAll({
      where: {
        id: id, cod: { [Op.gt]: 0 }
      },
      include: [
        { model: Status },
      ],
    }
    ).then((resp) => {
      resp.length
        ? res.send(resp)
        : res.send({ message: "No pude acceder a Tabla" });
    });
  } catch (error) {
    next(error);
  }
});

router.get("/iva/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    console.log('id: ', id);

    Tabla.findAll({
      where: {
        id: id, cod: { [Op.gt]: 0 }
      },
    }
    ).then((resp) => {
      resp.length
        ? res.send(resp)
        : res.send({ message: "No pude acceder a Tabla" });
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  const { id, cod, description, control,valor, cod_status } = req.body;
  console.log('Post Tabla: ', req.body);
  console.log('id: ', id);
  console.log('cod: ', cod);

  if (!id || !description || !cod_status) {
    return res.send("Falta información para poder darte de alta la Tabla");
  }
  const tabla = await Tabla.findOne({
    where: {
      id:id, cod:cod
    }
  })
  if (!tabla) {
    console.log('Es un alta');
    try {
      const newTabla = await Tabla.create({
        id,
        cod,
        description,control,
        valor,
        cod_status,
      });
      res.status(200).send("Tabla Creado");
    } catch (error) {
      console.log('error: ', error);
      res.status(200).send(error);
      //      next(error)
    }
  }
  else {
    tabla.id = id;
    tabla.cod = cod;
    tabla.description = description;
    tabla.control=control;
    tabla.valor = valor;
    tabla.cod_status = cod_status;
    if (id) await tabla.save();
    res.json(tabla);
  }
});

router.put("/", async (req, res) => {
  const { id_tabla, description } = req.body;
  try {
    const usuario = await Tabla.findOne({
      where: { id_tabla },
    });
    Tabla.description = description;
    if (id_tabla) await Tabla.save();
    res.json(usuario);
  } catch (error) {
    res.send(error);
  }
});

router.put("/Tabla", async (req, res) => {
  const { id, role } = req.query;

  try {
    const usuario = await Tabla.findOne({
      where: { id },
    });
    Tabla.role = role;
    if (id) await Tabla.save();
    res.json(usuario);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let eliminados = await Tabla.destroy({
      where: { id },
    });
    res.send(`Deleted  ${eliminados} registro`);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
