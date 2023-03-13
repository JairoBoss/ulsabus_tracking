import { createSlice } from "@reduxjs/toolkit";
import { getAllCoordenadas } from "../services/coordenadas";

const initialState = {
  coordenadas: [],
  fetched: false,
  error: false,
};

const coordenadasSlice = createSlice({
  name: "coordenadas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoordenadas.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllCoordenadas.fulfilled, (state, action) => {
        state.fetched = true;
        state.coordenadas = action.payload;
      })
      .addCase(getAllCoordenadas.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
  },
});

export default coordenadasSlice.reducer;
