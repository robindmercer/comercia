//****************/
// Factura
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

router.get("/cab", async function (req, res, next) {
   const { id } = req.query;
   if (id) {
      try {
         sql = `select json_build_object(
             'cia_id', f.cia_id,
             'cli_id', f.cli_id,
             'cod_status', f.cod_status,
             'dhl', f.dhl,
             'direccion', c.direccion,
             'email', c.email,
             'fecha', c.fecha,
             'id', f.id,
             'idioma', f.idioma,
             'iva', f.iva,
             'moneda', f.moneda,
             'nombre', c.nombre,
             'observ', c.observ,
             'status', f.cod_status,
             'telefono', c.telefono,
             'subtotal', f.subtotal,
             'total', f.total,
             'vencimiento', c.vencimiento,
             'vendedor', c.vendedor,
             'calle',d.calle,
             'localidad',d.localidad,
             'cp.',d.cp,
             'cuidad',d.ciudad,
             'pais',d.pais,
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
                 from factdet d
                 join productos p on p.id = d.prod_id
                 left join productolang l on l.id = p.id
                 where d.fac_id = f.id
             ),
             'financieros', (
                 select json_agg(
                     json_build_object(
                         'fac_id', fc.fac_id,
                         'cond_id', fc.cond_id,
                         'descuento', fc.descuento,
                         'enganche', fc.enganche,
                         'interes', fc.interes,
                         'meses', fc.meses,
                         'nombre', o.nombre
                     )
                 )
                 from factcond fc
                 join condiciones o on o.id = fc.cond_id
                 where fc.fac_id = f.id
             ),
             'ivas', (
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
                   and t2.cod = f.moneda
             )
         ) as facturas
         from facturas f
         join direccion d on d.orden = f.dir_id and d.cli_id = f.cli_id
         join cotizacion c on c.id = f.cot_id
         where f.id = ${id};
         `
         console.log('sql: ', sql);

         const records = await seq.query(sql, {
            //logging: console.log,
            type: QueryTypes.SELECT,
         });
         //console.log('records: ', records);
         res.send(records);
      } catch (error) {
         console.log(error);
      }
   } else {
      console.log("No id provided for /cab");
   }
});


router.get("/:iduser", async function (req, res, next) {
   const { iduser } = req.params;
   try {
      sql = "select f.id,to_char(f.fecha,'dd/mm/yyyy') as fecha,f.subtotal,";
      sql +=  " f.iva,f.total,f.cli_id,t.description as stsdes,";
      sql +=  " c.nombre,f. cod_status,f. observ, f.moneda,f.idioma,";
      // sql +=  " coalesce(fc.descuento,0)  fde,coalesce(fc.enganche,0) fen, ";
      // sql +=  " coalesce(fc.meses,0) fme,coalesce(fc.interes,0) finter,";
      // sql +=  " coalesce(con.descuento,0) de, coalesce(con.enganche,0) en, ";
      // sql +=  " coalesce(con.meses,0) me,coalesce(con.interes,0) inter,stsprod.sts,";
      sql +=  " now() as Hoy";
      sql +=  " from facturas f";
      sql +=  " join clientes c           on c.id = f.cli_id";
      sql +=  " join tabla   t            on t.id = 6 and t.cod = f.cod_status";
      // sql +=  " left join factcond fc     on fc.fac_id = f.id";
      // sql +=  " left join condiciones con on con.id = fc.cond_id";
      sql +=  " join (select fa.fac_id,avg(p.cod_status) sts";
      sql +=  "     from factdet fa";
      sql +=  "     join productos p on p.id = fa.prod_id ";
      sql +=  "     group by fa.fac_id";
      sql +=  "  ) stsprod on stsprod.fac_id = f.id";
      sql += " join usuarios u on u.usr_id = '" + iduser + "'";
      sql += " join usuariostatus us on us.usrid = '" + iduser + "'";
      sql += "                      and us.cod_status = f.cod_status"
      sql += "                      and us.tipo = 'OC'";
      sql += " where u.cia_id =f.cia_id";
      sql +=  " order by f.id";

      const records = await seq.query(sql, {
         //logging: console.log,
         type: QueryTypes.SELECT,
      });
      res.send(records);
   } catch (error) {
      console.log(error);
   }
});

