const { Router } = require('express');
const router = Router();

const { Inventariomov } = require('../db');

const campos = [
	'fecha',
	'codigo',
	'ubicacion',
	'cod_or',
	'entrada',
	'salida',
	'entregado',
	'observaciones',
	'serie',
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
		const registros = await Inventariomov.findAll({ order: [['fecha', 'DESC'], ['id', 'DESC']] });
		res.json(registros);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async function (req, res, next) {
	const id = validarId(req.params.id);

	try {
		if (id) {
			const registro = await Inventariomov.findByPk(id);
			if (!registro) return res.status(404).json({ message: 'Movimiento de inventario no encontrado' });
			return res.json(registro);
		}

		const registros = await Inventariomov.findAll({
			where: { codigo: req.params.id },
			order: [['fecha', 'DESC'], ['id', 'DESC']],
		});
		if (!registros.length) return res.status(404).json({ message: 'Movimientos de inventario no encontrados' });
		res.json(registros);
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
		const registro = await Inventariomov.create(obtenerCampos(req.body));
		res.status(201).json(registro);
	} catch (error) {
		next(error);
	}
});

router.put('/id/:id', async function (req, res, next) {
	const id = validarId(req.params.id);
	if (!id) return res.status(400).json({ message: 'ID inválido' });

	try {
		const registro = await Inventariomov.findByPk(id);
		if (!registro) return res.status(404).json({ message: 'Movimiento de inventario no encontrado' });
		await registro.update(obtenerCampos(req.body || {}));
		res.json(registro);
	} catch (error) {
		next(error);
	}
});

router.delete('/id/:id', async function (req, res, next) {
	const id = validarId(req.params.id);
	if (!id) return res.status(400).json({ message: 'ID inválido' });

	try {
		const eliminados = await Inventariomov.destroy({ where: { id } });
		if (!eliminados) return res.status(404).json({ message: 'Movimiento de inventario no encontrado' });
		res.status(200).json({ message: 'Movimiento de inventario eliminado' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;

