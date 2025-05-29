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
        //logging: console.log,
        type: QueryTypes.SELECT
      });
      //console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log(error)
  }
})

router.get('/cliDir/:iduser', async function (req, res, next) {
  const { iduser } = req.params;
  //console.log("cliente generico")
  try {
    sql='select clientes.id,clientes.razsoc,clientes.nombre,clientes.apellido, '
    sql +=  ' d.calle cc,d.localidad dd,d.cp ccpp,d.ciudad cui,d.pais pp,'
    sql +=  ' t3.description as DirDes, d.id dirId,u.cia_id as userCiaId '
    sql +=  ' from clientes'
    sql +=  ' join direccion d on d.cli_id = clientes.id'
    sql +=  '                and d.cod_status = 1'
    sql +=  ' join tabla t3 on t3.id = 5 and t3.cod = d.cod_tipo '
    sql +=  " join usuarios u on u.usr_id = '" + iduser + "'"
    sql +=  ' where clientes.cod_status = 1'
    sql +=  ' and (u.cia_id = 1  or u.cia_id =clientes.cia_id) '
    sql +=  ' order by clientes.razsoc'
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
     sql +=  '  t1.description as IdiomaDes,'
     sql +=  '  t2.description as MonedaDes,'
     sql +=  ' facturas.id as fac_id, facturas.total'
     sql +=  ` ,(select count(*) as cantidad from ticket tk where tk.fac_id = facturas.id and cierre <='19010101' and cod_status = ${perfil}) cantidad`
     sql +=  '    from clientes'
     sql +=  '    join facturas on cli_id = clientes.id '
     sql +=  '                 and facturas.cod_status >= 6'
     sql +=  '    join tabla on tabla.id = 3 and tabla.cod = cod_cliente'
     sql +=  '    join status on status.id_status = clientes.cod_status'
     sql +=  '    join tabla t1 on t1.id = 7 and t1.cod = clientes.idioma'
     sql +=  '    join tabla t2 on t2.id = 8 and t2.cod = clientes.moneda'
     sql +=  '    where clientes.cod_status > 0'
     sql +=  '    order by nombre;'
     const records = await seq.query(sql,
       {
         //logging: console.log,
         type: QueryTypes.SELECT
       });
       //console.log('records: ', records);
     res.send(records)
     } catch (error) {
     console.log(error)
     }
 })
 


router.get('/id/:id', async function (req, res, next) {
  console.log("cliente con :id")
  try {
    const { id } = req.params;
    
    sql='select clientes.*,tabla.description as Actividad,status.description as StsDesc '
    sql +=  ' from clientes'
    sql +=  ' join tabla on tabla.id = 3 and tabla.cod = cod_cliente'
    sql +=  ' join status on status.id_status = clientes.cod_status'
    sql +=  ' where clientes.id = '+   id

    const records = await seq.query(sql,
      {
        //logging: console.log,
        type: QueryTypes.SELECT
      });
      //console.log('records: ', records);
      res.send(records)
  } catch (error) {
    console.log(error)
  }
})


router.get('/:iduser', async function (req, res, next) {
  //console.log("cliente generico")
  const { iduser } = req.params;
  try {
    const {busco} = req.body;
    const {nombre} = req.query;
    var xand=" where "
    sql='select clientes.*,tabla.description as Actividad,status.description as StsDesc, '
    sql +=  '(select count(*) from direccion where cli_id = clientes.id) as CantDir,'
    sql +=  ' t1.description as IdiomaDes,'
    sql +=  ' t2.description as MonedaDes,u.cia_id as userCiaId '
    sql +=  ' from clientes'
    sql +=  ' join tabla on tabla.id = 3 and tabla.cod = cod_cliente'
    sql +=  ' join status on status.id_status = clientes.cod_status'
    sql +=  ' join tabla t1 on t1.id = 7 and t1.cod = idioma'
    sql +=  ' join tabla t2 on t2.id = 8 and t2.cod = moneda'
    sql += " join usuarios u on u.usr_id = '" + iduser + "'"
    sql += " where (u.cia_id = 1  or u.cia_id =clientes.cia_id)"

    if(busco) {
      sql +=  ' and clientes.id = '+   busco 
    }
    if(nombre) {
      sql +=  ` and upper(clientes.nombre) like upper('%${nombre}%')`
    }
    sql +=  ' and clientes.cod_status > 0 order by clientes.cia_id,nombre'
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
    const {id,razsoc,nombre,apellido,email,movil,fijo,rfc_cod,idioma,moneda,cod_cliente,cod_status,cia_id} = req.body
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
      sql= sql + ` cia_id=${cia_id}`
      sql= sql + ` where id = ${id}`
    } else {
      sql=`insert into clientes (razsoc,nombre,apellido,email,movil,fijo,rfc_cod,idioma,moneda,cod_cliente,cod_status,cia_id) `
      sql= sql + `values ('${razsoc}','${nombre}','${apellido}','${email}','${movil}','${fijo}','${rfc_cod}','${idioma}','${moneda}',${cod_cliente},${cod_status},${cia_id})`
    }
    const records = await seq.query(sql,
      {
        //logging: console.log,
        type: QueryTypes.INSERT
      });
      //console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log("Error:",error)
  }

})


module.exports = router;