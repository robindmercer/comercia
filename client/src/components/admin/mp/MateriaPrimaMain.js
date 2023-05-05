import MateriaprimaList from './MateriaPrimaList';
import MateriaprimaContextProvider from './MateriaPrimaContext'
// './MateriaPrimaContext';
import Header from '../../Header';

function Conn() {
  return (
    <>
    <Header />
    <div className="container-xl bg-white">
      <div className="table-responsive">
        <div className="table-wrapper">
          <MateriaprimaContextProvider>
            <MateriaprimaList />
          </MateriaprimaContextProvider>
        </div>
      </div>
    </div>
    </>

  );
}

export default Conn;
