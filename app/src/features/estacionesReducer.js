import { createSlice } from "@reduxjs/toolkit";
import { getAllEstaciones } from "../services/estaciones";

const initialState = {
  paradas: [],
  fetched: false,
  error: false,
};

const paradasSlice = createSlice({
  name: "paradas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEstaciones.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllEstaciones.fulfilled, (state, action) => {
        state.fetched = true;
        state.paradas = action.payload;
      })
      .addCase(getAllEstaciones.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
  },
});

export default paradasSlice.reducer;
