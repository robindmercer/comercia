import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Pdf from "react-to-pdf";
// Iconos
import {FcLeft } from "react-icons/fc";

// Acciones
import { getFacturaDet } from "../../actions/factdet";
import { getFacturaCab } from "../../actions/factura";
import { getDetailIva } from "../../actions/tabla";
import { getUsuariomenId } from "../../actions/usuariomenu";
import { getCondicionesFac } from "../../actions/condiciones";
// Descuentos
import { getDetail } from "../../actions/tabla";

// CSS
import style from "../../css/factdetPdf.module.css";

import imagen from "../../images/logospdf.png";

const ref = React.createRef();

const FormfacturaPDF = () => {
  // Manejo acceso del Usuario
  const navigate = useNavigate();
  const id_usuario = localStorage.getItem("usuario");
  const { factcab } = useSelector((state) => state);
  const { factdet } = useSelector((state) => state);
  const { porciva } = useSelector((state) => state);
  const { factcond } = useSelector((state) => state);
  const estilo2 = { fontSize: "200%" };

  const dispatch = useDispatch();

  // const [subTotal, setSubTotal] = useState(0);
  // const [saleTax, setSaleTax] = useState(0);
  // const [saleDesc, setSaleDesc] = useState(0);
  // const [total, setTotal] = useState(0);

  const location = useLocation();
  const { state } = location;
  // Formato Numeros
  const dollarUSLocale = Intl.NumberFormat("de-DE");

  // eslint-disable-next-line no-unused-vars
  const [inputDet, setInputDet] = useState({
    fac_id: 0,
    orden: 0,
    prod_id: 0,
    precio: 0,
    cantidad: 0,
    total: 0,
  });

  useEffect(() => {
    dispatch(getDetailIva(1));
    dispatch(getDetail(2));
    dispatch(getFacturaCab(state.idfact));
    dispatch(getFacturaDet(state.idfact));
    dispatch(getCondicionesFac(state.idfact));
    dispatch(getUsuariomenId(id_usuario));
    //setInput(input.fac_id=1)
    // return (
    //   dispatch(resetFact())
    // )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id_usuario]);

   console.log("formFactura---------------------------------------------------");
   console.log("tate.idfact ", state.idfact);
  // console.log("total: ", total);
  // console.log("usuariomenu: ", usuariomenu);
  // console.log("acceso: ", acceso);
  // console.log("porciva: ", porciva);
   console.log("formFactura---------------------------------------------------");

  if (factcab.length > 0) {
    return (
      <>
        <div ref={ref} className={style.Post}>
          <div>
            <div className={style.row}>
              <div>
                <img height="29px" width="200px" src={imagen} alt="" />
              </div>
              <div>&nbsp;ORDEN DE COMPRA N°: 254</div>
            </div>
          </div>
          <div className={style.cabecera}>
            <div>
              <div>
                <div className={style.colCab0}>
                  Cliente : &nbsp;<b>{factcab[0].nombre}</b>
                </div>
              </div>
              <div className={style.colCab0}>
                <div>Fecha: 12/11/2022</div>
              </div>
              <div className={style.row}>
                <div className={style.colCab1}>Calle</div>
                <div className={style.colCab2}>{factcab[0].calle}</div>
              </div>
              <div className={style.row}>
                <div className={style.colCab1}>Localidad CP</div>
                <div className={style.colCab2}>
                  {factcab[0].localidad} ({factcab[0].cp})
                </div>
              </div>
              <div className={style.row}>
                <div className={style.colCab1}>Ciudad</div>
                <div className={style.colCab2}>{factcab[0].ciudad}</div>
              </div>
              <div className={style.row}>
                <div className={style.colCab1}>Pais</div>
                <div className={style.colCab2}>{factcab[0].pais}</div>
              </div>
            </div>
          </div>
          <br />
          <div className={style.detalleCab}>
            <div className={style.detalle}>
              <table className="table table-striped bg-white">
                <thead>
                  <tr className="table-success">
                    <th>Unidad</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Cant.</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {factdet &&
                    factdet.map((fact, i) => {
                      return (
                        <tr key={i}>
                          <td>{fact.name}</td>
                          <td>{fact.description}</td>
                          {fact.precio > 0 ? (
                            <td className="totaltr">
                              {dollarUSLocale.format(fact.precio)}
                            </td>
                          ) : (
                            <td className={style.incluido} colSpan={3}>
                              Incluido
                            </td>
                          )}
                          {fact.precio > 0 ? (
                            <td>{fact.cantidad}
                            </td>
                          ) : null}
                          {fact.precio > 0 ? (
                            <td className="totaltr">
                              {dollarUSLocale.format(fact.total)}
                            </td>
                          ) : null}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="total">
                <table>
                  <tbody>
                    <tr className="totaltr">
                      <td colSpan="3" className="totaltd1">
                        Subtotal:
                      </td>
                      <td className="totaltd2">
                        {dollarUSLocale.format(factcab[0].subtotal)}
                      </td>
                    </tr>
                    <tr className="totaltr">
                      <td colSpan="3" className="totaltd1">
                        IVA({porciva[0].valor}%)
                      </td>
                      <td className="totaltd2">
                        {dollarUSLocale.format(factcab[0].iva)}
                      </td>
                    </tr>
                    <tr className="totaltr">
                      <td colSpan="3">
                        <b>TOTAL A PAGAR</b>
                      </td>
                      <td className="totaltd2">
                        {dollarUSLocale.format(factcab[0].total)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="addprod addprod2">
                <p className={style.addprod2p}>{factcab[0].observ}</p>
              </div>
            </div>
          </div>
          {/* Condiciones Generales  */}
          <div className="addprod addprod2">
            <table className="table table-striped bg-white">
              <thead>
                <tr className="table-success">
                  <th colSpan={3}>Condiciones Generales</th>
                </tr>
                <tr className="table-success">
                  <th>Descripción</th>
                  <th>&nbsp;</th>
                  <th>Importe</th>
                </tr>
              </thead>
              <tbody>
                {factcond &&
                  factcond.map((cond, i) => {
                    console.log("cond: ", cond);
                    var xEnganche = (factcab[0].total * cond.enganche) / 100;
                    var xFinanciar = factcab[0].total - xEnganche;
                    var xAnos = cond.meses / 12;
                    var xPorMes = xFinanciar * (cond.interes / 100) * xAnos;
                    var xPagoMens = (xFinanciar + xPorMes) / cond.meses;
                    var xTotal = xPagoMens * cond.meses;
                    console.log("total: ", factcab[0].total);
                    console.log("xEnganche: ", xEnganche);
                    console.log("xFinanciar: ", xFinanciar);
                    console.log("xTotal: ", xTotal);
                    console.log("cond.id: ", cond.cond_id);
                    if (cond.cond_id === 1) {
                      xEnganche = 0;
                      xFinanciar = 0;
                      xTotal = factcab[0].total;
                      return (
                        <>
                          <tr key={i * 10}>
                            <td>{cond.nombre}</td>
                            <td colSpan={2}>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>Total a Pagar</td>
                            <td className="totaltr">
                              {dollarUSLocale.format(xTotal)}
                            </td>
                          </tr>
                        </>
                      );
                    }
                    if (cond.cond_id === 2) {
                      xEnganche = 0;
                      xFinanciar = 0;
                      var xDescuento =
                        (factcab[0].total * cond.descuento) / 100;
                      xTotal =
                        factcab[0].total -
                        (factcab[0].total * cond.descuento) / 100;
                      return (
                        <>
                          <tr>
                            <td colSpan={2}>Total Factura</td>
                            <td className="totaltr">
                              {dollarUSLocale.format(factcab[0].total)}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              Descuento{" "}
                              {dollarUSLocale.format(cond.descuento.toFixed(0))}
                              %
                            </td>
                            <td className="totaltr">
                              {dollarUSLocale.format(xDescuento.toFixed(0))}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Total a Pagar</td>
                            <td className="totaltr">
                              {dollarUSLocale.format(xTotal.toFixed(0))}
                            </td>
                          </tr>
                        </>
                      );
                    }
                    if (cond.cond_id > 2) {
                      return (
                        <>
                          <tr>
                            <td colSpan={2}>Total Factura</td>
                            <td className="totaltr">
                              {dollarUSLocale.format(factcab[0].total)}
                            </td>
                          </tr>
                          {xEnganche !== 0 ? (
                            <>
                              <tr>
                                <td colSpan={2}>Enganche</td>
                                <td className="totaltr">
                                  {dollarUSLocale.format(xEnganche.toFixed(0))}
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2}>Saldo a financiar</td>
                                <td className="totaltr">
                                  {dollarUSLocale.format(xFinanciar.toFixed(0))}
                                </td>
                              </tr>
                              <tr>
                                <td>{cond.meses} Pagos Mensuales</td>
                                <td>Interes del {cond.interes} %</td>
                                <td className="totaltr">
                                  {dollarUSLocale.format(xPagoMens.toFixed(0))}
                                </td>
                              </tr>
                            </>
                          ) : null}
                          <tr>
                            <td colSpan={2}>Total a Pagar</td>
                            <td className="totaltr">
                              {dollarUSLocale.format(xTotal.toFixed(0))}
                            </td>
                          </tr>
                        </>
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
          <div>
            <p>
              NIBBOT INTERNATIONAL - RFC NIN180922KJ2 - San Luis, S.L.P.
              info@nibbot.com.mx (55) 8842 7884
            </p>
          </div>
        </div>
        <div>
                        <FcLeft
                          style={estilo2}
                          title="Volver"
                          onClick={() => {
                            navigate("/factura");
                          }}
                        />
        </div>
        <Pdf targetRef={ref} filename="post.pdf">
          {({ toPdf }) => <button onClick={toPdf}>Crear PDF</button>}
        </Pdf>
      </>
    );
  } else {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    console.log('Logeo de Errores')
    console.log("factcab: ", factcab);
    console.log("factdet: ", factdet);
    console.log("factcond: ", factcond);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }
};

export default FormfacturaPDF;
