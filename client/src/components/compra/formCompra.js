import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "../../css/inputGrid.module.css";
import ImagenCerrar from "../../images/cerrar.png";
// import { useQuery } from "@tanstack/react-query";

import { getMateriaprima } from "../../actions/materiaprima"

import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
const FormCompra = () => {
   const hoy = new Date();
   const { materiaprima } = useSelector((state) => state);
   const dispatch = useDispatch(); 
   // const [onChange, setOnChange] = useState(false);
   const [nombre, setName] = useState("");
   const [ttitulo, setTtitulo] = useState("");
   //   const [materiaprima, setmateriaprima] = getMateriaprima();
   //   var materiaprima = getMateriaprima();
   const location = useLocation();
   const navigate = useNavigate();
   const { state } = location;
   
   useEffect(() => {
      dispatch(getMateriaprima());
   }, [dispatch]); 

   const [input, setInput] = useState({
      tipo: 2,
      titulo: "",
      fecha: hoy.toISOString().split("T")[0],
      id: state ? state.id : 0,
      // materiaprima: state ? state.materiaprima : [],
      compra: [],
   });
   // const [ materiaprima, setmateriaprima] = useState([]);
   var materiaprimaFiltrado = [];
   var muestroProd = true 
   // const { materiaprima, isLoading } = useQuery({
   //    queryKey: ["materiaprima"],
   //    queryFn: () =>
   //       fetch(urlProducto, {
   //          headers: {
   //             Authorization: `Bearer ${token}`,
   //          },
   //       }).then((res) => res.json(), console.log("busco datos")),
   // });

   if (materiaprima) {
      console.log('materiaprima: ', materiaprima);
      console.log("Grabando materiaprimaFiltrado");
      for (let i = 0; i < materiaprima.length; i++) {
         const newProdmp = {
            name: materiaprima[i].name,
            description: materiaprima[i].description,
            stock: materiaprima[i].stock,
            cantidad: 0,
         };
         materiaprimaFiltrado.push(newProdmp);
      }
   }

   if (input.materiaprima?.length > 0) {
      // setName(input.titulo)
      muestroProd = false
      console.log('Entre');
      for (let indx = 0; indx < input.materiaprima.length; indx++) {
         console.log('id: ', input.materiaprima[indx].id);
         const newProdmp = {
            id: input.materiaprima[indx].id,
            description: input.materiaprima[indx].description,
            precio: input.materiaprima[indx].dolar,
            stock: input.materiaprima[indx].stock,
            cantidad: input.materiaprima[indx].compramateriaprima.cantidad,
         };
         input.compra.push(newProdmp);
      }
   }
   
   // const [input, setInput] = useState({
      //    id_primary: state ? state.id_primary : 0,
      //    id: state ? state.id : 0,
      //    desc: state ? state.desc : "", // name del
      //    cantidad: 0,
      //    servicioIdPrimary: 0,
      //    insumoIdPrimary: 0,
      // });
      const handleRemove = (id) => {
         for (let x = 0; x < input.compra.length; x++) {
            console.log("handleRemove: ", input.compra[x].id);
            if (input.compra[x].id === id) {
               input.compra.splice(x, 1);
            }
         }
      setInput({ ...input, cantidad: 1 });
   };

   function handleChange(e) {
      e.preventDefault();
      setInput({
         ...input,
         [e.target.name]: e.target.value,
      });
      console.log("input: ", input);
      // setErrors(
         //    validate({
            //       ...input,
            //       [e.target.name]: e.target.value,
            //    })
            // );
         }
         
         const handleSubmit = (e) => {
            e.preventDefault();
            input.titulo = ttitulo;
            console.log("handleSubmit : ", input);
            // fetch(urlCompra, {
            //    method: "POST",
            //    body: JSON.stringify(input),
            //    headers: {
            //       Authorization: `Bearer ${token}`,
            //       "Content-Type": "application/json",
            //    },
            // }).then((res) => res.json());
            // window.location.href = "/Servicio";
         };
         function handleNewCant(id) {
      console.log("handleNewCant: ");
   }

   function handleCant(e, codid, tipo) {
      console.log("e.key: ", e.key);
      if (e.key === "Enter") {
         if (e.target.value > 0) {
            var encontre = "N";
            console.log("prod id : ", codid, e.target.value);
            // Busco materiaprima
            for (let x = 0; x < input.compra.length; x++) {
               if (input.compra[x].id === codid) {
                  encontre = "S";
                  if (tipo === "C") {
                     input.compra[x].cantidad = e.target.value;
                  } else {
                     input.compra[x].precio = e.target.value;
                  }
               }
            }
            if (encontre === "N") {
               for (let z = 0; z < materiaprima.length; z++) {
                  if (materiaprima[z].id === codid) {
                     const newProdmp = {
                        id: materiaprima[z].id,
                        description: materiaprima[z].description,
                        dolar: materiaprima[z].dolar,
                        stock: materiaprima[z].stock,
                        cantidad: 0,
                        precio: 0,
                     };
                     if (tipo === "C") {
                        newProdmp.cantidad = e.target.value;
                     } else {
                        newProdmp.precio = e.target.value;
                     }
                     encontre = "S";
                     console.log("newProdmp: ", newProdmp);
                     input.compra.push(newProdmp);
                  }
               }
            }
         } else {
            for (let x = 0; x < input.compra.length; x++) {
               if (input.compra[x].id === codid) {
                  console.log(
                     "tipo: ",
                     tipo,
                     input.compra[x].cantidad,
                     input.compra[x].precio
                  );
                  if (tipo === "C") input.compra[x].cantidad = 0;
                  if (tipo === "P") input.compra[x].precio = 0;
                  console.log(
                     "input.compra[x].precio: ",
                     input.compra[x].precio
                  );
                  if (
                     parseInt(input.compra[x].cantidad) === 0 &&
                     parseFloat(input.compra[x].precio) === 0
                  ) {
                     console.log("splice: ");
                     input.compra.splice(x, 1);
                  }
                  encontre = "S";
               }
            }
         }
         console.log("encontre: ", encontre);
         if (encontre === "S") {
            setInput({ ...input, cantidad: 1 });
         }
         console.log("handleCant: ", materiaprimaFiltrado, input.compra);
      }
   }
   function handleCant2(e, codid, tipo) {
      if (e.target.value > 0) {
         var encontre = "N";
         console.log("prod id : ", codid, e.target.value);
         for (let x = 0; x < input.compra.length; x++) {
            if (input.compra[x].name === codid) {
               console.log("encontre");
               encontre = "S";
               if (tipo === "C") {
                  input.compra[x].cantidad = e.target.value;
               } else {
                  input.compra[x].precio = e.target.value;
               }
            }
         }
         if (encontre === "N") {
            for (let z = 0; z < materiaprima.length; z++) {
               if (materiaprima[z].name === codid) {
                  const newProdmp = {
                     name: materiaprima[z].name,
                     description: materiaprima[z].description,
                     stock: materiaprima[z].stock,
                     cantidad: 0,
                  };
                  if (tipo === "C") {
                     newProdmp.cantidad = e.target.value;
                  } else {
                     newProdmp.precio = e.target.value;
                  }
                  encontre = "S";
                  console.log("newProdmp: ", newProdmp);
                  input.compra.push(newProdmp);
               }
            }
         }
      } else {
         for (let x = 0; x < input.compra.length; x++) {
            if (input.compra[x].name === codid) {
               console.log(
                  "tipo: ",
                  tipo,
                  input.compra[x].cantidad,
                  input.compra[x].precio
               );
               if (tipo === "C") input.compra[x].cantidad = 0;
               if (tipo === "P") input.compra[x].precio = 0;
               console.log("input.compra[x].precio: ", input.compra[x].precio);
               if (
                  parseInt(input.compra[x].cantidad) === 0 &&
                  parseFloat(input.compra[x].precio) === 0
               ) {
                  console.log("splice: ");
                  input.compra.splice(x, 1);
               }
               encontre = "S";
            }
         }
      }
      console.log("encontre: ", encontre);
      if (encontre === "S") {
         setInput({ ...input, cantidad: 1 });
      }
      console.log("handleCant: ", materiaprimaFiltrado, input.compra);
   }
   
   console.log("input: ", input);
   console.log('input.materiaprima: ', input.materiaprima);
   
   return (
      <>
      <Header/>
         <div className={style.container}>
            <div className={style.gridTable}>
               <div>
                  <div className={style.divizq}>
                     <div className={style.trTitle}>Compras materiaprima</div>
                     <div className={style.divBuscar}>
                        <label htmlFor="search-navbar">Buscar:&nbsp;</label>
                        <input
                           className={style.inputBuscar}
                           // onKeyPress={(e) => handleInputChange(e)}
                           onChange={(e) => setName(e.target.value)}
                           type="text"
                           id="search-navbar"
                           placeholder="Buscar..."
                           value={nombre}
                        />
                     </div>
                     <div className={style.divBuscar}>
                        <label htmlFor="search-navbar">
                           name:&nbsp;
                        </label>
                        <input
                           className={style.inputBuscar}
                           type="text"
                           id="search-navbar"
                           placeholder="name de la compra"
                           value={ttitulo}
                           onChange={(e) => setTtitulo(e.target.value)}
                        />
                     </div>
                     <div className={style.divflex}>
                        <div className={
                     muestroProd ? style.divizq : style.divHide
                  }>
                           <table className={style.gridTable}>
                              <thead>
                                 <tr className={style.trTitle}>
                                    {/* <th>ID</th> */}
                                    <th>Decripcion</th>
                                    {/* <th>Precio</th> */}
                                    <th>Stock Actual</th>
                                    <th>Cantidad</th>
                                 </tr>
                              </thead>
                              {materiaprimaFiltrado &&
                                 materiaprimaFiltrado.map((serv, indx) => {
                                    var muestroreg = true;
                                    if (nombre !== "") {
                                       if (
                                          serv.description
                                             .toUpperCase()
                                             .includes(nombre.toUpperCase())
                                       ) {
                                          muestroreg = true;
                                       } else {
                                          muestroreg = false;
                                       }
                                    }
                                    if (muestroreg) {
                                       return (
                                          <tr
                                             key={indx}
                                             onClick={() =>
                                                handleNewCant(serv.id)
                                             }
                                          >
                                             {/* <td className={style.tdleft}>
                                                {serv.id}
                                             </td> */}
                                             <td className={style.tdleft}>
                                                &nbsp;{serv.description}
                                             </td>
                                             <td className={style.precio}>
                                                {serv.stock}
                                             </td>
                                             <td className={style.tdright}>
                                                &nbsp;&nbsp;&nbsp;
                                                <input
                                                   className={style.style_input}
                                                   type="text"
                                                   // value={serv.cantidad}
                                                   onBlur={(e) =>
                                                      handleCant2(
                                                         e,
                                                         serv.name,
                                                         "C"
                                                      )
                                                   }
                                                   onKeyPress={(e) =>
                                                      handleCant(
                                                         e,
                                                         serv.name,
                                                         "C"
                                                      )
                                                   }
                                                ></input>
                                             </td>
                                             {/* <td className={style.tdright}>
                                                &nbsp;&nbsp;&nbsp;
                                                <input
                                                   className={style.style_input}
                                                   type="text"
                                                   // value={serv.cantidad}
                                                   onBlur={(e) =>
                                                      handleCant2(
                                                         e,
                                                         serv.id,
                                                         "P"
                                                      )
                                                   }
                                                   onKeyPress={(e) =>
                                                      handleCant(
                                                         e,
                                                         serv.id,
                                                         "P"
                                                      )
                                                   }
                                                ></input>
                                             </td> */}
                                          </tr>
                                       );
                                    } else {
                                       return null;
                                    }
                                 })}
                           </table>
                        </div>
                        <div className={style.divright}>
                           <table className={style.gridTable}>
                              <thead>
                                 <tr className={style.trTitle}>
                                    {/* <th>ID</th> */}
                                    <th>Decripcion</th>
                                    {/* <th>Stock Actual</th> */}
                                    <th>Cantidad</th>
                                    {/* <th>Precio</th> */}
                                    <th>##</th>
                                 </tr>
                              </thead>
                              {input.compra &&
                                 input.compra.map((serv) => {
                                    return (
                                       <tr
                                          key={serv.id}
                                          onClick={() => handleNewCant(serv.id)}
                                       >
                                          {/* <td className={style.tdleft}>
                                             {serv.id}
                                          </td> */}
                                          <td className={style.tdleft}>
                                             {serv.description}
                                          </td>
                                          {/* <td className={style.precio}>
                                             {serv.stock}
                                          </td> */}
                                          <td className={style.precio}>
                                            &nbsp;{serv.cantidad}
                                             &nbsp; &nbsp;&nbsp;
                                          </td>
                                          {/* <td className={style.precio}>
                                             &nbsp;&nbsp;&nbsp;{serv.precio}
                                             &nbsp;&nbsp;&nbsp;
                                          </td> */}
                                          <td>
                                             <img
                                                onClick={() =>
                                                   handleRemove(
                                                      serv.id
                                                   )
                                                }
                                                src={ImagenCerrar}
                                                height="30px"
                                                alt=""
                                             />
                                          </td>
                                       </tr>
                                    );
                                 })}
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div>
               <button
                  className={style.inputBtnNew}
                  onClick={(e) => handleSubmit(e)}
               >
                  {" "}
                  Grabar
               </button>
               &nbsp;&nbsp;&nbsp;&nbsp;
               <button
                  className={style.inputBtnNew}
                  onClick={() => {
                     navigate("/Compra");
                  }}
               >
                  VOLVER
               </button>
            </div>
         </div>
      </>
   );
};

export default FormCompra;
