//****************/
// Canalgtos 
//****************/
const { Router, response } = require('express');
const router = Router();

require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const seq = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  logging: false,
  native: false,
});

// Obtener todos los canales
router.get('/', async function (req, res, next) {
  try {
    const sql = 'SELECT canalgtos.*,t.descripcion as descrip FROM canalgtos join canaltabgtos t on t.id = canalgtos.codcanal WHERE canalgtos.cod_status > 0 ORDER BY fecha DESC';
    const records = await seq.query(sql, {
      type: QueryTypes.SELECT
    });
    res.send(records);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Obtener un canalgtos específico por ID
router.get('/id/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const sql = `SELECT canalgtos.*,t.descripcion as descrip FROM canalgtos join canaltabgtos t on t.id = canalgtos.codcanal WHERE canalgtos.id = ${id} AND canalgtos.cod_status > 0`;
    const records = await seq.query(sql, {
      type: QueryTypes.SELECT
    });
    res.send(records);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Crear un nuevo canalgtos
router.post('/', async function (req, res, next) {
  try {
    const { fecha, codcanal, presupuesto, cod_status } = req.body;
    const sql = `INSERT INTO canalgtos (fecha, codcanal, presupuesto, cod_status) 
                 VALUES ('${fecha}', '${codcanal}', ${presupuesto}, ${cod_status}) 
                 RETURNING id`;
    const result = await seq.query(sql, {
      type: QueryTypes.INSERT
    });
    res.send({ id: result[0][0]?.id || result[0]?.id, message: 'Canalgtos creado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Actualizar un canalgtos
router.put('/id/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const { fecha, codcanal, presupuesto, cod_status } = req.body;
    let sql = 'UPDATE canalgtos SET ';
    const updates = [];
    
    if (fecha) updates.push(`fecha = '${fecha}'`);
    if (codcanal) updates.push(`codcanal = '${codcanal}'`);
    if (presupuesto) updates.push(`presupuesto = ${presupuesto}`);
    if (cod_status !== undefined) updates.push(`cod_status = ${cod_status}`);
    
    sql += updates.join(', ') + ` WHERE id = ${id}`;
    await seq.query(sql);
    res.send({ message: 'Canalgtos actualizado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Eliminar un canalgtos (cambiar estado)
router.delete('/id/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const sql = `delete from canalgtos WHERE id = ${id}`;
    await seq.query(sql);
    res.send({ message: 'Canalgtos eliminado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
