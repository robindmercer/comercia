//****************/
// ticket
//****************/
const { Router, response } = require("express");
//const { Factura } = require('../db')
const router = Router();

require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const seq = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);


router.get("/", async function (req, res, next) {
  try {
    
    sql ="select  "
    sql= sql + " nombre,apellido,razsoc,"
    sql = sql + "l.id, l.tck_id,l.tck_linea,l.serie,l.description,l.detecta,l.cli_id,l.evidencia, "  
    sql = sql + "l.porque1,l.porque2,l.porque3,l.porque4,l.porque5,"
    sql = sql + "l.analisis,l.chkbox,l.responsable,l.actividad, "
    sql = sql + "l.fact, "
    sql = sql + "l.evi_act, "     
    sql = sql + "l.conclusion, " 
    sql = sql + "l.usr, "        
    sql = sql + "l.perfil, "     
    sql = sql + "l.prioridad, "  
    sql = sql + "l.cod_status, " 
    sql = sql + "to_char(l.alta,'dd/mm/yyyy') as alta, "       
    sql = sql + "to_char(l.cierre,'dd/mm/yyyy') as cierre,"          
    sql= sql + " coalesce(t.description,'')  PerfilDes,"
    sql= sql + " coalesce(t2.description,'') PrioridadDes,"
    sql= sql + " coalesce(t1.description,'') Estado,"
    sql= sql + " (select max(tck_linea) from ticket where id = l.id or tck_id = l.id) totlineas,now() as Hoy"
    sql= sql + " from ticket l"
    sql= sql + " left join perfils t on id_perfil = l.perfil"
    sql= sql + " left join clientes c on c.id = cli_id"
    sql= sql + " left join tabla t1 on t1.id = 14 and t1.cod = l.cod_status"
    sql= sql + " left join tabla t2 on t2.id = 17 and t2.cod = l.prioridad"
    sql= sql + " where tck_linea = 1"
    sql= sql + " order by l.id"
    const records = await seq.query(sql, {
      //logging: console.log,
      type: QueryTypes.SELECT,
    });
    res.send(records);
  } catch (error) {
    console.log(error);
  }
});

router.get("/rep", async function (req, res, next) {
  try {
    
    sql ="select distinct  "
    sql= sql + " nombre,apellido,razsoc,l.cli_id"
    sql= sql + " from ticket l"
    sql= sql + " left join clientes c on c.id = cli_id"
    sql= sql + " order by l.cli_id"
    const records = await seq.query(sql, {
      //logging: console.log,
      type: QueryTypes.SELECT,
    });
    res.send(records);
  } catch (error) {
    console.log(error);
  }
});

router.get("/repcli/:id", async function (req, res, next) {
  try {
    const id = req.params;
    sql = `select t.id,t.tck_linea,tck_id,`
    sql = sql  + ` to_char(t.alta,'dd/mm/yyyy') as alta,`
    sql = sql  + ` to_char(t.cierre,'dd/mm/yyyy') as cierre,t.perfil,t.cod_status,`
    sql = sql  + ` c.razsoc,c.nombre,c.apellido,c.email,c.movil,c.fijo,`
    sql = sql  + ` d.calle,d.localidad,d.cp,d.pais,`
    sql = sql  + ` coalesce(f.id,0) fac,f.cod_status,`
    sql = sql  + ` to_char(f.fecha,'dd/mm/yyyy') as fecha,f.total,`
    sql = sql  + ` t1.description facdes,t2.description tickdes,t.description,p.description pdes`
    sql = sql  + ` from `
    sql = sql  + ` ticket t`
    sql = sql  + ` join clientes c on c.id = t.cli_id`
    sql = sql  + ` join direccion d on d.cli_id = t.cli_id `
    sql = sql  + ` left join facturas f on f.cli_id = t.cli_id`
    sql = sql  + ` left join tabla t1 on t1.id =6  and t1.cod = f.cod_status`
    sql = sql  + ` join tabla t2 on t2.id =17 and t2.cod = t.cod_status`
    sql = sql  + ` join perfils p on p.id_perfil = t.perfil`
    sql = sql  + ` where t.cli_id = ${id.id } and tck_linea = 1`
    sql = sql  + ` order by tck_id,tck_linea`
    
    const records = await seq.query(sql, {
      //logging: console.log,
      type: QueryTypes.SELECT,
    });
    res.send(records);
  } catch (error) {
    console.log(error);
  }
});


