import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import ticketsReducer from "@/store/slices/ticketSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketsReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
