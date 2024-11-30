// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Cambia el nombre según tu slice

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
