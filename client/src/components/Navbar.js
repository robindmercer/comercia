import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { menuItems } from '../menuNibbot';
import MenuItems from './MenuItems';
import { getUsuariomenId } from "../actions/usuariomenu";

import '../css/all.css'


const Navbar = () => {
  const actlogin = useSelector((state) => state.actlogin)
  const { usuariomenu } = useSelector((state) => state);
  const id_usuario = localStorage.getItem("usuario");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('navebar useEffect');
    dispatch(getUsuariomenId(id_usuario));
  }, [dispatch, id_usuario]);

  if (usuariomenu) {
    //console.log('usuariomenu: ', usuariomenu);
    var nivel = []
    usuariomenu.forEach(e => {
      nivel.push(e.nivel)
    });
  }
  //console.log('usuariomenu: ', usuariomenu);
  //console.log('NAVBAR: ', actlogin);
  return (
    <div className="divhead">
      <div >
        <nav>
          <ul className="menus">
            {menuItems.map((menu, index) => {
              const depthLevel = 0;
              const found = usuariomenu.find((element) => element.nivel === menu.nivel);
              //console.log('found: ', found);
              if (nivel.includes(menu.nivel) || menu.nivel === 0) {
                return (
                  <MenuItems
                    items={menu}
                    key={index}
                    depthLevel={depthLevel}
                  />
                );
              }
            })}
          </ul>
        </nav>
      </div>
      <div>
        {/* <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Usuario: {actlogin[0].name}</p> */}

      </div>
    </div>

  );
};

export default Navbar;
