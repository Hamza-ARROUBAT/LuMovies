import { FETCH_ALL_MOVIES, LOADING_MOVIES } from "./movies.types";

export const loadingMovies = () => ({
  type: LOADING_MOVIES,
});

export const getAllMovies = () => ({
  type: FETCH_ALL_MOVIES,
});
