import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      // guardar en AsyncStorage
      AsyncStorage.setItem('auth', JSON.stringify({
        token: action.payload.token,
        user: action.payload.user,
      }));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      // eliminar datos para hacer logout
      AsyncStorage.removeItem('auth');
    },
    setAuthFromStorage(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
