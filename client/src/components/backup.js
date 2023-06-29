//robin
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducto } from "../actions/producto";
import { getMateriaprima, getProdmp } from "../actions/materiaprima";

import * as XLSX from "xlsx";

const Backup = () => {
   const { producto } = useSelector((state) => state);
   const { materiaprima } = useSelector((state) => state);
   const { prodmp } = useSelector((state) => state);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getProducto());
      dispatch(getMateriaprima());
      dispatch(getProdmp());
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
   };

   if (
      producto.length > 0 &&
      materiaprima.length > 0 &&
      prodmp.length > 0
      // &&
      // factcab.length > 0 &&
      // factcond.length > 0 &&
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
         {materiaprima.length > 0 ? (
            <p>Materia Prima ok</p>
         ) : (
            <p>Buscando Materia Prima</p>
         )}
         {prodmp.length > 0 ? (
            <p>Productos Materia Prima ok</p>
         ) : (
            <p>Buscando Productos Materia Prima</p>
         )}
         <p>Por Favor Espere... </p>
      </div>
   );
};
export default Backup;
