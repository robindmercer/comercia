const { Router } = require("express");
const { Imagen } = require("../db");

const router = Router();

router.get("/", async function (req, res) {
	try {
		const records = await Imagen.findAll({
			order: [["id", "ASC"]],
		});
		res.send(records);
	} catch (error) {
		console.log("Error:", error);
		res.status(500).send("Error obteniendo imagenes");
	}
});

router.get("/:id", async function (req, res) {
	try {
		const { id } = req.params;
		const record = await Imagen.findByPk(id);

		if (!record) {
			return res.status(404).send("Imagen no encontrada");
		}

		res.send(record);
	} catch (error) {
		console.log("Error:", error);
		res.status(500).send("Error obteniendo imagen");
	}
});

router.post("/", async function (req, res) {
	try {
		const { url, name, tipo } = req.body;

		if (!url) {
			return res.status(400).send("url es requerida");
		}
		if (!name) {
			return res.status(400).send("name es requerido");
		}

		const newImagen = await Imagen.create({ url, name, tipo });
		res.status(201).send(newImagen);
	} catch (error) {
		console.log("Error:", error);
		res.status(500).send("Error creando imagen");
	}
});

router.put("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { url, name, tipo } = req.body;

    if (!url) {
      return res.status(400).send("url es requerida");
    }
    if (!name) {
      return res.status(400).send("name es requerido");
    }
    if (!tipo) {
      return res.status(400).send("tipo es requerido");
    }

    const record = await Imagen.findByPk(id);

    if (!record) {
      return res.status(404).send("Imagen no encontrada");
    }

    record.url = url;
    record.name = name;
	record.tipo = tipo;
    await record.save();
    res.send(record);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Error actualizando imagen");
  }
});

router.delete("/:id", async function (req, res) {
	try {
		const { id } = req.params;
		const eliminados = await Imagen.destroy({
			where: { id },
		});

		if (!eliminados) {
			return res.status(404).send("Imagen no encontrada");
		}

		res.send("Imagen eliminada");
	} catch (error) {
		console.log("Error:", error);
		res.status(500).send("Error eliminando imagen");
	}
});

module.exports = router;
