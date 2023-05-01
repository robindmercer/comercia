import UsuarioList from './UsuarioList';
import UsuarioContextProvider from './UsuarioContext';
import Header from '../../Header';

function Conn() {
  return (
    <>
    <Header />
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <UsuarioContextProvider>
            <UsuarioList />
          </UsuarioContextProvider>
        </div>
      </div>
    </div>
    </>

  );
}

export default Conn;
