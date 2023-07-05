import {createContext, useEffect, useState} from 'react';
// Rutinas de ABM de Condiciones 
import { getCondiciones,AddCondiciones,UpdateCondiciones,DelCondiciones } from "../../../actions/condiciones";
import { useDispatch, useSelector } from "react-redux";



export const CondicionContext = createContext()

const CondicionContextProvider  = (props) => {

const { condiciones } = useSelector((state) => state);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getCondiciones());
}, [dispatch]);

console.log('condiciones: ', condiciones);

// useEffect(()=> {
//     setCondiciones(JSON.parse(cookies.get('condiciones')))
// },[])

// useEffect(() => {
//     localStorage.setItem('condiciones', JSON.stringify(condiciones));
// })



const sortedCondiciones = condiciones.sort((a,b)=>(a.name < b.name ? -1 : 1));



const addCondicion = (data) => {
    console.log('addCondicion: ',data);
    dispatch(AddCondiciones(data));
    dispatch(getCondiciones());
    // setCondiciones([...condiciones , {id:uuidv4(), name, descuento, enganche, meses}])
}

const deleteCondicion = (id) => {
    console.log('deleteCondicion: ',id);
    dispatch(DelCondiciones(id));
    dispatch(getCondiciones());
    // setCondiciones(condiciones.filter(employee => employee.id !== id))
}

const updateCondicion = (data) => {
    console.log('updateCondicion: ',data);
    dispatch(UpdateCondiciones(data));
    dispatch(getCondiciones());
    // setCondiciones(condiciones.map((employee) => employee.id === id ? updatedCondicion : employee))
}

    return (
        <CondicionContext.Provider value={{sortedCondiciones, addCondicion, deleteCondicion, updateCondicion}}>
            {props.children}
        </CondicionContext.Provider>
    )
}

export default CondicionContextProvider;