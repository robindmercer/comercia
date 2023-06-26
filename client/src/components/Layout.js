import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { AccessCtrl } from '../actions/index'
import { getDetailIva } from '../actions/tabla';
import { getUsuariomenId } from "../actions/usuariomenu";
import { RunSql } from "../actions/admin";
import '../App.css'

const Layout = () => {
  const id_usuario = localStorage.getItem("usuario");
  const id_pass = localStorage.getItem("pass");
  const actlogin = useSelector((state) => state.actlogin)
  // const { tabla } = useSelector((state) => state)
  const porciva = useSelector((state) => state.porciva)
  // const usuariomenu = useSelector((state) => state.usuariomenu);
  const { admin } = useSelector((state) => state);
  const [acceso, setAcceso] = useState("");
  const usuariomenu = useSelector((state) => state.usuariomenu);
  const dispatch = useDispatch()
  const [xstatus,setXstatus] = useState(0);
  useEffect(() => {
    dispatch(getDetailIva(1));
    dispatch(AccessCtrl(id_usuario));
    dispatch(getUsuariomenId(id_usuario));
    
    //getPendientes();
    // dispatch(GetMenu(id_usuario));
  }, [dispatch, id_usuario]);
  
  if (usuariomenu.length > 0 && acceso === "" && xstatus === 0) {
    var xAcceso=""
    var sts = 0
    // for (var i = 0; i < usuariomenu.length; i++) {
    //   console.log("usuariomenu: ", usuariomenu[i].nivel,usuariomenu[i].accion);
    //   if (usuariomenu[i].nivel === 12 && usuariomenu[i].accion === 'A') {
    //     console.log('doce');
    //     xAcceso = usuariomenu[i].accion + usuariomenu[i].cod_perfil;
    //   }
    //   if (usuariomenu[i].nivel === 11 && usuariomenu[i].accion === 'A') {
    //     console.log('once',usuariomenu[i].accion + usuariomenu[i].cod_perfil);
    //     xAcceso = usuariomenu[i].accion + usuariomenu[i].cod_perfil;
    //   }    
    // }    
    if (usuariomenu[0].accion === 'A') {
      xAcceso = usuariomenu[0].accion + usuariomenu[0].cod_perfil;
    }    

    sts = "0" // Default
    if (xAcceso ==="A1") sts = "2|2"      // Gerencia
    if (xAcceso ==="A2") sts = "99|3,4,5" // Adminsitracion 
    if (xAcceso ==="A3") sts = "1,3|1"    // Ventas
    if (xAcceso ==="A4") sts = "99|6"     // Planeacion
    if (xAcceso ==="A5") sts = "99|6,7"   // Manufactura
    if (xAcceso ==="A6") sts = "99|7,8"   // Compras
    
    setXstatus(99)
    console.log('xstatus-----------------------------------------', xstatus);
    console.log('acceso', xAcceso);
    console.log('usuariomenu: ', usuariomenu);
    if (sts !== "0"){
      dispatch(RunSql(sts))
    }
  }


  // console.log('LayOut------------------------------------');
  // console.log('data 1 : ', admin);
  // console.log('id_usuario: ', id_usuario);
  // console.log('admin: ', admin);
  // console.log('LayOut fin--------------------------------');
  if (porciva.length>0){
   localStorage.setItem('porciva',porciva[0].valor)
 }
 if (admin){
  for (var i = 0; i < admin.length; i++) {
    if (admin[i].tipo === 0 ) {
      localStorage.setItem('cot', admin[i].count)
    }
    if (admin[i].tipo === 1 ) {
      localStorage.setItem('fac', admin[i].count)
    }
  }
 }
  //console.log('actlogin.usr_id: ', actlogin[0].usr_id);
  // if (tabla) {
  //   console.log('Layout Tabla: ', tabla);
  //   //  setIva(tabla[0].valor)
  // }
  // console.log('actlogin: ', actlogin);
  if (actlogin.length > 0 && actlogin[0].password === id_pass) {
    return (
      <div>
       <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Por favor debe logonearse primero</h3>
        Haga click <a href="/" >aqui.</a></div>
    )
  }
};

export default Layout;
