import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCliente, getClienteByName } from "../../actions/cliente";
import { Link } from "react-router-dom";
import '../../css/all.css'
import Header from '../Header';
import { FcHome, FcBusinessman,FcCurrencyExchange } from 'react-icons/fc'

const Cliente = () => {
    const { cliente } = useSelector((state) => state);
    const dispatch = useDispatch();
    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };
    
    useEffect(() => {
        dispatch(getCliente());
    }, [dispatch]);

    const [nombre, setName] = useState("");
    
    function handleInputChange(e) {
        
        if (e.key === "Enter") {
            dispatch(getClienteByName(nombre));
            setName('');
        }
    }
    console.log('cliente: ', cliente);
    return (
        <>
            <Header />
            <div className="adminHeader">
                <br />
                <div >
                    <div className="divHeader">
                        <div>
                            <h2>Clientes</h2>
                        </div>
                        <div>
                            <label
                                htmlFor="id"
                            >
                                Buscar:&nbsp;
                            </label>
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
                                to={'/formCliente'}
                                className="dLink"
                                state={
                                    {
                                        id: 0,
                                        nombre: "",
                                        email: "",
                                        movil: "",
                                        fijo: "",
                                        rfc: "",
                                        cod_cliente: "1",
                                        cod_status: "1",
                                    }
                                }
                            > <FcBusinessman style={estilo}
                                onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
                            </Link>&nbsp;&nbsp;
                        </div>
                    </div>
                </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Movil</th>
                            <th>Fijo</th>
                            <th>Tipo Cliente</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cliente && cliente.map(data => {
                            return (
                                <tr key={data.id} >
                                    <td>{data.id}</td>
                                    <td>{data.nombre}</td>
                                    <td>{data.email}</td>
                                    <td>{data.movil}</td>
                                    <td>{data.fijo}</td>
                                    <td>{data.actividad}</td>
                                    <td>{data.stsdesc}</td>
                                    <td>
                                        <Link
                                            title="Datos"
                                            to={'/formCliente'}
                                            className="dLink"
                                            state={
                                                {
                                                    id: data.id,
                                                    nombre: data.nombre,
                                                    email: data.email,
                                                    movil: data.movil,
                                                    fijo: data.fijo,
                                                    rfc_cod: data.rfc_cod,
                                                    cod_cliente: data.cod_cliente,
                                                    cod_status: data.cod_status
                                                }
                                            }

                                        > <FcBusinessman style={estilo}
                                            onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                            onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
                                        </Link>&nbsp;&nbsp;
                                        <Link
                                            title="Dirección"
                                            to={'/direccion'}
                                            className="dLink"
                                            state={
                                                {
                                                    id: data.id,
                                                }
                                            }
                                        > <FcHome style={estilo}
                                            onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                            onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
                                        </Link>&nbsp;&nbsp;
                                        { parseInt(data.cantdir) > 0 ? (
                                        <Link
                                            title="Crear Venta"
                                            to={'/formfacturaAlta'}
                                            className="dLink"
                                            state={
                                                {
                                                    idCli: data.id,
                                                    idfact: 0
                                                }
                                            }>
                                        <FcCurrencyExchange style={estilo}
                                            onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                            onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
                                        </Link>
                                       ):null} 
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

export default Cliente;

