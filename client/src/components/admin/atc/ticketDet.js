import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTicketDet,CloseTicket } from "../../../actions/ticket";
import { getUsuariomenId } from "../../../actions/usuariomenu";
import { Link } from "react-router-dom";
import Header from '../../Header';
import { FcAbout, FcAddDatabase,FcDeleteRow,FcInternal,FcMultipleSmartphones  } from 'react-icons/fc'
import Cookies from 'universal-cookie'
import '../../../css/all.css'
import TicketVer from "./TicketVer";
import { initializeConnect } from "react-redux/es/components/connect";

// import Modal from "../../components/modal"
const Cliente = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const location = useLocation();
    const { state } = location;
    const { ticketDet } = useSelector((state) => (state));
    const dispatch = useDispatch();
    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };
    const [acceso, setAcceso] = useState("A"); 
    const id_usuario = cookies.get("usuario");
    const perfil = cookies.get("perfil");
    const vuelvoA = "/ticket"
    var fechaCierre = ""
    // const usuariomenu = useSelector((state) => state.usuariomenu);
    // const { porciva } = useSelector((state) => state);
    // const idProg = 6; // es el nivel 
    // const [openModal, SetOpenModal]=useState(false);

    useEffect(() => {
        dispatch(getTicketDet(state.id));
        dispatch(getUsuariomenId(id_usuario));
        setAcceso(cookies.get("acceso"));
    }, [dispatch]);

    const [nombre, setName] = useState("");
    
    cookies.remove('tckfac')
    cookies.remove('tckraz')
    
    function handleInputChange(e) {
        
        if (e.key === "Enter") {
            dispatch((nombre));
            setName('');
        }
    }
//    const grabar = (id) => {
//    }
    const handleClose = (id) => {
        dispatch(CloseTicket(id));
        window.location.href = '/Ticket';
    }
    if (ticketDet.length === 0){
        return (null)
        } else {
            
            console.log('ticketDet: ', ticketDet);
        return (
        <>
            <Header />
            <div className="adminHeader  bg-white">
                <br />
                <div >
                    <div className="divHeader">
                        <div>
                            <h2>Tickets: {ticketDet[0].id}</h2>
                            <h2>Nombre: {ticketDet[0].razsoc}</h2>
                        </div>
                        <div>
                        <Link
                            title="Datos"
                            to={'/ticketFormAlta'}
                            className="dLink"
                            state={
                                {
                                id:0,
                                tck_id:ticketDet[0].id,
                                tck_linea:ticketDet[0].nextlinea,
                                cli_id:ticketDet[0].cli_id,
                                cod_status:1,
                                nombre: ticketDet[0].nombre,
                                apellido: ticketDet[0].apellido,
                                razsoc: ticketDet[0].razsoc,
                                serie: ticketDet[0].serie
                                }
                            }>
                            <FcAddDatabase style={estilo}
                            title="Alta Ticket"
                            onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                            onMouseLeave={({ target }) => target.style.fontSize = "200%"}
                            />
                        </Link>                         
                        </div>
                    </div>
                </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            {/* <th>Numero Cliente</th>
                            <th>Razon Social</th> */}
                            <th>Linea Ticket</th>
                            <th>Descripcion</th>
                            <th>Estado</th>
                            <th>Alta</th>
                            <th>Cierre</th>
                            <th>Area Responsable</th>
                            <th>Prioridad</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketDet && ticketDet.map(data => {
                            fechaCierre = data.cierre
                            if (fechaCierre === '01/01/1900'){
                                fechaCierre="- - - - -"
                            }

                            return (
                                <tr key={data.tck_linea} >
                                    {/* <td>{data.cli_id}</td>
                                    <td>{data.razsoc}</td> */}
                                    <td>{data.tck_linea}</td>
                                    <td>{data.description.substring(0,70)}</td>
                                    <td>{data.estado}</td>
                                    <td>{data.alta}</td>
                                    <td>{fechaCierre}</td>
                                    <td>{data.perfildes}</td>
                                    <td>{data.prioridaddes}</td>
                                    <td>
                                        <Link
                                            title="Datos"
                                            to={'/ticketForm'}
                                            className="dLink"
                                            state={
                                                {
                                                    id          : data.id,
                                                    tck_id      : data.tck_id,
                                                    tck_linea   : data.tck_linea,
                                                    nombre      : data.nombre,
                                                    apellido    : data.apellido,
                                                    razsoc      : data.razsoc,
                                                    serie       : data.serie,
                                                    analisis    : data.analisis,
                                                    description : data.description,
                                                    evidencia   : data.evidencia,
                                                    evi_act     : data.evi_act,
                                                    detecta     : data.detecta,
                                                    porque1     : data.porque1,
                                                    porque2     : data.porque2,
                                                    porque3     : data.porque3,
                                                    porque4     : data.porque4,
                                                    porque5     : data.porque5,
                                                    conclusion  : data.conclusion,
                                                    chkbox      : data.chkbox,
                                                    responsable : data.responsable,
                                                    cli_id      : data.cli_id,
                                                    perfil      : data.perfil,
                                                    prioridad   : data.prioridad,
                                                    cod_status  : data.cod_status,
                                                    actividad   : data.actividad,
                                                    fact        : data.fact
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
                                            // onClick={() => handleRemove(data.id)}
                                         />&nbsp;&nbsp;
                                    
                                         <FcInternal style={estilo}
                                            title="Cerrar Ticket"
                                            onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                            onMouseLeave={({ target }) => target.style.fontSize = "200%"}
                                            onClick={() => handleClose(data.id)}
                                         /> &nbsp;&nbsp; 
                                    
                                        {/* <Link
                                            title="Datos"
                                            to={'/ticketDet'}
                                            className="dLink"
                                            state={
                                                {
                                                    id:data.id
                                                }
                                            }>
                                            <FcMultipleSmartphones style={estilo}
                                            title="Ver Cadena"
                                            onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                            onMouseLeave={({ target }) => target.style.fontSize = "200%"}
                                            />
                                        </Link>                                         */}
                                    </td>
                                    
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button
                    className="nibbotBtn"
                    onClick={() => {
                        navigate(vuelvoA);
                    }}
                >
                VOLVER
                </button>
      </div>            
        </>
    )
};
}

export default Cliente;

