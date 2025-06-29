//****************/
// Cotizacion 
//****************/
const { Router, response } = require('express');
const cookieParser = require('cookie-parser');
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

router.get('/all-data', async function (req, res, next) {
  try {
    const cotizaciones = await seq.query('SELECT * FROM cotizacion where id=28', { type: QueryTypes.SELECT });
    const cotizaciondets = await seq.query('SELECT * FROM cotizaciondet where cot_id=28', { type: QueryTypes.SELECT });
    const cotizacionconds = await seq.query('SELECT * FROM cotizacioncond where cot_id=28', { type: QueryTypes.SELECT });

    res.send({
      cotizaciones,
      cotizaciondets,
      cotizacionconds
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching cotizacion data', error });
  }
});




router.get('/all', async function (req, res, next) {
  try {
    console.log('cookieParser: ', cookieParser);
    sql="select * "
    sql += ", now() as Hoy"
    sql += " from cotizacion "  
    sql += " join usuarios on usr_id = '" + id_usuario + "'"
    sql += " where (u.cia_id = 1  or u.cia_id =cotizacion.cia_id)"
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

  
router.get('/cabecera/:registro', async function (req, res, next) {
  console.log('cab: ', req.query);
  const {registro} = req.params;
  if(registro) {
      try {
      sql="select f.id,to_char(f.fecha,'dd/mm/yyyy') as fecha,f.subtotal,f.iva,f.total,f.dhl,f.cli_id,"
      sql += " f.cli_id,t.description as Status,f.observ, f.moneda,f.idioma,f.nombre,"
      sql += " f.telefono,f.direccion,f.email,f.vendedor,f.vencimiento,u.cia_id as userCiaId,f.cia_id"
      sql += " from cotizacion f"
      sql += " join tabla   t            on t.id = 6 and t.cod= f.cod_status" 
      sql += " join usuarios u on usr_id = 'RM'"
      sql += " where (u.cia_id = 1  or u.cia_id = f.cia_id)"
      sql += "  and f.id =  " + registro
      console.log('sql: ', sql);
  
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


router.get('/:iduser', async function (req, res, next) {
    const { iduser } = req.params;
    console.log('iduser: ', iduser);
        try {
      sql="select f.id,to_char(f.fecha,'dd/mm/yyyy') as fecha,f.subtotal,f.iva,f.total,f.cli_id,t.description as stsdes,"
      sql += " f.cod_status,f.observ, f.moneda,f.idioma,f.nombre,"
      sql += " f.telefono,f.direccion,f.email,f.vendedor,f.vencimiento,"
      sql += " coalesce(fc.descuento,0)  fde,coalesce(fc.enganche,0) fen,coalesce(fc.meses,0) fme,coalesce(fc.interes,0) finter,"
      sql += " coalesce(con.descuento,0) de, coalesce(con.enganche,0) en,coalesce(con.meses,0) me,coalesce(con.interes,0) inter,"
      sql += " coalesce(l.cod_status,0) logsts,u.cia_id as userCiaId,f.cia_id, now() as Hoy,co.razsoc"
      sql += " from cotizacion f" 
      sql += " join tabla                t  on t.id = 6 and t.cod= f.cod_status" 
      sql += " left join cotizacioncond  fc on fc.cot_id = f.id" 
      sql += " left join condiciones    con on con.id = fc.cond_id"       
      sql += " left join logs             l on l.doc_id = f.id and l.tipo_id = 'COT'"   
      sql += "                             and l.id in ("
      sql += "                               select  max(id) "
      sql += "                                 from logs "
      sql += "                                where doc_id = f.id and l.tipo_id = 'COT')" 
      sql += " join usuarios u on u.usr_id = '" + iduser + "'"
      sql += " join compania co on co.id = f.cia_id"
      sql += " where (u.cia_id = 1  or u.cia_id =f.cia_id)"
      sql += " order by f.id desc"
      
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


// Listado de materias primas a solicitar 
router.get('/mail', async function (req, res, next) {
  const {id} = req.query;
  if(id) {
      try {
        sql="select fd.cot_id,fd.prod_id,fd.cantidad,pr.name,to_char(f.fecha,'dd/mm/yyyy') as fecha, "
        sql += " mp.name Id, "
        sql += " mp.description,fd.cantidad*pm.cantidad total_Mp, " 
        sql += " f.telefono,f.direccion,f.email,f.vendedor,f.vencimiento,u.cia_id as userCiaId,f.cia_id"
        sql += " from cotizacion f "
        sql += " join cotizaciondet fd on fd.cot_id = f.id "
        sql += " join productos pr on pr.id = fd.prod_id "
        sql += " join prodmp    pm on pm.prod_id  = fd.prod_id " 
        sql += " join materiaprima mp on mp.name = pm.mp_name "
        sql += " join usuarios on usr_id = '" + id_usuario + "'"
        sql += " where (u.cia_id = 1  or u.cia_id =f.cia_id)"
        sql += " and fd.cot_id = " + id
        sql += " order by pr.orden"   
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
  }
}) 


router.put('/stat', async function (req, res, next) {
  console.log('put stat: ', req.query);
  const {id,sts} = req.query;
  if(id) {
      try {
      sql=`update cotizacion set cod_status = ${sts} where id =  ${id}`
 
      const records = await seq.query(sql,
        {
          //logging: console.log,
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
    const { cli_id, dir_id, cot_id, subtotal, iva,total,cod_status,observ,fecha,dhl,idioma,moneda,nombre,telefono,direccion,email,vendedor,vencimiento,cia_id } = req.body;
    console.log('Post Cotizacion: ', req.body);   
//    console.log('vencimiento: ', vencimiento.replace('-',''));
    if (!cod_status  ) {
      // console.log('cod_status: ', cod_status);
      // console.log('total: ', total);
      // console.log('iva: ', iva);
      // console.log('subtotal: ', subtotal);
      // console.log('dir_id: ', dir_id);
      // console.log('cli_id: ', cli_id);
      return res.status(400).json({message:"Falta información para poder darte de alta el Documento"})
    }  
    var xIva = iva
    var xTot = total
    if (subtotal === 0 )  {
        xIva=0
        xTot=0
    }

    if (cot_id !== 0){
      res.status(400).json({message:"Error en la información recibida"})
    } else {
      sql=`insert into cotizacion (cli_id,dhl,subtotal,iva,total,cod_status,observ,fecha,idioma,moneda,nombre,telefono,direccion,email,vendedor,vencimiento,cia_id ) `
      sql= sql + `values (${0},${dhl},${subtotal},${xIva},${xTot},${cod_status},'${observ}','${fecha}','${idioma}','${moneda}','${nombre}',`
      sql= sql + `'${telefono}','${direccion}','${email}','${vendedor}','${vencimiento}',${cia_id} ) RETURNING id`
    }
    const records = await seq.query(sql,
      {
        //logging: console.log,
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
    const { id,dhl,nombre, subtotal, iva,total,observ,moneda,telefono,direccion,email,vendedor,vencimiento } = req.body;

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
      sqlfac= sqlfac + ` vendedor='${vendedor}',`
      sqlfac= sqlfac + ` vencimiento='${vencimiento}'`
      sqlfac= sqlfac + ` where id = ${id}`
    } else {
      return res.status(400).json("Falta información numero de Cotizacion poder darte de alta el Documento")
    }
      const records = await seq.query(sqlDel,
        {
          //logging: console.log,
          type: QueryTypes.DELETE
        })
        
        const records2 = await seq.query(sqlfac,
          {
            //logging: console.log,
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