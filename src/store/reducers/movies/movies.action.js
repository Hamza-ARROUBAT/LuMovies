import {
  DELETE_MOVIE,
  DISLIKE_MOVIE,
  FETCH_ALL_MOVIES,
  LIKE_MOVIE,
  LOADING_MOVIES,
} from './movies.types';

export const loadingMovies = () => ({
  type: LOADING_MOVIES,
});

export const getAllMovies = () => ({
  type: FETCH_ALL_MOVIES,
});

export const deleteMovie = (id) => ({
  type: DELETE_MOVIE,
  id,
});

export const likeMovie = (id) => ({
  type: LIKE_MOVIE,
  id,
});

export const dislikeMovie = (id) => ({
  type: DISLIKE_MOVIE,
  id,
});
