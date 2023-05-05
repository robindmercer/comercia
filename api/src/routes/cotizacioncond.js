//****************/
// Cotizacion 
//****************/
const { Router, response } = require('express');
//const { Cotizacioncond } = require('../db')
const router = Router();

require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE,DB_PORT } = process.env;

const seq = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

router.get('/', async function (req, res, next) {
  try {
      sql="select *"
      sql = sql + " from cotizacioncond"
      const records = await seq.query(sql,
        {
          logging: console.log,
          type: QueryTypes.SELECT
        });      
      res.send(records)    
  } catch (error) {
    console.log(error)
  }

})

router.get('/cot', async function (req, res, next) {
  console.log('api/cotizacioncond: ', req.query);
  const {cot_id} = req.query;
  if(cot_id) {
      try {
      sql='select *'
      sql = sql + ' from cotizacioncond'
      sql = sql + '  where cot_id =  ' + cot_id
  
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
  }
}) 


router.put('/stat', async function (req, res, next) {
  const {id,sts} = req.query;
  if(id) {
      try {
      sql=`update cotizacion set cod_status = ${sts} where id =  ${id}`
 
      const records = await seq.query(sql,
        {
          logging: console.log,
          type: QueryTypes.UPDATE
        });
        //console.log('records: ', records);
      res.send(records)
    } catch (error) {
      console.log(error)
    }
  }
}) 


router.post('/', async function (req, res, next) {
  try {
    const { cli_id, cot_id, subtotal, iva, total,cod_status,observ,fecha } = req.body;
    console.log('Post Cotizacion: ', req.body);
  
   if (!cli_id || !subtotal || !iva || !total || !cod_status  ) {
    console.log('cod_status: ', cod_status);
    console.log('total: ', total);
    console.log('descuento: ', descuento);
    console.log('iva: ', iva);
    console.log('subtotal: ', subtotal);
    console.log('cli_id: ', cli_id);
     return res.send("Falta información para poder darte de alta el Documento")
    }    
    if (cot_id !== 0){
      return res.send("Error en la información recibida")
    } else {
      sql=`insert into cotizacion (cli_id,dir_id,subtotal,iva,total,cod_status,observ,fecha) `
      sql= sql + `values (${cli_id},${dir_id},${subtotal},${iva},${total},${cod_status},'${observ}','${fecha}') RETURNING id`
    }
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.INSERT }
        ).then(function (facIdCreated){
          console.log('facIdCreated: ', facIdCreated);
          res.send(facIdCreated)
        });
    res.send(records)
  } catch (error) {
    console.log("Error:",error)
  }
})

router.put('/', async function (req, res, next) {
  try {
    const {   id, subtotal, iva, total,observ } = req.body;

    console.log('Put Cotizacion: ', req.body);
  
   if (!subtotal || !iva || !total  ) {
    console.log('total: ', total); 
    console.log('iva: ', iva);
    console.log('subtotal: ', subtotal);
     return res.send("Aviso: Falta información para poder MODIFICAR de alta el Documento")
    }    
    if (id != 0){
      sqlDel=`delete from cotizaciondet where cot_id = ${id}`
      sql=`update cotizacion set `
      // sql= sql + ` cli_id='${cli_id}',`
      // sql= sql + ` dir_id='${dir_id}',`
      sql= sql + ` subtotal='${subtotal}',`
      sql= sql + ` iva='${iva}',`
      sql= sql + ` total=${total},`
      sql= sql + ` cod_status=1,` 
      sql= sql + ` observ='${observ}'`
      sql= sql + ` where id = ${id}`
    } else {
      return res.send("Falta información numero de Cotizacion poder darte de alta el Documento")
    }
      const records = await seq.query(sqlDel,
        {
          logging: console.log,
          type: QueryTypes.DELETE
        });
        const records2 = await seq.query(sql,
          {
            logging: console.log,
            type: QueryTypes.UPDATE
          });        
        res.send("OK")
      } catch (error) {
    console.log("Error put Cotizacion:",error)
  }
})


module.exports = router;