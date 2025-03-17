//robin
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompania } from "../../../actions/compania";
import { Link } from "react-router-dom";
import style from "../../../css/compania.module.css";
import Header from "../../Header";
import { getTablaAll } from "../../../actions/tabla"

//Iccons
import { FcEngineering, FcAcceptDatabase } from "react-icons/fc";

const Compania = () => {
   const { compania } = useSelector((state) => state);
   const dispatch = useDispatch();
   const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
   const { tabla } = useSelector((state) => state);
   const [ordenar, setOrdenar] = useState(false);
   const [filtro, setFiltro] = useState("1");
   const [onChange, setOnChange] = useState(false);
   useEffect(() => {
      dispatch(getCompania());
      dispatch(getTablaAll());
   }, [dispatch]);



   var muestroRegistro = false;
   function handleChange(e) {
      e.preventDefault();
      setFiltro(e.target.value);
      if (onChange) {
         setOnChange(false);
      } else {
         setOnChange(true);
      }
      
      console.log("Filtro: ", filtro, "e", e.target.value);
   }
   console.log('compania: ', compania);
   return (
      <>
         <Header />
         <div className={style.container}>
            <br />

            <div className="divHeader">
               <div>
                  <h2>&nbsp;&nbsp;Companias&nbsp;&nbsp;</h2>&nbsp;&nbsp;
               </div>
               <div>
                  <label htmlFor="filtro">Filtrar:&nbsp;</label>
                  <select
                     // className={style.facinput}
                     name="filtro"
                     id="filtro"
                     onChange={(e) => handleChange(e)}
                     //  value={0}
                     placeholder="Seleccione un Estado a Filtrar"
                  >
                     <option value="0">Seleccionar</option>
                     {tabla &&
                        tabla.map((tabla) => {
                           if (tabla.id === 13 && tabla.cod !== 0) {
                              return (
                                 <option
                                    value={tabla.cod}
                                    key={tabla.cod}
                                 >{`${tabla.description}`}</option>
                              );
                           } else {
                              return null;
                           }
                        })}{" "}
                  </select>
               </div>
               <div>
                  <Link
                     to={"/formCompania"}
                     title="Alta Compania"
                     className="dLink"
                     state={{
                        id: 0,
                        name: "",
                        description: "",
                        cod_status: 1,
                     }}
                  >
                     {" "}
                     🖋️
                  </Link>
                  &nbsp;&nbsp;
               </div>
            </div>
            <div>
               <table className={style.clitab}>
                  <thead>
                     <tr className={style.trHeader}>
                        <th >Id</th>
                        <th >Razon Social</th>
                        <th >Nombre</th>
                        <th >Apellido</th>
                        <th>Acciones</th>
                     </tr>
                  </thead>
                  <tbody>
                     {compania &&
                        compania.map((comp) => {
                           muestroRegistro = true;
                        //    control(data);
                           if (filtro !== "" && filtro !== "0") {
                              if (
                                 parseInt(comp.cod_status) !== parseInt(filtro)
                              ) {
                                 muestroRegistro = false;
                              }
                           }
                           if (muestroRegistro) {
                              return (
                                 <tr key={comp.id}>
                                    <td >
                                       {comp.id}
                                    </td>
                                    <td >
                                       {comp.razsoc}
                                    </td>
                                    <td >
                                       {comp.nombre}
                                    </td>
                                    <td >
                                       {comp.apellido}
                                    </td>
                                    <td>
                                       <Link
                                          to={"/formCompania"}
                                          title="Modificación Compania"
                                          state={{
                                             id: comp.id,
                                             razsoc: comp.razsoc,
                                             nombre: comp.nombre,
                                             apellido: comp.apellido,
                                             email: comp.email,
                                             movil: comp.movil,
                                             fijo:comp.fijo,
                                             rfc_cod:comp.rfc_cod,
                                             cod_status: comp.cod_status,
                                          }}
                                       >
                                          <FcAcceptDatabase style={estilo} />
                                       </Link>
                                       &nbsp;&nbsp;
                                    </td>
                                 </tr>
                              );
                           } else {
                              return null;
                           }
                        })}
                  </tbody>
               </table>
            </div>
         </div>
      </>
   );
};

export default Compania;
