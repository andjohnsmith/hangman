import { GET_GAME, MAKE_GUESS } from '../actions/types';

const initialState = {
  game: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAME:
      return {
        game: action.payload,
      };
    case MAKE_GUESS:
      return {
        game: action.payload,
      };
    default:
      return state;
  }
}
