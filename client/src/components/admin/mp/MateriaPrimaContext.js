import {createContext, useEffect} from 'react';
// Rutinas de ABM de Materiaprima 
import { getMateriaprima,AddMateriaprima,UpdateMateriaprima,deleteMPDetail } from "../../../actions/materiaprima";
import { useDispatch, useSelector } from "react-redux";

export const MateriaprimaContext = createContext()

const MateriaprimaContextProvider  = (props) => {

const { materiaprima } = useSelector((state) => state);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getMateriaprima());
}, [dispatch]);

console.log('materiaprima: ', materiaprima);

const sortedMateriaprima = materiaprima.sort((a,b)=>(a.name < b.name ? -1 : 1));

const addMateriaprima = (data) => {
    console.log('addMateriaprima: ',data);
    dispatch(AddMateriaprima(data));
    dispatch(getMateriaprima());
    // setMateriaprima([...materiaprima , {id:uuidv4(), name, descuento, enganche, meses}])
}

const deleteMateriaprima = (id) => {
    console.log('deleteMateriaprima: ',id);
    dispatch(deleteMPDetail(id));
    dispatch(getMateriaprima());
}

const updateMateriaprima = (data) => {
    console.log('updateMateriaprima: ',data);
    dispatch(UpdateMateriaprima(data));
    dispatch(getMateriaprima());
    // setMateriaprima(materiaprima.map((employee) => employee.id === id ? updatedMateriaprima : employee))
}

    return (
        <MateriaprimaContext.Provider value={{sortedMateriaprima, addMateriaprima, deleteMateriaprima, updateMateriaprima}}>
            {props.children}
        </MateriaprimaContext.Provider>
    )
}

export default MateriaprimaContextProvider;