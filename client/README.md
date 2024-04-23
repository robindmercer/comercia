<img src="./src/images/Nibbot.svg" align="center"
     alt="logo" width="220" height="178">
## NIBBOT Administracion APP

## Table Of Content
- [Access Definition](#access-definition)
- [Status](#status)
- [Prog Id](#prog-id)
- [Versiones](#versiones)
- [Modificaciones](#modificaciones)

# Access Definition 
````
  Accesos 
        A1 = All       Gerencia
        A2 = All       Administrador
        A3 = All       Ventas
        A4 = All       Planeacion
        A5 = All       Manufactura
        A6 = All       Almacen 
        A7 = All       Compras
        A8 = All       Calidad
        C1 = Consulta  Administrador
````
# Status 
````
  1  = Ingreso 
  2  = Espera Aprobación	
  3  = Aprobado GC.	
  4  = Pendiente ADMIN.	
  5  = Pendiente Pago	
  6  = Liberado	
  7  = Almacen	
  8  = Manufactura	
  9  = Rechazado Man.
  10 = Producción
  11 = Revison Calidad
  12 = Rechazado Calidad
  13 = Liberado pendiente de envío
  14 = Producto Despachado
````  
# Prog Id 
````  
  1 = Admin
  6 = Clientes      /cliente
  3 = Productos     /producto
  4 = Traducciones  /productolang
  5 = MP            /materia prima
  2 = Usuarios      /usuarios
  7 Tablas          /tablas 
10 Ventas
  11 = OC           /factura
  12 = nada
16 Compras
  17 = Stock
18 Planeacion 
  19 = Pendientes   /FacturasMP  
````

# Versiones
````
14/06/2023
    Modificar Manejo Perfiles  
15/06/2023
    Crear Baja de Clientes
    Crear Baja de Cotizaciones
    Crear Baja de Ordenes de compra
````  

# Modificaciones 
````
- implementacion de Marzo
ALTER TABLE facturas ADD COLUMN cot_id int;
update facturas set cot_id = 0;
insert into tabla VALUEs(5,5,'Ship To',0,'N',1);
insert into tabla VALUEs(5,6,'Sold To',0,'N',1);

ALTER TABLE cotizacion ADD COLUMN vencimiento date;
update cotizacion set vencimiento = fecha ;
- Fin Implementaciones marzo

- implementacion de Abril 2024
alter table productos add column id_interno varchar;
update productos set id_interno = id;

ALTER TABLE cotizaciondet ADD COLUMN descto numeric(18,2);
ALTER TABLE factdet       ADD COLUMN descto numeric(18,2);

update cotizaciondet set descto = 0
update factdet set descto = 0


alter table productos add column stock int;
update productos set stock = 1;
- Fin Implementaciones Abril

delete from condiciones where id <> 3;
update  condiciones set Nombre = 'Financiamiento' where id = 3
old condiciones 
	1	Sin Descuento	0	0	0	0
	2	Contado	15	0	0	0
	3	Financiamiento	0	20	12	5
	4	Financiamiento 24 Meses	0	20	24	5
````
