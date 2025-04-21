import axios from "../utensis/Axious";
import { loadmovie, removeMovie } from "../reducres/movieslice";

export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch(loadmovie(null)); // Set initial state to null
    const [
      details,
      credits,
      videos,
      recommendations,
      similar,
      reviews,
      images,
      watchProviders,
    ] = await Promise.all([
      axios.get(`/movie/${id}`),
      axios.get(`/movie/${id}/credits`),
      axios.get(`/movie/${id}/videos`),
      axios.get(`/movie/${id}/recommendations`),
      axios.get(`/movie/${id}/similar`),
      axios.get(`/movie/${id}/reviews`),
      axios.get(`/movie/${id}/images`),
      axios.get(`/movie/${id}/watch/providers`),
    ]);

    const response = {
      details: details.data,
      credits: credits.data,
      videos: videos.data,
      recommendations: recommendations.data,
      similar: similar.data,
      reviews: reviews.data,
      images: images.data,
      watchProviders: watchProviders.data,
    };

    dispatch(loadmovie(response));
    return response;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    dispatch(loadmovie(null)); // Reset state on error
    throw error;
  }
};

export { removeMovie };
