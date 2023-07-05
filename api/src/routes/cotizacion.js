//****************/
// Cotizacion 
//****************/
const { Router, response } = require('express');
//const { Cotizacion } = require('../db')
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
      sql="select f.id,to_char(f.fecha,'dd/mm/yyyy') as fecha,f.subtotal,f.iva,f.total,f.cli_id,t.description as stsdes,"
      sql = sql + " f.cod_status,f.observ, f.moneda,f.idioma,f.nombre,"
      sql = sql + " f.telefono,f.direccion,f.email,f.vendedor,"
      sql = sql + " coalesce(fc.descuento,0)  fde,coalesce(fc.enganche,0) fen,coalesce(fc.meses,0) fme,coalesce(fc.interes,0) finter,"
      sql = sql + " coalesce(con.descuento,0) de, coalesce(con.enganche,0) en,coalesce(con.meses,0) me,coalesce(con.interes,0) inter,"
      sql = sql + " coalesce(l.cod_status,0) logsts "
      sql = sql + " from cotizacion f" 
      sql = sql + " join tabla                t  on t.id = 6 and t.cod= f.cod_status" 
      sql = sql + " left join cotizacioncond  fc on fc.cot_id = f.id" 
      sql = sql + " left join condiciones    con on con.id = fc.cond_id"       
      sql = sql + " left join logs             l on l.doc_id = f.id and l.tipo_id = 'COT'"   
      sql = sql + "                             and l.id in ("
      sql = sql + "                               select  max(id) "
      sql = sql + "                                 from logs "
      sql = sql + "                                where doc_id = f.id and l.tipo_id = 'COT')" 
      sql = sql + " order by f.id"
      const records = await seq.query(sql,
        {
          // logging: console.log,
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
      sql="select f.id,to_char(f.fecha,'dd/mm/yyyy') as fecha,f.subtotal,f.iva,f.total,f.dhl,f.cli_id,"
      sql = sql + " f.cli_id,t.description as Status,f.observ, f.moneda,f.idioma,f.nombre,"
      sql = sql + " f.telefono,f.direccion,f.email,f.vendedor"
      sql = sql + " from cotizacion f"
      sql = sql + " join tabla   t            on t.id = 6 and t.cod= f.cod_status" 
      sql = sql + "  where f.id =  " + id
  
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
        sql="select fd.cot_id,fd.prod_id,fd.cantidad,pr.name,to_char(f.fecha,'dd/mm/yyyy') as fecha, "
        sql = sql + " mp.name Id, "
        sql = sql + " mp.description,fd.cantidad*pm.cantidad total_Mp, " 
        sql = sql + " f.telefono,f.direccion,f.email,f.vendedor"
        sql = sql + " from cotizacion f "
        sql = sql + " join cotizaciondet fd on fd.cot_id = f.id "
        sql = sql + " join productos pr on pr.id = fd.prod_id "
        sql = sql + " join prodmp    pm on pm.prod_id  = fd.prod_id " 
        sql = sql + " join materiaprima mp on mp.name = pm.mp_name "
        sql = sql + " where fd.cot_id = " + id
  
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
    const { cli_id, dir_id, cot_id, subtotal, iva,total,cod_status,observ,fecha,dhl,idioma,moneda,nombre,telefono,direccion,email,vendedor } = req.body;
    console.log('Post Cotizacion: ', req.body);
  
   if (!subtotal || !total || !cod_status  ) {
    // console.log('cod_status: ', cod_status);
    // console.log('total: ', total);
    // console.log('iva: ', iva);
    // console.log('subtotal: ', subtotal);
    // console.log('dir_id: ', dir_id);
    // console.log('cli_id: ', cli_id);
     return res.status(400).json({message:"Falta información para poder darte de alta el Documento"})
    }    
    if (cot_id !== 0){
      res.status(400).json({message:"Error en la información recibida"})
    } else {
      sql=`insert into cotizacion (cli_id,dhl,subtotal,iva,total,cod_status,observ,fecha,idioma,moneda,nombre,telefono,direccion,email,vendedor ) `
      sql= sql + `values (${0},${dhl},${subtotal},${iva},${total},${cod_status},'${observ}','${fecha}','${idioma}','${moneda}','${nombre}',`
      sql= sql + `'${telefono}','${direccion}','${email}','${vendedor}' ) RETURNING id`
    }
    const records = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.INSERT }
        ).then( function (cotIdCreated){
          console.log('Cot Created: ', cotIdCreated);
          res.send(cotIdCreated)
        });
    res.send(records)
  } catch (error) {
    console.log("Error:",error)
  }
})

router.put('/', async function (req, res, next) {
  try {
    const { id,dhl,nombre, subtotal, iva,total,observ,moneda,telefono,direccion,email,vendedor } = req.body;

    console.log('Update Cotizacion con delete del cotizaciondet: ', req.body);
  
   if (!subtotal || !total  ) {
    console.log('total: ', total); 
    console.log('iva: ', iva);
    console.log('subtotal: ', subtotal);
     return res.send("Aviso: Falta información para poder MODIFICAR de alta el Documento")
    }    
    if (id !== 0){
      sqlDel=`delete from cotizaciondet where cot_id = ${id}`
      sqlfac=`update cotizacion set `
      // sql= sql + ` cli_id='${cli_id}',`
      // sql= sql + ` dir_id='${dir_id}',`
      sqlfac= sqlfac + ` dhl='${dhl}',`
      sqlfac= sqlfac + ` nombre='${nombre}',`
      sqlfac= sqlfac + ` subtotal='${subtotal}',`
      sqlfac= sqlfac + ` iva='${iva}',`
      sqlfac= sqlfac + ` total=${total},`
      sqlfac= sqlfac + ` moneda=${moneda},`
      sqlfac= sqlfac + ` cod_status=1,` 
      sqlfac= sqlfac + ` observ='${observ}',`
      sqlfac= sqlfac + ` telefono='${telefono}',`
      sqlfac= sqlfac + ` direccion='${direccion}',`
      sqlfac= sqlfac + ` email='${email}',`
      sqlfac= sqlfac + ` vendedor='${vendedor}'`
      sqlfac= sqlfac + ` where id = ${id}`
    } else {
      return res.status(400).json("Falta información numero de Cotizacion poder darte de alta el Documento")
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
        res.status(200).json({message:'OK'});
      } catch (error) {
        res.status(400).json({message:'Error put Cotizacion' + error});
  }
})


module.exports = router;