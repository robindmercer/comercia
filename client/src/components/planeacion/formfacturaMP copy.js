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
        dispatch(mailEnviar(crearMail("Confeccionado", mails[x1].email, found)));
        }
    }
    ///window.location.href = '/mpfactura';
  };

console.log('mpfactura: ', mpfactura);

  return (
    <>
      <Header />
      <div className={style.adminHeader}>
        <br />
        <h2 >Pendientes de Entrega</h2>
        <table className={style.styledTable2}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Id MP</th>
              <th>MP</th>
              <th>UDM.</th>
              <th>Stock</th>
              <th>Pedido</th>
              <th>Acciones</th>
            </tr>
          </thead> 
          <tbody>
            {mpfactura &&
              mpfactura.message === undefined &&
              mpfactura.map((data,index) => {
                return (
                  <tr key={index} className={data.stock < data.pedido ? style.redRow : style.blackRow}>
                    <td>{data.prodname}</td>
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
