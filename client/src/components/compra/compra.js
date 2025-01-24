import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompras } from "../../actions/Compra.js";
import { Link } from "react-router-dom";
import style from "../../css/grid.module.css";
import Header from "../Header.js";
import edit from "../../images/edit.png";

const Compras = () => {
   // const [nombre, setName] = useState("");
   const { compra } = useSelector((state) => state);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getCompras());
   }, [dispatch]);

   const formatDate = (fecha) => {
      var newDate1 = fecha.substring(0, 10).split("-");
      var newdate2 = newDate1[2] + "/" + newDate1[1] + "/" + newDate1[0];
      return newdate2;
   };

   console.log("compras: ", compra);
   return (
      <>
         <Header />
         <div className={style.tableCli}>
            <div className={style.header}>
               <div className={style.gridTitle}>
                  <h2>Compras</h2>
               </div>
               <Link
                  to={"/formCompra"}
                  className="dLink"
                  title="Alta Compra"
                  state={{ id: 0, titulo: "", cod_status: 1, stock: 0 }}
               >
                  <img src={edit} height="30px" alt="" />
               </Link>
               &nbsp;&nbsp;
            </div>
         </div>
         <div>
            <table className={style.gridTable}>
               <thead>
                  <tr>
                     <th className={style.style_titulos}>Fecha</th>
                     <th>Descripcion</th>
                     <th>Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {compra &&
                     compra?.map((insu) => {
                        return (
                           <tr
                              key={insu.id}
                              className={
                                 parseInt(insu.cod_status) === 2
                                    ? style.trdatosRed
                                    : style.trdatos
                              }
                           >
                              <td className={style.style_code}>
                                 {formatDate(insu.fecha)}
                              </td>
                              <td className={style.style_td}>{insu.titulo}</td>
                              <td>
                                 <Link
                                    to={"/formCompra"}
                                    className="dLink"
                                    state={{
                                       id: insu.id,
                                       cod_status: insu.cod_status,
                                    }}
                                 >
                                    <img src={edit} height="30px" alt="" />
                                    {/* <FcAcceptDatabase style={estilo} /> */}
                                 </Link>
                                 &nbsp;&nbsp;
                              </td>
                           </tr>
                        );
                     })}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default Compras;
