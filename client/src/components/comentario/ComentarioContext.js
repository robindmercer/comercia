import {createContext, useEffect, useState} from 'react';
// Rutinas de ABM de Comentario 
import { getComentarioID,AddComentario,UpdateComentario,DelComentario } from "../../actions/comentario";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'universal-cookie'

const cookies = new Cookies();

export const ComentarioContext = createContext()
//console.log('Cookies ComentarioContext fac_id: ', fac_id);
const ComentarioContextProvider  = (props) => {
    const [cambios,setCambios] = useState(false)
    
    const { comentario } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComentarioID(cookies.get("fac_id")));
        if (cambios){
            setCambios(false)
        }
    }, [dispatch,cambios]);

    const fac_id = cookies.get("fac_id");
    console.log('comentario: ', comentario,fac_id);

    // useEffect(()=> {
//     setComentario(JSON.parse(cookies.get('comentario')))
// },[])

// useEffect(() => {
//     localStorage.setItem('comentario', JSON.stringify(comentario));
// })



const sortedComentario = comentario.sort((a,b)=>(a.name < b.name ? -1 : 1));



const addComentario = (data) => {
    console.log('addComentario: ',data);
    dispatch(AddComentario(data));
    setCambios(true)
    //dispatch(getComentarioID(fac_id));
    // setComentario([...comentario , {id:uuidv4(), name, descuento, enganche, meses}])
}

const deleteComentario = (id) => {
    console.log('deleteComentario: ',id);
    dispatch(DelComentario(id));
    setCambios(true)
    //dispatch(getComentarioID(fac_id));
    // setComentario(comentario.filter(employee => employee.id !== id))
}

const updateComentario = (data) => {
    console.log('updateComentario: ',data);
    dispatch(UpdateComentario(data));
    setCambios(true)
    //dispatch(getComentarioID(fac_id));
    // setComentario(comentario.map((employee) => employee.id === id ? updatedComentario : employee))
}
if (cambios){
    window.location.href = "/comentario";
}

return (
        <ComentarioContext.Provider value={{sortedComentario, addComentario, deleteComentario, updateComentario}}>
            {props.children}
        </ComentarioContext.Provider>
    )
}

export default ComentarioContextProvider;