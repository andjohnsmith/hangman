import {
  GET_GAMES,
  ADD_GAME,
  DELETE_GAME,
  GAMES_LOADING,
} from '../actions/types';

const initialState = {
  games: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
        loading: false,
      };
    case ADD_GAME:
      return {
        ...state,
        games: [action.payload, ...state.games],
      };
    case DELETE_GAME:
      return {
        ...state,
        games: state.games.filter((game) => game.id !== action.payload),
      };
    case GAMES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
