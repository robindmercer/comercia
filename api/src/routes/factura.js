//****************/
// Factura 
//****************/
const { Router, response } = require('express');
//const { Factura } = require('../db')
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
      sql="select f.id,to_char(f.fecha,'dd/mm/yyyy') as fecha,f.subtotal,f.iva,f.total,t.description as stsdes,"
      sql = sql + " c.nombre,f. cod_status,f. observ, "
      sql = sql + " coalesce(fc.descuento,0)  fde,coalesce(fc.enganche,0) fen,coalesce(fc.meses,0) fme,coalesce(fc.interes,0) finter,"
      sql = sql + " coalesce(con.descuento,0) de, coalesce(con.enganche,0) en,coalesce(con.meses,0) me,coalesce(con.interes,0) inter"
      sql = sql + " from facturas f" 
      sql = sql + " join clientes c           on c.id = f.cli_id" 
      sql = sql + " join tabla   t            on t.id = 6 and t.cod= f.cod_status" 
      sql = sql + " left join factcond fc     on fc.fac_id = f.id" 
      sql = sql + " left join condiciones con on con.id = fc.cond_id"       
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

router.get('/cab', async function (req, res, next) {
  const {id} = req.query;
  if(id) {
      try {
      sql='select facturas.id,facturas.subtotal,facturas.iva,facturas.total,'
      sql = sql + ' direccion.calle,direccion.localidad,direccion.cp,direccion.ciudad,direccion.pais, '
      sql = sql + ' clientes.nombre,facturas.cli_id,s.description as Status,facturas.observ  '
      sql = sql + ' from facturas'
      sql = sql + ' join clientes  on clientes.id = facturas.cli_id '
      sql = sql + ' join direccion on direccion.orden = facturas.dir_id '
      sql = sql + '               and direccion.cli_id  = facturas.cli_id '
      sql = sql + ' join status s  on s.id_status  = facturas.cod_status '
      sql = sql + '  where facturas.id =  ' + id
  
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
// Listado de materias primas a solicitar 
router.get('/mail', async function (req, res, next) {
  const {id} = req.query;
  if(id) {
      try {
        sql='select fd.fac_id,fd.prod_id,fd.cantidad,pr.name, '
        sql = sql + ' mp.name Id, '
        sql = sql + ' mp.description,fd.cantidad*pm.cantidad total_Mp ' 
        sql = sql + ' from facturas f '
        sql = sql + ' join factdet fd on fd.fac_id = f.id '
        sql = sql + ' join productos pr on pr.id = fd.prod_id '
        sql = sql + ' join prodmp    pm on pm.prod_id  = fd.prod_id ' 
        sql = sql + ' join materiaprima mp on mp.name = pm.mp_name '
        sql = sql + ' where fd.fac_id = ' + id
  
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
      sql=`update facturas set cod_status = ${sts} where id =  ${id}`
 
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
    const { cli_id, dir_id, fac_id, subtotal, iva,total,cod_status,observ,fecha } = req.body;
    console.log('Post Facturassss: ', req.body);
  
   if (!cli_id || !dir_id || !subtotal || !iva || !total || !cod_status  ) {
    console.log('cod_status: ', cod_status);
    console.log('total: ', total);
    console.log('iva: ', iva);
    console.log('subtotal: ', subtotal);
    console.log('dir_id: ', dir_id);
    console.log('cli_id: ', cli_id);
     return res.send("Falta información para poder darte de alta el Documento")
    }    
    if (fac_id !== 0){
      return res.send("Error en la información recibida")
    } else {
      sql=`insert into facturas (cli_id,dir_id,subtotal,iva,total,cod_status,observ,fecha) `
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
      console.log('records: ', records);
    res.send(records)
  } catch (error) {
    console.log("Error:",error)
  }
})

router.put('/', async function (req, res, next) {
  try {
    const { id, subtotal, iva,total,observ } = req.body;

    console.log('Puta Factura: ', req.body);
  
   if (!subtotal || !iva || !total  ) {
    console.log('total: ', total); 
    console.log('iva: ', iva);
    console.log('subtotal: ', subtotal);
     return res.send("Aviso: Falta información para poder MODIFICAR de alta el Documento")
    }    
    if (id !== 0){
      sqlDel=`delete from factdet where fac_id = ${id}`
      sqlfac=`update facturas set `
      // sql= sql + ` cli_id='${cli_id}',`
      // sql= sql + ` dir_id='${dir_id}',`
      sqlfac= sqlfac + ` subtotal='${subtotal}',`
      sqlfac= sqlfac + ` iva='${iva}',`
      sqlfac= sqlfac + ` total=${total},`
      sqlfac= sqlfac + ` cod_status=1,` 
      sqlfac= sqlfac + ` observ='${observ}'`
      sqlfac= sqlfac + ` where id = ${id}`
    } else {
      return res.send("Falta información numero de factura poder darte de alta el Documento")
    }
      const records = await seq.query(sqlDel,
        {
          logging: console.log,
          type: QueryTypes.DELETE
        })
        
        
        const records2 = await seq.query(sqlfac,
          {
            logging: console.log,
            type: QueryTypes.UPDATE
          });        
        console.log('sqlDel: ', sqlDel);
        console.log('sqlfac: ', sqlfac);
        res.send("OK")
      } catch (error) {
    console.log("Error put FACTURAS:",error)
  }
})


module.exports = router;