router.get("/cli/:id",async function (req, res, next) {
  try {
    const id = req.params;
    console.log("Log req.params: ", req.params,id.id);
      sql ="select  "
      sql= sql + " nombre,apellido,razsoc,"
      sql = sql + "l.id, l.tck_id,l.tck_linea,l.serie,l.description,l.detecta,l.cli_id,l.evidencia, "  
      sql = sql + "l.porque1,l.porque2,l.porque3,l.porque4,l.porque5,"
      sql = sql + "l.analisis,l.chkbox,l.responsable,l.actividad, "
      sql = sql + "l.fact, "
      sql = sql + "l.evi_act, "     
      sql = sql + "l.conclusion, " 
      sql = sql + "l.usr, "        
      sql = sql + "l.perfil, "     
      sql = sql + "l.prioridad, "  
      sql = sql + "l.cod_status, " 
      sql = sql + "to_char(l.alta,'dd/mm/yyyy') as alta, "       
      sql = sql + "to_char(l.cierre,'dd/mm/yyyy') as cierre,"          
      sql= sql + " coalesce(t.description,'')  PerfilDes,"
      sql= sql + " coalesce(t2.description,'') PrioridadDes,"
      sql= sql + " coalesce(t1.description,'') Estado,now() as Hoy"
      sql= sql + " from ticket l"
      sql= sql + " left join perfils t on id_perfil = l.perfil"
      sql= sql + " left join clientes c on c.id = cli_id"
      sql= sql + " left join tabla t1 on t1.id = 14 and t1.cod = l.cod_status"
      sql= sql + " left join tabla t2 on t2.id = 17 and t2.cod = l.prioridad"
      sql = sql +" where l.cli_id =" + id.id ;
      sql = sql +" order by l.id"
      const records = await seq.query(sql, {
        //logging: console.log,
        type: QueryTypes.SELECT,
      });
      res.send(records);
    } catch (error) {
      console.log(error);
    }
  });

  // Para Editar 
  router.get("/tck/:id",async function (req, res, next) {
    try {
      const id = req.params;
      console.log("Log req.params: ", req.params,id.id);
        sql ="select  "
        sql= sql + " nombre,apellido,razsoc,"
        sql = sql + "l.id, l.tck_id,l.tck_linea,l.serie,l.description,l.detecta,l.cli_id,l.evidencia, "  
        sql = sql + "l.porque1,l.porque2,l.porque3,l.porque4,l.porque5,"
        sql = sql + "l.analisis,l.chkbox,l.responsable,l.actividad, "
        sql = sql + "l.fact, "
        sql = sql + "l.evi_act, "     
        sql = sql + "l.conclusion, " 
        sql = sql + "l.usr, "        
        sql = sql + "l.perfil, "     
        sql = sql + "l.prioridad, "  
        sql = sql + "l.cod_status, " 
        sql = sql + "to_char(l.alta,'dd/mm/yyyy') as alta, "       
        sql = sql + "to_char(l.cierre,'dd/mm/yyyy') as cierre,"          
        sql= sql + " coalesce(t.description,'')  PerfilDes,"
        sql= sql + " coalesce(t2.description,'') PrioridadDes,"
        sql= sql + " coalesce(t1.description,'') Estado,"
        sql= sql + " (select max(tck_linea)+1 from ticket where tck_id = l.tck_id) as nextLinea,now() as Hoy "
        sql= sql + " from ticket l"
        sql= sql + " left join perfils t on id_perfil = l.perfil"
        sql= sql + " left join clientes c on c.id = cli_id"
        sql= sql + " left join tabla t1 on t1.id = 14 and t1.cod = l.cod_status"
        sql= sql + " left join tabla t2 on t2.id = 17 and t2.cod = l.prioridad"
        sql = sql +" where l.id =" + id.id ;
        sql = sql +" order by l.id"
        const records = await seq.query(sql, {
          //logging: console.log,
          type: QueryTypes.SELECT,
        });
        res.send(records);
      } catch (error) {
        console.log(error);
      }
    });

    // Para mostrar en TicketDet.js
    router.get("/tckdet/:id",async function (req, res, next) {
      try {
        const id = req.params;
        console.log("tckdet: ", req.params,id.id);
          sql ="select  "
          sql= sql + " nombre,apellido,razsoc,"
          sql = sql + "l.id, l.tck_id,l.tck_linea,l.serie,l.description,l.detecta,l.cli_id,l.evidencia, "  
          sql = sql + "l.porque1,l.porque2,l.porque3,l.porque4,l.porque5,"
          sql = sql + "l.analisis,l.chkbox,l.responsable,l.actividad, "
          sql = sql + "l.fact, "
          sql = sql + "l.evi_act, "     
          sql = sql + "l.conclusion, " 
          sql = sql + "l.usr, "        
          sql = sql + "l.perfil, "     
          sql = sql + "l.prioridad, "  
          sql = sql + "l.cod_status, " 
          sql = sql + "to_char(l.alta,'dd/mm/yyyy') as alta, "       
          sql = sql + "to_char(l.cierre,'dd/mm/yyyy') as cierre,"          
          sql= sql + " coalesce(t.description,'')  PerfilDes,"
          sql= sql + " coalesce(t2.description,'') PrioridadDes,"
          sql= sql + " coalesce(t1.description,'') Estado,"
          sql= sql + " (select max(tck_linea)+1 from ticket where id = l.id or tck_id = l.id) nextLinea,now() as Hoy"
          sql= sql + " from ticket l"
          sql= sql + " left join perfils t on id_perfil = l.perfil"
          sql= sql + " left join clientes c on c.id = cli_id"
          sql= sql + " left join tabla t1 on t1.id = 14 and t1.cod = l.cod_status"
          sql= sql + " left join tabla t2 on t2.id = 17 and t2.cod = l.prioridad"
          sql = sql +" where l.id = " + id.id + " or l.tck_id = "  + id.id
          sql = sql +" order by l.tck_linea"
          const records = await seq.query(sql, {
            //logging: console.log,
            type: QueryTypes.SELECT,
          });
          res.send(records);
        } catch (error) {
          console.log(error);
        }
      });
  


