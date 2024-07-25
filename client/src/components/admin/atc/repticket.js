import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketRep,CloseTicket } from "../../../actions/ticket";
import { getUsuariomenId } from "../../../actions/usuariomenu";
import { Link } from "react-router-dom";
import Header from '../../Header';
import { FcAbout, FcPrint,FcDeleteRow,FcInternal,FcMultipleSmartphones  } from 'react-icons/fc'
import Cookies from 'universal-cookie'
import '../../../css/all.css'
import TicketVer from "./TicketVer";

// import Modal from "../../components/modal"
const RepTicket = () => {
    const cookies = new Cookies(); 
    const { ticket } = useSelector((state) => state);
    const dispatch = useDispatch();
    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };
    const [acceso, setAcceso] = useState("A"); 
    const id_usuario = cookies.get("usuario");
    const perfil = cookies.get("perfil");
    var fechaCierre = ""
    // const usuariomenu = useSelector((state) => state.usuariomenu);
    // const { porciva } = useSelector((state) => state);
    // const idProg = 6; // es el nivel 
    // const [openModal, SetOpenModal]=useState(false);

    useEffect(() => {
        dispatch(getTicketRep());
        dispatch(getUsuariomenId(id_usuario));
        setAcceso(cookies.get("acceso"));
    }, [dispatch]);

    const [nombre, setName] = useState("");
    
    // cookies.remove('tckfac')
    // cookies.remove('tckraz')
    
    function handleInputChange(e) {
        
        if (e.key === "Enter") {
            dispatch((nombre));
            setName('');
        }
    }

    const handleClose = (id) => {
        dispatch(CloseTicket(id));
        window.location.href = '/TicketVer';
    }

    return (
        <>
            <Header />
            <div className="adminHeader  bg-white">
                <br />
                <div >
                    <div className="divHeader">
                        <div>
                            <h2>Tickets Reportes</h2>
                        </div>
                    </div>
                </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>Numero Cliente</th>
                            <th>Razon Social</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticket && ticket.map(data => {
                            return (
                                <tr key={data.id} >
                                    <td>{data.cli_id}</td>
                                    <td>{data.razsoc}</td>
                                    <td>
                                        <Link
                                            title="Datos"
                                            to={'/repticketdet'}
                                            className="dLink"
                                            state={
                                                {
                                                    cli_id      : data.cli_id,
                                                }
                                            }
                                        > <FcPrint style={estilo}
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

export default RepTicket;

