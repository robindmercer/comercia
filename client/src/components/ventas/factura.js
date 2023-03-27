import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFactura,getFacturaCab ,UpdateFacturaSts} from "../../actions/factura";
import { Link } from "react-router-dom";
import Header from '../Header';
import { FcAddDatabase,FcApproval } from 'react-icons/fc'
import style from '../../css/factura.module.css'
import { AccessCtrl } from '../../actions/index'
import {getUsuariomenId} from '../../actions/usuariomenu'
import { getDetail } from "../../actions/tabla";
// import crearMail from "../CrearMails";
// import { mailEnviar } from "../../actions/index";

const Factura = () => {
    const idProg = 11;
    const id_usuario = localStorage.getItem("usuario");
    const { factura } = useSelector((state) => state);
    const { factcab } = useSelector((state) => state)    
    // const actlogin = useSelector((state) => state.actlogin)
    const usuariomenu = useSelector((state) => state.usuariomenu)
    const dispatch = useDispatch();
    const dollarUSLocale = Intl.NumberFormat('de-DE');
    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };
    const [acceso, setAcceso] = useState('A')
    const { tabla } = useSelector((state) => state);    
    
    useEffect(() => {
        console.log('Factura Use Efect');
        dispatch(AccessCtrl(id_usuario));
        dispatch(getFactura());
        dispatch(getUsuariomenId(id_usuario));
        if (usuariomenu){
            for (var i = 0; i < usuariomenu.length; i++) {
                if (usuariomenu[i].nivel === idProg){
                    setAcceso(usuariomenu[i].accion)
                } 
            } }
    }, [dispatch,id_usuario]);
    
    const handleSubmit = (id) => {
        var control = "x"
        // console.log('handleSubmit',id);
        const found = factura.find(element => element.id ===id);
        dispatch(getFacturaCab(found));
        // console.log('factura: ', factura);
        // console.log('factcab: ', factcab);
        if (factcab[0].desc_id !== 0){
            dispatch(getDetail(2));
            // console.log('factcab[0].desc_id: ', factcab[0].desc_id);
            // console.log('Tabla',tabla);
            for (var i = 0; i < tabla.length; i++) {
                if (parseInt(tabla[i].cod) === parseInt(factcab[0].desc_id)){
                    control = tabla[i].control
                }
            }
            // console.log('control: ', control);
        }
        if (control === "S"){
            dispatch(UpdateFacturaSts(id,4))
        } else {
            dispatch(UpdateFacturaSts(id,3))
        }
        //dispatch(mailEnviar(crearMail('Confeccionado', 'robindmercer@yahoo.com.ar',found)))
        // console.log('found: ', found);
        // console.log('subtotal: ', factura[0].subtotal);
        // console.log('usuariomenu: ', usuariomenu);
        // console.log('acceso: ', acceso);
        // console.log('factura: actlogin ', actlogin);
        window.location.href = '/factura';
    }
    
        
        
        
    return (
        <>
            <Header />
            <div className={style.adminHeader}>
                <br />
                <h2>Ordenes de Compra</h2>
                <table className={style.styledTable}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fecha</th>
                            <th>Nombre</th>
                            <th>Subtotal</th>
                            <th>IVA</th>
                            <th>Descuentos</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {factura && factura.message === undefined && factura.map(data => {
                            return (
                                <tr key={data.id} className="style.row">
                                    <td>{data.id}</td>
                                    <td>{data.fecha}</td>
                                    <td>{data.nombre}</td>
                                    <td>{dollarUSLocale.format(data.subtotal)}</td>
                                    <td>{dollarUSLocale.format(data.iva)}</td>
                                    <td>{dollarUSLocale.format(data.descuento)}</td>
                                    <td>{dollarUSLocale.format(data.total)}</td>
                                    <td>{data.stsdes}</td>
                                    <td>
                                        <Link
                                            to={'/formfactura'}
                                            className="dLink"
                                            state={
                                                {  
                                                    idfact: data.id,
                                                    idCli: 0
                                                }
                                            }
                                        >
                                            <FcAddDatabase style={estilo} title="Modificar"
                                                onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                                onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
                                        </Link>&nbsp;&nbsp;
                                        {acceso === "A" ? (
                                        <FcApproval style={estilo} title="Aprobar"
                                                onClick={() => { handleSubmit(data.id); }} 
                                                onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                                                onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
                                        ):(null)
                                        }
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

export default Factura;