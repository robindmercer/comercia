-- Averiguar como se lammans las secuencias de una tabla 
SELECT n.nspname as "Schema",
c.relname as "Name",
CASE c.relkind WHEN 'r' THEN 'table' WHEN 'v' THEN 'view' WHEN 'i' THEN
'index' WHEN 'S' THEN 'sequence' WHEN 's' THEN 'special' END as "Type",
u.usename as "Owner"
FROM pg_catalog.pg_class c
LEFT JOIN pg_catalog.pg_user u ON u.usesysid = c.relowner
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind IN ('S','')
AND n.nspname NOT IN ('pg_catalog', 'pg_toast')
AND pg_catalog.pg_table_is_visible(c.oid)
ORDER BY 1,2;

-- si se pierde el index en una tabla SELECT n.nspname as "Schema",
c.relname as "Name",
CASE c.relkind WHEN 'r' THEN 'table' WHEN 'v' THEN 'view' WHEN 'i' THEN
'index' WHEN 'S' THEN 'sequence' WHEN 's' THEN 'special' END as "Type",
u.usename as "Owner"
FROM pg_catalog.pg_class c
LEFT JOIN pg_catalog.pg_user u ON u.usesysid = c.relowner
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind IN ('S','')
AND n.nspname NOT IN ('pg_catalog', 'pg_toast')
AND pg_catalog.pg_table_is_visible(c.oid)
ORDER BY 1,2;SELECT n.nspname as "Schema",
c.relname as "Name",
CASE c.relkind WHEN 'r' THEN 'table' WHEN 'v' THEN 'view' WHEN 'i' THEN
'index' WHEN 'S' THEN 'sequence' WHEN 's' THEN 'special' END as "Type",
u.usename as "Owner"
FROM pg_catalog.pg_class c
LEFT JOIN pg_catalog.pg_user u ON u.usesysid = c.relowner
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind IN ('S','')
AND n.nspname NOT IN ('pg_catalog', 'pg_toast')
AND pg_catalog.pg_table_is_visible(c.oid)
ORDER BY 1,2;
-- Busca proximo a utilizar
SELECT setval('clientes_id_seq', nextval('clientes_id_seq'), false);
-- muestra el que deberia usar 
SELECT max(id) + 1 FROM clientes
-- corrigue tabla 
ALTER SEQUENCE clientes_id_seq RESTART WITH 23;


--Elimino Facturas
update facturas set cod_status = 0;
delete from factcond where fac_id in
(select id from facturas where cod_status = 0);
delete from factdet where fac_id in
(select id from facturas where cod_status = 0);
delete from facturas where cod_status = 0;

-- Cotizaciones
update cotizacion set cod_status = 0;
delete from cotizacioncond where cot_id in
(select id from cotizacion where cod_status = 0);
delete from cotizaciondet where cot_id in
(select id from cotizacion where cod_status = 0);
delete from cotizacion  where cod_status = 0;

--todo 
delete from tabla where id = 13
insert into tabla values(13,0,'Status Producto',0,'N',1);
insert into tabla values(13,1,'Activo',0,'N',1);
insert into tabla values(13,2,'Congelado',0,'N',1);
insert into tabla values(13,3,'Tercerizado',0,'N',1);

select * from tabla where id = 14
insert into tabla values(14,0,'Status Ticket',0,'N',1);
insert into tabla values(14,1,'Abierto',0,'N',1);
insert into tabla values(14,2,'Cerrado',0,'N',1);

insert into ticket (cli_id,fac_id,description,alta,cierre,usr,cod_status)
values (2,19,'Bienvenida','01/08/2023','01/01/1900','RM',1)




SELECT doc_id,f.cod_status,t.description,fmin,fmax, fMax::DATE - fMin::DATE dif
from 
(select doc_id,min(fecha::DATE) fMin,max(fecha::DATE) fMax from logs group by doc_id) t1
join facturas f on f.id = doc_id
join tabla t   on t.id = 6 and cod = f.cod_status

-- resumen de OC por periodo Status 
select (date_part('year', f.fecha::DATE) *100) + date_part('month',f.fecha::DATE) Periodo,
description,sum(f.total) Total from facturas f
join tabla t   on t.id = 6 and cod = f.cod_status
group by  Periodo, description