router.get("/", async function (req, res, next) {
   try {
      sql = "select f.id,to_char(f.fecha,'dd/mm/yyyy') as fecha,f.subtotal,";
      sql +=  " f.iva,f.total,f.cli_id,t.description as stsdes,";
      sql +=  " c.nombre,f. cod_status,f. observ, f.moneda,f.idioma,";
      // sql +=  " coalesce(fc.descuento,0)  fde,coalesce(fc.enganche,0) fen, ";
      // sql +=  " coalesce(fc.meses,0) fme,coalesce(fc.interes,0) finter,";
      // sql +=  " coalesce(con.descuento,0) de, coalesce(con.enganche,0) en, ";
      // sql +=  " coalesce(con.meses,0) me,coalesce(con.interes,0) inter,stsprod.sts,";
      sql +=  " now() as Hoy";
      sql +=  " from facturas f";
      sql +=  " join clientes c           on c.id = f.cli_id";
      sql +=  " join tabla   t            on t.id = 6 and t.cod = f.cod_status";
      // sql +=  " left join factcond fc     on fc.fac_id = f.id";
      // sql +=  " left join condiciones con on con.id = fc.cond_id";
      sql +=  " join (select fa.fac_id,avg(p.cod_status) sts";
      sql +=  "     from factdet fa";
      sql +=  "     join productos p on p.id = fa.prod_id ";
      sql +=  "     group by fa.fac_id";
      sql +=  "  ) stsprod on stsprod.fac_id = f.id";
      sql +=  " order by f.id";

      const records = await seq.query(sql, {
         //logging: console.log,
         type: QueryTypes.SELECT,
      });
      res.send(records);
   } catch (error) {
      console.log(error);
   }
});

