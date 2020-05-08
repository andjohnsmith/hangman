import { GET_GAMES, ADD_GAME, DELETE_GAME } from '../actions/types';

const initialState = {
  games: [
    { id: 1, view: '____', turns: 3 },
    { id: 2, view: '__s__', turns: 2 },
    { id: 3, view: '___', turns: 4 },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
      };
    default:
      return state;
  }
}
