//robin
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducto } from "../actions/producto";
import { getMateriaprima, getProdmp } from "../actions/materiaprima";
import { getFacturaBckp } from "../actions/factura";
import { getFacturaDetAll } from "../actions/factdet";

import * as XLSX from "xlsx";

const Backup = () => {
   const { producto } = useSelector((state) => state);
   const { materiaprima } = useSelector((state) => state);
   const { prodmp } = useSelector((state) => state);
   const { factura } = useSelector((state) => state);
   const { factdet } = useSelector((state) => state);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getProducto());
      dispatch(getMateriaprima());
      dispatch(getProdmp());
      dispatch(getFacturaBckp());
      dispatch(getFacturaDetAll());      
   }, [dispatch]);

   const downloadBackup = () => {
      //Productos
      const libroProd = XLSX.utils.book_new();
      const hoja = XLSX.utils.json_to_sheet(producto);
      XLSX.utils.book_append_sheet(libroProd, hoja, "Backups");
      XLSX.writeFile(libroProd, "Producto.xlsx");

      //Materias Primas
      const libroMP = XLSX.utils.book_new();
      const hojaMP = XLSX.utils.json_to_sheet(materiaprima);
      XLSX.utils.book_append_sheet(libroMP, hojaMP, "Backups");
      XLSX.writeFile(libroMP, "MateriaPrima.xlsx");

      //Productos Materias Primas
      const libroPMP = XLSX.utils.book_new();
      const hojaPMP = XLSX.utils.json_to_sheet(prodmp);
      XLSX.utils.book_append_sheet(libroPMP, hojaPMP, "Backups");
      XLSX.writeFile(libroPMP, "ProdMateriaPrima.xlsx");
      //factura
      const libroFactura = XLSX.utils.book_new();
      const hojaFactura = XLSX.utils.json_to_sheet(factura);
      XLSX.utils.book_append_sheet(libroFactura, hojaFactura, "Backups");
      XLSX.writeFile(libroFactura, "Factura.xlsx");
      //factdet
      const librofactdet = XLSX.utils.book_new();
      const hojafactdet = XLSX.utils.json_to_sheet(factdet);
      XLSX.utils.book_append_sheet(librofactdet, hojafactdet, "Backups");
      XLSX.writeFile(librofactdet, "factdet.xlsx");

   };

   if (
      producto.length > 0 &&
      materiaprima.length > 0 &&
      prodmp.length > 0 && 
      factura.length > 0 &&
      factdet.length > 0
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
         {factdet.length > 0 ? (<p>Factdet ok</p>) : (<p>Buscando factdets</p>)}
         <p>Por Favor Espere... </p>
      </div>
   );
};
export default Backup;
