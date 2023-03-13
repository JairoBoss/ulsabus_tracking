import httpClient from "./httpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/camion";

export const getAllBuses = createAsyncThunk("camiones/getAll", async () => {
  console.log("A")
  return (await httpClient.get(`${prefix}`)).data;
});

export const getBusByChofer = createAsyncThunk("camion/chofer", async (id) => {
  return (await httpClient.get(`${prefix}/chofer/${id}`)).data;
});
