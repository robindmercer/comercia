import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClienteATC } from "../../../actions/cliente";
import { getUsuariomenId } from "../../../actions/usuariomenu";
import { Link } from "react-router-dom";
import Header from '../../Header';
import { FcAddDatabase } from 'react-icons/fc'
import Cookies from 'universal-cookie'
import '../../../css/all.css'
import TicketVer from "./TicketVer";

// import Modal from "../../components/modal"
const Cliente = () => {
    const cookies = new Cookies();
    const { cliente } = useSelector((state) => state);
    const dispatch = useDispatch();
    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };
    const [acceso, setAcceso] = useState("A"); 
    const id_usuario = cookies.get("usuario");
    // const usuariomenu = useSelector((state) => state.usuariomenu);
    // const { porciva } = useSelector((state) => state);
    // const idProg = 6; // es el nivel 
    // const [openModal, SetOpenModal]=useState(false);

    useEffect(() => {
        dispatch(getClienteATC());
        dispatch(getUsuariomenId(id_usuario));
        setAcceso(cookies.get("acceso"));
    }, [dispatch]);

    const [nombre, setName] = useState("");
    
    function handleInputChange(e) {
        
        if (e.key === "Enter") {
            dispatch((nombre));
            setName('');
        }
    }
    //console.log('cliente: ', cliente);
    return (
        <>
            <Header />
            <div className="adminHeader  bg-white">
                <br />
                <div >
                    <div className="divHeader">
                        <div>
                            <h2>Atención a Clientes</h2>
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
                    </div>
                </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>Razon Social</th>
                            <th>Nombre</th>
                            <th>Moneda</th>
                            <th>O.C.</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cliente && cliente.map(data => {
                            return (
                                <tr key={data.id} >
                                    {/* <td>{data.id}</td> */}
                                    <td>{data.razsoc}</td>
                                    <td>{data.nombre}</td>
                                    <td>{data.monedades}</td>
                                    <td>{data.fac_id}</td>
                                    <td>{parseInt(data.total)}</td>
                                    <td>
                                        <Link
                                            title="Datos"
                                            to={'/ticketVer'}
                                            className="dLink"
                                            state={
                                                {
                                                    facid:data.fac_id,
                                                    razsoc:data.razsoc,
                                                }
                                            }

                                        > <FcAddDatabase style={estilo}
                                            onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                            onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
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

export default Cliente;

