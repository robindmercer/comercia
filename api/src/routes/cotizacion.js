//****************/
// Cotizacion
//****************/
const { Router, response } = require("express");
const cookieParser = require("cookie-parser");
//const { Cotizacion } = require('../db')
const router = Router();
const { conn } = require("../db");

// require('dotenv').config();
const { Sequelize, QueryTypes } = require("sequelize");
// const fs = require('fs');
// const path = require('path');
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE,DB_PORT } = process.env;

// const seq = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

const seq = conn;


async function grabarProductos(cotId, cotizaciondet) {
   console.log('grabarProductos: ', cotizaciondet);
   try {      
         var sqlDet = `insert into cotizaciondet (cot_id,orden,prod_id,cantidad,precio,total,descto) values `;
         cotizaciondet.forEach((item, index) => {
            sqlDet += `(${cotId},${index+1},${item.prod_id},${item.cantidad},${item.precio},${item.total},0)`;
            if (index < cotizaciondet.length - 1) {
               sqlDet = sqlDet + ",";
            }
         });
         console.log("sqlDet: ", sqlDet);
         const records2 = await seq
            .query(sqlDet, {
               //logging: console.log,
               type: QueryTypes.INSERT,
            })
            .then(async function (cotDetCreated) {
               console.log("Cot Det Created: ", cotId);
            })
            .catch(function (err) {
               console.log("Error creating cotizaciondet: ", err);
            });
            return "ok";
         } catch (error) {
            return error
         }
}

async function grabarCondiciones(cotId, condiciones) {
   console.log('grabarCondiciones: ', condiciones);
   try {
      if (!Array.isArray(condiciones) || condiciones.length === 0) {
         return "ok";
      }

      var sqlCond = `insert into cotizacioncond (cot_id,cond_id,descuento,enganche,meses,interes,seleccionado) values `;
      condiciones.forEach((condicion, index) => {
         sqlCond =
            sqlCond +
            `(${cotId},${condicion.cond_id},${condicion.descuento},${condicion.enganche},${condicion.meses},${condicion.interes},'${condicion.seleccionado === true ? 'S' : 'N'}')`;
         if (index < condiciones.length - 1) {
            sqlCond = sqlCond + ",";
         }
      });
      console.log("sqlCond: ", sqlCond);
      const records3 = await seq
         .query(sqlCond, {
            //logging: console.log,
            type: QueryTypes.INSERT,
         })
         .then(function (cotCondCreated) {
            console.log("Cot Cond Created: ", cotCondCreated);
         })
         .catch(function (err) {
            console.log("Error creating cotizacioncond: ", err);
         });
      return "ok";
   } catch (error) {
      return error;
   }
}

router.get("/all-data", async function (req, res, next) {
   try {
      const cotizaciones = await seq.query(
         "SELECT * FROM cotizacion",
         { type: QueryTypes.SELECT },
      );
      const cotizaciondets = await seq.query(
         "SELECT * FROM cotizaciondet",
         { type: QueryTypes.SELECT },
      );
      const cotizacionconds = await seq.query(
         "SELECT * FROM cotizacioncond",
         { type: QueryTypes.SELECT },
      );

      res.send({
         cotizaciones,
         cotizaciondets,
         cotizacionconds,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: "Error fetching cotizacion data",
         error,
      });
   }
});

router.get("/all", async function (req, res, next) {
   try {
      console.log("cookieParser: ", cookieParser);
      sql = "select * ";
      sql += ", now() as Hoy";
      sql += " from cotizacion ";
      sql += " join usuarios on usr_id = '" + id_usuario + "'";
      sql += " where (u.cia_id = 1  or u.cia_id =cotizacion.cia_id)";
      const records = await seq.query(sql, {
         //logging: console.log,
         type: QueryTypes.SELECT,
      });
      //console.log('records: ', records);
      res.send(records);
   } catch (error) {
      console.log(error);
   }
});

