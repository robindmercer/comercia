import { Form, Button } from "react-bootstrap";

import { UsuarioContext } from "./UsuarioContext";
import { useContext, useEffect, useState } from "react";
import { getPerfil } from "../../../actions/perfil";
import "./add.css"
import { useDispatch, useSelector } from "react-redux";
import { getCompania } from '../../../actions/compania';

const AddForm = () => {
  const dispatch = useDispatch();
  const { addUsuario } = useContext(UsuarioContext);
  const perfil = useSelector((state) => state.perfil)
  const [codperfil, setPerfil] = useState(3);
  const [ciaid, setCompania] = useState(1);
  const compania = useSelector((state) => state.compania)
  const [newUsuario, setNewUsuario] = useState({
    id:0,
    name: "",
    usr_id: "",
    cia_id:ciaid,
    email: "",
    password: "",
    cod_perfil: codperfil,
    cod_status: "1"
  });

  useEffect(() => {
    dispatch(getCompania());
    dispatch(getPerfil());
  }, [dispatch]);


  const onInputChange = (e) => {
    setNewUsuario({ ...newUsuario, [e.target.name]: e.target.value });
  };

  const { name, usr_id, password, email, cod_perfil } = newUsuario;

  const handleSubmit = (e) => {
    e.preventDefault();
    //addUsuario(name, usr_id, password, email);
    addUsuario(newUsuario);
  };
  function handlePerfil(e) {
    e.preventDefault();
    setPerfil(e.target.value)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <table>
        <tr  >
          <td className="td1">Descripicion</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Descripicion *"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Usr_id&nbsp;</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Usr_id *"
              name="usr_id"
              value={usr_id}
              onChange={(e) => onInputChange(e)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Email&nbsp;</td>
          <td>
            <input              
              className="td2Des"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Password&nbsp;</td>
          <td>
            <input
              className="td2Des"
              type="text"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </td>
        </tr>
        <tr>
          <td className="td1">Compania </td>
          <select
                  name="compania"
                  id="compania"
                  onChange={(e) => setCompania(e.target.value)}
                  value={ciaid}
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
      </table>
      <Button variant="success" type="submit" block>
        Alta Usuarios
      </Button>
    </Form>
  );
};

export default AddForm;
