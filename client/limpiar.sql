--Elimino Facturas
delete from factcond where fac_id in
(select id from facturas where cod_status = 0);
delete from factdet where fac_id in
(select id from facturas where cod_status = 0);
delete from facturas where cod_status = 0;

-- Cotizaciones
delete from cotizacioncond where cot_id in
(select id from cotizacion where cod_status = 0);
delete from cotizaciondet where cot_id in
(select id from cotizacion where cod_status = 0);
delete from cotizacion  where cod_status = 0;
