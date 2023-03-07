import { createSlice } from "@reduxjs/toolkit";
import { getAllBuses } from "../services/camionService";

const initialState = {
  camiones: [],
  fetched: false,
  error: false,
};

const camionSlice = createSlice({
  name: "camion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBuses.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllBuses.fulfilled, (state, action) => {
        state.fetched = true;
        state.camiones = action.payload;
      })
      .addCase(getAllBuses.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
  },
});

export default camionSlice.reducer;
