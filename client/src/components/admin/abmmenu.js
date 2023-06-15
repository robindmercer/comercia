//robin
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "../../menuNibbot";
import { InsertData, RunSql } from "../../actions/admin";
//import Header from '../Header';

import { getUsuariomenId } from "../../actions/usuariomenu";
// Iconos
import { FcLeft } from "react-icons/fc";
//import '../../css/all.css'
import "../../css/usuario.css";

function AbmMenu() {
   var cperf = 0; 
   var usr = '';
   const location = useLocation();
   const { state } = location;
   const navigate = useNavigate();
   //const actlogin = useSelector((state) => state.actlogin)
   const { usuariomenu } = useSelector((state) => state);
   const dispatch = useDispatch();
   const [onChange, setOnChange] = useState(false);
   const estilo = { fontSize: "250%", transition: "font-size 0.5s" };
   const [data, setData] = useState({
      sql1:"",
      sql2:""
   });   
   const marcar = (letra, id) => {
    var xname = `chk_${letra}_${id}`;
    const found = usuariomenu.find((element) => element.nivel === id);
    if (found) {
         console.log('tengo que eliminar',id);
         for (var i = 1; i < usuariomenu.length; i++) {
               if (usuariomenu[i].nivel === id) {                  
                  usuariomenu[i].accion =''
               }
         }
    } else {
        usuariomenu.push({"id":0,"usrid":`${usr}`,"nivel":parseInt(id),"accion":`${letra}`,"cod_perfil":cperf})
    }
    console.log('xname: ', xname);
    if (onChange) {
        setOnChange(false);
     } else {
        setOnChange(true);
     }
   };

   const [input, setInput] = useState({
      usrid: "",
      nivel: 0,
      accion: "",
   });

   useEffect(() => {
      console.log("AbmMenu", state.idacceso);
      dispatch(getUsuariomenId(state.idacceso));
   }, []);

   useEffect(() => {
    if (onChange) {
    }
  }, [onChange])


   if (usuariomenu) {
      console.log("usuariomenu: ", usuariomenu);
      cperf = usuariomenu[0].cod_perfil;
      usr = usuariomenu[0].usrid;
      var nivel = [];
      if (usuariomenu.message !== "No pude acceder a Menus") {
         usuariomenu.forEach((e) => {
            nivel.push(e.nivel);
         });
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      var xSql2 = "insert into usuariomenus  (usrid,nivel,accion) values "
      var xSql3 = ""
      for (var i = 0; i < usuariomenu.length; i++) {
         if (usuariomenu[i].accion !=='') {
            console.log("true a", usuariomenu[i]);
            if (usuariomenu[i].accion !==''){
               xSql3 +=`('${usuariomenu[i].usrid}',${usuariomenu[i].nivel},'${usuariomenu[i].accion}');`
            }
         }
      }
      //xSql3 = xSql2 + xSql3.substring(0,xSql3.length-1)
      var sql=`delete from usuariomenus where usrid = '${usuariomenu[0].usrid}'` 
      dispatch(RunSql(sql))
      setData(data.sql1=xSql2)
      setData(data.sql2=xSql3)
      console.log('sql: ', sql);
      console.log('xSql3: ', xSql3);
      console.log('data: ', data);
      dispatch(InsertData(data))
      
   };

   console.log("usuariomenu: ", usuariomenu);
   //console.log('AbmMenu: ', actlogin);
   console.log("MenuItems: ", menuItems);

   return (
      <>
         <form className="formDir" onSubmit={(e) => handleSubmit(e)}>
            <div className="divheader">
               <div>
                  <table className="newTable">
                     <thead>
                        <tr>
                           <th colSpan="4" className="lblname">
                              {state.nombre}
                           </th>
                        </tr>
                        <tr>
                           <th colSpan="4">
                              Referencia :&nbsp;&nbsp; A = Acceso
                              Total&nbsp;&nbsp; C = Solo consulta&nbsp;&nbsp; E
                              = Eliminar Acceso
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <FcLeft
                                 style={estilo}
                                 title="Volver"
                                 onClick={() => {
                                    navigate("/usuarios");
                                 }}
                              />
                           </th>
                        </tr>
                        <tr>
                           <th>A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C</th>
                           <th>Head</th>
                           <th>Detail</th>
                           {/* <th>Acceso</th> */}
                        </tr>
                     </thead>
                     <tbody>
                        {menuItems.map((menu, index) => {
                           //if (nivel.includes(menu.nivel) || menu.nivel === 0) {
                           var subm = menu.submenu;
                           var acceso = "";
                           var chkA = "";
                           var chkC = "";
                           if (usuariomenu) {
                              for (var i = 0; i < usuariomenu.length; i++) {
                                 if (usuariomenu[i].nivel === menu.nivel) {
                                    acceso = usuariomenu[i].accion;
                                    if (acceso === "A") chkA = "X";
                                    if (acceso === "C") chkC = "X";
                                 }
                              }
                           }
                           return (
                              <>
                                 <tr key={index}>
                                    <td>
                                       <input
                                            onClick={() =>marcar("A", menu.nivel)}
                                            className={"xinput " + (chkA ==='X' ? 'textok':'textnormal')}
                                            type="text"
                                            id={`chk_A_${menu.nivel}`}
                                            value={chkA}
                                       />
                                       &nbsp;&nbsp;&nbsp;&nbsp;
                                       <input
                                            onClick={() =>marcar("C", menu.nivel)}
                                            className={"xinput " + (chkC ==='X' ? 'textok':'textnormal')}
                                            type="text"
                                            id={`chk_C_${menu.nivel}`}
                                            value={chkC}
                                       />
                                    </td>
                                    <td colSpan="2">
                                       <b>{menu.title}</b>
                                    </td>
                                    {/* <td>{acceso}</td> */}
                                 </tr>
                                 {subm &&
                                    subm.map((data, indx) => {
                                       acceso = "";
                                       chkA = "";
                                       chkC = "";
                                       for (
                                          var i = 0;
                                          i < usuariomenu.length;
                                          i++
                                       ) {
                                          if (
                                             usuariomenu[i].nivel === data.nivel
                                          ) {
                                             acceso = usuariomenu[i].accion;
                                             if (acceso === "A") chkA = "X";
                                             if (acceso === "C") chkC = "X";
                                          }
                                       }
                                       return (
                                          <tr key={indx}>
                                             <td className={chkA ==='A' ? 'textok':'textnormal'}>
                                                <input
                                                   onClick={() =>marcar("A", data.nivel)}
                                                   className={"xinput " + (chkA ==='X' ? 'textok':'textnormal')}
                                                   type="xtext "
                                                   id={`chk_A_${data.nivel}`}
                                                   value={chkA}
                                                />
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <input
                                                   onClick={() =>marcar("C", data.nivel)}
                                                   className={"xinput " + (chkC ==='X' ? 'textok':'textnormal')}
                                                   type="text"
                                                   id={`chk_CS_${data.nivel}`}
                                                   value={chkC}
                                                />
                                             </td>
                                             <td>&nbsp;</td>
                                             <td>{data.title}</td>
                                             {/* <td>{acceso}</td> */}
                                          </tr>
                                       );
                                    })}
                              </>
                           );
                           //}
                        })}
                     </tbody>
                  </table>
                  <table>
                     <tbody>
                        <tr>
                           <button className="nibbotBtn" type="submit">
                              {state ? "GRABAR" : "AGREGAR"}
                           </button>
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           <button
                              className="nibbotBtn"
                              onClick={() => {
                                 navigate("/usuarios");
                              }}
                           >
                              VOLVER
                           </button>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </form>
      </>
   );
}

export default AbmMenu;
