import { createContext, useEffect} from "react";
// Rutinas de ABM de Usuarios
import {
  getUsuario,
  AddUsuario,
  UpdateUsuario,
} from "../../../actions/usuario";
import { useDispatch, useSelector } from "react-redux";

export const UsuarioContext = createContext();

const UsuarioContextProvider = (props) => {
  const { usuario } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsuario());
  }, [dispatch]);

  console.log("usuario context: ", usuario);

  const sortedUsuarios = usuario.sort((a, b) => (a.name < b.name ? -1 : 1));

  const addUsuario = (data) => {
    console.log("addUsuario: ", data);
    dispatch(AddUsuario(data));
    dispatch(getUsuario());
  };

  const updateUsuario = (data) => {
    console.log("updateUsuario: ", data);
    dispatch(UpdateUsuario(data));
    dispatch(getUsuario());
  };

  return (
    <UsuarioContext.Provider
      value={{ sortedUsuarios, addUsuario, updateUsuario }}
    >
      {props.children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioContextProvider;
