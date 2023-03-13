import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";
import camionReducer from "../features/camionReducer";
import coordenadasReducer from "../features/coordenadasReducer";
import estacionesReducer from "../features/estacionesReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    camiones: camionReducer,
    coordenadas: coordenadasReducer,
    estaciones: estacionesReducer,
  },
});
