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
                                serie: ticketDet[0].serie,
                                detecta: ticketDet[0].detecta,
                                description: ticketDet[0].description,
                                porque1: ticketDet[0].porque1,
                                porque2: ticketDet[0].porque2,
                                porque3: ticketDet[0].porque3,
                                porque4: ticketDet[0].porque4,
                                porque5: ticketDet[0].porque5,
                                analisis: ticketDet[0].analisis,
                                chkbox: ticketDet[0].chkbox,
                                evidencia: ticketDet[0].evidencia,
                                // actividad: ticketDet[0].actividad,
                                // evi_act: ticketDet[0].evi_act,
                                // conclusion: ticketDet[0].conclusion,
                                usr: id_usuario,
                                // perfil: ticketDet[0].perfil : 0,
                                // alta: hoy.toISOString().split("T")[0],
                                cierre: "19000101",
                                prioridad: ticketDet[0].prioridad,
                                responsable: ticketDet[0].responsable,                          
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
                                    <td>{data.nuevotck.substring(0,100)}</td>
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
                                                    actividad   : data.actividad,
                                                    analisis    : data.analisis,
                                                    apellido    : data.apellido,
                                                    chkbox      : data.chkbox,
                                                    cierre      : data.cierre,
                                                    cli_id      : data.cli_id,
                                                    cod_status  : data.cod_status,
                                                    conclusion  : data.conclusion,
                                                    description : data.description,
                                                    detecta     : data.detecta,
                                                    evi_act     : data.evi_act,
                                                    evidencia   : data.evidencia,
                                                    fact        : data.fact,
                                                    nombre      : data.nombre,
                                                    nextlinea   : data.nextlinea,
                                                    nuevotck    : data.nuevotck,
                                                    perfil      : data.perfil,
                                                    porque1     : data.porque1,
                                                    porque2     : data.porque2,
                                                    porque3     : data.porque3,
                                                    porque4     : data.porque4,
                                                    porque5     : data.porque5,
                                                    prioridad   : data.prioridad,
                                                    razsoc      : data.razsoc,
                                                    responsable : data.responsable,
                                                    serie       : data.serie,
                                                    tck_id      : data.tck_id,
                                                    tck_linea   : data.tck_linea,
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
                                    
                                         {/* <FcInternal style={estilo}
                                            title="Cerrar Ticket"
                                            onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                            onMouseLeave={({ target }) => target.style.fontSize = "200%"}
                                            onClick={() => handleClose(data.id)}
                                         /> &nbsp;&nbsp;  */}
                                    
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