router.get("/cabecera/:registro", async function (req, res, next) {
   console.log("cab: ", req.query);
   const { registro } = req.params;
   if (registro) {
      try {
         sql =
            "select f.id,to_char(f.fecha,'dd/mm/yyyy') as fecha,f.subtotal,f.iva,f.total,f.dhl,f.cli_id,";
         sql +=
            " f.cli_id,t.description as Status,f.observ, f.moneda,f.idioma,f.nombre,";
         sql +=
            " f.telefono,f.direccion,f.email,f.vendedor,f.vencimiento,u.cia_id as userCiaId,f.cia_id";
         sql += " from cotizacion f";
         sql +=
            " join tabla   t            on t.id = 6 and t.cod= f.cod_status";
         sql += " join usuarios u on usr_id = 'RM'";
         sql += " where (u.cia_id = 1  or u.cia_id = f.cia_id)";
         sql += "  and f.id =  " + registro;
         console.log("sql: ", sql);

         const records = await seq.query(sql, {
            logging: console.log,
            type: QueryTypes.SELECT,
         });
         //console.log('records: ', records);
         res.send(records);
      } catch (error) {
         console.log(error);
      }
   }
});

router.get("/:iduser", async function (req, res, next) {
   const { iduser } = req.params;
   // console.log("iduser: ", iduser);
   try {
      sql =
         "select f.id,to_char(f.fecha,'dd/mm/yyyy') as fecha,f.subtotal,f.iva,f.total,f.cli_id,t.description as stsdes,";
      sql += " f.cod_status,f.observ, f.moneda,f.idioma,f.nombre,";
      sql += " f.telefono,f.direccion,f.email,f.vendedor,f.vencimiento,";
      // sql += " coalesce(fc.descuento,0)  fde,coalesce(fc.enganche,0) fen,coalesce(fc.meses,0) fme,coalesce(fc.interes,0) finter,";
      // sql += " coalesce(con.descuento,0) de, coalesce(con.enganche,0) en,coalesce(con.meses,0) me,coalesce(con.interes,0) inter,";
      sql += " coalesce(l.cod_status,0) logsts,u.cia_id as userCiaId,f.cia_id, now() as Hoy,co.razsoc,";
      sql += " (select coalesce(count(*),0) from cotizacioncond where cot_id = f.id) condiciones, ";
      sql += " (select coalesce(count(*),0) from cotizacioncond where cot_id = f.id and seleccionado = 'S') seleccionado ";
      sql += " from cotizacion f";
      sql += " join tabla                t  on t.id = 6 and t.cod= f.cod_status";
      // sql += " left join cotizacioncond  fc on fc.cot_id = f.id";
      // sql += " left join condiciones    con on con.id = fc.cond_id";
      sql += " left join logs             l on l.doc_id = f.id and l.tipo_id = 'COT'";
      sql += "                             and l.id in (";
      sql += "                               select  max(id) ";
      sql += "                                 from logs ";
      sql += "                                where doc_id = f.id and l.tipo_id = 'COT')";
      sql += " join usuarios u on u.usr_id = '" + iduser + "'";
      sql += " join usuariostatus us on us.usrid = '" + iduser + "'";
      sql += "                      and us.cod_status = f.cod_status"
      sql += "                      and us.tipo = 'COT'";
      sql += " join compania co on co.id = f.cia_id";
      sql += " where (u.cia_id = 1  or u.cia_id =f.cia_id)";
      sql += " order by f.id desc";

      const records = await seq.query(sql, {
         logging: console.log,
         type: QueryTypes.SELECT,
      });
      res.send(records);
   } catch (error) {
      console.log(error);
   }
});

// Listado de materias primas a solicitar
router.get("/mail", async function (req, res, next) {
   const { id } = req.query;
   if (id) {
      try {
         sql =
            "select fd.cot_id,fd.prod_id,fd.cantidad,pr.name,to_char(f.fecha,'dd/mm/yyyy') as fecha, ";
         sql += " mp.name Id, ";
         sql += " mp.description,fd.cantidad*pm.cantidad total_Mp, ";
         sql +=
            " f.telefono,f.direccion,f.email,f.vendedor,f.vencimiento,u.cia_id as userCiaId,f.cia_id";
         sql += " from cotizacion f ";
         sql += " join cotizaciondet fd on fd.cot_id = f.id ";
         sql += " join productos pr on pr.id = fd.prod_id ";
         sql += " join prodmp    pm on pm.prod_id  = fd.prod_id ";
         sql += " join materiaprima mp on mp.name = pm.mp_name ";
         sql += " join usuarios on usr_id = '" + id_usuario + "'";
         sql += " where (u.cia_id = 1  or u.cia_id =f.cia_id)";
         sql += " and fd.cot_id = " + id;
         sql += " order by pr.orden";
         const records = await seq.query(sql, {
            //logging: console.log,
            type: QueryTypes.SELECT,
         });
         //console.log('records: ', records);
         res.send(records);
      } catch (error) {
         console.log(error);
      }
   }
});

