//****************/
// Canal 
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

// Obtener todos los canaloces
router.get('/', async function (req, res, next) {
  try {
    const sql = 'SELECT * FROM canaloc WHERE usr_id > 0 ORDER BY fecha DESC';
    const records = await seq.query(sql, {
      type: QueryTypes.SELECT
    });
    res.send(records);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Obtener un canaloc específico por ID
router.get('/id/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM canaloc WHERE id = ${id} AND usr_id > 0`;
    const records = await seq.query(sql, {
      type: QueryTypes.SELECT
    });
    res.send(records);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Crear un nuevo canaloc
router.post('/', async function (req, res, next) {
  try {
    const { can_id, fac_id, dias, usr_id } = req.body;
    var fecha = new Date().toISOString();
    const sql = `INSERT INTO canaloc (can_id, fecha, fac_id, dias, usr_id) 
                 VALUES ('${can_id}','${fecha}', '${fac_id}', ${dias}, '${usr_id}') 
                 RETURNING id`;
    const result = await seq.query(sql, {
      type: QueryTypes.INSERT
    });
    res.send({ id: result[0][0]?.id || result[0]?.id, message: 'Canal creado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Actualizar un canaloc
router.put('/id/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const { can_id, fac_id, dias, usr_id } = req.body;
    let sql = 'UPDATE canaloc SET ';
    const updates = [];
    
   fecha = new Date().toISOString();
   updates.push(`fecha = '${fecha}'`);
    if (fac_id) updates.push(`fac_id = '${fac_id}'`);
    if (can_id) updates.push(`can_id = '${can_id}'`);
    if (dias) updates.push(`dias = ${dias}`);
    if (usr_id !== undefined) updates.push(`usr_id = '${usr_id}'`);
    
    sql += updates.join(', ') + ` WHERE id = ${id}`;
    await seq.query(sql);
    res.send({ message: 'Canal actualizado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Eliminar un canaloc (cambiar estado)
router.delete('/id/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM canaloc WHERE id = ${id}`;
    await seq.query(sql);
    res.send({ message: 'Canal eliminado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
