//robin
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMateriaprima,getMPByName } from "../../actions/materiaprima";
import { Link } from "react-router-dom";
import '../../css/all.css'
import Header from '../Header';
// Iconos 
//import { FcHome, FcBusinessman } from 'react-icons/fc'

const Materiaprima = () => {
    const { materiaprima } = useSelector((state) => state);
    //const [detail, Setdetail] = useState(false);
    const dispatch = useDispatch();
    const [nombre, setName] = useState("");
    //const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };

    useEffect(() => {
        //Setdetail(false);
        dispatch(getMateriaprima());
    }, [dispatch]);
    //   //const navigate = useNavigate();
    function handleInputChange(e) {

        if (e.key === "Enter") {
            dispatch(getMPByName(e.target.value));
            setName('');
        }
    }
    console.log('materiaprima: ', materiaprima);
    //    const verDetalle = (id) =>{
    //       dispatch(getDetail(id));
    //       Setdetail(true);
    //     }

    console.log('id: : ', materiaprima.id);

    return (
        <>
            <Header />
            <div className="adminHeader">
                <br />
                <div>
                    <div className="divHeader">
                        <div>
                            <h2>Materia Prima</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div>
                                   <input
                                onKeyPress={(e) => handleInputChange(e)}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="search-navbar"
                                placeholder="Buscar..."
                                value={nombre}
                            />
                        </div>
                        <div>
                            <Link
                                to={'/formMateriaprima'}
                                className="dLink"
                                title="Crear M.P."
                                state={
                                    {
                                        id: 0,
                                        name: "",
                                        description: "",
                                        udm: "",
                                        stock:0,
                                        stockmin:0
                                    }
                                }
                            > 🖋️
                            </Link>&nbsp;&nbsp;
                        </div>
                    </div>
                </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th >Id</th>
                            <th >Codigo</th>
                            <th >Descripcion</th>
                            <th >Unidad de medida </th>
                            <th >Stock Minimo </th>
                            <th >Stock Actual </th>
                            <th >Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materiaprima && materiaprima.map(data => {
                            return (
                                <tr key={data.id} >
                                    <td >{data.id}</td>
                                    <td >{data.name}</td>
                                    <td >{data.description}</td>
                                    <td >{data.udm}</td>
                                    <td >{data.stockmin}</td>
                                    <td >{data.stock}</td>
                                    <td >
                                        <Link
                                            to={'/formMateriaprima'}
                                            className="dLink"
                                            title="Actualizar M.P."
                                            state={
                                                {
                                                    id: data.id,
                                                    name: data.name,
                                                    description: data.description,
                                                    udm: data.udm,
                                                    stock: data.stock,
                                                    stockmin: data.stockmin
                                                }
                                            }
                                        >
                                            🖋️
                                        </Link>&nbsp;&nbsp;
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

export default Materiaprima;

