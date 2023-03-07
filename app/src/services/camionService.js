import httpClient from "./httpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/camion";

export const getAllBuses = createAsyncThunk("camiones/getAll", async () => {
  return (await httpClient.get(`${prefix}`)).data;
});
