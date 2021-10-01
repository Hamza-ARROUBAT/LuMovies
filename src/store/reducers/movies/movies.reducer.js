import produce from 'immer';
import { FETCH_ALL_PRODUCTS_SUCCESS } from './movies.types';

const initialState = {
  isLoading: true,
  data: null,
};

const cardsReducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS_SUCCESS:
      draft.data = action.payload.data;
      draft.isLoading = false;
      break;
    default:
      break;
  }
}, initialState);

export default cardsReducer;
