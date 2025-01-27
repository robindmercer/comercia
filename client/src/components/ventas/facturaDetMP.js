import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFacturaDetMP} from "../../actions/factura";
import { Link, useLocation } from "react-router-dom";
import Header from "../Header";
import { FcAddDatabase,FcCancel,FcDiploma2, FcAbout} from "react-icons/fc";
import style from "../../css/factura.module.css";
// import { getDetail } from "../../actions/tabla";

const Factura = () => {
  const { factura } = useSelector((state) => state);
  // const [idFact,setIdFact]=useState(0)
  const dispatch = useDispatch();
  const dollarUSLocale = Intl.NumberFormat("de-DE");
  const estilo = { fontSize: "200%", transition: "font-size 0.5s" };
  const location = useLocation();
  const { state } = location;
  
  useEffect(() => {
    console.log("Factura Use Efect");
    dispatch(getFacturaDetMP(state.id));
  }, []);
  
  console.log('factura: ', factura);
  return (
    <>
      <Header />
      <div className={style.adminHeader}>
        <br />
        <h2>Materia prima OC:{state.id}</h2>
        <table className={style.styledTable}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Descripcion</th>
              <th>Stock</th>
              <th>Cantidad Utilizada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {factura &&
              factura.map((data) => {
                return (
                  <tr key={data.name} className="style.row">
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{dollarUSLocale.format(data.stock)}</td>
                    <td>{dollarUSLocale.format(data.cantidad)}</td>
                    <td>
                      <Link
                        to={"/formfacturaMP"}
                        className="dLink"
                        state={{
                          idfact: data.id,
                          sts:data.cod_status
                        }}
                      >
                        <FcAddDatabase
                          style={estilo}
                          title="Ver MP."
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
                )
              })}
          </tbody>
        </table>
      </div>
      {/* <DeleteConfirmation 
         showModal={displayConfirmationModal} 
         confirmModal={() => {handleSubmit(id)}} 
         hideModal={hideConfirmationModal} 
         id={id} message={deleteMessage}
      /> */}
    </>
  );
};

export default Factura;
