import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTabla,getDetail } from "../../actions/tabla";
import { Link } from "react-router-dom";
import '../../css/all.css'
import Header from '../Header';
const Tabla = () => {
    const { tabla } = useSelector((state) => state);
    const [detail, Setdetail] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        Setdetail(false);
        dispatch(getTabla());
    }, [dispatch]);
    //   //const navigate = useNavigate();
    
    console.log('tabla: ', tabla);
   const verDetalle = (id) =>{
      dispatch(getDetail(id));
      Setdetail(true);
    }

    console.log('id: : ', tabla.id);

    return (
    <>
    <Header />
    <div  className="adminHeader">
     <br/>
     <div className="adminHeader divFlex">

     <h2>Tabla</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <Link
                             to={'/formTabla'}
                             state={
                                 {
                                     id: tabla.id,
                                     cod: 0,
                                     description: '',
                                     control:'N',
                                     valor:0,
                                     cod_status: 1
                                    }
                                }
                                >
                             🖋️
                         </Link>&nbsp;&nbsp;
     </div>
     <table className="styled-table">
     <thead>
         <tr>
             <th >Id</th>
             <th >Codigo</th>
             <th >Descripcion</th>
             {detail && (
             <th >Valor</th>
             )}
             <th >Estado</th>
             <th >Acciones</th>
         </tr>
     </thead>
     <tbody>
         {tabla && tabla.map(data => { 
             return (
                 <tr key={data.id+data.cod} >
                     <td >{data.id}</td>
                     <td >{data.cod}</td>
                     <td >{data.description}</td>
                     {detail && (
                     <td >{data.valor}</td>
                     )}
                     <td >{data.status.description}</td>
                     <td >
                         <Link
                             to={'/formTabla'}
                             state={
                                 {
                                     id: data.id,
                                     cod: data.cod,
                                     description: data.description,
                                     control: data.control,
                                     valor:data.valor,
                                     cod_status: data.cod_status                                 
                                    }
                                }
                                >
                             🖋️
                         </Link>&nbsp;&nbsp;
                         {!detail && (
                             <button onClick={() => verDetalle(data.id)}>Det</button>
                         )}
                     </td>
                 </tr>
             )
            })}
     </tbody>
 </table>
</div>
             </>
  )
};

export default Tabla;

