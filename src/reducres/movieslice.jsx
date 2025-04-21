import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
  value: 0,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    loadmovie: (state, action) => {
      state.info = action.payload;
      console.log(state.info);
    },
    removeMovie: (state) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadmovie, removeMovie } = movieSlice.actions;

export default movieSlice.reducer;
