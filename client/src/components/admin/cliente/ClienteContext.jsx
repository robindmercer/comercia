import { createContext, useEffect} from "react";
// Rutinas de ABM de Clientes
import {
  getCliente,
  AddClientes  ,
  UpdateClientes,
} from "../../../../src/actions/cliente";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";

export const ClienteContext = createContext();

const ClienteContextProvider = (props) => {
  
  const { cliente } = useSelector((state) => state);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const usr = cookies.get("usuario");

  useEffect(() => {
    dispatch(getCliente(usr));
  }, [dispatch]);

  console.log("cliente context: ", cliente);

  const sortedClientes = cliente.sort((a, b) => (a.name < b.name ? -1 : 1));

  const addCliente = (data) => {
    console.log("addCliente: ", data);
    // dispatch(AddClientes(data));
    dispatch(getCliente());
  };

  const updateCliente = (data) => {
    console.log("updateCliente: ", data);
    // dispatch(UpdateClientes(data));
    dispatch(getCliente());
  };

  return (
    <ClienteContext.Provider
      value={{ sortedClientes, addCliente, updateCliente }}
    >
      {props.children}
    </ClienteContext.Provider>
  );
};

export default ClienteContextProvider;
