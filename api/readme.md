# TODO in Productioon
create statusworkflow

## Railway bucket for images

The `/upload` route now stores images in an S3-compatible bucket instead of `public/uploads`.

Required env vars:

- `S3_ENDPOINT`: the Railway object storage endpoint
- `S3_BUCKET`: the bucket name
- `S3_ACCESS_KEY`: access key id
- `S3_SECRET_KEY`: secret access key
- `S3_REGION`: use `auto` unless Railway gives you a fixed region
- `S3_PUBLIC_URL`: optional public base URL used to build `image_url`

Notes:

- `POST /upload?folder=productos`
- multipart field name: `image`
- optional body field: `old_key` to delete the previous object after upload
- if `S3_PUBLIC_URL` is empty, the API returns `${S3_ENDPOINT}/${S3_BUCKET}/{image_key}`

add in cotizacion 
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
                     'total', d.total
                     )
                     )
                  from cotizaciondet d
                  join productos p on p.id = d.prod_id
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
                  'totalenganche', 4345,
                  'totalsaldofinanciar', 17380,
                  'totalinteres', 797,
                  'totalapagar', 19117
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
        from cotiza
        
        
        Acion c
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

A implementar
alter table productos add column         image_url varchar(500) default '';
alter table productos add column         image_key varchar(200) default '';
alter table productos add column         image_mime varchar(50) default '';
alter table productos add column         image_size integer default 0
