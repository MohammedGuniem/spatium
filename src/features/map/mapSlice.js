import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    distance: 0,
    averageElevation: 0,
    maxElevation: -Infinity,
    minElevation: +Infinity,
  },
  reducers: {
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
    setAverageElevation: (state, action) => {
      state.averageElevation = action.payload;
    },
    setMaxElevation: (state, action) => {
      state.maxElevation = action.payload;
    },
    setMinElevation: (state, action) => {
      state.minElevation = action.payload;
    },
  },
});

export const { setDistance, setAverageElevation, setMaxElevation, setMinElevation } = mapSlice.actions;

export const selectDistance = state => state.map.distance;
export const selectAverageElevation = state => state.map.averageElevation;
export const selectMaxElevation = state => state.map.maxElevation;
export const selectMinElevation = state => state.map.minElevation;

export default mapSlice.reducer;
