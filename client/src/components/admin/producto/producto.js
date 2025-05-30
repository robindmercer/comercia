//robin
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducto } from "../../../actions/producto";
import { Link } from "react-router-dom";
import "../../../css/producto.css";
import Header from "../../Header";
import imagen from "../../../images/great-britain.png";
import { getTablaAll } from "../../../actions/tabla"

//Iccons
import { FcEngineering, FcAcceptDatabase } from "react-icons/fc";

const Producto = () => {
   const { producto } = useSelector((state) => state);
   const dispatch = useDispatch();
   const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
   const { tabla } = useSelector((state) => state);
   const [ordenar, setOrdenar] = useState(false);
   const [filtro, setFiltro] = useState("1");
   const [onChange, setOnChange] = useState(false);
   useEffect(() => {
      dispatch(getProducto());
      dispatch(getTablaAll());
   }, [dispatch]);

   const ordenar_Id = () => {
      setOrdenar(!ordenar,true,false);
      producto.sort((a, b) => a.id - b.id);
   }

   const ordenar_Orden = () => {
      setOrdenar(!ordenar,true,false);
         producto.sort((a, b) => {
            if (a.orden < b.orden) {
                return -1; // a should come before b in the sorted order
            } else if (a.orden > b.orden) {
                return 1; // a should come after b in the sorted order
            } else {
                return 0; // a and b are the same
            }
        });
      }

   const ordenar_Nombre = () => {
      setOrdenar(!ordenar,true,false);
         producto.sort((a, b) => {
            if (a.name < b.name) {
                return -1; // a should come before b in the sorted order
            } else if (a.name > b.name) {
                return 1; // a should come after b in the sorted order
            } else {
                return 0; // a and b are the same
            }
        });
   }


   //   //const navigate = useNavigate();
   var muestroRegistro = false;
   // console.log('producto: ', producto);

   //   const handleDelete = (id) => {
   //  //   dispatch(delAdmin(id_categ,'categories','id_categ','categ'))
   //  //   window.location.href = '/admin/listCategory';
   // //   console.log('Deleted',id);
   //     dispatch(ChangeStatus(id));
   //     dispatch(getProducto());
   // }
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
   return (
      <>
         <Header />
         <div className="cabprod  bg-white">
            <br />

            <div className="divHeader">
               <div>
                  <h2>&nbsp;&nbsp;Productos&nbsp;&nbsp;</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                     to={"/formProducto"}
                     title="Alta Producto"
                     className="dLink"
                     state={{
                        id: 0,
                        name: "",
                        description: "",
                        price: 0,
                        dolar: 0,
                        orden: "A1",
                        cod_status: 1,
                        id_interno:"",
                        stock:1,
                     }}
                  >
                     {" "}
                     🖋️
                  </Link>
                  &nbsp;&nbsp;
               </div>
            </div>
            <div>
               <table className="styled-table-prod">
                  <thead>
                     <tr className="table-success">
                        <th className="d-none d-lg-table-cell ordenado" onClick={() =>ordenar_Id()}  title="Ordenar">Id</th>
                        <th className="ordenado" onClick={() =>ordenar_Nombre()}  title="Ordenar">Nombre</th>
                        <th className="d-none d-lg-table-cell">Descripcion</th>
                        <th className="d-none d-lg-table-cell">Precio</th>
                        <th className="d-none d-lg-table-cell">Dolar</th>
                        <th  className="d-none d-lg-table-cell ordenado"   onClick={() =>ordenar_Orden()}  title="Ordenar">Orden</th>
                        <th className="d-none d-lg-table-cell" >Estado</th>
                        <th>Acciones</th>
                     </tr>
                  </thead>
                  <tbody>
                     {producto &&
                        producto.map((prod) => {
                           muestroRegistro = true;
                        //    control(data);
                           if (filtro !== "" && filtro !== "0") {
                              if (
                                 parseInt(prod.cod_status) !== parseInt(filtro)
                              ) {
                                 muestroRegistro = false;
                              }
                           }
                           if (muestroRegistro) {
                              return (
                                 <tr key={prod.id}>
                                    <td className="d-none d-lg-table-cell">
                                       {prod.id}
                                    </td>
                                    <td>{prod.name}</td>
                                    <td className="d-none d-lg-table-cell">
                                       {prod.description}
                                    </td>
                                    <td className="d-none d-lg-table-cell">
                                       {prod.price}
                                    </td>
                                    <td className="d-none d-lg-table-cell">
                                       {prod.dolar}
                                    </td>
                                    <td className="d-none d-lg-table-cell">
                                       {prod.orden}
                                    </td>                                    
                                    <td className="d-none d-lg-table-cell">
                                       {prod.estprod}
                                    </td>
                                    <td>
                                       <Link
                                          to={"/formProducto"}
                                          title="Modificación Producto"
                                          state={{
                                             id: prod.id,
                                             name: prod.name,
                                             description: prod.description,
                                             price: prod.price,
                                             dolar: prod.dolar,
                                             orden: prod.orden,
                                             cod_status: prod.cod_status,
                                             id_interno:prod.id_interno,
                                             stock:prod.stock,
                                          }}
                                       >
                                          <FcAcceptDatabase style={estilo} />
                                       </Link>
                                       &nbsp;&nbsp;
                                       <Link
                                          to={"/prodmp"}
                                          title="Ver Materias Primas"
                                          state={{
                                             id: prod.id,
                                             name: prod.name,
                                          }}
                                       >
                                          <FcEngineering style={estilo} />
                                       </Link>
                                       &nbsp;&nbsp;
                                       <Link
                                          to={"/formProductoLang"}
                                          title="Modificación Producto"
                                          state={{
                                             id: prod.id,
                                             name: prod.name,
                                             description: prod.description,
                                             price: prod.price,
                                             dolar: prod.dolar,
                                             cod_status: prod.cod_status,
                                          }}
                                       >
                                          <img
                                             height="30px"
                                             width="30px"
                                             src={imagen}
                                             alt=""
                                          />
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

export default Producto;
