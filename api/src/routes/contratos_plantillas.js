//****************/
// contratos_plantillas
//****************/
const { Router } = require("express");
const router = Router();

require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const seq = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  {
    logging: false,
    native: false,
  }
);

// Obtener plantillas (todas o por id)
router.get("/", async function (req, res) {
  try {
    const { id } = req.query;

    let sql = "select * from contratos_plantillas";
    const replacements = {};

    if (id) {
      sql += " where id = :id";
      replacements.id = id;
    }

    sql += " order by id desc";

    const records = await seq.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });

    res.send(records);
  } catch (error) {
    console.log("Error get contratos_plantillas:", error);
    res.status(500).send({ error: error.message });
  }
});

// Crear plantilla
router.post("/", async function (req, res) {
  try {
    const {
      nombre,
      descripcion,
      contenido,
      moneda,
      idioma,
      cod_status,
      tieneaval,
    } = req.body;

    if (!nombre) {
      return res.status(400).send("Falta nombre para crear la plantilla");
    }

    const sql = `
      insert into contratos_plantillas
      (nombre, descripcion, contenido, cod_status,moneda,idioma,fecha_creacion,tieneaval)
      values (:nombre, :descripcion, :contenido, :cod_status, :moneda, :idioma, :fecha_creacion, :tieneaval)
      returning id
    `;

    const records = await seq.query(sql, {
      replacements: { nombre, descripcion, contenido, cod_status, moneda, idioma, fecha_creacion: new Date(), tieneaval: false },
      type: QueryTypes.INSERT,
    });

    res.send(records);
  } catch (error) {
    console.log("Error post contratos_plantillas:", error);
    res.status(500).send({ error: error.message });
  }
});

// Actualizar plantilla
router.put("/:id", async function (req, res) {
  try {
     const { id } = req.params;
    const {
      nombre,
      descripcion,
      contenido,
      cod_status,
      idioma, 
      moneda,
      tieneaval,
    } = req.body;

    if (!id) {
      return res.status(400).send("Falta id para actualizar la plantilla");
    }

    const campos = [];
    const replacements = { id };

    if (nombre !== undefined) {
      campos.push("nombre = :nombre");
      replacements.nombre = nombre;
    }

    if (descripcion !== undefined) {
      campos.push("descripcion = :descripcion");
      replacements.descripcion = descripcion;
    }
    if (tieneaval !== undefined) {
      campos.push("tieneaval = :tieneaval");
      replacements.tieneaval = tieneaval;
    }
    if (contenido !== undefined) {
      campos.push("contenido = :contenido");
      replacements.contenido = contenido;
    }
    if (cod_status !== undefined) {
      campos.push("cod_status = :cod_status");
      replacements.cod_status = cod_status;
    }
    if (idioma !== undefined) {
      campos.push("idioma = :idioma");
      replacements.idioma = idioma;
    }
    if (moneda !== undefined) {
      campos.push("moneda = :moneda");
      replacements.moneda = moneda;
    }

    if (campos.length === 0) {
      return res.status(400).send("No hay campos para actualizar");
    }

    const sql = `
      update contratos_plantillas
      set ${campos.join(", ")}
      where id = :id
    `;

    const records = await seq.query(sql, {
      replacements,
      type: QueryTypes.UPDATE,
    });

    res.send(records);
  } catch (error) {
    console.log("Error put contratos_plantillas:", error);
    res.status(500).send({ error: error.message });
  }
});

// Desactivar plantilla (borrado logico)
router.delete("/", async function (req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).send("Falta id para desactivar la plantilla");
    }

    const sql = "update contratos_plantillas set cod_status = 0 where id = :id";
    const records = await seq.query(sql, {
      replacements: { id },
      type: QueryTypes.UPDATE,
    });

    res.send(records);
  } catch (error) {
    console.log("Error delete contratos_plantillas:", error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
