// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
// Acciones 
import { getFacturaDet } from '../../actions/factdet';
import { getFacturaCab, resetFact, UpdateFactura } from '../../actions/factura';
import { getDetailIva } from '../../actions/tabla';
import { getProducto } from '../../actions/producto';
// import { getCliente } from '../../actions/cliente'
import {getUsuariomenId} from '../../actions/usuariomenu'
// Descuentos 
import { getDetail } from "../../actions/tabla";

// Iconos 
import { FcDeleteRow, FcAddRow, FcOk, FcLeft } from 'react-icons/fc'
import Header from '../Header';
// CSS
import '../../css/factdet.css'

const Formfactura = () => {
  const navigate = useNavigate();
// Manejo acceso del Usuario 
  const usuariomenu = useSelector((state) => state.usuariomenu)
  const [acceso, setAcceso] = useState('A')
  const idProg = 11;

  const id_usuario = localStorage.getItem("usuario");
  const { factcab } = useSelector((state) => state)
  const { factdet } = useSelector((state) => state)
  const { porciva } = useSelector((state) => state)
  const tabla = useSelector((state) => state.tabla)
  const { producto } = useSelector((state) => state)

  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const estilo = { fontSize: "150%", transition: 'font-size 0.5s' };
  const estilo2 = { fontSize: "200%" };


  const [onChange, setOnChange] = useState(false)


  const [subTotal, setSubTotal] = useState(0)
  // const [DirCode, setDirCode] = useState(0)
  const [saleTax, setSaleTax] = useState(0)
  const [saleDesc, setSaleDesc] = useState(0)
  const [saleDescto, setSaleDescto] = useState(0)
  const [total, setTotal] = useState(0)
  const [desc_id, setDesc_id] = useState(0)

  // Formato Numeros
  const dollarUSLocale = Intl.NumberFormat('de-DE');

  const [inputDet, setInputDet] = useState({
    fac_id: 0,
    orden: 0,
    prod_id: 0,
    precio: 0,
    cantidad: 0,
    total: 0
  });

  const [input, setInput] = useState({
    id: 0,
    desc_id: 0,
    subtotal: 0,
    iva: 0,
    descuento: 0,
    total: 0,
    observ: '',
  });
  

  const initialProductLine = {
    cantidad: 1,
    description: '',
    fac_id: 1,
    name: '',
    orden: factcab.length,
    precio: 0,
    prod_id: 0,
    total: 0
  }
  // var cantidad = []


  useEffect(() => {
    //dispatch(getDetail(1));
    dispatch(getProducto());
    dispatch(getDetailIva(1));
    dispatch(getDetail(2))
    dispatch(getFacturaCab(state.idfact));
    dispatch(getFacturaDet(state.idfact));
    dispatch(getUsuariomenId(id_usuario));
    if (usuariomenu){
        for (var i = 0; i < usuariomenu.length; i++) {
            if (usuariomenu[i].nivel = idProg){
                setAcceso(usuariomenu[i].accion)
            } 
        } }    
    //setInput(input.fac_id=state.idfact)
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
    console.log('factdet: ', factdet);
    if (onChange) {
      setOnChange(false)
    } else {
      setOnChange(true)
    }
  }
  // function handleChange(e) {
  //       e.preventDefault();
  //   console.log('e.target.value: ', e.target.value);
  // }

  function handleTipo(e, i) {
    e.preventDefault();
    if (e.target.name === 'observ') {
      console.log('e.target.name: ', e.target.value);
      factcab[0].observ = e.target.value
      if (onChange) {
        setOnChange(false)
      } else {
        setOnChange(true)
      }
    }
    // console.log('e.target.value: ', e.target.value);
    // console.log('e.target.name: ', e.target.name);
    // console.log('e.target.id: ', i.i);
    if (e.target.name === 'cod') {
      if (e.target.value > 0) {
        setSaleDesc(e.target[e.target.value].innerText);
        var desctoporc = 0
        setDesc_id(e.target.value);
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
        setDesc_id(0);
      }
    }

    if (e.target.name === 'cli_id') {
      console.log('busco', e.target.value);
      factcab[0].cli_id = e.target.value
      if (onChange) {
        setOnChange(false)
      } else {
        setOnChange(true)
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



  const handleSubmit = () => {
    console.log('handleSubmit');
    // //    setInput(input.dir_id = DirCode);
    //     setInput(input.desc_id = desc_id);
    //     setInput(input.cli_id = factcab[0].cli_id);    
    //console.log('DirCode: ', DirCode);
    console.log('subTotal: ', subTotal.toFixed(0));
    console.log('saleTax: ', saleTax.toFixed(0));
    console.log('Total: ', total.toFixed(0));
    factcab[0].subtotal = subTotal.toFixed(0);
    factcab[0].iva = saleTax.toFixed(0);
    if (saleDescto) {
      factcab[0].descuento = saleDescto.toFixed(0);
    }
    factcab[0].total = total.toFixed(0);
    factcab[0].desc_id = desc_id;
    console.log('factcab: ', factcab);

    setInput(input.id = factcab[0].id)
    setInput(input.subtotal = subTotal);
    setInput(input.iva = saleTax);
    setInput(input.descuento = saleDescto);
    setInput(input.total = total);
    setInput(input.observ = factcab[0].observ)
    setInput(input.desc_id = factcab[0].desc_id)

    console.log('input: ', input);
    console.log('factdet: ', factdet);

    if (factcab[0].subtotal === 0) {
      alert("La Orden de Compra no puede quedar en 0")
      return;
    }
    dispatch(UpdateFactura(input, factdet, inputDet))
    // if (onChange) {
    //   setOnChange(false)
    // } else {
    //   setOnChange(true)
    // }
    // var msg = dispatch(AddFactura(input));
    // console.log('msg: ', msg);
  }



  console.log('factcab: ', factcab);
  console.log('factdet: ', factdet);
  console.log('total: ', total);
  console.log('usuariomenu: ', usuariomenu);
  console.log('acceso: ', acceso);

  if (factcab.length > 0) {
    if (saleDesc === 0 && factcab[0].descuento > 0) {
      tabla.forEach((z) => {
        if (parseInt(z.cod) === parseInt(factcab[0].desc_id)) {
          setSaleDesc(z.description + ' ' + z.valor + '%');
        }
      });
      //        var dscto = Math.round((factcab[0].subTotal + factcab[0].iva) * desctoporc / 100)
      // console.log('desctoporc : ', desctoporc);
      // console.log('Descuento: ', dscto);
      setDesc_id(factcab[0].desc_id);
      setTotal(parseInt(factcab[0].total))
      setSaleDescto(factcab[0].descuento)
    }
    return (
      <>
        <Header />
        <div >
          <div className='cabecera '>
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
                  &nbsp;{factcab[0].nombre}</div>
                <div className='col'>Fecha: 12/11/2022</div>
              </div>
              <div className='row'>
                <div className='col' colSpan="2"><b>Domicilio</b></div>
                <div className='col' >Estado :<b>{factcab[0].status}</b> </div>
              </div>
              <div className='row'>
                <div className='col-4 text-end' >Calle</div><div className='col-8 text-start' colSpan="2">{factcab[0].calle}</div>
              </div>
              <div className='row'>
                <div className='col-4 text-end' >Localidad CP</div><div className='col-8 text-start' colSpan="2">{factcab[0].localidad} ({factcab[0].cp})</div>
              </div>
              <div className='row'>
                <div className='col-4 text-end' >Ciudad</div><div className='col-8 text-start' colSpan="2">{factcab[0].ciudad}</div>
              </div>
              <div className='row'>
                <div className='col-4 text-end' >Pais</div><div className='col-8 text-start' colSpan="2">{factcab[0].pais}</div>
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
                        {acceso === "A" ? (
                          <td onClick={() => handleRemove(i)}>
                          <FcDeleteRow style={estilo}
                            onMouseEnter={({ target }) => target.style.fontSize = "200%"}
                            onMouseLeave={({ target }) => target.style.fontSize = "150%"} />
                        </td>
                        ) : (<td>&nbsp;</td>)}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {acceso === "A" ? (
              <div className="addprod">
                <p onClick={() => handleAdd()}>
                  <FcAddRow style={estilo}
                    onMouseEnter={({ target }) => target.style.fontSize = "200%"}
                    onMouseLeave={({ target }) => target.style.fontSize = "150%"} />Agregar Producto
                </p>
              </div>
              ):(null)}
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
                  value={parseInt(factcab[0].desc_id)}
                >
                  <option value="0">Seleccionar</option>
                  {tabla && tabla.map((data) => {
                        return (
                          <option
                            selected
                            value={data.cod}
                            key={data.cod}
                          >{`${data.description + '  ' + data.valor + ' %'}`}</option>
                        );
                  })}
                </select>
              </div>
              <div className="addprod addprod2">

                <textarea
                  type="text"
                  id="observ"
                  cols="80"
                  rows="5"
                  name="observ"
                  value={factcab[0].observ}
                  placeholder="Observaciones"
                  onChange={(e) => handleTipo(e)}
                  className="txtarea"
                />
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
                    {parseInt(saleDescto) !== 0 ? (
                      <tr className='totaltr'>
                        <td colSpan='3' className='totaltd1'>
                          {saleDesc}
                        </td>
                        <td className='totaltr'>{dollarUSLocale.format(saleDescto)}</td>
                      </tr>
                    ) : (null)
                    }
                    <tr className='totaltr'>
                    {acceso === "A" ? (
                      <td >
                        <FcOk style={estilo2}
                          title="Crear OC"
                          onClick={handleSubmit} />
                      </td>
                       ):(<td>&nbsp;</td>)}
                      <td >
                        <FcLeft style={estilo2}
                          title="Volver"
                          onClick={() => { navigate("/factura"); }} />
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
