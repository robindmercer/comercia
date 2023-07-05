/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FaBell } from "react-icons/fa";
import Cookies from 'universal-cookie'

export default function ShoppingCartBtn() {
   const cookies = new Cookies();
   var cot = cookies.get("cot");
   var fac = cookies.get("fac");

   return (
      <>
         <div>
            {cot > 0 ? (
               <>
                  <a href="cotizacion">
                     <FaBell
                        style={{
                           marginTop: "-15px",
                           height: "20px",
                           width: "27px",
                           color: "#0000ff",
                        }}
                        title="Cotizaciones"
                     />
                  </a>
                  <span>{cot}</span>&nbsp;&nbsp;&nbsp;
               </>
            ) : null}
            {fac > 0 ? (
               <>
                  <a href="factura">
                     <FaBell
                        style={{
                           marginTop: "-15px",
                           height: "20px",
                           width: "27px",
                           color: "#1cf42d",
                        }}
                        title="Ordenes de Compra"
                     />
                  </a>
                  <span>{fac}</span>
               </>
            ) : null}
         </div>
      </>
   );
}
