import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import { UsuarioContext } from "./UsuarioContext";
import { useContext } from "react";
import { getPerfil } from "../../../actions/perfil";
import { getStatus } from "../../../actions/status";
import { getCompania } from '../../../actions/compania';

import "./add.css"

const EditForm = ({ theUsuario }) => {
  const id = theUsuario.id;
  
  const [name, setName] = useState(theUsuario.name);
  const [usr_id, setUsr_id] = useState(theUsuario.usr_id);
  const [email, setEmail] = useState(theUsuario.email);
  const [password, setPassword] = useState(theUsuario.password);
  const [cod_perfil, setPerfil] = useState(theUsuario.cod_perfil);
  const [cod_status, setStatus] = useState(theUsuario.cod_status);
  const [cia_id, setCompania] = useState(theUsuario.cia_id);

  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();
  const perfil = useSelector((state) => state.perfil)
  const status = useSelector((state) => state.status)
  const compania = useSelector((state) => state.compania)


  const { updateUsuario } = useContext(UsuarioContext);
  
  const updatedUsuario = { id, name, usr_id, email, password,cia_id, cod_perfil,cod_status};

  useEffect(() => {
    dispatch(getCompania());
    dispatch(getPerfil());
    dispatch(getStatus());
  }, [dispatch]);


  // console.log('theUsuario: ', theUsuario);
  // console.log('tperfil: ', perfil);
  // console.log('status: ', status);
  
  function handlePerfil(e) {
    e.preventDefault();
    setPerfil(e.target.value)
  }
  function handleStatus(e) {
    e.preventDefault();
    setStatus(e.target.value)
    updatedUsuario.cod_status = e.target.value;
    console.log('handleStatus: ', updatedUsuario);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUsuario(updatedUsuario);
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <table>
        <tr>
          <td className="td1">id </td>
          <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Usr_id *"
              name="usr_id"
              value={usr_id}
              onChange={(e) => setUsr_id(e.target.value)}
              required
              />
          </td>
        </tr>
        <tr>
          <td className="td1">Nombre </td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Name *"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Email</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </td>
        </tr>
        <tr>
          <td className="td1">Password </td>
          <td>
            <input
              className="td2Des"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </td>
        </tr>
        <tr>
          <td className="td1">Compania </td>
          <select
                  name="compania"
                  id="compania"
                  onChange={(e) => setCompania(e.target.value)}
                  value={cia_id}
                >
                  <option value="0">Seleccionar</option>
                  {compania.map((comp) => {
                    return (
                          <option
                            value={comp.id}
                            key={comp.id}
                          >{`${comp.razsoc}`}</option>                   
                          )
                  })}
                </select>
        </tr>        
        <tr>
          <td className="td1">Perfil </td>
          <select
                  name="perfil"
                  id="perfil"
                  onChange={(e) => handlePerfil(e)}
                  value={cod_perfil}
                >
                  <option value="0">Seleccionar</option>
                  {perfil.map((perf) => {
                    return (
                          <option
                            value={perf.id_perfil}
                            key={perf.id_perfil}
                          >{`${perf.description}`}</option>                   
                          )
                  })}
                </select>
        </tr>
        <tr>
          <td className="td1">Status </td>
          <select 
                  name="status"
                  id="status"
                  onChange={(e) => handleStatus(e)}
                  value={cod_status}
                >
                  <option value="0">Seleccionar</option>
                  {status.map((sts) => {
                    return (
                          <option
                            value={sts.id_status}
                            key={sts.id_status}
                          >{`${sts.description}`}</option>
                           )                   
                  })}                </select>
          {/* <td>
            <input
              className="td2Dato"
              type="text"
              placeholder="Status"
              name="cod_status"
              value={cod_status}
              onChange={(e) => setPerfil(e.target.value)}
            />
          </td> */}
        </tr>
      </table>
      <Button variant="success" type="submit" block>
        Grabar Usuario
      </Button>
    </Form>
  );
};

export default EditForm;
