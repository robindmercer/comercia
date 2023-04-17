import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMPFactura } from "../../actions/facturaMP";
import { Link } from "react-router-dom";
import Header from "../Header";
import { FcAddDatabase } from "react-icons/fc";
import style from "../../css/factura.module.css";
import { AccessCtrl } from "../../actions/index";
import { getUsuariomenId } from "../../actions/usuariomenu";
// import { getDetail } from "../../actions/tabla";
import crearMail from "../CrearMails";
import { mailEnviar } from "../../actions/index";
import { GetMails } from "../../actions/usuario";

const Factura = () => {
  const idProg = 11;
  const id_usuario = localStorage.getItem("usuario");
  const { mpfactura } = useSelector((state) => state);
  const { mails } = useSelector((state) => state);
  // const actlogin = useSelector((state) => state.actlogin)
  const usuariomenu = useSelector((state) => state.usuariomenu);
  const dispatch = useDispatch();
  const dollarUSLocale = Intl.NumberFormat("de-DE");
  const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
  const [acceso, setAcceso] = useState("A");
  const location = useLocation();
  const { state } = location;
  // const { tabla } = useSelector((state) => state);

  useEffect(() => {
    console.log("Factura Use Efect");
    dispatch(AccessCtrl(id_usuario));
    dispatch(getMPFactura(state.idfact));
    dispatch(getUsuariomenId(id_usuario));
    if (usuariomenu) {
      for (var i = 0; i < usuariomenu.length; i++) {
        if (usuariomenu[i].nivel === idProg) {
          setAcceso(usuariomenu[i].accion);
        }
      }
    }
  }, [dispatch, id_usuario]);

  const handleSubmit = (id) => {
    var control = "x";
    const found = mpfactura.find((element) => element.id === id);
    control = found.control;
    if (control === "S") {
      // dispatch(UpdateFacturaSts(id,4))
      // Perfil Administrador
      dispatch(GetMails(1));
      for (var x = 0; x < mails.length; x++) {
        dispatch(
          mailEnviar(crearMail("Espera Aprobación", mails[x].email, found))
        );
      }
    } else {
      // dispatch(UpdateFacturaSts(id,3))
      // Perfil Planeacion
      dispatch(GetMails(3));
      console.log("mails 2: ", mails);
      for (var x1 = 0; x1 < mails.length; x1++) {
        dispatch(
          mailEnviar(crearMail("Confeccionado", mails[x1].email, found))
        );
      }
    }
    ///window.location.href = '/mpfactura';
  };
  var fac_id = ''  // ID de la OC
  var prod_ant= "" // Corte de control de productos 
   if (mpfactura.length>0){
     fac_id = mpfactura[0].fac_id
   }

  return (
    <>
      <Header />
      <div className={style.adminHeader}>
        <br />
        <h2>Materia prima para la OC:{fac_id}</h2>
        <table className={style.styledTable2}>

          <tbody>
            {mpfactura &&
              mpfactura.message === undefined &&
              mpfactura.map((data, index) => {
                if (prod_ant !== data.prod_id ){
                  prod_ant = data.prod_id
                  return (
                    <>
                    <tr key={index * 100} className={style.styledTable3}><td colSpan={6}>Producto : {data.prodname}</td></tr>
                    <tr>
                      <th>&nbsp;&nbsp;Id MP</th>
                      <th>Materia prima</th>
                      <th>UDM.</th>
                      <th>Stock</th>
                      <th>Pedido</th>
                      <th>Acciones</th>
                    </tr>
                    </>
                  )
                }
                return (
                  <tr
                    key={index}
                    className={
                      data.stock < data.pedido ? style.redRow : style.blackRow
                    }
                  >
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.udm}</td>
                    <td>{dollarUSLocale.format(data.stock)}</td>
                    <td>{dollarUSLocale.format(data.pedido)}</td>
                    <td>
                      <Link
                        to={"/formmpfactura"}
                        className="dLink"
                        state={{
                          idfact: data.id,
                          idCli: 0,
                        }}
                      >
                        <FcAddDatabase
                          style={estilo}
                          title="Modificar"
                          onMouseEnter={({ target }) =>
                            (target.style.fontSize = "280%")
                          }
                          onMouseLeave={({ target }) =>
                            (target.style.fontSize = "200%")
                          }
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Factura;
