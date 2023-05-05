import CondicionList from './CondicionList';
import CondicionContextProvider from './CondicionContext';
import Header from '../../Header';

function Conn() {
  return (
    <>
    <Header />
    <div className="container-xl  bg-white">
      <div className="table-responsive">
        <div className="table-wrapper">
          <CondicionContextProvider>
            <CondicionList />
          </CondicionContextProvider>
        </div>
      </div>
    </div>
    </>

  );
}

export default Conn;
