import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";

import Header from "../Header";
import { getFacturaMPId } from "../../actions/facturaMP";
import style from "../../css/factura.module.css";
import { AccessCtrl } from "../../actions/index";
import { getUsuariomenId } from "../../actions/usuariomenu";
import crearMail from "../CrearMails";
import { mailEnviar } from "../../actions/index";
import { GetMails } from "../../actions/usuario";
import { UpdateFacturaSts } from "../../actions/factura";
import { AddLogs } from "../../actions/logs";

// Iconos
import { FcLeft, FcOk } from "react-icons/fc";
// CSS
import "../../css/factdet.css";

const Factura = () => {
    const idProg = 11;
    const id_usuario = localStorage.getItem("usuario");
    const { facturaMP } = useSelector((state) => state);
    const { mails } = useSelector((state) => state);
    // const actlogin = useSelector((state) => state.actlogin)
    const usuariomenu = useSelector((state) => state.usuariomenu);
    const dispatch = useDispatch();
    const dollarUSLocale = Intl.NumberFormat("de-DE");
    const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
    const estilo2 = { fontSize: "200%" };
    const [acceso, setAcceso] = useState("");
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    // const { tabla } = useSelector((state) => state);

    useEffect(() => {
        console.log("Factura Use Efect");
        dispatch(AccessCtrl(id_usuario));
        dispatch(UpdateFacturaSts(state.idfact, 7, ""));
        var newLog = {
            doc_id: state.idfact,
            tipo_id: "FAC",
            usr_id: id_usuario,
            cod_status: 7,
        };

        dispatch(AddLogs(newLog));
        dispatch(getFacturaMPId(state.idfact));
        dispatch(getUsuariomenId(id_usuario));
        if (usuariomenu) {
            for (var i = 0; i < usuariomenu.length; i++) {
                if (usuariomenu[i].nivel === idProg) {
                    setAcceso(
                        usuariomenu[i].accion + usuariomenu[i].cod_perfil
                    );
                }
            }
        }
    }, [dispatch, id_usuario]);

    const handleSubmit = (id) => {
        dispatch(UpdateFacturaSts(id, 8, "")); // Envio a Almacen
        var newLog = {
            doc_id: state.idfact,
            tipo_id: "FAC",
            usr_id: id_usuario,
            cod_status: 8,
        };

        dispatch(AddLogs(newLog));
        dispatch(GetMails(5));
        for (var x = 0; x < mails.length; x++) {
            dispatch(mailEnviar(crearMail(8, mails[x].email, "")));
        }
        // } else {
        //   // dispatch(UpdateFacturaSts(id,3))
        //   // Perfil Planeacion
        //   dispatch(GetMails(3));
        //   console.log("mails 2: ", mails);
        //   for (var x1 = 0; x1 < mails.length; x1++) {
        //     dispatch(
        //       mailEnviar(crearMail("Confeccionado", mails[x1].email, found))
        //     );
        //   }
        // }
        window.location.href = "/facturaMP";
    };
    var fac_id = ""; // ID de la OC
    var prod_ant = ""; // Corte de control de productos
    if (facturaMP.length > 0) {
        fac_id = facturaMP[0].fac_id;
    }

    console.log("facturaMP: ", facturaMP);
    return (
        <>
            <Header />
            <div className={style.adminHeader}>
                <br />
                <div>
                    <h2>Materia prima para la OC:{fac_id}</h2>
                    <table className={style.styledTable2}>
                        <tbody>
                            {facturaMP &&
                                facturaMP.map((data, index) => {
                                    if (prod_ant !== data.prod_id) {
                                        prod_ant = data.prod_id;
                                        return (
                                            <>
                                                {/* <tr key={index + 200}
                          className={style.blackRow}                      
                          >
                          <td colSpan={6}>&nbsp;</td>
                        </tr> */}
                                                <tr
                                                    key={index + 100}
                                                    className={
                                                        style.styledTable3
                                                    }
                                                >
                                                    <td colSpan={6}>
                                                        Producto :{" "}
                                                        {data.prodname}
                                                    </td>
                                                </tr>
                                                <tr key={index + 200}>
                                                    <th>&nbsp;&nbsp;Id MP</th>
                                                    <th>Materia prima</th>
                                                    <th>UDM.</th>
                                                    <th>Pedido</th>
                                                    <th>Stock</th>
                                                </tr>
                                                <tr
                                                    key={index + 300}
                                                    className={
                                                        data.stock < data.pedido
                                                            ? style.redRow
                                                            : style.blackRow
                                                    }
                                                >
                                                    <td>{data.name}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.udm}</td>
                                                    <td>
                                                        {dollarUSLocale.format(
                                                            data.pedido
                                                        )}
                                                    </td>
                                                    <td>
                                                        {dollarUSLocale.format(
                                                            data.stock
                                                        )}
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    }
                                    return (
                                        <tr
                                            key={index}
                                            className={
                                                data.stock < data.pedido
                                                    ? style.redRow
                                                    : style.blackRow
                                            }
                                        >
                                            <td>{data.name}</td>
                                            <td>{data.description}</td>
                                            <td>{data.udm}</td>
                                            <td>
                                                {dollarUSLocale.format(
                                                    data.pedido
                                                )}
                                            </td>
                                            <td>
                                                {dollarUSLocale.format(
                                                    data.stock
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
                <div className={style.footer}>
                    <table>
                        <tbody>
                            <tr key={1000} className="totaltr">
                                <td colSpan="3">
                                    <FcOk
                                        style={estilo2}
                                        title="Enviar Manufactura"
                                        onClick={() => {
                                            handleSubmit(state.idfact);
                                        }}
                                    />
                                </td>
                                <td>&nbsp;&nbsp;&nbsp;</td>
                                <td>
                                    <FcLeft
                                        style={estilo2}
                                        title="Volver"
                                        onClick={() => {
                                            navigate("/facturaMP");
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Factura;
