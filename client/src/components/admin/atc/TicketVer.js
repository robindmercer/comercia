import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTicket,DeleteTicket,CloseTicket } from "../../../actions/ticket";
import { Link } from "react-router-dom";
import '../../../css/all.css'
import Header from '../../Header';

import Cookies from 'universal-cookie'
import { FcAddDatabase, FcInternal, FcDeleteRow } from "react-icons/fc";
// import Modal from "../../components/modal"
const TicketVer = () => {
    const location = useLocation();
    const { state } = location;
    const cookies = new Cookies();
    const { ticket } = useSelector((state) => state);
    const dispatch = useDispatch();
    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };
    const [acceso, setAcceso] = useState("A"); 
    const id_usuario = cookies.get("usuario");
    var auxfac =  cookies.get("tckfac");
    var auxraz =  cookies.get("tckraz");
    
    console.log('cookies.get("tckfac");: ', cookies.get("tckfac"),auxfac);
    if (!auxfac) {
        cookies.set("tckfac",state.facid)
        cookies.set("tckraz",state.razsoc)
        auxfac =  cookies.get("tckfac");
        auxraz =  cookies.get("tckraz");
    }

    useEffect(() => {
        if (auxfac){
            dispatch(getTicket(auxfac));
        } else {
        dispatch(getTicket(state.facid));
        }
     }, []);
    
    const handleRemove = (id) => {
        dispatch(DeleteTicket(id))
        window.location.href = '/TicketVer';
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
                            <h3>Ticket {auxfac} - {auxraz}</h3>
                        </div>
                        <div>
                        {acceso.substring(0,1) === "A" ? (
                            <Link
                                to={'/ticketForm'}
                                className="dLink"
                                state={
                                    {
                                        id: 0,
                                        fac_id: auxfac
                                    }
                                }
                            > <FcAddDatabase style={estilo}
                                onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
                            </Link>
                             ) : null}
                        </div>
                    </div>
                </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Descripcion</th>
                            <th>Alta</th>
                            <th>Cierre</th>
                            <th>Usario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticket && ticket.map(data => {
                            return (
                                <tr key={data.id} >
                                    <td>{data.description}</td>
                                    <td>{data.alta}</td>
                                    <td>{data.cierre}</td>
                                    <td>{data.usr}</td>
                                    <td>
                                        <Link
                                            title="Datos"
                                            to={'/ticketForm'}
                                            className="dLink"
                                            state={
                                                {
                                                    id: data.id,
                                                    fac_id: auxfac,
                                                    description: data.description
                                                }
                                            }
                                        > <FcAddDatabase style={estilo}
                                            onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                            onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
                                        </Link>&nbsp;&nbsp;
                                         <FcDeleteRow style={estilo}
                                            title="Eliminar Ticket"
                                            onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                            onMouseLeave={({ target }) => target.style.fontSize = "200%"}
                                            onClick={() => handleRemove(data.id)}
                                         />
                                         <FcInternal style={estilo}
                                            title="Cerrar Ticket"
                                            onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                            onMouseLeave={({ target }) => target.style.fontSize = "200%"}
                                            onClick={() => handleClose(data.id)}
                                         />
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

export default TicketVer;

