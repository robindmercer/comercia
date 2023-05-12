//robin
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducto } from "../../../actions/producto";
import { Link } from "react-router-dom";
import '../../../css/producto.css'
import Header from '../../Header';
import imagen from "../../../images/great-britain.png"
//Iccons 
import { FcEngineering, FcAcceptDatabase } from 'react-icons/fc'



const Producto = () => {
    const { producto } = useSelector((state) => state);
    const dispatch = useDispatch();
    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };

    useEffect(() => {
        dispatch(getProducto());
    }, [dispatch]);
    //   //const navigate = useNavigate();
    
    console.log('producto: ', producto);

//   const handleDelete = (id) => {
//  //   dispatch(delAdmin(id_categ,'categories','id_categ','categ'))
//  //   window.location.href = '/admin/listCategory';
// //   console.log('Deleted',id);
//     dispatch(ChangeStatus(id));
//     dispatch(getProducto());
// }

  return (
    <>
    <Header />
    <div className="cabprod  bg-white">
    <br/>
     
    <div className="divHeader">
                    <div>
                        <h2>Productos</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div>
                        <Link
                            to={'/formProducto'}
                            title="Alta Producto"
                            className="dLink"
                            state={
                                {
                                    id: 0,
                                    name: "",
                                    description: "",
                                    price: 0,
                                    cod_status: 1
                                }
                            }
                        > 🖋️
                        </Link>&nbsp;&nbsp;
                    </div>
                </div>
     <div>

     <table   className="styled-table">
     <thead>
         <tr className="table-success">
             <th>Id</th>
             <th>Nombre</th>
             <th className="d-none d-lg-table-cell">Descripcion</th>
             <th className="d-none d-lg-table-cell">Precio</th>
             <th className="d-none d-lg-table-cell">Dolar</th>
             <th className="d-none d-lg-table-cell">Estado</th>
             <th >Acciones</th>
         </tr>
     </thead>
     <tbody>
         {producto && producto.map(prod => { 
             return (
                 <tr key={prod.id}>
                     <td>{prod.id}</td>
                     <td>{prod.name}</td>
                     <td className="d-none d-lg-table-cell">{prod.description}</td>
                     <td className="d-none d-lg-table-cell">{prod.price}</td>
                     <td className="d-none d-lg-table-cell">{prod.dolar}</td>
                     <td className="d-none d-lg-table-cell">{prod.status.description}</td>
                     <td>
                         <Link
                             to={'/formProducto'}
                             title="Modificación Producto"
                             state={
                                 {
                                    id: prod.id,
                                     name: prod.name,
                                     description:prod.description ,
                                     price: prod.price,
                                     dolar: prod.dolar,
                                     cod_status: prod.cod_status                                 
                                    }
                                }
                                >
                             <FcAcceptDatabase  style={estilo} />
                         </Link>&nbsp;&nbsp;
                         <Link
                             to={'/prodmp'}
                             title="Ver Materias Primas"
                             state={
                                 {
                                    id: prod.id,
                                     name: prod.name
                                    }
                                }
                                >
                             <FcEngineering
                                            style={estilo}
                                            />
                         </Link>&nbsp;&nbsp;
                         <Link
                             to={'/formProductoLang'}
                             title="Modificación Producto"
                             state={
                                 {
                                     id: prod.id,
                                     name: prod.name,
                                     description:prod.description ,
                                     price: prod.price,
                                     dolar: prod.dolar,
                                     cod_status: prod.cod_status                                 
                                    }
                                }
                                >
                               <img height="30px" width="30px" src={imagen}  alt=""/>
                         </Link>&nbsp;&nbsp;
                     </td>
                 </tr>
             )
            })}
     </tbody>
 </table>
     </div>
</div>
             </>
  )
};

export default Producto;