router.get("/pdf/:cotid", async function (req, res, next) {
   const { cotid } = req.params;
   console.log("cotid: ", cotid);
   try {
      sql = `select json_build_object(
         'cia_id', c.cia_id,
         'cli_id', c.cli_id,
         'cod_status', c.cod_status,
         'dhl', dhl,
         'direccion', c.direccion,
         'email', c.email,
         'fecha', c.fecha,
         'id', c.id,
         'idioma', c.idioma,
         'iva', iva,
         'moneda',moneda,
         'nombre', c.nombre,
         'observ', c.observ,
         'status', c.cod_status,
         'telefono', c.telefono,
         'subtotal', c.subtotal,
         'total', c.total,
         'vencimiento', c.vencimiento,
         'vendedor', c.vendedor,
         'userciaid', 1,
         'productos', (
               select json_agg(
                  json_build_object(
                     'cantidad', d.cantidad,
                     'description', p.description,
                     'prod_id', d.prod_id,
                     'descuento', d.descto,
                     'id_interno', p.id_interno,
                     'name', p.name,
                     'orden', p.orden,
                     'precio', d.precio,
                     'total', d.total,
                     'image_url', p.image_url,
                     'nameENG', COALESCE(l.name, 'n/a'),
                     'descriptionENG', COALESCE(l.description, 'n/a')
                     )
                     )
                  from cotizaciondet d
                  join productos p on p.id = d.prod_id
                  left join productolang l on l.id = p.id 
                  where d.cot_id = c.id
                  ),
         'financieros',(
            select json_agg(
               json_build_object(
                  'cot_id', cc.cond_id,
                  'descuento', cc.descuento,
                  'enganche', cc.enganche,
                  'interes', cc.interes,
                  'meses', cc.meses,
                  'nombre', o.nombre,
                  'seleccionado', cc.seleccionado,
                  'modificado', CASE
                     WHEN o.meses <> cc.meses OR
                          o.interes <> cc.interes OR
                          cc.descuento <> o.descuento OR
                          cc.enganche <> o.enganche
                     THEN 'Si'
                     ELSE 'No'
                  END
                  )
                )
                from cotizacioncond cc
                join condiciones o on o.id = cc.cond_id
                where cc.cot_id = c.id
            ),
            'ivas',(
                select json_agg(
                    json_build_object(
                        'cod', t3.cod,
                        'description', t3.description,
                        'valor', t3.valor
                    )
                )
                from tabla t3
                where t3.id = 1
                  and t3.cod = 1
            ),
            'monedas', (
                select json_agg(
                    json_build_object(
                        'cod', t2.cod,
                        'description', t2.description
                    )
                )
                from tabla t2
                where t2.id = 8
                  and t2.cod = c.moneda
            )
        ) as cotizacion 
        from cotizacion c
        where c.id = ${cotid};`;
      const records = await seq.query(sql, {
         logging: console.log,
         type: QueryTypes.SELECT,
      });
      res.send(records);
   } catch (error) {
      console.log(error);
   }
});

router.put("/stat", async function (req, res, next) {
   console.log("put stat: ", req.query);
   const { id, sts } = req.query;
   if (id) {
      try {
         sql = `update cotizacion set cod_status = ${sts} where id =  ${id}`;

         const records = await seq.query(sql, {
            //logging: console.log,
            type: QueryTypes.UPDATE,
         });
         //console.log('records: ', records);
         res.send(records);
      } catch (error) {
         console.log(error);
      }
   }
});

