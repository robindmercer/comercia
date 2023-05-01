import {createContext, useEffect, useState} from 'react';
// Rutinas de ABM de Usuarios 
import { getUsuario,AddUsuario,UpdateUsuario } from "../../../actions/usuario";
import { useDispatch, useSelector } from "react-redux";



export const UsuarioContext = createContext()

const UsuarioContextProvider  = (props) => {

const { usuario } = useSelector((state) => state);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getUsuario());
}, [dispatch]);

console.log('usuarios: ', usuario);

// useEffect(()=> {
//     setUsuarios(JSON.parse(localStorage.getItem('usuarios')))
// },[])

// useEffect(() => {
//     localStorage.setItem('usuarios', JSON.stringify(usuarios));
// })



const sortedUsuarios = usuario.sort((a,b)=>(a.name < b.name ? -1 : 1));



const addUsuario = (data) => {
    console.log('addUsuario: ',data);
    dispatch(AddUsuario(data));
    dispatch(getUsuario());
    // setUsuarios([...usuarios , {id:uuidv4(), name, usr_id, email, password}])
}

// const deleteUsuario = (id) => {
//     console.log('deleteUsuario: ',id);
//     dispatch(DelUsuario(id));
//     dispatch(getUsuario());
//     // setUsuarios(usuarios.filter(employee => employee.id !== id))
// }

const updateUsuario = (data) => {
    console.log('updateUsuario: ',data);
    dispatch(UpdateUsuario(data));
    dispatch(getUsuario());
    // setUsuarios(usuarios.map((employee) => employee.id === id ? updatedUsuario : employee))
}

    return (
        <UsuarioContext.Provider value={{sortedUsuarios, addUsuario, updateUsuario}}>
            {props.children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioContextProvider;