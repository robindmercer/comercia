import TicketList from './TicketList';
import TicketContextProvider from './TicketContext'
// './TicketContext';
import Header from '../../Header';

function Conn() {
  return (
    <>
    <Header />
    <div className="container-xl bg-white">
      <div className="table-responsive">
        <div className="table-wrapper">
          <TicketContextProvider>
            <TicketList />
          </TicketContextProvider>
        </div>
      </div>
    </div>
    </>

  );
}

export default Conn;
