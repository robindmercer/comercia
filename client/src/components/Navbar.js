import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowBell from "./bell";
import { menuItems } from "../menuNibbot";
import MenuItems from "./MenuItems";
import { getUsuariomenId } from "../actions/usuariomenu";
import Cookies from 'universal-cookie'
import "../css/all.css";
 
const Navbar = () => {
   const cookies = new Cookies();
   const { usuariomenu } = useSelector((state) => state);
   const id_usuario = cookies.get("usuario");
   const dispatch = useDispatch();

   useEffect(() => {
      // console.log('navebar useEffect');
      dispatch(getUsuariomenId(id_usuario));
   }, [dispatch, id_usuario]);

   if (usuariomenu) {
      //console.log('usuariomenu: ', usuariomenu);
      var nivel = [];
      usuariomenu.forEach((e) => {
         nivel.push(e.nivel);
      });
   }
   //console.log('usuariomenu: ', usuariomenu);
   //console.log('NAVBAR: ', actlogin);
   return (
      <div className="divhead">
         <div>
            <nav>
               <ul className="menus">
                  {menuItems.map((menu, index) => {
                     const depthLevel = 0;
                     if (nivel.includes(menu.nivel) || menu.nivel === 0) {
                        return (
                           <MenuItems
                              items={menu}
                              key={index}
                              depthLevel={depthLevel}
                           />
                        );
                     } else {
                        return null;
                     }
                  })}
               </ul>
            </nav>
         </div>
            <div>
               <ShowBell />
            </div>
            {/* <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Usuario: {actlogin[0].name}</p> */}
      </div>
   );
};

export default Navbar;
