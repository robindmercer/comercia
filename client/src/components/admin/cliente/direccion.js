import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDireccion } from "../../../actions/direccion";
import { Link } from "react-router-dom";
import '../../../css/all.css'
import Header from '../../Header';

const Direccion = () => {
    const location = useLocation();
    const { direccion } = useSelector((state) => state);
    const { state } = location;
    const dispatch = useDispatch();

    console.log('state.id: ', state);
    useEffect(() => {
        dispatch(getDireccion(state.id));
    }, [dispatch,state.id]);
    console.log('direccion: ', direccion);
    if (direccion.length > 0) {
    return (
        <>
            <Header />
            <div className="adminHeader bg-white">
                <br />
                <div >
                    <div className="divHeader">
                        <div>
                            <h2>Direcciones</h2>
                        </div>
                        <div>
                            <Link
                                to={'/formDireccion'}
                                className="dLink"
                                state={
                                    {
                                        id: 0,
                                        cli_id:state.id, 
                                        orden: direccion.length + 1,
                                        calle: "",
                                        localidad: "",
                                        cp: "",
                                        ciudad: "",
                                        pais: "",
                                        cod_tipo: 1,
                                        cod_status: 1,
                                    }
                                }
                                > 🖋️
                            </Link>&nbsp;&nbsp;
                        </div>
                    </div>
                </div>
                <div className="adminHeader divlbldir">
                    <label>Cliente : <b>{direccion[0].nombre}</b></label>
                </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Calle</th>
                            <th>Localidad</th>
                            <th>CP</th>
                            <th>Ciudad</th>
                            <th>Pais</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {direccion && direccion.map(data => {
                            return (
                                <tr key={data.id} >
                                    <td>{data.id}</td>
                                    <td>{data.calle}</td>
                                    <td>{data.localidad}</td>
                                    <td>{data.cp}</td>
                                    <td>{data.ciudad}</td>
                                    <td>{data.pais}</td>
                                    <td>{data.tipo}</td>
                                    <td>{data.stsdesc}</td>
                                    <td>
                                        <Link
                                            to={'/formDireccion'}
                                            className="dLink"
                                            state={
                                                {
                                                    id: data.id,
                                                    cli_id:state.id, 
                                                    orden: data.orden,
                                                    calle: data.calle,
                                                    localidad: data.localidad,
                                                    cp: data.cp,
                                                    ciudad: data.ciudad,
                                                    pais: data.pais,
                                                    cod_tipo: data.cod_tipo,
                                                    cod_status: data.cod_status
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
    }else {
        return (
            <>
            <Header />
            <div className="adminHeader">
                <br />
                <div >
                    <div className="divHeader">
                        <div>
                            <h2>Direcciones</h2>
                        </div>
                        <div>
                            <Link
                                to={'/formDireccion'}
                                className="dLink"
                                state={
                                    {
                                        id: 0,
                                        cli_id:state.id, 
                                        orden: direccion.length + 1,
                                        calle: "",
                                        localidad: "",
                                        cp: "",
                                        ciudad: "",
                                        pais: "",
                                        cod_tipo: 1,
                                        cod_status: 1,
                                    }
                                }
                                > 🖋️
                            </Link>&nbsp;&nbsp;
                        </div>
                    </div>
                </div>
                <div className="divlbldir">
                    <label>Cliente {state.id}</label>
                </div>
            </div>
            </>
        );
    
      }
};

export default Direccion;