router.get("/bckp", async function (req, res, next) {
   try {
      sql = "select * from facturas";
      const records = await seq.query(sql, {
         //logging: console.log,
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
         sql = "select fd.fac_id,fd.prod_id,fd.cantidad,pr.name, ";
         sql +=  " mp.name Id, ";
         sql +=  " mp.description,fd.cantidad*pm.cantidad total_Mp ";
         sql +=  " from facturas f ";
         sql +=  " join factdet fd on fd.fac_id = f.id ";
         sql +=  " join productos pr on pr.id = fd.prod_id ";
         sql +=  " join prodmp    pm on pm.prod_id  = fd.prod_id ";
         sql +=  " join materiaprima mp on mp.name = pm.mp_name ";
         sql +=  " where fd.fac_id = " + id;

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

router.get("/graf", async function (req, res, next) {
   try {
      console.log("Graf req.body: ", req.query);
      const { fDesde, fHasta } = req.query;
      sql = "select moneda,(date_part('year', f.fecha::DATE) *100) + date_part('month',f.fecha::DATE) Periodo,";
      sql +=  " COALESCE(sum(f.total) filter (where cod_status <= 5),0) as NoLib,";
      sql +=  " COALESCE(sum(f.total) filter (where cod_status > 5),0) as Lib,";
      sql +=  " COALESCE(count(f.id) filter (where cod_status <= 5),0) as NoLibC,";
      sql +=  " COALESCE(count(f.id) filter (where cod_status > 5),0) as LibC";
      sql +=  " from facturas f";
      sql +=  " where  to_char(fecha::DATE, 'YYYY-MM-DD') >= '" + fDesde + "'";
      sql +=  " and   to_char(fecha::DATE, 'YYYY-MM-DD') <= '" + fHasta + "'";
      sql +=  " group by moneda,Periodo";
      sql +=  " order by moneda,Periodo";

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
 
router.put("/stat", async function (req, res, next) {
   const { doc_id, tipo_id, usr_id, cod_status, observ } = req.body;
   console.log("*** factura/stat req.query: ", req.body);
   if (doc_id) {
         try {

            sql = `update facturas set cod_status = ${cod_status} where id =  ${doc_id}`;
            sql2 = `insert into logs (doc_id, tipo_id, usr_id, cod_status,observ,fecha) values `;
            sql2 = sql2 + `(${doc_id}, '${tipo_id}', '${usr_id}', ${cod_status},'${observ}',now())`;
            
            const records = await seq
               .query(sql, {
               logging: console.log,
               type: QueryTypes.UPDATE,
            })
            .then(async function () {
               const records2 = await seq
               .query(sql2, {
                  logging: console.log,
                  type: QueryTypes.INSERT,
               })
               .then(async function () {            
                  res.status(200).json({ message: "OK" });
               })
            })
         } catch (error) {
            console.log("Error",error);
            res.status(400).json({ message: `Error ${error}` });
         }
      } else {
         console.log("Error Stat Doc_id");
         res.status(400).json({ message: `Error doc_id ${doc_id}` });
      }
});

router.post("/", async function (req, res, next) {
   try {
      const {
         cli_id,
         dir_id,
         fac_id,
         subtotal,
         iva,
         total,
         cod_status,
         observ,
         fecha,
         dhl,
         idioma,
         moneda,
      } = req.body;
      console.log("Post Factura: ", req.body);

      if (!cli_id || !dir_id || !subtotal || !total || !cod_status) {
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
      if (fac_id !== 0) {
         res.status(400).json({ message: "Error en la información recibida" });
      } else {
         sql = `insert into facturas (cli_id,dir_id,dhl,subtotal,iva,total,cod_status,observ,fecha,idioma,moneda) `;
         sql +=  `values (${cli_id},${dir_id},${dhl},${subtotal},${iva},${total},${cod_status},'${observ}','${fecha}','${idioma}','${moneda}') RETURNING id`;
      }
      const records = await seq
         .query(sql, {
            //logging: console.log,
            type: QueryTypes.INSERT,
         })
         .then(function (facIdCreated) {
            console.log("facIdCreated: ", facIdCreated);
            res.send(facIdCreated);
         });
      console.log("records: ", records);
      res.send(records);
   } catch (error) {
      console.log("Error:", error);
   }
});
// Cotizacion a Factura
router.post("/cotifac", async function (req, res, next) {
   const transaction = await seq.transaction();
   try {
      const { cli_id, cot_id } = req.body;
      console.log("Post cotifac: ", req.body);

      if (!cli_id || !cot_id) {
         await transaction.rollback();
         return res.status(400).json({
            message: "Falta información para poder crear una OC desde una Cotizacion",
         });
      }

      sql = `insert into facturas (id,cli_id,dir_id,dhl,subtotal,iva,total,cod_status,observ,fecha,idioma,moneda,cot_id,cia_id) `;
      sql +=  `select (select COALESCE(max(id)+1,1)  from facturas ) id, ${cli_id}, 1 , dhl, subtotal, iva, total ,4, observ,fecha, 1, moneda,id,cia_id from cotizacion`;
      sql +=  ` where id = ${cot_id} RETURNING id`;

      const facIdCreated = await seq.query(sql, {
         transaction,
         type: QueryTypes.INSERT,
      });
      
      const fac_id = facIdCreated[0][0].id;
      
      sql2 = `insert into factdet select ${fac_id},orden ,prod_id,precio,cantidad,total from cotizaciondet where cot_id = ${cot_id};`;
      await seq.query(sql2, {
         transaction,
         type: QueryTypes.INSERT,
      });
      
      // Solo paso la cotizacion seleccionada
      sql3 = `insert into factcond `;
      sql3 += ` ( fac_id,cond_id,descuento,enganche,meses,interes)`;
      sql3 += ` select ${fac_id},cond_id,descuento,enganche,meses,interes `;
      sql3 += ` from cotizacioncond where cot_id = ${cot_id} and seleccionado = 'S';`;
      await seq.query(sql3, {
         transaction,
         type: QueryTypes.INSERT,
      });

      sql4 = `update cotizacion set cli_id = ${cli_id} ,nombre=razsoc,cod_status = 15 `;
      sql4 +=  ` from clientes `;
      sql4 +=  ` where cotizacion.id = ${cot_id}`;
      sql4 +=  ` and clientes.id = ${cli_id}`;
      await seq.query(sql4, {
         transaction,
         type: QueryTypes.UPDATE,
      });

      sql5 = "insert into logs (doc_id, tipo_id, usr_id, cod_status,observ,fecha) ";
      sql5 +=  `select ${fac_id}, 'FAC', vendedor, 1,'Viene de la OC : ${cot_id}',now()`;
      sql5 +=  ` from cotizacion where id =${cot_id}`;
      await seq.query(sql5, {
         transaction,
         type: QueryTypes.UPDATE,
      });

      await transaction.commit();
      res.status(200).json({ message: "OC Creada" });
   } catch (error) {
      await transaction.rollback();
      res.status(400).json({ message: "Error put cotifac " + error });
   }
});

router.put("/", async function (req, res, next) {
   try {
      const { id, dhl, subtotal, iva, total, observ } = req.body;

      console.log("Put Factura: ", req.body);

      if (!subtotal || !iva || !total) {
         console.log("total: ", total);
         console.log("iva: ", iva);
         console.log("subtotal: ", subtotal);
         return res.send(
            "Aviso: Falta información para poder MODIFICAR de alta el Documento"
         );
      }
      if (id !== 0) {
         sqlDel = `delete from factdet where fac_id = ${id}`;
         sqlfac = `update facturas set `;
         // sql= sql + ` cli_id='${cli_id}',`
         // sql= sql + ` dir_id='${dir_id}',`
         sqlfac = sqlfac + ` dhl='${dhl}',`;
         sqlfac = sqlfac + ` subtotal='${subtotal}',`;
         sqlfac = sqlfac + ` iva='${iva}',`;
         sqlfac = sqlfac + ` total=${total},`;
         sqlfac = sqlfac + ` cod_status=1,`;
         sqlfac = sqlfac + ` observ='${observ}'`;
         sqlfac = sqlfac + ` where id = ${id}`;
      } else {
         return res.send(
            "Falta información numero de factura poder darte de alta el Documento"
         );
      }
      const records = await seq.query(sqlDel, {
         //logging: console.log,
         type: QueryTypes.DELETE,
      });

      const records2 = await seq.query(sqlfac, {
         //logging: console.log,
         type: QueryTypes.UPDATE,
      });
      console.log("sqlDel: ", sqlDel);
      console.log("sqlfac: ", sqlfac);
      res.status(200).json({ message: "OK" });
   } catch (error) {
      res.status(400).json({ message: "Error put FACTURAS" + error });
   }
});

module.exports = router;
