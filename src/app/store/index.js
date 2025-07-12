"use client"
import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/locationSlice"; // example slice

export const store = configureStore({
  reducer: {
    location: locationReducer,
    // add more reducers here
  },
});
