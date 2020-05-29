import api from '../utils/api';
import { GET_GAME, MAKE_GUESS, GAME_LOADING } from './types';

export const getGame = (id) => async (dispatch) => {
  dispatch(setGameLoading);

  try {
    const res = await api.get(`/games/${id}`);

    dispatch({ type: GET_GAME, payload: res.data });
  } catch (err) {
    console.log('error');
  }
};

export const makeGuess = (id, guess) => async (dispatch) => {
  try {
    const res = await api.put(`games/${id}`, guess);

    dispatch({ type: MAKE_GUESS, payload: res.data });
  } catch (err) {
    console.log('err');
  }
};

export const setGameLoading = () => {
  return {
    type: GAME_LOADING,
  };
};
