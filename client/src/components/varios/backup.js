//robin
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducto } from "../../actions/producto";
import { getMateriaprima, getProdmp } from "../../actions/materiaprima";
import { getFacturaBckp } from "../../actions/factura";
import { getFacturaDetAll } from "../../actions/factdet";
import { getClienteBckp } from "../../actions/cliente";
import { getDireccionBckp } from "../../actions/direccion";
import { getCondicionesBckp } from "../../actions/factcond";
import { getCotizacionDetAll } from "../../actions/cotizaciondet";
import { getCotizacioncondAll } from "../../actions/cotizacioncond";
import { getCotizacionAll } from "../../actions/cotizacion";

import * as XLSX from "xlsx";



const Backup = () => {
   const { producto } = useSelector((state) => state);
   const { materiaprima } = useSelector((state) => state);
   const { prodmp } = useSelector((state) => state);
   const { factura } = useSelector((state) => state);
   const { factdet } = useSelector((state) => state);
   const { factcond } = useSelector((state) => state);
   const { cliente } = useSelector((state) => state);
   const { direccion } = useSelector((state) => state);
   const { cotizacion } = useSelector((state) => state);
   const { cotizacioncond } = useSelector((state) => state);
   const { cotizaciondet } = useSelector((state) => state);
   const dispatch = useDispatch(); 
   
   useEffect(() => {
      dispatch(getProducto());
      dispatch(getMateriaprima());
      dispatch(getProdmp());
      dispatch(getFacturaBckp());
      dispatch(getFacturaDetAll());   
      dispatch(getClienteBckp());   
      dispatch(getDireccionBckp());   
      dispatch(getCondicionesBckp());
      dispatch(getCotizacionAll());
      dispatch(getCotizacionDetAll());
      dispatch(getCotizacioncondAll());
   }, [dispatch]); 

   const downloadBackup = () => {
      //Productos
      const libroProd = XLSX.utils.book_new();
      const hoja = XLSX.utils.json_to_sheet(producto);
      XLSX.utils.book_append_sheet(libroProd, hoja, "Backups");
      XLSX.writeFile(libroProd, "Productos.xlsx");

      //Materias Primas
      const libroMP = XLSX.utils.book_new();
      const hojaMP = XLSX.utils.json_to_sheet(materiaprima);
      XLSX.utils.book_append_sheet(libroMP, hojaMP, "Backups");
      XLSX.writeFile(libroMP, "materiaPrima.xlsx");

      //Productos Materias Primas
      const libroPMP = XLSX.utils.book_new();
      const hojaPMP = XLSX.utils.json_to_sheet(prodmp);
      XLSX.utils.book_append_sheet(libroPMP, hojaPMP, "Backups");
      XLSX.writeFile(libroPMP, "prodmp.xlsx");
      //factura
      const libroFactura = XLSX.utils.book_new();
      const hojaFactura = XLSX.utils.json_to_sheet(factura);
      XLSX.utils.book_append_sheet(libroFactura, hojaFactura, "Backups");
      XLSX.writeFile(libroFactura, "facturas.xlsx");
      //factdet
      const librofactdet = XLSX.utils.book_new();
      const hojafactdet = XLSX.utils.json_to_sheet(factdet);
      XLSX.utils.book_append_sheet(librofactdet, hojafactdet, "Backups");
      XLSX.writeFile(librofactdet, "factdet.xlsx");
      //clientes
      const libroclientes = XLSX.utils.book_new();
      const hojaclientes = XLSX.utils.json_to_sheet(cliente);
      XLSX.utils.book_append_sheet(libroclientes, hojaclientes, "Backups");
      XLSX.writeFile(libroclientes, "clientes.xlsx");
      //factcond
      const librofactcond = XLSX.utils.book_new();
      const hojafactcond = XLSX.utils.json_to_sheet(factcond);
      XLSX.utils.book_append_sheet(librofactcond, hojafactcond, "Backups");
      XLSX.writeFile(librofactcond, "factcond.xlsx");

      //cotizacion
      const librocotizacion = XLSX.utils.book_new();
      const hojacotizacion = XLSX.utils.json_to_sheet(cotizacion);
      XLSX.utils.book_append_sheet(librocotizacion, hojacotizacion, "Backups");
      XLSX.writeFile(librocotizacion, "cotizacion.xlsx");

      //cotizacioncond
      const librocotizacioncond = XLSX.utils.book_new();
      const hojacotizacioncond = XLSX.utils.json_to_sheet(cotizacioncond);
      XLSX.utils.book_append_sheet(librocotizacioncond, hojacotizacioncond, "Backups");
      XLSX.writeFile(librocotizacioncond, "cotizacioncond.xlsx");

      //cotizaciondet
      const librocotizaciondet = XLSX.utils.book_new();
      const hojacotizaciondet = XLSX.utils.json_to_sheet(cotizaciondet);
      XLSX.utils.book_append_sheet(librocotizaciondet, hojacotizaciondet, "Backups");
      XLSX.writeFile(librocotizaciondet, "cotizaciondet.xlsx");
      
      //direccion
      const librodireccion = XLSX.utils.book_new();
      const hojadireccion = XLSX.utils.json_to_sheet(direccion);
      XLSX.utils.book_append_sheet(librodireccion, hojadireccion, "Backups");
      XLSX.writeFile(librodireccion, "direccion.xlsx");
      
      
   };

   if (
      producto.length > 0 &&
      materiaprima.length > 0 &&
      prodmp.length > 0 && 
      factura.length > 0 &&
      factdet.length > 0 &&
      cliente.length > 0 &&
      direccion.length > 0 && 
      factcond.length > 0 && 
      cotizacion.length > 0 &&
      cotizacioncond.length > 0 &&
      cotizaciondet.length > 0
      // tabla.length > 0
   ) {
      downloadBackup();
   }
   return (
      <div id="element-to-hide" data-html2canvas-ignore="true">
         <div>&nbsp;</div>
         <div>&nbsp;</div>
         <h3>Generando Backup</h3>
         {producto.length > 0 ? <p>Productos ok</p> : <p>Buscando Productos</p>}
         {materiaprima.length > 0 ? (<p>Materia Prima ok</p>) : (<p>Buscando Materia Prima</p>)}
         {prodmp.length > 0 ? (<p>Productos Materia Prima ok</p>) : (<p>Buscando Productos Materia Prima</p>)}
         {factura.length > 0 ? (<p>Factura ok</p>) : (<p>Buscando Facturas</p>)}
         {factdet.length > 0 ? (<p>Factdet ok</p>) : (<p>Buscando Factdets</p>)}
         {factcond.length > 0 ? (<p>FactCond ok</p>) : (<p>Buscando FactCond</p>)}
         {cliente.length > 0 ? (<p>Cliente ok</p>) : (<p>Buscando Cliente</p>)}
         {direccion.length > 0 ? (<p>Direccion ok</p>) : (<p>Buscando Direccion</p>)}
         {cotizacion.length > 0 ? (<p>Cotizacion ok</p>) : (<p>Buscando Cotizacion</p>)}
         {cotizacioncond.length > 0 ? (<p>Cotizacioncond ok</p>) : (<p>Buscando Cotizacioncond</p>)}
         {cotizaciondet.length > 0 ? (<p>Cotizaciondet ok</p>) : (<p>Buscando Ctizaciondet</p>)}
         <p>Por Favor Espere... </p>
      </div>
   );
};
export default Backup;
