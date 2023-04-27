import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { AccessCtrl } from '../actions/index'
import { getDetailIva } from '../actions/tabla';
import { getUsuariomenId } from "../actions/usuariomenu";
import '../App.css'

const Layout = () => {
  const id_usuario = localStorage.getItem("usuario");
  const id_pass = localStorage.getItem("pass");
  const actlogin = useSelector((state) => state.actlogin)
  const { tabla } = useSelector((state) => state)
  const porciva = useSelector((state) => state.porciva)
  const usuariomenu = useSelector((state) => state.usuariomenu);

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getDetailIva(1));
    dispatch(AccessCtrl(id_usuario));
    dispatch(getUsuariomenId(id_usuario));
    // dispatch(GetMenu(id_usuario));
  }, [dispatch, id_usuario]);
  
  console.log('LayOut------------------------------------');
  console.log('actlogin', actlogin);
  console.log('porciva: ', porciva);
  console.log('usuariomenu: ', usuariomenu);
  console.log('LayOut fin--------------------------------');
  
  //console.log('actlogin.usr_id: ', actlogin[0].usr_id);
  if (tabla) {
    console.log('Layout Tabla: ', tabla);
    //  setIva(tabla[0].valor)
  }
  console.log('actlogin: ', actlogin);
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
