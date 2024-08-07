//****************/
// Cliente 
//****************/
const { Router, response } = require('express');
const router = Router();

require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const seq = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

router.get('/bckp', async function (req, res, next) {
  try {
    sql='select * from clientes'
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.SELECT
      });
      //console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log(error)
  }
})

router.get('/cliDir', async function (req, res, next) {
  //console.log("cliente generico")
  try {
    sql='select clientes.id,clientes.razsoc,clientes.nombre,clientes.apellido, '
    sql = sql + ' d.calle cc,d.localidad dd,d.cp ccpp,d.ciudad cui,d.pais pp,'
    sql = sql + ' t3.description as DirDes, d.id dirId '
    sql = sql + ' from clientes'
    sql = sql + ' join direccion d on d.cli_id = clientes.id'
    sql = sql + '                and d.cod_status = 1'
    sql = sql + ' join tabla t3 on t3.id = 5 and t3.cod = d.cod_tipo '
    sql = sql + ' where clientes.cod_status = 1'
    sql = sql + ' order by clientes.razsoc'
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.SELECT
      });
      //console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log(error)
  }
})


// Especial para atencion al cliente atc
router.get('/atc/:perfil', async function (req, res, next) {
  try {
    const { perfil } = req.params;
     sql = 'select clientes.razsoc,nombre,apellido,tabla.description as Actividad,status.description as StsDesc,'
     sql = sql + '  t1.description as IdiomaDes,'
     sql = sql + '  t2.description as MonedaDes,'
     sql = sql + ' facturas.id as fac_id, facturas.total'
     sql = sql + ` ,(select count(*) as cantidad from ticket tk where tk.fac_id = facturas.id and cierre <='19010101' and cod_status = ${perfil}) cantidad`
     sql = sql + '    from clientes'
     sql = sql + '    join facturas on cli_id = clientes.id '
     sql = sql + '                 and facturas.cod_status >= 6'
     sql = sql + '    join tabla on tabla.id = 3 and tabla.cod = cod_cliente'
     sql = sql + '    join status on status.id_status = clientes.cod_status'
     sql = sql + '    join tabla t1 on t1.id = 7 and t1.cod = clientes.idioma'
     sql = sql + '    join tabla t2 on t2.id = 8 and t2.cod = clientes.moneda'
     sql = sql + '    where clientes.cod_status > 0'
     sql = sql + '    order by nombre;'
     const records = await seq.query(sql,
       {
         logging: console.log,
         type: QueryTypes.SELECT
       });
       //console.log('records: ', records);
     res.send(records)
     } catch (error) {
     console.log(error)
     }
 })
 


router.get('/:id', async function (req, res, next) {
  console.log("cliente con :id")
  try {
    const { id } = req.params;
    
    sql='select clientes.*,tabla.description as Actividad,status.description as StsDesc '
    sql = sql + ' from clientes'
    sql = sql + ' join tabla on tabla.id = 3 and tabla.cod = cod_cliente'
    sql = sql + ' join status on status.id_status = clientes.cod_status'
    sql = sql + ' where clientes.id = '+   id

    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.SELECT
      });
      //console.log('records: ', records);
      res.send(records)
  } catch (error) {
    console.log(error)
  }
})


router.get('/', async function (req, res, next) {
  //console.log("cliente generico")
  try {
    const {busco} = req.body;
    const {nombre} = req.query;
    var xand=" where "
    sql='select clientes.*,tabla.description as Actividad,status.description as StsDesc, '
    sql = sql + '(select count(*) from direccion where cli_id = clientes.id) as CantDir,'
    sql = sql + ' t1.description as IdiomaDes,'
    sql = sql + ' t2.description as MonedaDes '
    sql = sql + ' from clientes'
    sql = sql + ' join tabla on tabla.id = 3 and tabla.cod = cod_cliente'
    sql = sql + ' join status on status.id_status = clientes.cod_status'
    sql = sql + ' join tabla t1 on t1.id = 7 and t1.cod = idioma'
    sql = sql + ' join tabla t2 on t2.id = 8 and t2.cod = moneda'
    if(busco) {
      sql = sql + ' where clientes.id = '+   busco 
      xand = ' and '
    }
    if(nombre) {
      sql = sql + ` where upper(clientes.nombre) like upper('%${nombre}%')`
      xand = ' and '
    }
    sql = sql + xand + ' clientes.cod_status > 0 order by nombre'
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.SELECT
      });
      //console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log(error)
  }
})


router.post('/', async function (req, res, next) {
  try {
    const {id,razsoc,nombre,apellido,email,movil,fijo,rfc_cod,idioma,moneda,cod_cliente,cod_status} = req.body
    console.log('req.body: ', req.body);
    if (id != 0){
      sql=`update clientes set `
      sql= sql + ` razsoc='${razsoc}',`
      sql= sql + ` nombre='${nombre}',`
      sql= sql + ` apellido='${apellido}',`
      sql= sql + ` email='${email}',`
      sql= sql + ` movil='${movil}',`
      sql= sql + ` fijo='${fijo}',`
      sql= sql + ` rfc_cod='${rfc_cod}',`
      sql= sql + ` cod_cliente=${cod_cliente},`
      sql= sql + ` cod_status=${cod_status},`
      sql= sql + ` idioma=${idioma},`
      sql= sql + ` moneda=${moneda}`
      sql= sql + ` where id = ${id}`
    } else {
      sql=`insert into clientes (razsoc,nombre,apellido,email,movil,fijo,rfc_cod,idioma,moneda,cod_cliente,cod_status) `
      sql= sql + `values ('${razsoc}','${nombre}','${apellido}','${email}','${movil}','${fijo}','${rfc_cod}','${idioma}','${moneda}',${cod_cliente},${cod_status})`
    }
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.INSERT
      });
      //console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log("Error:",error)
  }

})


module.exports = router;