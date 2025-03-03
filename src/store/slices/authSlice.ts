import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  ReturnLoginPayload,
  RejectedPayload,
  ReturnRegisterPayload,
} from "@/types/index";
import { login, register } from "../thunk/authThunk";

const token = localStorage.getItem("token");
const userStr = localStorage.getItem("user");
let user = null;

if (userStr) {
  try {
    user = JSON.parse(userStr);
  } catch {
    localStorage.removeItem("user");
  }
}

const initialState: AuthState = {
  user,
  token,
  isAuthenticated: !!token,
  isLoading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;
    },
    clearA_M_E: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<ReturnLoginPayload>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.message = action.payload.message;
          state.error = null;

          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.isLoading = false;
          state.error = action.payload?.message || "An unknown error occurred";
        }
      )

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<ReturnRegisterPayload>) => {
          state.isLoading = false;
          state.message = action.payload.message;
        }
      )
      .addCase(
        register.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.isLoading = false;
          state.error = action.payload?.message || "An unknown error occurred";
        }
      );
  },
});

export const { logout, clearA_M_E } = authSlice.actions;
export default authSlice.reducer;
