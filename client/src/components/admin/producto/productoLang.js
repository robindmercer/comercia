import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductoLang } from "../../../actions/productoLang";
import { Link } from "react-router-dom";
import "../../../css/producto.css";
import Header from "../../Header";
const Productolang = () => {
  const { productolang } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductoLang());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div>
        <br />
        <h2>Traducciones de Productos</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Id
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Lenguaje
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Descripcion
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {productolang &&
              productolang.map((prod) => {
                return (
                  <tr key={prod.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {prod.id}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {prod.lang}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {prod.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {prod.description}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      <Link
                        to={"/formProductolang"}
                        state={{
                          id: prod.id,
                          name: prod.name,
                          description: prod.description,
                          lang: prod.lang,
                          cod_status: prod.cod_status,
                        }}
                      >
                        🖋️
                      </Link>
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Productolang;
