//robin
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from '../../menuNibbot';
//import Header from '../Header';

import { getUsuariomenId, ChangeUsrAcceso,DeleteUsrAcceso } from "../../actions/usuariomenu";
// Iconos
import { FcLeft } from 'react-icons/fc'
//import '../../css/all.css'
import '../../css/usuario.css'


function  AbmMenu() {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    //const actlogin = useSelector((state) => state.actlogin)
    const { usuariomenu } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [onChange, setOnChange] = useState(false)
    const estilo = { fontSize: "250%", transition: 'font-size 0.5s' };

    const [input, setInput] = useState({
        usrid: '',
        nivel: 0,
        accion: '',
    });

    useEffect(() => {
        console.log('AbmMenu', state.idacceso);
        dispatch(getUsuariomenId(state.idacceso));
    }, [dispatch, onChange,state.idacceso]);

    if (usuariomenu) {
        console.log('usuariomenu: ', usuariomenu);
        var nivel = []
        if (usuariomenu.message !== 'No pude acceder a Menus'){
        usuariomenu.forEach(e => {
            nivel.push(e.nivel)
        })
    };
    }

    const verDetalle = (id, sts) => {
        setInput(input.usrid = state.idacceso)
        setInput(input.nivel = id)
        setInput(input.accion = sts)
        if (sts === ''){
            dispatch(DeleteUsrAcceso(input));
        } else {
            dispatch(ChangeUsrAcceso(input));
        }
        if (onChange) {
            setOnChange(false)
        } else {
            setOnChange(true)
        }
        window.location.href = '/abmmenu';
    }

    console.log('usuariomenu: ', usuariomenu);
    //console.log('AbmMenu: ', actlogin);
    console.log('MenuItems: ', menuItems);

    return (
        <>
        
        
        <div className="divheader">
            <div >
                <table className="styled-table">
                    <thead>
                        <tr><th colSpan='4' className="lblname">{state.nombre}</th></tr>
                        <tr><th colSpan='4'>Referencia :&nbsp;&nbsp; A = Acceso Total&nbsp;&nbsp; C = Solo consulta&nbsp;&nbsp; E = Eliminar Acceso
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FcLeft style={estilo}
                              title='Volver'
                              onClick={() => { navigate("/usuarios"); }} />
                        </th></tr>
                        <tr><th>Opciones</th><th>Head</th><th>Detail</th><th>Acceso</th></tr>
                    </thead>
                    <tbody>
                        {menuItems.map((menu, index) => {
                            //if (nivel.includes(menu.nivel) || menu.nivel === 0) {
                            var subm = menu.submenu;
                            var acceso = ""
                            if (usuariomenu){
                            for (var i = 0; i < usuariomenu.length; i++) {
                                if (usuariomenu[i].nivel === menu.nivel) {
                                    acceso = usuariomenu[i].accion
                                }
                            }}
                            return (
                                <>
                                    <tr key={index}>
                                        <td>
                                            <button className='nibbotBtn' onClick={() => verDetalle(menu.nivel, 'A')}>A</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button className='nibbotBtn' onClick={() => verDetalle(menu.nivel, 'C')}>C</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button className='nibbotBtn' onClick={() => verDetalle(menu.nivel, '')}>E</button>
                                        </td>
                                        <td colSpan='2'>{menu.title}&nbsp;{menu.nivel}</td><td>{acceso}</td></tr>
                                    {subm && subm.map((data, indx) => {
                                        acceso = "";
                                        for (var i = 0; i < usuariomenu.length; i++) {
                                            if (usuariomenu[i].nivel === data.nivel) {
                                                acceso = usuariomenu[i].accion
                                            }
                                        }
                                        return (
                                            <tr key={indx}>
                                                <td>
                                                    <button className='nibbotBtn' onClick={() => verDetalle(data.nivel, 'A')}>A</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button className='nibbotBtn' onClick={() => verDetalle(data.nivel, 'C')}>C</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button className='nibbotBtn' onClick={() => verDetalle(data.nivel, '')}>E</button>
                                                </td>
                                                <td>&nbsp;</td><td>{data.title}</td><td>{acceso}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                </>

                            );
                            //}
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default AbmMenu;