router.post("/", async function (req, res, next) {
  console.log("Ticket Post : ", req.body);
  const { actividad,alta,analisis,chkbox,cierre,cli_id,cod_status,conclusion,  
    description,detecta,evi_act,evidencia,fact,perfil, 
    porque1,porque2,porque3,porque4,porque5,
    responsable,serie,tck_id,tck_linea,prioridad,usr,
  } = req.body;

  if (!tck_id || !description) {
    return res.send(`Falta información para poder darte de alta el Ticket ${tck_id}  ${description}`);
  }
  try {
    sql=`insert into ticket (`
    sql = sql + `tck_id,`
    sql = sql + `tck_linea,`
    sql = sql + `serie,description,detecta,cli_id,evidencia,  `
    sql = sql + `porque1,porque2,porque3,porque4,porque5,`
    sql = sql + `analisis,chkbox,responsable,actividad,fact,evi_act,`
    sql = sql + `conclusion,usr,perfil,prioridad,cod_status,alta,cierre`
    sql = sql + `) values `
    sql = sql + `(`
    sql = sql + `${tck_id},${tck_linea},`
    sql = sql + `'${serie}','${description}','${detecta}','${cli_id}','${evidencia}',`
    sql = sql + `'${porque1}','${porque2}','${porque3}','${porque4}','${porque5}',`
    sql = sql + `'${analisis}','${chkbox}','${responsable}','${actividad}','${fact}','${evi_act}',`
    sql = sql + `'${conclusion}','${usr}','${perfil}','${prioridad}','${cod_status}','${alta}','${cierre}')  RETURNING id`

    const records = await seq.query(sql, {
      //logging: console.log,
      type: QueryTypes.INSERT,
    })
    .then(async function (tckCreated) {
      const fac_id = tckCreated[0][0].id;
      sql2=`update ticket set tck_id = id where id = ${fac_id} and tck_linea = 1 `
      const records2 = await seq.query(sql2, {
         //logging: console.log,
         type: QueryTypes.UPDATE,
      })
      res.send(tckCreated);
   });
  } catch (error) {
    res.status(400).json(error);    
  }
});


router.delete('/:id', async function (req, res, next) {
  try {
    console.log('Delete Ticket: ', req.params);
    const { id } = req.params;
    sql=`delete from ticket where id = ${id}`    
    const [records] = await seq.query(sql,
      {
        //logging: console.log,
        type: QueryTypes.DELETE
      });
      res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(400).json({ message: error });    
  }
})

router.put('/close/:id', async function (req, res, next) {
  try {
    console.log('close req.body: ', req.query,req.params);
    const hoy = new Date()
    const { id } = req.params;
    sql=`update ticket set cierre = '${hoy.toISOString().split('T')[0]}' where id = ${id}`    
    const [records] = await seq.query(sql,
      {
        //logging: console.log,
        type: QueryTypes.UPDATE
      });
    res.send(records)
  } catch (error) {
    console.log(error)
  }

})

router.put("/", async function (req, res, next) {
  console.log("Ticket Put : ", req.body);
  const { id,actividad,alta,analisis,chkbox,cierre,cli_id,cod_status,conclusion,  
    description,detecta,evi_act,evidencia,fact,perfil, 
    porque1,porque2,porque3,porque4,porque5,
    responsable,serie,tck_id,tck_linea,prioridad,usr,
  } = req.body;  
  
  
  if (!serie || !description || !cod_status) {
    return res.send("Falta información para poder darte de alta el Log");
  }
  try {

    sql=`update ticket set `
    sql = sql + ` serie='${serie}',description ='${description}',detecta='${detecta}',`
    sql = sql + ` cli_id='${cli_id}',evidencia='${evidencia}',  `
    sql = sql + ` porque1='${porque1}',porque2='${porque2}',porque3='${porque3}',`
    sql = sql + ` porque4='${porque4}',porque5='${porque5}',`
    sql = sql + ` analisis='${analisis}',chkbox='${chkbox}',`
    sql = sql + ` responsable='${responsable}',actividad='${actividad}',`
    sql = sql + ` fact='${fact}',evi_act='${evi_act}',`
    sql = sql + ` conclusion='${conclusion}',usr='${usr}',perfil='${perfil}',`
    sql = sql + ` prioridad='${prioridad}',cod_status='${cod_status}',`
    sql = sql + ` alta='${alta}',cierre='${cierre}'`  
    sql = sql + ` where id = ${id}`

    const records = await seq.query(sql, {
      //logging: console.log,
      type: QueryTypes.UPDATE,
    });
    res.status(200).json({ message: "Update OK" });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error });    
  }
});


module.exports = router;

