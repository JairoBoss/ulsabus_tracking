import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";
import { login, validateToken } from "../services/authService";

export const loginAsync = createAsyncThunk(
  "login/loginAsync",
  async (credentials, thunkAPI) => {
    try {
      const response = login(credentials);
      await AsyncStorage.setItem("@token", response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const saveTokenToAsyncStorage = (token) => {
  return AsyncStorage.setItem("@token", token);
};

const initialState = {
  currentUser: null,
  userToken: null,
  isLoading: true,
  isSignout: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // Funciones que nos permiten cambiar el estado
  reducers: {
    restoreToken: (state, action) => {
      state.userToken = action.payload;
      state.loading = false;
    },
    signIn: (state, action) => {
      state.isSignout = false;
      state.userToken = action.payload;
    },
    signOut: (state) => {
      state.isSignout = true;
      state.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, ...userData } = action.payload;
        state.currentUser = userData;
        state.userToken = token;
        state.isLoading = false;

        saveTokenToAsyncStorage(token).then(() => {
          showMessage({
            message: `Bienvenido ${userData.name}`,
            type: "success",
          });
        });
      })
      .addCase(login.rejected, (state) => {
        showMessage({
          message: "Datos no válidos",
          type: "warning",
        });
        state.isLoading = false;
      });

    builder
      .addCase(validateToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(validateToken.rejected, (state) => {
        showMessage({
          message: "Error",
          type: "warning",
        });
        state.isLoading = false;
      });
  },
});

export const { restoreToken, signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
