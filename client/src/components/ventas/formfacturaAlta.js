// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// Acciones
// import { getFacturaDet } from '../../actions/factdet';
import { resetFact, AddFactura } from "../../actions/factura";
import { getDetailIva } from '../../actions/tabla';
import { getProducto } from "../../actions/producto";
import { getClienteId } from "../../actions/cliente";
import { getDireccion } from "../../actions/direccion";
import { getUsuariomenId } from "../../actions/usuariomenu";

// Descuentos
import { getDetail } from "../../actions/tabla";

// Iconos
import { FcDeleteRow, FcAddRow, FcOk, FcLeft } from "react-icons/fc";
import Header from "../Header";
// CSS
import "../../css/factdet.css";

var btnGrabar = false;
var btnAgregar = false;
var btnEliminarReg = false;

const Formfactura = () => {
  let fecha = new Date().toLocaleDateString("en-GB");

  // Manejo acceso del Usuario
  const usuariomenu = useSelector((state) => state.usuariomenu);
  const [acceso, setAcceso] = useState("A");
  const idProg = 11;

  const id_usuario = localStorage.getItem("usuario");
  const navigate = useNavigate();
  const { cliente } = useSelector((state) => state);
  const { direccion } = useSelector((state) => state);
  const { factcab } = useSelector((state) => state);
  const { factdet } = useSelector((state) => state);
  const { porciva } = useSelector((state) => state);
  const { producto } = useSelector((state) => state);
  // const { tabla } = useSelector((state) => state);
  // const { idfact } = useSelector((state) => state)

  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const estilo = { fontSize: "150%", transition: "font-size 0.5s" };
  const estilo2 = { fontSize: "200%" };

  const [onChange, setOnChange] = useState(false);
  // const [onIva, setOnIva] = useState(false)

  const [subTotal, setSubTotal] = useState(0);
  const [DirCode, setDirCode] = useState(0);
  const [saleTax, setSaleTax] = useState(0);
  const [saleDesc, setSaleDesc] = useState("");
  const [saleDescto, setSaleDescto] = useState(0);
  const [total, setTotal] = useState(0);

  // Formato Numeros
  const dollarUSLocale = Intl.NumberFormat("de-DE");

  const [input, setInput] = useState({
    cli_id: 0,
    dir_id: 0,
    fac_id: 0,
    subtotal: 0,
    iva: 0,
    total: 0,
    observ: "",
    cod_status: 1,
    fecha: new Date().toLocaleDateString("en-GB"),
  });

  const [inputDet, setInputDet] = useState({
    fac_id: 0,
    orden: 0,
    prod_id: 0,
    precio: 0,
    cantidad: 0,
    total: 0,
  });

  const initialProductLine = {
    prod_id: "",
    cantidad: 1,
    description: "",
    fac_id: 0,
    orden: factcab.length,
    precio: 0,
    total: 0,
  };
  const initialHead = {
    cli_id: state.idCli,
    dir_id: 0,
    fac_id: 0,
    subtotal: "0",
    iva: "0",
    descuento: "0",
    total: "0",
    observ: "",
    cod_status: 1,
    fecha: new Date().toLocaleDateString("en-GB"),
  };

  // Manejo de Botones a ver


  const control = () => {
    // btnGrabar = false;
    console.log('control1: ',     btnGrabar ,btnAgregar,btnEliminarReg,acceso.substring(0,1));
    btnAgregar = false;
    btnEliminarReg = false;
    if (acceso.substring(0,1) === "A") {
      // Gerencia All
      btnAgregar = true;
      btnEliminarReg = true;
    }
    if (acceso.substring(0,1) === "C") {
      // Consulta
      btnGrabar = false;
      btnAgregar = false;
      btnEliminarReg = false;
    }
    console.log('control2: ',     btnGrabar ,btnAgregar,btnEliminarReg);
  };
  
  // var cantidad = []
  //console.log('factcab: ', factcab.length);
  if (factcab.length === 0) {
    factcab.push(initialHead);
  }
  // console.log('fecha: ', fecha);

  useEffect(() => {
    //dispatch(getDetail(1));
    dispatch(getDetail(2));
    dispatch(getProducto());
    dispatch(getClienteId(state.idCli));
    dispatch(getDireccion(state.idCli));
    dispatch(getDetailIva(1));
    dispatch(getUsuariomenId(id_usuario));
    if (usuariomenu) {
      for (var i = 0; i < usuariomenu.length; i++) {
        if (usuariomenu[i].nivel === idProg) {
          setAcceso(usuariomenu[i].accion + usuariomenu[i].cod_perfil);
        }
      }
    }
    // return (
    //   dispatch(resetFact())
    //   )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // useEffect(() => {
  //   if (onChange) {
  //   }
  // }, [onChange, factdet])

  // useEffect(() => {
  //   if (input.dir_id != 0) {
  //     console.log('AddFactura input ', input);
  //     dispatch(AddFactura(input))
  //     factdet.forEach((fact) => {
  //       console.log('fact.precio: ', fact.precio);
  //     })
  //   }
  // }, [onChange, input])

  // Calculo subtotal
  useEffect(() => {
    let subTotal = 0;
    let iva = 0;
    let total = 0;
    if (factdet && porciva) {
      factdet.forEach((fact) => {
        const quantityNumber = parseFloat(fact.cantidad);
        const rateNumber = parseFloat(fact.precio);
        const amount =
          quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;

        subTotal += amount;
      });
      setSubTotal(subTotal);
      if (subTotal > 0) {
        iva = subTotal * (parseFloat(porciva[0].valor) / 100);
        setSaleTax(iva);
        total = subTotal + iva;
        setTotal(total);
      } else {
        setSaleTax(0);
        setTotal(0);
      }
    }
  }, [onChange, factdet]);

  const handleRemove = (i) => {
    factdet.splice(i, 1);
    if (onChange) {
      setOnChange(false);
    } else {
      setOnChange(true);
    }
  };

  const handleAdd = () => {
    factdet.push(initialProductLine);
    //    console.log('factdet: ', factdet);
    if (onChange) {
      setOnChange(false);
    } else {
      setOnChange(true);
    }
  };
  const handleSubmit = () => {
    // console.log('subTotal: ', subTotal);
    // console.log('saleTax: ', saleTax);
    // console.log('Total: ', total);
    factcab[0].subtotal = subTotal;
    factcab[0].iva = saleTax;
    factcab[0].total = total;
    factcab[0].dir_id = parseInt(DirCode);
    setInput((input.subtotal = subTotal));
    setInput((input.iva = saleTax));
    setInput((input.total = total));
    setInput((input.dir_id = DirCode));
    setInput((input.cli_id = factcab[0].cli_id));
    // console.log('factcab: ', factcab[0]);
    // console.log('factdet: ', factdet);
    // console.log('input: ', input);
   if (subTotal===0){
       return alert("O/C no puede quedar en 0 (Cero)")
   }
    dispatch(AddFactura(input, factdet, inputDet));
    window.location.href = "/factura";
  };

  function handleTipo(e, i) {
    e.preventDefault();
    if (e.target.name === "observ") {
      console.log("e.target.name: ", e.target.value);
      input.observ = e.target.value;
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }
    if (e.target.name === "domi") {
      setDirCode(e.target.value);
      if (e.target.value > 0 )  btnGrabar = true
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }      
    }
    if (e.target.name === "quantity") {
      factdet[i.i].cantidad = e.target.value;
      factdet[i.i].total = factdet[i.i].cantidad * factdet[i.i].precio;
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }
    if (e.target.name === "prod_id") {
      if (e.target.value === "0") {
        handleRemove(i.i);
      } else {
        for (var z = 0; z < producto.length; z++) {
          if (producto[z].id === e.target.value) {
            factdet[i.i].prod_id = e.target.value;
            factdet[i.i].name = producto[z].name;
            if (cliente[0].moneda === 2) {
              factdet[i.i].precio = producto[z].dolar;
            } else {
              factdet[i.i].precio = producto[z].price;
            }
            factdet[i.i].total = factdet[i.i].cantidad * factdet[i.i].precio;
          }
        }
      }
      if (onChange) {
        setOnChange(false);
      } else {
        setOnChange(true);
      }
    }
  }


  // console.log("Cliente_1: ", cliente, state.idCli);
   console.log("acceso: ", acceso);

  // console.log('factcab: ', factcab);
  // console.log('factdet: ', factdet);
  // console.log('porciva: ', porciva,porciva.length);
  // console.log('tabla: ', tabla);
  //   if (porciva.length === 1){
    //     if (onIva) {
      //       setOnIva(false)
  //     } else {
  //       setOnIva(true)
  //     }
  // }
  // console.log('direccion: ', direccion);
  if (factcab.length > 0) {
    control();
    return (
      <>
        <Header />
        <div>
          <div className="cabeceraAlta">
            <div className="row gap-1">
              <div className="row">
                <div className="col">
                  Cliente:&nbsp;
                  {/* <!--input className='input_fact'
                    type="text"
                    id="cli_id"
                    name="cli_id"
                    value={factcab[0].cli_id}
                    onChange={(e) => handleTipo(e, 0)}
                  /--> */}
                  &nbsp;{cliente[0].nombre}
                </div>
                {/* <div className='col'>Cliente:&nbsp;
                  <input className='input_fact'
                    type="text"
                    id="cli_id"
                    name="cli_id"
                    value={factcab[0].cli_id}
                    onChange={(e) => handleTipo(e, 0)}
                    />
                  &nbsp;{factcab[0].nombre}</div> */}
                <div className="col">Fecha: {fecha}</div>
              </div>
              <div>
                <label
                  htmlFor="tipocli"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Seleccione Domicilio:
                </label>
                <select 
                name="domi" 
                id="domi" 
                onChange={(e) => handleTipo(e)}
                >
                  <option value="0">Seleccionar</option>
                  {direccion &&
                    direccion.map((direc) => {
                      return (
                        <option value={direc.orden} key={direc.orden}>{`${
                          direc.calle + " - " + direc.localidad
                        }`}</option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          <br />
          <div className="detalleCab">
            <div className="detalle">
              <table className="table table-striped bg-white">
                <thead>
                  <tr className="table-success">
                    <th>Id</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Cantidades</th>
                    <th>Total</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {factdet &&
                    factdet.map((fact, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <input
                              className="input_fact"
                              type="text"
                              id="prod_id"
                              name="prod_id"
                              value={fact.prod_id}
                              onChange={(e) => handleTipo(e, { i })}
                            />
                          </td>
                          <td>{fact.name}</td>
                          {fact.precio > 0 ? (
                            <td className="totaltr">
                              {dollarUSLocale.format(fact.precio)}
                            </td>
                          ) : (
                            <td className="incluido" colSpan={3}>
                              Incluido
                            </td>
                          )}
                          {fact.precio > 0 ? (
                            <td>
                              <input
                                className="input_fact"
                                type="text"
                                id="quantity"
                                name="quantity"
                                value={fact.cantidad}
                                onChange={(e) => handleTipo(e, { i })}
                              ></input>
                            </td>
                          ) : null}
                          {fact.precio > 0 ? (
                            <td className="totaltr">
                              {dollarUSLocale.format(fact.total)}
                            </td>
                          ) : null}
                          {btnEliminarReg ? (
                            <td onClick={() => handleRemove(i)}>
                            <FcDeleteRow
                              style={estilo}
                              onMouseEnter={({ target }) =>
                              (target.style.fontSize = "200%")
                            }
                            onMouseLeave={({ target }) =>
                            (target.style.fontSize = "150%")
                          }
                          />
                          </td>
                          ): null}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="addprod">
                <p onClick={() => handleAdd()}>
                  <FcAddRow
                    style={estilo}
                    onMouseEnter={({ target }) =>
                      (target.style.fontSize = "200%")
                    }
                    onMouseLeave={({ target }) =>
                      (target.style.fontSize = "150%")
                    }
                  />
                  Agregar Producto
                </p>
              </div>
              <div className="addprod addprod2">
                <textarea
                  type="text"
                  id="observ"
                  cols="80"
                  rows="5"
                  name="observ"
                  value={input.observ}
                  placeholder="Observaciones"
                  onChange={(e) => handleTipo(e)}
                  className="txtarea"
                />
              </div>

              <div className="total">
                <table>
                  <tbody>
                    <tr className="totaltr">
                      <td colSpan="3" className="totaltd1">
                        Subtotal:
                      </td>
                      <td className="totaltd2">
                        {dollarUSLocale.format(subTotal)}
                      </td>
                    </tr>
                    <tr className="totaltr">
                      <td colSpan="3" className="totaltd1">
                        IVA({porciva[0].valor}%)
                      </td>
                      <td className="totaltd2">
                        {dollarUSLocale.format(saleTax.toFixed(0))}
                      </td>
                    </tr>
                    {saleDesc !== "" ? (
                      <tr className="totaltr">
                        <td colSpan="3" className="totaltd1">
                          {saleDesc}
                        </td>
                        <td className="totaltr">
                          {dollarUSLocale.format(saleDescto)}
                        </td>
                      </tr>
                    ) : null}
                    <tr className="totaltr">
                      {btnGrabar ? (
                        <td>
                          <FcOk
                            style={estilo2}
                            title="Crear OC"
                            onClick={handleSubmit}
                          />
                        </td>
                      ) : null}
                      <td>
                        <FcLeft
                          style={estilo2}
                          title="Volver"
                          onClick={() => {
                            navigate("/cliente");
                          }}
                        />
                      </td>
                      <td>
                        {cliente[0].moneda === 2 ? (
                          <b>TOTAL A PAGAR USD.</b>
                        ) : (
                          <b>TOTAL A PAGAR</b>
                        )}
                      </td>
                      <td className="totaltd2">
                        {dollarUSLocale.format(total.toFixed(0))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }
};

export default Formfactura;
