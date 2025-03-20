import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsuario } from "../../actions/usuario";
import { Link } from "react-router-dom";
import '../../css/usuario.css'
import Header from '../Header';
import { FcSurvey, FcList } from 'react-icons/fc'

const Usuario = () => {
    const { usuario } = useSelector((state) => state);
    const dispatch = useDispatch();
    const estilo = { fontSize: "200%", transition: 'font-size 0.5s' };

    useEffect(() => {
        dispatch(getUsuario());
    }, [dispatch]);
    //   //const navigate = useNavigate();

    // console.log('usuario: ', usuario);

    // const handleDelete = (id) => {
    //     //   dispatch(delAdmin(id_categ,'categories','id_categ','categ'))
    //     //   window.location.href = '/admin/listCategory';
    //     //   console.log('Deleted',id);
    //     dispatch(ChangeStatus(id));
    //     dispatch(getUsuario());
    // }

    return (
        <>
            <Header />
            <div>
                <div className="divHeader">
                    <div>
                        <h2>Usuarios</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div>
                        <Link
                            to={'/formUsuario'}
                            className="dLink"
                            state={
                                {
                                    id: 0,
                                    usr_id: "",
                                    name: "",
                                    email: "",
                                    pass: "",
                                    cod_perfil: 0,
                                    cod_status: 1
                                }
                            }
                        > <FcSurvey style={estilo} />
                        </Link>&nbsp;&nbsp;
                    </div>
                </div>
                <div>
                    <table className="styled-table">
                        <thead>
                            <tr className="table-success">
                                <th  >Id</th>
                                <th  >Nombre</th>
                                <th className="d-none d-lg-table-cell">Email</th>
                                <th className="d-none d-lg-table-cell">Perfil</th>
                                <th className="d-none d-lg-table-cell">Estado</th>
                                <th  >Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuario && usuario.map(user => {
                                return (
                                    <tr key={user.id} >
                                        <td >{user.usr_id}</td>
                                        <td >{user.name}</td>
                                        <td className="d-none d-lg-table-cell">{user.email}</td>
                                        <td className="d-none d-lg-table-cell">{user.perfil.description}</td>
                                        <td className="d-none d-lg-table-cell">{user.status.description}</td>
                                        <td >
                                            <Link
                                                to={'/formUsuario'}
                                                className="dLink"
                                                state={
                                                    {
                                                        id: user.id,
                                                        usr_id: user.usr_id,
                                                        name: user.name,
                                                        email: user.email,
                                                        password: user.password,
                                                        cia_id:user.cia_id,
                                                        cod_perfil: user.cod_perfil,
                                                        cod_status: user.cod_status
                                                    }
                                                } >
                                                <FcSurvey style={estilo} />
                                            </Link>&nbsp;&nbsp;
                                            <Link
                                                to={'/abmmenu'}
                                                className="dLink"
                                                state={
                                                    {
                                                        idacceso: user.usr_id,
                                                        nombre: user.name,
                                                    }
                                                }>
                                                <FcList title='Manejo Menu' style={estilo}></FcList>
                                            </Link>&nbsp;&nbsp;

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default Usuario;

