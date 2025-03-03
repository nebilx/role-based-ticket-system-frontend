import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RejectedPayload,
  ReturnTicketPayload,
  Ticket,
  TicketsState,
} from "@/types/index";
import {
  createTicket,
  fetchAllTickets,
  updateTicketStatus,
} from "../thunk/ticketThunk";

const initialState: TicketsState = {
  tickets: [],
  isLoading: false,
  error: null,
  message: null,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearT_M_E: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTickets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAllTickets.fulfilled,
        (state, action: PayloadAction<Ticket[]>) => {
          state.isLoading = false;
          state.tickets = action.payload;
        }
      )
      .addCase(
        fetchAllTickets.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.isLoading = false;
          state.error = action.payload?.message || "An unknown error occurred";
        }
      )

      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createTicket.fulfilled,
        (state, action: PayloadAction<ReturnTicketPayload>) => {
          state.isLoading = false;
          state.tickets.push(action.payload.data);
          state.message = action.payload.message;
        }
      )
      .addCase(
        createTicket.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.isLoading = false;
          state.error = action.payload?.message || "An unknown error occurred";
        }
      )

      .addCase(updateTicketStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateTicketStatus.fulfilled,
        (state, action: PayloadAction<ReturnTicketPayload>) => {
          state.isLoading = false;
          const updatedTicket = action.payload.data;
          state.message = action.payload.message;
          const existingTicket = state.tickets.find(
            (ticket) => ticket._id === updatedTicket._id
          );
          if (existingTicket) {
            existingTicket.status = updatedTicket.status;
          }
        }
      )
      .addCase(
        updateTicketStatus.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.isLoading = false;
          state.error = action.payload?.message || "An unknown error occurred";
        }
      );
  },
});

export const { clearT_M_E } = ticketsSlice.actions;
export default ticketsSlice.reducer;
