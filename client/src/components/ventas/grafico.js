import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
   AreaChart,Area
} from "recharts";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../../css/grafico.module.css";
import { getFacturaGraf } from "../../actions/grafico";

const Grafico = () => {
   const [onChange, setOnChange] = useState(false);
   const dispatch = useDispatch();
   const { grafico } = useSelector((state) => state);
   var data = [];
   const [input, setInput] = useState({
      fDesde: "",
      fHasta: "",
      selTipo:"1",
      selMoneda:"1",

   });
   const Procesar = () => {
      console.log("Procesar: ", input);
      if (onChange) {
         setOnChange(false);
         console.log("cambio 1", onChange);
      } else {
         setOnChange(true);
         console.log("cambio 2", onChange);
      }
   };

   useEffect(() => {
      if (onChange) {
         dispatch(getFacturaGraf(input.fDesde, input.fHasta));
         console.log("cambio");
      }
   }, [dispatch, onChange]);

   function handleTipo(e) {
      e.preventDefault();
      setInput({
         ...input,
         [e.target.name]: e.target.value,
      });
   }

   //    if (grafico.length > 0){
   console.log("grafico A: ", grafico.data,input);
   if (grafico.length > 0) {
      console.log('grafico: ', grafico);
      grafico.map((mp) => {    
         if (mp.moneda === parseInt(input.selMoneda)){
            return data.push({
               name: mp.periodo.toString(),
               noLib: input.selTipo === '1' ? parseInt(mp.nolib) : parseInt(mp.nolibc) ,
               lib: input.selTipo === '1' ? parseInt(mp.lib) : parseInt(mp.libc),
            });
         } else {
            return (null)
         }
      });
   }
   console.log("data: ", data,input);

   return (
      <div className={style.container}>
         <div className={style.header}>
            <h2>Grafico</h2>
         </div>
         <div className={style.fechas}>
            <div>
               <label htmlFor="fDesde">Fecha Desde&nbsp;</label>
               <input
                  id="fDesde"
                  name="fDesde"
                  type="date"
                  onChange={(e) => handleTipo(e)}
               />
            </div>
            <div>
               <label htmlFor="fHasta">Fecha Hasta&nbsp;</label>
               <input
                  id="fHasta"
                  name="fHasta"
                  type="date"
                  onChange={(e) => handleTipo(e)}
               />
            </div>
            <div>
                <label>Moneda:</label>
                  <select
                    className={style.facinput}
                    name="selMoneda"
                    id="selMoneda"
                    onChange={(e) => handleTipo(e)}
                    value={input.selMoneda}
                    placeholder="Seleccione Tipo de Moneda"
                  >
                    <option value="1">Peso</option>
                    <option value="2">Dolar</option>
                  </select>
            </div>
            <div>
                <label>Tipo Grafico:</label>
                  <select
                    className={style.facinput}
                    name="selTipo"
                    id="selTipo"
                    onChange={(e) => handleTipo(e)}
                    value={input.selTipo}
                    placeholder="Seleccione Tipo de Grafico"
                  >
                    <option value="1">Importe</option>
                    <option value="2">Cantidad de OC</option>
                  </select>
            </div>
            <div>
               <button className={style.myButton} onClick={() => Procesar()}>
                  Procesar
               </button>
            </div>
         </div>
         {grafico.length > 0 ? (
            <>
               <div className={style.grafFirst}>
                  <div className={style.graf1}>
                     <div>
                        {/* <div className={style.grafBody}>
                           <div className={style.dashboardGrid}>
                              <div> */}
                                 <div className={style.dashboardGrid_chart}>
                                    No Liberados
                                 </div>
                                 <div className={style.GrafDisp}>
                                    <ResponsiveContainer
                                       width="100%"
                                       height="100%"
                                    >
                                       <LineChart
                                          width={500}
                                          height={300}
                                          data={data}
                                          margin={{
                                             top: 5,
                                             right: 30,
                                             left: 20,
                                             bottom: 5,
                                          }}
                                       >
                                          <CartesianGrid strokeDasharray="3 3" />
                                          <XAxis dataKey="name" />
                                          <YAxis />
                                          <Tooltip />
                                          <Legend />
                                          <Line
                                             type="monotone"
                                             dataKey="noLib"
                                             stroke="#8884d8"
                                             activeDot={{ r: 8 }}
                                          />
                                          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                                       </LineChart>
                                    </ResponsiveContainer>
                                 {/* </div>
                              </div>
                           </div> */}
                        </div>
                     </div>
                  </div>
                  <div className={style.graf1}>
                     <div>
                        <div className={style.dashboardGrid_chart}>
                           Liberados
                        </div>
                        <div className={style.GrafDisp}>
                           <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                 width={500}
                                 height={300}
                                 data={data}
                                 margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                 }}
                              >
                                 <CartesianGrid strokeDasharray="3 3" />
                                 <XAxis dataKey="name" />
                                 <YAxis />
                                 <Tooltip />
                                 <Legend />
                                 <Line
                                    type="monotone"
                                    dataKey="lib"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                 />
                                 {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                              </LineChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                  </div>
               </div>
               <div className={style.grafSecond}>
               <div className={style.graf2}>
                     <div>
                        <div className={style.dashboardGrid_chart}>
                           Ambos
                        </div>
                        <div className={style.GrafDisp2}>
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                 width={500}
                                 height={300}
                                 data={data}
                                 margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                 }}
                              >
                                 <CartesianGrid strokeDasharray="3 3" />
                                 <XAxis dataKey="name" />
                                 <YAxis />
                                 <Tooltip />
                                 <Legend />
                                 <Area
                                    type="monotone"
                                    dataKey="noLib"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                 />
                                 <Area type="monotone" dataKey="lib" stroke="#82ca9d" /> 
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                  </div>
               </div>
               <div>
                <table className={style.tableGraf}>
                    <tbody>
                        <th className={style.thGraf}>Periodo</th>
                        <th className={style.thGraf}>No Liberado</th>
                        <th className={style.thGraf}>Liberado</th>
                        {data.length>0 ? data.map((mp) => {
                            return (
                            <tr className={style.trGraf}>
                                <td className={style.tdGraf}>{mp.name}</td>
                                <td className={style.tdGraf}>{new Intl.NumberFormat().format(mp.noLib)}</td>
                                <td className={style.tdGraf}>{new Intl.NumberFormat().format(mp.lib)}</td>
                            </tr>
                            )
                        }):(null)}
                    </tbody>
                </table>
               </div>
            </>
         ) : null}
      </div>
   );
};
export default Grafico;
