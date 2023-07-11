// eslint-disable-next-line
//robin
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
// Iconos 
import { FcDeleteRow, FcOk, FcLeft } from 'react-icons/fc'

import Header from '../../Header';
// CSS
//import '../../css/factdet.css'
// Acciones 
import { deleteMPDetail, getMateriaprima, getMPDetail,AddMPDetail, resetProd } from '../../../actions/materiaprima';
import Cookies from 'universal-cookie'
import { InsertData, RunSqlDel } from '../../../actions/admin';
const FormProdMp = () => {


   const [datos, setDatos] = useState({
      sql1:"",
      sql2:""
   }); 

  const idProg = 3;
  const cookies = new Cookies();
  var btnGrabar = false;
  const { materiaprima } = useSelector((state) => state)
  const { prodmp } = useSelector((state) => state)
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const estilo = { fontSize: "150%", transition: 'font-size 0.5s' };

  const [onChange, setOnChange] = useState(false)

  // Accesos 
  const [acceso, setAcceso] = useState("");
  
  // Fin control Accesos 
  const initialProductLine = {
    prod_id: state.id,
    mp_name: '',
    description: '',
    udm: 'Pieza',
    cantidad: 1,
  }
  
  useEffect(() => {
    
    dispatch(getMPDetail(state.id));
    dispatch(getMateriaprima());
    setAcceso(cookies.get("acceso"))
    // return (
      //   dispatch(resetProd())
      // )
  }, [dispatch, state.id]);

  useEffect(() => {
    if (onChange) {
    }
  }, [onChange, prodmp])


  const handleRemove = (i) => {
    prodmp.splice(i, 1)
    if (onChange) {
      setOnChange(false)
    } else {
      setOnChange(true)
    }
  }
  
  const handleStatus = (e) => {
    e.preventDefault();
    console.log('handleStatus: ', e.target.value);
    for (var z = 0; z < materiaprima.length; z++) {
      if (materiaprima[z].description === e.target.value) {
        const newProdmp = {
          prod_id : state.id,
          name : materiaprima[z].name,
          mp_name : materiaprima[z].name,
          description : materiaprima[z].description,
          cantidad : 1
        }
        prodmp.push(newProdmp)
      }
    }
    if (onChange) {
      setOnChange(false)
    } else {
      setOnChange(true)
    }
  }    
  
  
  //   const handleAdd = () => {
    //   prodmp.push(initialProductLine)
    //   console.log('prodmp: ', prodmp);
    //   if (onChange) {
      //     setOnChange(false)
      //   } else {
        //     setOnChange(true)
        //   }
        // }
        // function handleChange(e) {
          //       e.preventDefault();
          //   console.log('e.target.value: ', e.target.value);
          // }
          
          function handleTipo(e, i) {
            e.preventDefault();
            console.log('e.target.value: ', e.target.value);
            console.log('e.target.name: ', e.target.name);
            console.log('e.target.id: ', i.i);
            
            if (e.target.name === 'mp_name') {
              if (e.target.value === '0') {
        handleRemove(i.i)
      } else {
        for (var z = 0; z < materiaprima.length; z++) {
          if (materiaprima[z].id === e.target.value) {
            prodmp[i.i].mp_name = materiaprima[z].name
            prodmp[i.i].name = materiaprima[z].name
            prodmp[i.i].description = materiaprima[z].description
            prodmp[i.i].udm = materiaprima[z].udm
            prodmp[i.i].cantidad = 1
          }
        }
      }
      if (onChange) {
        setOnChange(false)
      } else {
        setOnChange(true)
      }
    }
    if (e.target.name === 'cantidad') {
      prodmp[i.i].cantidad = e.target.value
      if (onChange) {
        setOnChange(false)
      } else {
        setOnChange(true)
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
   console.log('prodmp', prodmp);
    //dispatch(AddCliente(input));
    //navigate("/cliente");
    var xSql2 = "insert into prodmp  (prod_id,mp_name,cantidad) values "
      var xSql3 = ""
      for (var i = 0; i < prodmp.length; i++) {
          xSql3 +=`(${state.id},'${prodmp[i].mp_name}',${prodmp[i].cantidad});`
         }
      
      //xSql3 = xSql2 + xSql3.substring(0,xSql3.length-1)
      var sql=`delete from prodmp where prod_id = ${state.id}` 
      setDatos(datos.sql1=sql)
      dispatch(RunSqlDel(datos))
      setDatos(datos.sql1=xSql2)
      setDatos(datos.sql2=xSql3)
     
      dispatch(InsertData(datos))
      window.location.href = '/producto';
  };

  if (acceso.substring(0,1)==='A'){
    btnGrabar = true
  }
  
  // if (!prodmp.length > 0) { prodmp.push(initialProductLine) }
  
  //if (prodmp.length > 0) {
    return (
      <>
        <Header />
        <div >
          <div ><br />Producto : <b>{state.name}</b><br /><br /></div>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="detalleCab">
            <div className="detalle">
              <table className="styled-table">
                <thead>
                  <tr className="table-success">
                    {/* <th>Id</th> */}
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>U.Medida</th>
                    <th>Cantidades</th>
                  </tr>
                </thead>
                <tbody>
                  {prodmp.length > 0 && prodmp.map((data, i) => {
                    return (
                      <tr key={i} >
                        <td>{data.name}</td>
                        <td>{data.description}</td>
                        <td>{data.udm}</td>
                        <td>
                          <input className='input_fact'
                            type="text"
                            id="cantidad"
                            name="cantidad"
                            value={data.cantidad}
                            onChange={(e) => handleTipo(e, { i })}
                          />
                        </td>
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
                { btnGrabar ? (
              <div>
                <label
                  htmlFor="mp"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Materia Prima:
                </label>
                <select
                  name="mp"
                  id="mp"
                  onChange={(e) => handleStatus(e)}
                >
                  <option value="0">Seleccionar</option>
                  {materiaprima.map((mp) => {
                        return (
                          <option
                            value={mp.id}
                            key={mp.id}
                          >{`${mp.description}`}</option>
                        );
                      }
                    )}
                    </select>
              </div>
                ):null }
              <div>
                { btnGrabar ? (
                <button className="botButton"
                  type="submit"
                >
                  <FcOk style={estilo}
                    onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                    onMouseLeave={({ target }) => target.style.fontSize = "200%"} />
                </button>
                ):null }
                &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                <FcLeft style={estilo}
                  onMouseEnter={({ target }) => target.style.fontSize = "280%"}
                  onMouseLeave={({ target }) => target.style.fontSize = "200%"}
                  onClick={() => { navigate("/producto"); }} />
              </div>

            </div>
          </div>
        </form>
      </>
    );
  // } else {
  //   return (
  //     <div>
  //       <h1>no hay datos</h1>
  //     </div>
  //   );

  // }
}


export default FormProdMp;
