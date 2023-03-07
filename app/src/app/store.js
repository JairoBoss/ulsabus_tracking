import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";
import camionReducer from "../features/camionReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    camiones: camionReducer,
  },
});
