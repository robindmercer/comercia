import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { menuItems } from '../menuNibbot';
import MenuItems from './MenuItems';
import { getUsuariomenId } from "../actions/usuariomenu";
import Cookies from 'universal-cookie'

const UsuarioMenu = () => {
  const cookies = new Cookies();

  const { usuariomenu } = useSelector((state) => state);
  const id_usuario = cookies.get("usuario");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Usuario Use Efect');
    dispatch(getUsuariomenId(id_usuario));
  }, [dispatch, id_usuario]);

  if (usuariomenu) {
    var nivel = []
    usuariomenu.forEach(e => {
      nivel.push(e.nivel)
    });
    console.log('usuariomenu: ', usuariomenu);
  }

  return (
    <div className="detalleCab">
      <div className="detalle">
        <table className="styled-table">
          <thead>
            <tr className="table-success">
              {/* <th>Id</th> */}
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>U.Medida</th>
              <th>Cantidades</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((menu, index) => {
              //console.log('menu: ', menu);
              const depthLevel = 0;
              if (nivel.includes(menu.nivel) || menu.nivel === 0) {
                return (
                  <tr key={i} >
                    <td>{menu.menu}</td>
                    <td onClick={() => handleRemove(i)}>
                      <FcDeleteRow style={estilo}
                        onMouseEnter={({ target }) => target.style.fontSize = "200%"}
                        onMouseLeave={({ target }) => target.style.fontSize = "150%"} />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default UsuarioMenu;
