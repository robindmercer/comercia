import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FacturaCompleta() {
  const navigate = useNavigate();
  //const { calle, ciudad, codigoPostal, provincia } = direccion;

 // const url = "https://back-pgvinos.herokuapp.com";

  const url = "http://localhost:3001" 
  

  useEffect(() => {
   
      axios.post(`${url}/email`, {
        subject: 'Confirmacion de compra',
        to: 'robindmercer@yahoo.com.ar',        
        html: `<table style="margin:0 auto; width: 600px; font-family: 'Poppins', sans-serif;">
        <tr>
          <td style="background: #000;">
            <p>Estimado su compra ha sido confirmada</p>
          </td>
        </tr>
      </table>
        `,
      });
  }, []);

  return (
    <div className="grid justify-center content-around">
        <div className="mt-5">
          <h1 className="text-[30px] text-indigo-600 font-bold ml-10">Gracias por su compra!</h1>
          <p className="text-italic">
            Le enviamos un mail a la direccion con
            el detalle de la misma
          </p>
        </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => navigate("/layout", { replace: true })}
      >
        Volver a Home
      </button>
    </div>
  );
}

export default FacturaCompleta;
