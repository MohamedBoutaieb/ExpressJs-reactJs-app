import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serializeAxiosError } from "./reducer.utils";
import { API_BASE_URL } from "../config/constants";

export const initialState = {
  user: {},
  usersList: [],
  loading: false,
  error: false,
};

export type UserState = Readonly<typeof initialState>;

// async thunk
export const getUsers = createAsyncThunk(
  "USER/GET_ALL_USERS",
  async () => axios.get<any>(`${API_BASE_URL}users`),
  { serializeError: serializeAxiosError }
);

export const createUser = createAsyncThunk(
  "USER/CREATE_USER",
  async (data: any) => axios.post<any>(`${API_BASE_URL}users`, data),
  { serializeError: serializeAxiosError }
);

export const deleteUser = createAsyncThunk(
  "USER/DELETE_USER",
  async (id: number) => axios.delete<any>(`${API_BASE_URL}users/${id}`),
  { serializeError: serializeAxiosError }
);

// slice
export const UserSlice = createSlice({
  name: "USER",
  initialState: initialState as UserState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload.data.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      }).addCase(createUser.pending, (state) => {
        state.loading = true;
      }).addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
      }).addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { reset } = UserSlice.actions;

export default UserSlice.reducer;
