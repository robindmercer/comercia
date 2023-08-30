import { createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Rutinas de ABM de Ticket
import { getTicket, AddTicket, UpdateTicket,DeleteTicket,CloseTicket } from "../../../actions/ticket";
import { useDispatch, useSelector } from "react-redux";

export const TicketContext = createContext();

const TicketContextProvider = (props) => {
   const location = useLocation();
   const { state } = location;
   const { ticket } = useSelector((state) => state);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTicket(state.facid));
   }, [dispatch, state.facid]);

   // console.log("ticket: ", ticket);

   const sortedTicket = ticket.sort((a, b) => (a.alta < b.alta ? -1 : 1));

   const addTicket = (data) => {
      console.log("addTicket: ", data);
      dispatch(AddTicket(data));
      dispatch(getTicket(state.facid));
      //window.location.href = "/TicketOCMain";
      // setTicket([...ticket , {id:uuidv4(), name, descuento, enganche, meses}])
   };

   const deleteTicket = (id) => {
      console.log("deleteTicket: ", id);
      dispatch(DeleteTicket(id));
      dispatch(getTicket(state.facid));
      window.location.href = "/TicketOCMain";
   };

   const closeTicket = (id) => {
      console.log("closeTicket: ", id);
      dispatch(CloseTicket(id));
      dispatch(getTicket(state.facid));
      window.location.href = "/TicketOCMain";
   };

   const updateTicket = (data) => {
      console.log("updateTicket: ", data);
      dispatch(UpdateTicket(data));
      dispatch(getTicket(state.facid));
      window.location.href = "/TicketOCMain";
      // setTicket(ticket.map((employee) => employee.id === id ? updatedTicket : employee))
   };

   return (
      <TicketContext.Provider
         value={{ sortedTicket, addTicket, deleteTicket, updateTicket,closeTicket }}
      >
         {props.children}
      </TicketContext.Provider>
   );
};

export default TicketContextProvider;
