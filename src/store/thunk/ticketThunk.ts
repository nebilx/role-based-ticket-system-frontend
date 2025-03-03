import { createAsyncThunk } from "@reduxjs/toolkit";
import { ticketsAPI } from "../../services/api";
import {
  RejectedPayload,
  Ticket,
  TicketPayload,
  TicketUpdatePayload,
  ReturnTicketPayload,
} from "@/types";
import { handleRequestError } from "@/utils";

export const fetchAllTickets = createAsyncThunk<
  Ticket[],
  void,
  { rejectValue: RejectedPayload }
>("tickets/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await ticketsAPI.getAllTickets();
    return response.data?.data;
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
});

export const createTicket = createAsyncThunk<
  ReturnTicketPayload,
  TicketPayload,
  { rejectValue: RejectedPayload }
>("tickets/create", async (ticketData, { rejectWithValue }) => {
  try {
    const response = await ticketsAPI.createTicket(ticketData);
    const { data, message } = response.data;
    return { data, message };
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
});

export const updateTicketStatus = createAsyncThunk<
  ReturnTicketPayload,
  TicketUpdatePayload,
  { rejectValue: RejectedPayload }
>("tickets/updateStatus", async (ticketData, { rejectWithValue }) => {
  try {
    const response = await ticketsAPI.updateTicketStatus(ticketData);
    const { data, message } = response.data;
    return { data, message };
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
});
