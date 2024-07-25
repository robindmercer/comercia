import axios from "axios";
import { GET_TICKET,GET_TICKETUNO,GET_TICKETDET } from "./constant";

// trae todos los registros de una Factura

export function getTicket() {
   console.log('----------------------- GET Ticket ALL: ');
   return async function (dispatch) {
      var ticket = await axios.get(`/ticket`);
      return dispatch({
         type: GET_TICKET,
         payload: ticket.data,
      });
   };
}

export function getTicketRep() {
   console.log('----------------------- GET Ticket ALL: ');
   return async function (dispatch) {
      var ticket = await axios.get(`/ticket/rep`);
      return dispatch({
         type: GET_TICKET,
         payload: ticket.data,
      });
   };
}

export function getTicketRepCli(id) {
   console.log('----------------------- getTicketRepCli: ');
   return async function (dispatch) {
      var ticket = await axios.get(`/ticket/repcli/${id}`);
      return dispatch({
         type: GET_TICKET,
         payload: ticket.data,
      });
   };
}

export function getTicketUno(id) {
   console.log('----------------------- GET Ticket getDetail: ',id);
   return async function (dispatch) {
      var ticketUno = await axios.get(`/ticket/tck/${id}`);
      return dispatch({
         type: GET_TICKETUNO,
         payload: ticketUno.data,
      });
   };
}

export function getTicketDet(tck_id) {
   console.log('----------------------- GET Ticket getDetail: ',tck_id);
   return async function (dispatch) {
      var ticket = await axios.get(`/ticket/tckdet/${tck_id}`);
      return dispatch({
         type: GET_TICKETDET,
         payload: ticket.data,
      });
   };
}




export function UpdateTicket(ticket) {
   console.log("UpdateTicket: ", ticket);
   return function (dispatch) {
      axios
         .put("/ticket", ticket)
         .then((response) => {
            return response;
         })
         .catch((err) => {
            console.log(err);
         });
   };
}

export function AddTicket(ticket) {
   console.log("AddTicket: ", ticket);
   return function (dispatch) {
      axios
         .post("/ticket", ticket)
         .then((response) => {
            return response;
         })
         .catch((err) => {
            console.log(err);
         });
   };
}

export function DeleteTicket(ticket) {
   console.log("DeleteTicket: ", ticket);
   return function (dispatch) {
      axios
         .delete(`/ticket/${ticket}`)
         .then((response) => {
            return response;
         })
         .catch((err) => {
            console.log(err);
         });
   };
}

export function CloseTicket(ticket) {
   console.log("CloseTicket: ", ticket);
   return function (dispatch) {
      axios
         .put(`/ticket/close/${ticket}`)
         .then((response) => {
            return response;
         })
         .catch((err) => {
            console.log(err);
         });
   };
}



