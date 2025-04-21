import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../reducres/movieslice";
import tvReducer from "../reducres/tvslice";
import personReducer from "../reducres/person";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
});
