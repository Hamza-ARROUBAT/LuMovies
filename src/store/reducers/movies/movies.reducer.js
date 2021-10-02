import produce, { current } from 'immer';
import {
  DELETE_MOVIE,
  DISLIKE_MOVIE,
  FETCH_MOVIES_SUCCESS,
  LIKE_MOVIE,
  LOADING_MOVIES,
} from './movies.types';

const initialState = {
  isLoading: true,
  data: [],
  likedMovies: [],
  dislikedMovies: [],
};

const cardsReducer = produce((draft, action) => {
  // globals
  const currentDraft = current(draft);

  // switch
  switch (action.type) {
    case LOADING_MOVIES:
      draft.isLoading = true;
      break;

    case FETCH_MOVIES_SUCCESS:
      draft.isLoading = true;
      draft.data = action.payload;
      draft.isLoading = false;
      break;

    case DELETE_MOVIE:
      draft.isLoading = true;
      draft.data = currentDraft.data.filter((data) => data.id !== action.id);
      draft.isLoading = false;
      break;

    case LIKE_MOVIE:
      draft.isLoading = true;

      if (!currentDraft.likedMovies.includes(action.id)) {
        draft.data = currentDraft.data.map((movie) => {
          if (movie.id === action.id) {
            const newMovie = { ...movie, likes: movie.likes + 1 };
            return newMovie;
          } else {
            return movie;
          }
        });
        draft.likedMovies = [...currentDraft.likedMovies, action.id];
      } else {
        draft.data = currentDraft.data.map((movie) => {
          if (movie.id === action.id) {
            const newMovie = { ...movie, likes: movie.likes - 1 };
            return newMovie;
          } else {
            return movie;
          }
        });

        draft.likedMovies = currentDraft.likedMovies.filter(
          (id) => id !== action.id
        );
      }
      draft.isLoading = false;
      break;

    case DISLIKE_MOVIE:
      draft.isLoading = true;

      if (!currentDraft.dislikedMovies.includes(action.id)) {
        draft.data = currentDraft.data.map((movie) => {
          if (movie.id === action.id) {
            const newMovie = { ...movie, dislikes: movie.dislikes + 1 };
            return newMovie;
          } else {
            return movie;
          }
        });
        draft.dislikedMovies = [...currentDraft.dislikedMovies, action.id];
      } else {
        draft.data = currentDraft.data.map((movie) => {
          if (movie.id === action.id) {
            const newMovie = { ...movie, dislikes: movie.dislikes - 1 };
            return newMovie;
          } else {
            return movie;
          }
        });

        draft.dislikedMovies = currentDraft.dislikedMovies.filter(
          (id) => id !== action.id
        );
      }
      draft.isLoading = false;
      break;

    default:
      break;
  }
}, initialState);

export default cardsReducer;
