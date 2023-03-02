import httpClient from "./httpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/auth";

export const login = createAsyncThunk(
  `${prefix}/login`,
  async ({ email, password }) => {
    return (await httpClient.post(`${prefix}/login`, { email, password })).data;
  }
);

// Colocar ruta para validar/revalidar token
