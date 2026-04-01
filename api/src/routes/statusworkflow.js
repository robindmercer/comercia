//****************/
// Status Workflow
//****************/
const { Router } = require('express');
// const logger = require('../utils/logger');
// const AppError = require('../utils/appError');

require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const seq = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  logging: false,
  native: false,
});

const router = Router();

/**
 * GET all status workflows with optional ID filter
 */
router.get('/', async (req, res, next) => {
  try {
    const { id } = req.query;

    let sql = "SELECT * FROM status_workflow";
    const params = [];

    if (id) {
      sql += " WHERE id = $1";
      params.push(id);
    }

    sql += " ORDER BY id";

    const records = await seq.query(sql, {
      bind: params,
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET status workflow by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError('Workflow ID is required', 400));
    }

    const sql = "SELECT * FROM status_workflow WHERE id = $1";

    const records = await seq.query(sql, {
      bind: [id],
      type: QueryTypes.SELECT,
    });

    if (records.length === 0) {
      return next(new AppError('Status workflow not found', 404));
    }

    res.status(200).json({
      success: true,
      data: records[0],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET workflows by current status
 */
router.get('/status/:status_actual', async (req, res, next) => {
  try {
    const { status_actual } = req.params;

    if (!status_actual) {
      return next(new AppError('Current status is required', 400));
    }

    const sql = "SELECT * FROM status_workflow WHERE status_actual = $1 ORDER BY id";

    const records = await seq.query(sql, {
      bind: [status_actual],
      type: QueryTypes.SELECT,
    });

    if (records.length === 0) {
      return next(new AppError('No workflows found for this status', 404));
    }

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST create new status workflow
 */
router.post('/', async (req, res, next) => {
  try {
    const { status_actual, status_aprobado, status_rechazado, requiere_modificacion, descripcion, cod_status } = req.body;

    if (!status_actual || !status_aprobado || !status_rechazado) {
      return next(new AppError('status_actual, status_aprobado, and status_rechazado are required', 400));
    }

    const sql = `
      INSERT INTO status_workflow (status_actual, status_aprobado, status_rechazado, requiere_modificacion, descripcion, cod_status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const result = await seq.query(sql, {
      bind: [status_actual, status_aprobado, status_rechazado, requiere_modificacion || false, descripcion || '', cod_status || 1],
      type: QueryTypes.INSERT,
    });

    logger.info(`Status workflow created: ${status_actual}`);

    res.status(201).json({
      success: true,
      message: 'Status workflow created successfully',
      data: result[0][0],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT update status workflow
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status_actual, status_aprobado, status_rechazado, requiere_modificacion, descripcion, cod_status } = req.body;

    if (!id) {
      return next(new AppError('Workflow ID is required', 400));
    }

    const sql = `
      UPDATE status_workflow
      SET status_actual = COALESCE($1, status_actual),
          status_aprobado = COALESCE($2, status_aprobado),
          status_rechazado = COALESCE($3, status_rechazado),
          requiere_modificacion = COALESCE($4, requiere_modificacion),
          descripcion = COALESCE($5, descripcion),
          cod_status = COALESCE($6, cod_status)
      WHERE id = $7
      RETURNING *
    `;

    const result = await seq.query(sql, {
      bind: [status_actual, status_aprobado, status_rechazado, requiere_modificacion, descripcion, cod_status, id],
      type: QueryTypes.UPDATE,
    });

    if (result[0].length === 0) {
      return next(new AppError('Status workflow not found', 404));
    }

    logger.info(`Status workflow updated: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Status workflow updated successfully',
      data: result[0][0],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE status workflow
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError('Workflow ID is required', 400));
    }

    const sql = "DELETE FROM status_workflow WHERE id = $1";

    await seq.query(sql, {
      bind: [id],
      type: QueryTypes.DELETE,
    });

    logger.info(`Status workflow deleted: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Status workflow deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
