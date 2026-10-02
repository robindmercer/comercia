const { Router } = require('express');
const router = Router();

const { Inventariomov, Inventario, conn } = require('../db');

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

function validarCantidades(movimiento) {
	return ['entrada', 'salida'].filter((campo) => {
		const cantidad = Number(movimiento[campo]);
		return !Number.isFinite(cantidad) || cantidad < 0;
	});
}

function obtenerImpacto(movimiento) {
	return Number(movimiento.entrada) - Number(movimiento.salida);
}

async function actualizarInventarios(ajustes, transaction) {
	const inventarios = new Map();
	for (const codigo of Object.keys(ajustes).sort()) {
		const inventario = await Inventario.findOne({
			where: { codigo },
			transaction,
			lock: transaction.LOCK.UPDATE,
		});
		if (!inventario) {
			return { status: 404, message: `Artículo de inventario no encontrado: ${codigo}` };
		}
		inventarios.set(codigo, inventario);
	}

	const actualizaciones = [];
	for (const [codigo, inventario] of inventarios) {
		const cantidad = Number(inventario.inventario) + ajustes[codigo];
		const costoUnitario = Number(inventario.costo_unitario);
		if (cantidad < 0) {
			return { status: 400, message: `La salida excede el inventario disponible para ${codigo}` };
		}
		if (!Number.isFinite(costoUnitario)) {
			return { status: 400, message: `Costo unitario inválido para ${codigo}` };
		}
		actualizaciones.push({ inventario, cantidad, costoUnitario });
	}

	for (const { inventario, cantidad, costoUnitario } of actualizaciones) {
		await inventario.update({
			inventario: cantidad,
			valor_almacen: cantidad * costoUnitario,
		}, { transaction });
	}
	return null;
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
	const cantidadesInvalidas = validarCantidades(req.body);
	if (cantidadesInvalidas.length) {
		return res.status(400).json({ message: 'Entrada o salida inválida', campos: cantidadesInvalidas });
	}

	try {
		const resultado = await conn.transaction(async (transaction) => {
			const error = await actualizarInventarios({
				[req.body.codigo]: obtenerImpacto(req.body),
			}, transaction);
			if (error) return { error };
			const registro = await Inventariomov.create(obtenerCampos(req.body), { transaction });
			return { registro };
		});
		if (resultado.error) return res.status(resultado.error.status).json({ message: resultado.error.message });
		res.status(201).json(resultado.registro);
	} catch (error) {
		next(error);
	}
});

router.put('/id/:id', async function (req, res, next) {
	const id = validarId(req.params.id);
	if (!id) return res.status(400).json({ message: 'ID inválido' });

	try {
		const resultado = await conn.transaction(async (transaction) => {
			const registro = await Inventariomov.findByPk(id, {
				transaction,
				lock: transaction.LOCK.UPDATE,
			});
			if (!registro) {
				return { error: { status: 404, message: 'Movimiento de inventario no encontrado' } };
			}

			const camposActualizados = Object.fromEntries(
				Object.entries(obtenerCampos(req.body || {})).filter(([, valor]) => valor !== undefined)
			);
			const movimientoNuevo = { ...registro.get({ plain: true }), ...camposActualizados };
			const cantidadesInvalidas = validarCantidades(movimientoNuevo);
			if (cantidadesInvalidas.length) {
				return {
					error: {
						status: 400,
						message: 'Entrada o salida inválida',
						campos: cantidadesInvalidas,
					},
				};
			}

			const ajustes = {};
			ajustes[registro.codigo] = -obtenerImpacto(registro);
			ajustes[movimientoNuevo.codigo] = (ajustes[movimientoNuevo.codigo] || 0) + obtenerImpacto(movimientoNuevo);
			const error = await actualizarInventarios(ajustes, transaction);
			if (error) return { error };

			await registro.update(camposActualizados, { transaction });
			return { registro };
		});
		if (resultado.error) return res.status(resultado.error.status).json({
			message: resultado.error.message,
			...(resultado.error.campos ? { campos: resultado.error.campos } : {}),
		});
		res.json(resultado.registro);
	} catch (error) {
		next(error);
	}
});

router.delete('/id/:id', async function (req, res, next) {
	const id = validarId(req.params.id);
	if (!id) return res.status(400).json({ message: 'ID inválido' });

	try {
		const resultado = await conn.transaction(async (transaction) => {
			const registro = await Inventariomov.findByPk(id, {
				transaction,
				lock: transaction.LOCK.UPDATE,
			});
			if (!registro) {
				return { error: { status: 404, message: 'Movimiento de inventario no encontrado' } };
			}

			const error = await actualizarInventarios({
				[registro.codigo]: -obtenerImpacto(registro),
			}, transaction);
			if (error) return { error };

			await registro.destroy({ transaction });
			return {};
		});
		if (resultado.error) return res.status(resultado.error.status).json({ message: resultado.error.message });
		res.status(200).json({ message: 'Movimiento de inventario eliminado' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;