router.post("/", async function (req, res, next) {
   console.log("Post Cotizacion: ", req.body);
   const { cotizCab, cotizaciondet, condicion, condiciones } = req.body;
   const condicionesCot = Array.isArray(condicion)
      ? condicion
      : Array.isArray(condiciones)
        ? condiciones
        : condicion
          ? [condicion]
          : [];
   var xIva = cotizCab.iva;
   var xTot = cotizCab.total;
   if (cotizCab.subtotal === 0) {
      xIva = 0;
      xTot = 0;
   }
   sql = `insert into cotizacion (cli_id,dhl,subtotal,iva,total,cod_status,observ,fecha,idioma,moneda,nombre,telefono,direccion,email,vendedor,vencimiento,cia_id ) `;
   sql += ` values (${0},${cotizCab.dhl},${cotizCab.subtotal},${xIva},${xTot},${cotizCab.cod_status},'${cotizCab.observ}','${cotizCab.fecha}','${cotizCab.idioma}','${cotizCab.moneda}','${cotizCab.nombre}',`;
   sql += ` '${cotizCab.telefono}','${cotizCab.direccion}','${cotizCab.email}','${cotizCab.vendedor}','${cotizCab.vencimiento}',${cotizCab.cia_id} ) RETURNING id`;
   console.log("sql: ", sql);
   const records = await seq
      .query(sql, {
         //logging: console.log,
         type: QueryTypes.INSERT,
      })
      .then(async function (cotIdCreated) {
         console.log("Cot Created: ", cotIdCreated);
         const cotId = cotIdCreated[0][0].id;
         var sqlDet = `insert into cotizaciondet (cot_id,orden,prod_id,cantidad,precio,total,descto) values `;
         cotizaciondet.forEach((item, index) => {
            sqlDet =
               sqlDet +
               `(${cotId},${item.orden},${item.prod_id},${item.cantidad},${item.precio},${item.total},${item.descuento})`;
            if (index < cotizaciondet.length - 1) {
               sqlDet = sqlDet + ",";
            }
         });
         console.log("sqlDet: ", sqlDet);
         const records2 = await seq
            .query(sqlDet, {
               //logging: console.log,
               type: QueryTypes.INSERT,
            })
            .then(async function (cotDetCreated) {
               console.log("Cot Det Created: ", cotDetCreated);
            })
            .catch(function (err) {
               console.log("Error creating cotizaciondet: ", err);
            });

         if (condicionesCot.length > 0) {
            const respCond = await grabarCondiciones(cotId, condicionesCot);
            if (respCond !== "ok") {
               console.log("Error creating cotizacioncond: ", respCond);
            }
         }
      })
      .catch(function (err) {
         console.log("Error creating cotizacion: ", err);
      });   
   return res.status(200).json({ message: "OK" });
});

router.post("/111", async function (req, res, next) {
   try {
      const {
         cli_id,
         dir_id,
         cot_id,
         subtotal,
         iva,
         total,
         cod_status,
         observ,
         fecha,
         dhl,
         idioma,
         moneda,
         nombre,
         telefono,
         direccion,
         email,
         vendedor,
         vencimiento,
         cia_id,
      } = req.body;
      console.log("Post Cotizacion: ", req.body);
      //    console.log('vencimiento: ', vencimiento.replace('-',''));
      if (!cod_status) {
         // console.log('cod_status: ', cod_status);
         // console.log('total: ', total);
         // console.log('iva: ', iva);
         // console.log('subtotal: ', subtotal);
         // console.log('dir_id: ', dir_id);
         // console.log('cli_id: ', cli_id);
         return res.status(400).json({
            message: "Falta información para poder darte de alta el Documento",
         });
      }
      var xIva = iva;
      var xTot = total;
      if (subtotal === 0) {
         xIva = 0;
         xTot = 0;
      }

      if (cot_id !== 0) {
         res.status(400).json({ message: "Error en la información recibida" });
      } else {
         sql = `insert into cotizacion (cli_id,dhl,subtotal,iva,total,cod_status,observ,fecha,idioma,moneda,nombre,telefono,direccion,email,vendedor,vencimiento,cia_id ) `;
         sql =
            sql +
            `values (${0},${dhl},${subtotal},${xIva},${xTot},${cod_status},'${observ}','${fecha}','${idioma}','${moneda}','${nombre}',`;
         sql =
            sql +
            `'${telefono}','${direccion}','${email}','${vendedor}','${vencimiento}',${cia_id} ) RETURNING id`;
      }
      const records = await seq
         .query(sql, {
            //logging: console.log,
            type: QueryTypes.INSERT,
         })
         .then(function (cotIdCreated) {
            console.log("Cot Created: ", cotIdCreated);
            res.send(cotIdCreated);
         });
      res.send(records);
   } catch (error) {
      console.log("Error:", error);
   }
});

