import httpClient from "./httpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/coordenadas";

export const getAllCoordenadas = createAsyncThunk(
  "coordenadas/getAll",
  async (id) => {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
);
