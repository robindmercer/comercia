const { Router } = require('express');
const router = Router();

const { Inventario, conn } = require('../db');
const { QueryTypes } = require('sequelize');

const campos = [
  'codigo',
  'ubicación',
  'equipo_donde_se_utiliza',
  'stock_minimo',
  'inventario',
  'costo_unitario',
  'valor_almacen',
  'solicitar',
  'proveedor',
  'tiempo_de_entrega',
  'notas',
];

function obtenerCampos(body) {
  return Object.fromEntries(campos.map((campo) => [campo, body[campo]]));
}

function camposFaltantes(body) {
  return campos.filter((campo) => body[campo] === undefined || body[campo] === null);
}

function validarId(id) {
  const idNumerico = Number(id);
  return Number.isInteger(idNumerico) && idNumerico > 0 ? idNumerico : null;
}

router.get('/', async function (req, res, next) {
  try {
    const registros = await conn.query(
      `SELECT i.*, mp.description AS description, mp.udm AS udm,
              t.description AS udm_desc
       FROM inventario i
       LEFT JOIN materiaprima mp ON mp.name = i.codigo
       LEFT JOIN tabla t ON t.id = 22 AND t.cod = mp.udm
       ORDER BY i.codigo ASC`,
      { type: QueryTypes.SELECT }
    );
    res.json(registros);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function (req, res, next) {
  const id = validarId(req.params.id);
  if (!id) return res.status(400).json({ message: 'ID inválido' });

  try {
        const registros = await conn.query(
      `SELECT i.*, mp.description AS description, mp.udm AS udm,
              t.description AS udm_desc
       FROM inventario i
       LEFT JOIN materiaprima mp ON mp.name = i.codigo
       LEFT JOIN tabla t ON t.id = 22 AND t.cod = mp.udm
       where i.id = :id`,
      { type: QueryTypes.SELECT, replacements: { id } }
    );
    if (!registros.length) return res.status(404).json({ message: 'Registro de inventario no encontrado' });
    res.json(registros[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/', async function (req, res, next) {
  const faltantes = camposFaltantes(req.body || {});
  if (faltantes.length) {
    return res.status(400).json({ message: 'Faltan campos requeridos', campos: faltantes });
  }

  try {
    const registro = await Inventario.create(obtenerCampos(req.body));
    res.status(201).json(registro);
  } catch (error) {
    next(error);
  }
});

router.put('/id/:id', async function (req, res, next) {
  const id = validarId(req.params.id);
  if (!id) return res.status(400).json({ message: 'ID inválido' });

  // const faltantes = camposFaltantes(req.body || {});
  // if (faltantes.length) {
  //   return res.status(400).json({ message: 'Faltan campos requeridos', campos: faltantes });
  // }

  try {
    const registro = await Inventario.findByPk(id);
    if (!registro) return res.status(404).json({ message: 'Registro de inventario no encontrado' });
    await registro.update(obtenerCampos(req.body));
    res.json(registro);
  } catch (error) {
    next(error);
  }
});

router.delete('/id/:id', async function (req, res, next) {
  const id = validarId(req.params.id);
  if (!id) return res.status(400).json({ message: 'ID inválido' });

  try {
    const eliminados = await Inventario.destroy({ where: { id } });
    if (!eliminados) return res.status(404).json({ message: 'Registro de inventario no encontrado' });
    res.status(200).json({ message: 'Registro de inventario eliminado' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

