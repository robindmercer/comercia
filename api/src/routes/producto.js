//****************/
// Productos
//****************/
const { Router } = require('express');
const { Producto,Status } = require('../db')
const { Sequelize, Op } = require('sequelize');
const router = Router();

// Getting all Productos from DB
// Search by ID
// Search by Name 
router.get('/', function (req, res, next) {
  try {
    const { name } = req.query;
    const condition = {};
    const where = {};
    if (name) {
      Producto.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
          cod_status : 1,
        },
        include: [
          {model: Status},
        ],
      })
      .then((resp) => {
        resp.length
        ? res.send(resp)
        : res.send({ message: 'No pude acceder a productos' })
      })
    } else {
      Producto.findAll(
        { include: [
          {model: Status},
        ],
        order: ["id"],
      },
      )
        .then((resp) => {
          resp.length
          ? res.send(resp)
          : res.send({ message: 'No pude acceder a productos' })
        })

      }
    } catch (error) {
      console.log('Error', error)
    }
  })
  
  
  
  router.get('/detail/:id', function (req, res, next) {
    try {
      const { id } = req.params;
      console.log('Hola');
      Producto.findAll({
        where: {
          id: req.params.id
        },
      })
        .then((resp) => {
          resp.length
            ? res.send(resp)
            : res.send({ message: 'No pude acceder a productos' })
        })
  } catch (error) {
    console.log('Error', error)
  }
})

router.put('/', async function (req, res, next) {
  console.log(' req.body: ',  req.body);
  const { name, description, price, cod_status } = req.body;
  if (!name || !description || !price || !cod_status) {
    return res.send("Falta información para poder darte de alta el Productoo")
  }
  try {
    const newProducto = await Producto.create({
      name,
      description,
      price,
      cod_status:1
    })
    res.status(200).send(`Producto Created : ${newProducto.id}`);
  } catch (error) {
    console.log('Error', req.body)
    next(error)
  }
})


router.post("/", async function (req, res, next) {
  const { id,name, description, price, cod_status } = req.body;
  if (!name || !description || !price || !cod_status) {
    return res.send("Falta información para poder darte de alta el Productoo")
  }

  const producto = await Producto.findOne({
    where: { id: id },
  });
  console.log('producto: ', producto);

  if (!producto) {
    try {
      const newProducto = await Producto.create({
        name,
        description,
        price,
        cod_status:1
      });
      res.status(200).send("Producto Creado");
    } catch (error) {
      res.status(200).send("Producto ya creado");
      //      next(error)
    }
  }
   else {
    producto.name = name;
    producto.description = description;
    producto.cod_status = cod_status;
    producto.price = price;
    if (producto.id) await producto.save();
      res.json(producto);
  }
});

router.put('/del/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const newProducto = await Producto.findOne({
      where: { id }
    });
    newProducto.status = 2 
    if (id) await newProducto.save();
    res.json(newProducto);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let eliminados = await Producto.destroy({
      where: { id }
    })
    res.send(`Deleted  ${eliminados} registro`);
  } catch (error) {
    console.log('error: ', error);
    res.send(error);
  }
})

module.exports = router