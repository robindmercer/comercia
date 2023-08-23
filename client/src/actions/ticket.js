import axios from "axios";
import { GET_TICKET } from "./constant";

// trae todos los registros de una Factura
export function getTicket(id) {
   console.log('----------------------- GET Ticket getDetail: ',id);
   return async function (dispatch) {
      var ticket = await axios.get(`/ticket/fac/${id}`);
      return dispatch({
         type: GET_TICKET,
         payload: ticket.data,
      });
   };
}

export function UpdateTicket(ticket) {
   console.log("UpdateTicket: ", ticket);
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



