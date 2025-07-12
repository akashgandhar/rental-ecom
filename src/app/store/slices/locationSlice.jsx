import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocationn: (state, action) => {
      state.selectedLocation = action.payload;
    },
    clearLocation: (state) => {
      state.selectedLocation = null;
    },
  },
});

export const { setLocationn, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
