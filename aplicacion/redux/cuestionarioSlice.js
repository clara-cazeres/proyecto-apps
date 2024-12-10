import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCuestionario = createAsyncThunk('cuestionarios/fetchCuestionario', async (id) => {
  const response = await fetch(`https://proyecto-apps.onrender.com/cuestionarios/${id}`);
  return response.json();
});

const cuestionarioSlice = createSlice({
  name: 'cuestionarios',
  initialState: {
    cuestionario: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCuestionario.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCuestionario.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cuestionario = action.payload;
      })
      .addCase(fetchCuestionario.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default cuestionarioSlice.reducer;
