import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
  value: 0,
};

export const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    loadtv: (state, action) => {
      state.info = action.payload;
    },
    removeTv: (state) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadtv, removeTv } = tvSlice.actions;

export default tvSlice.reducer;
