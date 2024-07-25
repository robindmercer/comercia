import ClienteList from './ClienteList';
import ClienteContextProvider from './ClienteContext';
// import Header from '../../Header';

function Conn() {
  return (
    <>
    {/* <Header /> */}
    <div className="container-xl bg-white">
      <div className="table-responsive">
        <div className="table-wrapper">
          <ClienteContextProvider>
            <ClienteList />
          </ClienteContextProvider>
        </div>
      </div>
    </div>
    </>

  );
}

export default Conn;
