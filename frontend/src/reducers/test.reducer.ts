import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serializeAxiosError } from "./reducer.utils";

export const initialState = {
  testMessage: null as string | null,
  loading: false
};

export type TestState = Readonly<typeof initialState>;

export const getPosts = createAsyncThunk(
  "TEST/GET_TDOO",
  async () => axios.get<any>("https://jsonplaceholder.typicode.com/todos/1"),
  { serializeError: serializeAxiosError }
);

export const TestSlice = createSlice({
  name: "TEST",
  initialState: initialState as TestState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.testMessage = action.payload.data.title;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { reset } = TestSlice.actions;

export default TestSlice.reducer;
