import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteConfirmation from "../DeleteConfirmation";
import Header from "../Header";
import { getFacturaMPId } from "../../actions/facturaMP";
import { AccessCtrl } from "../../actions/index";
import { getUsuariomenId } from "../../actions/usuariomenu";
// import crearMail from "../CrearMails";
// import { mailEnviar } from "../../actions/index";
// import { GetMails } from "../../actions/usuario";
import { UpdateFacturaSts2 } from "../../actions/factura";
// import { AddLogs } from "../../actions/logs";
// Iconos
import { FcLeft, FcOk } from "react-icons/fc";
// CSS
import "../../css/factdet.css";
import style from "../../css/factura.module.css";
import Cookies from 'universal-cookie'
// import { RunSqlPost }  from '../../../src/actions/admin'

const Factura = () => {

    const idProg = 11;
    const cookies = new Cookies();
    const id_usuario = cookies.get("usuario");
    const { facturaMP } = useSelector((state) => state);
    // const { mails } = useSelector((state) => state);
    // const actlogin = useSelector((state) => state.actlogin)
    // const usuariomenu = useSelector((state) => state.usuariomenu);
    const dispatch = useDispatch();
    const dollarUSLocale = Intl.NumberFormat("de-DE");
    // const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
    const estilo2 = { fontSize: "200%" };
    const [acceso, setAcceso] = useState("");
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    // const { tabla } = useSelector((state) => state);
    // Modal 
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const hideConfirmationModal = () => {setDisplayConfirmationModal(false);};
    const [id, setId] = useState(null);
    const { lang } = useSelector((state) => state);
    // End Modal 
    useEffect(() => {
        // console.log("Factura Use Efect");
        dispatch(AccessCtrl(id_usuario));
        dispatch(getFacturaMPId(state.idfact));
        dispatch(getUsuariomenId(id_usuario));
        setAcceso(cookies.get("acceso"))

    }, [dispatch, id_usuario]);


    const showDeleteModal = (id) => {
        setId(id);
        setDeleteMessage(`Esta seguro/a de cambiar el status a la O.C.: ${id}`);
        setDisplayConfirmationModal(true);
      };


    const handleSubmit = (id) => {
        var newLog = {
            doc_id: state.idfact,
            tipo_id: "FAC",
            usr_id: id_usuario,
            cod_status: 0,
            observ:lang,
        };
        
        if (state.sts === 6)  newLog.cod_status = 7   // Manufactura
        if (state.sts === 7)  newLog.cod_status = 8   // Manufactura
        if (state.sts === 9)  newLog.cod_status = 8   // Manufactura
        if (state.sts === 8)  newLog.cod_status = 10   //Manufactura a Produccion Actualiza Stock 
        if (state.sts === 10) newLog.cod_status = 11 // Revision Calidad
        if (state.sts === 11) newLog.cod_status = 13 // Liberado pendiente de envío
        if (state.sts === 12) newLog.cod_status = 11 // Revision Calidad
        if (state.sts === 13) newLog.cod_status = 14 // Revision Calidad

        // dispatch(UpdateFacturaSts(id, newLog.cod_status)); // Envio a Manufactura
        // //console.log('id: ', id, newLog.cod_status);
        // dispatch(AddLogs(newLog));
        // dispatch(GetMails(5));
        // // console.log('mails: ', mails);
        // for (var x = 0; x < mails.length; x++) {
        //     dispatch(mailEnviar(crearMail(8, mails[x].email, state.idfact)));
        // }
        dispatch(UpdateFacturaSts2(newLog));
        window.location.href = "/facturaMP";
    };

    var fac_id = ""; // ID de la OC
    var prod_ant = ""; // Corte de control de productos
    if (facturaMP.length > 0) {
        fac_id = facturaMP[0].fac_id;
    }

    // console.log("facturaMP: ", facturaMP);
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
                                            key={index + 400}
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
                                        // onClick={() => {handleSubmit(state.idfact);}}
                                        onClick={() => {showDeleteModal(state.idfact,'-');}}
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
            <DeleteConfirmation 
         showModal={displayConfirmationModal} 
         confirmModal={() => {handleSubmit(id)}} 
         hideModal={hideConfirmationModal} 
         id={id} message={deleteMessage}
      />
        </>
    );
};

export default Factura;