router.put("/", async function (req, res, next) {
   try {
      console.log("PUT Cotizacion: ", req.body);
      const { cotizCab, cotizaciondet, condicion, condiciones } = req.body;
      const condicionesCot = Array.isArray(condicion)
         ? condicion
         : Array.isArray(condiciones)
           ? condiciones
           : condicion
             ? [condicion]
             : [];
      var xIva = cotizCab.iva;
      var xTot = cotizCab.total;
      if (cotizCab.subtotal === 0) {
         xIva = 0;
         xTot = 0;
      }

      if (!cotizCab.subtotal || !cotizCab.total) {
         console.log("total: ", cotizCab.total);
         console.log("iva: ", cotizCab.iva);
         console.log("subtotal: ", subtotal);
         return res.send(
            "Aviso: Falta información para poder MODIFICAR de alta el Documento",
         );
      }
      if (cotizCab.id !== 0) {
         sqlDel = `delete from cotizaciondet where cot_id = ${cotizCab.id}`;
         sqlDel2 = `delete from cotizacioncond where cot_id = ${cotizCab.id}`;
         sqlfac = `update cotizacion set `;
         sqlfac = sqlfac + ` dhl='${cotizCab.dhl}',`;
         sqlfac = sqlfac + ` nombre='${cotizCab.nombre}',`;
         sqlfac = sqlfac + ` subtotal='${cotizCab.subtotal}',`;
         sqlfac = sqlfac + ` iva='${cotizCab.iva}',`;
         sqlfac = sqlfac + ` total=${cotizCab.total},`;
         sqlfac = sqlfac + ` moneda=${cotizCab.moneda},`;
         sqlfac = sqlfac + ` cod_status=${cotizCab.cod_status},`;
         sqlfac = sqlfac + ` observ='${cotizCab.observ}',`;
         sqlfac = sqlfac + ` telefono='${cotizCab.telefono}',`;
         sqlfac = sqlfac + ` direccion='${cotizCab.direccion}',`;
         sqlfac = sqlfac + ` email='${cotizCab.email}',`;
         sqlfac = sqlfac + ` vendedor='${cotizCab.vendedor}',`;
         sqlfac = sqlfac + ` vencimiento='${cotizCab.vencimiento}'`;         
         sqlfac = sqlfac + ` where id = ${cotizCab.id}`;
      } else {
         return res
            .status(400)
            .json(
               "Falta información numero de Cotizacion poder darte de alta el Documento",
            );
      }
      console.log('sqlFac: ', sqlfac);
      
      const records3 = await seq.query(sqlfac, {
         //logging: console.log,
         type: QueryTypes.UPDATE,
      });

      const records = await seq.query(sqlDel, {
         //logging: console.log,
         type: QueryTypes.DELETE,
      });
      const records2 = await seq.query(sqlDel2, {
         //logging: console.log,
         type: QueryTypes.DELETE,
      });


      const respProd = await grabarProductos(cotizCab.id, cotizaciondet);
      let respCond = "ok";
      if (condicionesCot.length > 0) {
         respCond = await grabarCondiciones(cotizCab.id, condicionesCot);
      }
      if (respProd !== "ok") {
         console.log("Error grabando productos: ", respProd);
      }
      if (respCond !== "ok") {
         console.log("Error grabando condicion: ", respCond);
      }
      res.status(200).json({ message: "OK" });
   } catch (error) {
      res.status(400).json({ message: "Error put Cotizacion " + error });
   }
});

module.exports = router;
