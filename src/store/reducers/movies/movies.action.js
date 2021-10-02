import {
  DELETE_MOVIE,
  DISLIKE_MOVIE,
  FETCH_MOVIES,
  LIKE_MOVIE,
} from './movies.types';

export const getMovies = (page, limit) => ({
  type: FETCH_MOVIES,
  page,
  limit,
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
