import httpClient from "./httpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/auth";

export const login = createAsyncThunk(
  `${prefix}/login`,
  async ({ email, password }) => {
    return (await httpClient.post(`${prefix}/login`, { email, password })).data;
  }
);

export const validateToken = createAsyncThunk(
  `${prefix}/validate`,
  async () => {
    return (await httpClient.post(`${prefix}/validate`)).data;
  }
);

// Colocar ruta para validar/revalidar token
