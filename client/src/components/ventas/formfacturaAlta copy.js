// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";

// Acciones 
import { getFacturaDet } from '../../actions/factdet';
import { getFacturaCab, resetFact, AddFactura } from '../../actions/factura';
import { getDetailIva } from '../../actions/tabla';
import { getProducto } from '../../actions/producto';
import { getClienteId } from '../../actions/cliente'
import { getDireccion } from '../../actions/direccion'
// Descuentos 
import { getDetail } from "../../actions/tabla";

// Iconos 
import { FcDeleteRow, FcAddRow, FcOk, FcLeft, FcDeleteDatabase } from 'react-icons/fc'
import Header from '../Header';
// CSS
import '../../css/factdet.css'

const Formfactura = () => {

  let fecha = new Date().toLocaleDateString('en-GB');

  const id_usuario = localStorage.getItem("usuario");
  const navigate = useNavigate();
  const { cliente } = useSelector((state) => state)
  const { direccion } = useSelector((state) => state)
  const { factcab } = useSelector((state) => state)
  const { factdet } = useSelector((state) => state)
  const { porciva } = useSelector((state) => state)
  const { producto } = useSelector((state) => state)
  const { tabla } = useSelector((state) => state);

  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const estilo = { fontSize: "150%", transition: 'font-size 0.5s' };

  const [onChange, setOnChange] = useState(false)
  const [onIva, setOnIva] = useState(false)


  const [subTotal, setSubTotal] = useState(1000)
  const [DirCode, setDirCode] = useState(0)
  const [saleTax, setSaleTax] = useState(0)
  const [saleDesc, setSaleDesc] = useState('')
  const [saleDescto, setSaleDescto] = useState(0)
  const [total, setTotal] = useState(0)
  // Formato Numeros
  const dollarUSLocale = Intl.NumberFormat('de-DE');

  const [input, setInput] = useState({
    cli_id: 0,
    dir_id: 0,
    fac_id: 0,
    subtotal: 0,
    iva: 0,
    descuento: 0,
    total: 0,
    cod_status: 1,
    fecha:new Date().toLocaleDateString('en-GB')
  });


  const initialProductLine = {
    prod_id: '',
    cantidad: 1,
    description: '',
    fac_id: 0,
    orden: factcab.length,
    precio: 0,
    total: 0
  }
  const initialHead = {
    cli_id: state.idCli,
    dir_id: 0,
    fac_id: 0,
    subtotal: "0",
    iva: "0",
    descuento: "0",
    total: "0",
    cod_status: 1,
    fecha:new Date().toLocaleDateString('en-GB')
   
  }
  var cantidad = []
  //console.log('factcab: ', factcab.length);
  if (factcab.length === 0) {
    factcab.push(initialHead)
  }
  // console.log('fecha: ', fecha);

  useEffect(() => {
    //dispatch(getDetail(1));
    dispatch(getDetailIva(1));
    dispatch(getDetail(2))
    dispatch(getProducto());
    dispatch(getClienteId(state.idCli))
    dispatch(getDireccion(state.idCli))

    return (
      dispatch(resetFact())
    )
  }, [dispatch,]);

  useEffect(() => {
    if (onChange) {
    }
  }, [onChange, factdet])


  // Calculo subtotal 
  useEffect(() => {
    let subTotal = 0
    let iva = 0
    let total = 0
    if (factdet && porciva) {

      factdet.forEach((fact) => {
        const quantityNumber = parseFloat(fact.cantidad)
        const rateNumber = parseFloat(fact.precio)
        const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

        subTotal += amount
      })
      setSubTotal(subTotal)
      if (subTotal > 0) {
        iva = subTotal * (parseFloat(porciva[0].valor) / 100)
        setSaleTax(iva)
        total = subTotal + iva
        setTotal(total)
      } else {
        setSaleTax(0)
        setTotal(0)
      }
    }
  }, [onChange, factdet])

  const handleRemove = (i) => {
    factdet.splice(i, 1)
    if (onChange) {
      setOnChange(false)
    } else {
      setOnChange(true)
    }
  }

  const handleAdd = () => {
    factdet.push(initialProductLine)
    //    console.log('factdet: ', factdet);
    if (onChange) {
      setOnChange(false)
    } else {
      setOnChange(true)
    }
  }
  const handleSubmit = () => {
    // console.log('DirCode: ', DirCode);
    // console.log('subTotal: ', subTotal);
    // console.log('saleTax: ', saleTax);
    // console.log('Total: ', total);
    factcab[0].subtotal = subTotal;
    factcab[0].iva = saleTax;
    factcab[0].descuento = saleDescto;
    factcab[0].total = total;
    factcab[0].dir_id = parseInt(DirCode);
    setInput(input.subtotal = subTotal);
    setInput(input.iva = saleTax);
    setInput(input.descuento = saleDescto);
    setInput(input.total = total);
    setInput(input.dir_id = DirCode);
    setInput(input.cli_id = factcab[0].cli_id);
    console.log('factcab: ', factcab);
    console.log('factdet: ', factdet);
    console.log('input: ', input);
    if (factcab[0].dir_id === '0') {
      alert("Debes selecionar una dirección.")
      return; 
    } 
    if (factcab[0].subtotal === 0) {
      alert("La Orden de Compra no puede quedar en 0")
      return; 
    } 
      var msg = dispatch(AddFactura(input));
      console.log('msg: ', msg);
  }

  function handleTipo(e, i) {
    e.preventDefault();
    if (e.target.name === 'domi') {
      // console.log('Domicilio: ', e.target.value);
      setDirCode(e.target.value)
    }
    if (e.target.name === 'cod') {
      if (e.target.value > 0) {
        setSaleDesc(e.target[e.target.value].innerText);
        var desctoporc = 0
        tabla.forEach((z) => {
          if (parseInt(z.cod) === parseInt(e.target.value)) {
            desctoporc = z.valor
          }
        });
        var dscto = Math.round((subTotal + saleTax) * desctoporc / 100)
        // console.log('desctoporc : ', desctoporc);
        // console.log('Descuento: ', dscto);
        setTotal(total - dscto)
        setSaleDescto(dscto)
      } else {
        setSaleDesc('')
        setSaleDescto(0)
      }
    }
    if (e.target.name === 'quantity') {
      factdet[i.i].cantidad = e.target.value
      factdet[i.i].total = factdet[i.i].cantidad * factdet[i.i].precio
      if (onChange) {
        setOnChange(false)
      } else {
        setOnChange(true)
      }
    }
    if (e.target.name === 'prod_id') {
      if (e.target.value == '0') {
        handleRemove(i.i)
      } else {
        for (var z = 0; z < producto.length; z++) {
          if (producto[z].id == e.target.value) {
            factdet[i.i].prod_id = e.target.value
            factdet[i.i].name = producto[z].name
            factdet[i.i].precio = producto[z].price
            factdet[i.i].total = factdet[i.i].cantidad * factdet[i.i].precio
          }
        }
      }
      if (onChange) {
        setOnChange(false)
      } else {
        setOnChange(true)
      }
    }
  }
  // if (cliente) {
  //   factcab[0].nombre = cliente[0].nombre
  // }

  // console.log('Cliente_1: ', cliente, state.idCli);
  // console.log('direccion: ', direccion);

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
  if (factcab.length > 0) {
    return (
      <>
        <Header />
        <div >
          <div className='cabeceraAlta'>
            <div className="row gap-1">
              <div className='row'>
                <div className='col'>Cliente:&nbsp;
                  {/* <!--input className='input_fact'
                    type="text"
                    id="cli_id"
                    name="cli_id"
                    value={factcab[0].cli_id}
                    onChange={(e) => handleTipo(e, 0)}
                  /--> */}
                  &nbsp;{cliente[0].nombre}</div>
                {/* <div className='col'>Cliente:&nbsp;
                  <input className='input_fact'
                    type="text"
                    id="cli_id"
                    name="cli_id"
                    value={factcab[0].cli_id}
                    onChange={(e) => handleTipo(e, 0)}
                    />
                  &nbsp;{factcab[0].nombre}</div> */}
                <div className='col'>Fecha: {fecha}</div>
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
                  {direccion && direccion.map((tabla) => {
                      return (
                        <option
                          value={tabla.id}
                          key={tabla.id}
                        >{`${tabla.calle + ' - ' + tabla.localidad}`}</option>
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
                  </tr>
                </thead>
                <tbody>
                  {factdet && factdet.map((fact, i) => {
                    return (
                      <tr key={i} >
                        <td>
                          <input className='input_fact'
                            type="text"
                            id="prod_id"
                            name="prod_id"
                            value={fact.prod_id}
                            onChange={(e) => handleTipo(e, { i })}
                          />
                        </td>
                        <td>{fact.name}</td>
                        {fact.precio > 0 ? (
                          <td className='totaltr'>{dollarUSLocale.format(fact.precio)}</td>
                        ) : (
                          <td className='incluido' colSpan={3}>Incluido</td>
                        )}
                        {fact.precio > 0 ? (
                          <td><input className='input_fact'
                            type="text"
                            id="quantity"
                            name="quantity"
                            value={fact.cantidad}
                            onChange={(e) => handleTipo(e, { i })}></input>
                          </td>
                        ) : (null)}
                        {fact.precio > 0 ? (
                          <td className='totaltr'>{dollarUSLocale.format(fact.total)}</td>
                        ) : (null)}
                        <td onClick={() => handleRemove(i)}>
                          <FcDeleteRow style={estilo}
                            onMouseEnter={({ target }) => target.style.fontSize = "200%"}
                            onMouseLeave={({ target }) => target.style.fontSize = "150%"} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="addprod">
                <p onClick={() => handleAdd()}>
                  <FcAddRow style={estilo}
                    onMouseEnter={({ target }) => target.style.fontSize = "200%"}
                    onMouseLeave={({ target }) => target.style.fontSize = "150%"} />Agregar Producto
                </p>
              </div>
              <div className="addprod">
                <label
                  htmlFor="descto"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Descuento:&nbsp;
                </label>
                <select
                  name="cod"
                  id="cod"
                  onChange={(e) => handleTipo(e)}
                >
                  <option value="0">Seleccionar</option>
                  {tabla && tabla.map((data) => {
                      return (
                        <option
                          value={data.cod}
                          key={data.cod}
                        >{`${data.description + '  ' + data.valor + ' %'}`}</option>
                      );
                  })}
                </select>
              </div>

              <div className='total'>
                <table>
                  <tbody>

                    <tr className='totaltr'>
                      <td colSpan='3' className='totaltd1'>
                        Subtotal:
                      </td>
                      <td className='totaltd2'>
                        {dollarUSLocale.format(subTotal)}
                      </td>
                    </tr>
                    <tr className='totaltr'>
                      <td colSpan='3' className='totaltd1'>
                        IVA({porciva[0].valor}%)
                      </td>
                      <td className='totaltd2'>
                        {dollarUSLocale.format(saleTax.toFixed(0))}
                      </td>
                    </tr>
                    {saleDesc !== '' ? (
                      <tr className='totaltr'>
                        <td colSpan='3' className='totaltd1'>
                          {saleDesc}
                        </td>
                        <td className='totaltr'>{dollarUSLocale.format(saleDescto)}</td>
                      </tr>
                    ) : (null)
                    }
                    <tr className='totaltr'>
                      <td >
                        <FcOk style={estilo}
                          onMouseEnter={({ target }) => target.style.fontSize = "200%"}
                          onMouseLeave={({ target }) => target.style.fontSize = "150%"}
                          onClick={handleSubmit} />
                      </td>
                      <td >
                        <FcLeft style={estilo}
                          title="Volver"
                          onMouseEnter={({ target }) => target.style.fontSize = "200%"}
                          onMouseLeave={({ target }) => target.style.fontSize = "150%"}
                          onClick={() => { navigate("/cliente"); }} />
                      </td>
                      <td >
                        <b>TOTAL A PAGAR</b>
                      </td>
                      <td className='totaltd2'>
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
}


export default Formfactura;
