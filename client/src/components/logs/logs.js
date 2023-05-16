//robin
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../Header";

// Acciones
import { getLogs } from "../../actions/logs";
//css
import "../../css/all.css";

function LogsDetail() {
  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();
  const { logs } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getLogs(state.idfact));
  }, [dispatch, state.idfact]);

  return (
    <>
      <Header />
      <div className="divHeader">
        <div>
          <h2>LOGS</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
      <div>
        <table className="styled-table">
          <thead>
            <tr className="table-success">
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Numero</th>
              <th>Departamento</th>
              <th>Usuario</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs &&
              logs.map((data, i) => {
                return (
                  <>
                    <tr key={i}>
                      <td>{data.fecha}</td>
                      <td>{data.tipo_id}</td>
                      <td>{data.doc_id}</td>
                      <td>{data.description}</td>
                      <td>{data.name}</td>
                      <td>{data.status}</td>
                    </tr>
                    {data.observ !== "" ? (
                      <tr key={i + 1000}>
                        <td colSpan={6}>
                          Observación :<b> {data.observ}</b>
                        </td>
                      </tr>
                    ) : null}
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LogsDetail;
