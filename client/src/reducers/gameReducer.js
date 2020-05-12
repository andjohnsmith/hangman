import { GET_GAME, MAKE_GUESS, SET_GAME } from '../actions/types';

const initialState = {
  game: '',
  id: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAME:
      return {
        id: state.id,
        game: action.payload,
      };
    case SET_GAME:
      return {
        ...state,
        id: action.payload,
      };
    case MAKE_GUESS:
      return {
        id: state.id,
        game: action.payload,
      };
    default:
      return state;
  }
}
