import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "@/services/api";
import { handleRequestError } from "@/utils";
import {
  RejectedPayload,
  LoginPayload,
  ReturnLoginPayload,
  RegisterPayload,
  ReturnRegisterPayload,
} from "@/types/index";

export const login = createAsyncThunk<
  ReturnLoginPayload,
  LoginPayload,
  { rejectValue: RejectedPayload }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authAPI.login(credentials);
    const { token, user, message } = response.data;

    return { token, user, message };
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
});

export const register = createAsyncThunk<
  ReturnRegisterPayload,
  RegisterPayload,
  { rejectValue: RejectedPayload }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await authAPI.register(userData);
    const { message } = response.data;
    return { message };
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
});
