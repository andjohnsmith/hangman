import axios from 'axios';
import { GET_GAME, MAKE_GUESS } from './types';

export const getGame = (id) => (dispatch) => {
  axios
    .get(`/api/games/${id}`)
    .then((res) => dispatch({ type: GET_GAME, payload: res.data }));
};

export const makeGuess = (id, guess) => (dispatch) => {
  axios
    .put(`http://localhost:5000/api/games/${id}`, guess)
    .then((res) => dispatch({ type: MAKE_GUESS, payload: res.data }));
};
