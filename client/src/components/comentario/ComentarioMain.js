import { useLocation } from "react-router-dom";
import ComentarioList from './ComentarioList';
import ComentarioContextProvider from './ComentarioContext';
import Header from '../Header';
import Cookies from 'universal-cookie'

function Conn() {
  const cookies = new Cookies();
  const location = useLocation();
  const { state } = location;
  cookies.set('fac_id', state.facid)
  console.log('Cookies Main fac_id: ', state.fac_id);
  return (
    <>
    <Header />
    <div className="container-xl  bg-white">
      <div className="table-responsive">
        <div className="table-wrapper">
          <ComentarioContextProvider>
            <ComentarioList />
          </ComentarioContextProvider>
        </div>
      </div>
    </div>
    </>

  );
}

export default Conn;
