import { apiActionTypes } from 'api/apiUtils';
import { typeCreator } from 'utils/redux';

const { successTag, errorTag } = apiActionTypes;


export const LOADING_MOVIES = 'LOADING_MOVIES';

export const FETCH_ALL_MOVIES = 'FETCH_ALL_MOVIES';
export const FETCH_ALL_MOVIES_SUCCESS = typeCreator(FETCH_ALL_MOVIES, successTag);
export const FETCH_ALL_MOVIES_ERROR = typeCreator(FETCH_ALL_MOVIES, errorTag);

export const DELETE_MOVIE = 'DELETE_MOVIE';

export const LIKE_MOVIE = 'LIKE_MOVIE';

export const DISLIKE_MOVIE = 'DISLIKE_MOVIE';