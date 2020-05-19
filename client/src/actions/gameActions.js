import axios from 'axios';
import { GET_GAME, MAKE_GUESS, GAME_LOADING } from './types';
import { tokenConfig } from './authActions';

export const getGame = (id) => (dispatch, getState) => {
  dispatch(setGameLoading);
  axios
    .get(`/api/games/${id}`, tokenConfig(getState))
    .then((res) => dispatch({ type: GET_GAME, payload: res.data }));
};

export const makeGuess = (id, guess) => (dispatch, getState) => {
  axios
    .put(`http://localhost:5000/api/games/${id}`, guess, tokenConfig(getState))
    .then((res) => dispatch({ type: MAKE_GUESS, payload: res.data }));
};

export const setGameLoading = () => {
  return {
    type: GAME_LOADING,
  };
};
