import httpClient from "./httpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/parada";

export const getAllEstaciones = createAsyncThunk(
  "paradas/getAll",
  async (id) => {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
);