select (date_part('year', f.fecha::DATE) *100) + date_part('month',f.fecha::DATE) Periodo,
       COALESCE(sum(f.total) filter (where cod_status <= 5),0) as NoLib,
       COALESCE(sum(f.total) filter (where cod_status > 5),0) as Lib,
       COALESCE(count(f.id) filter (where cod_status <= 5),0) as NoLibC,
       COALESCE(count(f.total) filter (where cod_status > 5),0) as LibC
  from facturas f
where  to_char(fecha::DATE, 'YYYYMMDD') >= '20230601'  
 and   to_char(fecha::DATE, 'YYYYMMDD') <= '20230901'  
 group by Periodo
 order by Periodo
 




-- control facturacion 
select distinct f.id,f.cli_id,c.id Cliente,d.fac_id det,co.fac_id cond from facturas f
left join clientes c on f.cli_id = c.id
left join factdet d on d.fac_id = f.id
left join factcond co on co.fac_id = f.id
where co.fac_id is NULL
   or d.fac_id is NULL
   or c.id is NULL
order by f.id
-- insert into factdet values (28,1,22,1436,1,1436)
-- Clientes sin direcciones 
select distinct c.id,c.apellido,d.cli_id
 from clientes c
 left join direccion d on d.cli_id = c.id
where d.cli_id is null
-- Productos sin Materia Prima
select distinct p.id,p.name,m.prod_id
from productos p
left join prodmp m on m.prod_id = p.id
where m.prod_id is null
-- Productos sin traduccion
select distinct p.id,p.name,m.id
from productos p
left join productolang m on m.id = p.id
where m.id is null
-- grafico 
      select moneda,(date_part('year', f.fecha::DATE) *100) + date_part('month',f.fecha::DATE) Periodo,
       COALESCE(sum(f.total) filter (where cod_status <= 5),0) as NoLib,
       COALESCE(sum(f.total) filter (where cod_status > 5),0) as Lib,
       COALESCE(count(f.id) filter (where cod_status <= 5),0) as NoLibC,
       COALESCE(count(f.id) filter (where cod_status > 5),0) as LibC      
       from facturas f
       where  to_char(fecha::DATE, 'YYYY-MM-DD') >= ' + fDesde + '  
       and   to_char(fecha::DATE, 'YYYY-MM-DD') <= ' + fHasta + '  
       group by moneda,Periodo
       order by moneda,Periodo



insert into usuariomenus  (usrid,nivel,accion) values  ('RM',2,'A')
insert into usuariomenus  (usrid,nivel,accion) values 
('RM',0,'A'),
('RM',1,'A'),
('RM',5,'A'),
('RM',18,'C'),
('RM',19,'C'),
('RM',20,'C'),
('RM',21,'C'),
('RM',2,'A'),
('RM',3,'A'),
('RM',6,'A'),
('RM',24,'A'),
('RM',4,'A'),
('RM',10,'A'),
('RM',12,'A'),
('RM',11,'A'),
('RM',7,'A');



insert into factdet values 
('26','1','1','285824','1','285824'),
('26','2','2','14900','1','14900'),
('26','3','3','14900','1','14900'),
('26','4','4','4872','1','4872'),
('26','5','7','0','1','0'),
('26','6','8','0','1','0'),
('26','7','9','0','1','0')



select clientes.razsoc,nombre,apellido,tabla.description as Actividad,status.description as StsDesc,
  t1.description as IdiomaDes,  t2.description as MonedaDes, facturas.id as fac_id, facturas.total,    
  (select count(*) as cantidad 
     from ticket tk 
    where tk.fac_id = facturas.id 
      and cierre <='19010101' 
      and cod_status = 1) cantidad
  from clientes    
  join facturas on cli_id = clientes.id   
               and facturas.cod_status >= 6    
  join tabla on tabla.id = 3 and tabla.cod = cod_cliente    
  join status on status.id_status = clientes.cod_status    
  join tabla t1 on t1.id = 7 and t1.cod = clientes.idioma    
  join tabla t2 on t2.id = 8 and t2.cod = clientes.moneda    
  where clientes.cod_status > 0    order by nombre

--Modificacion producto
ALTER TABLE productos ADD COLUMN orden varchar(5);
update productos set orden = 'A1'
update productos set orden = 'B1' where price = 0
