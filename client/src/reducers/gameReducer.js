import { GET_GAME, MAKE_GUESS, GAMES_LOADING } from '../actions/types';

const initialState = {
  game: '',
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAME:
      return {
        game: action.payload,
        loading: false,
      };
    case GAMES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MAKE_GUESS:
      return {
        game: action.payload,
      };
    default:
      return state;
  }
}
