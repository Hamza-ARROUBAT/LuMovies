import produce from 'immer';
import { FETCH_ALL_MOVIES_SUCCESS, LOADING_MOVIES } from './movies.types';

const initialState = {
  isLoading: true,
  data: [],
};

const cardsReducer = produce((draft, action) => {
  switch (action.type) {
    case LOADING_MOVIES:
      draft.isLoading = true;
      break;

    case FETCH_ALL_MOVIES_SUCCESS:
      draft.data = action.payload;
      draft.isLoading = false;
      break;

    default:
      break;
  }
}, initialState);

export default cardsReducer;
