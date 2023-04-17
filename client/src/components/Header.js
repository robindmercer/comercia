import Navbar from "./Navbar";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import "../css/header.css";
const Header = () => {
  const actlogin = useSelector((state) => state.actlogin);
  console.log('actlogin: ', actlogin);

  return (
    <header>
      <div className="nav-area">
        <div className="logos">&nbsp;</div>
        <div>
          <Link to="/" className="logo"></Link>
          <Navbar />
        </div>
        <div className="usuarioHead">
          {actlogin.length > 0 ? (
            <div className="usuarioId">
              &nbsp;<b>{actlogin[0].perfil.description}</b> / {actlogin[0].name}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
