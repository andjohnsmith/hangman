import api from '../utils/api';
import axios from 'axios';
import { GET_GAMES, ADD_GAME, DELETE_GAME, GAMES_LOADING } from './types';
import { tokenConfig } from './authActions';

export const getGames = () => async (dispatch) => {
  try {
    const res = await api.get('/games');

    dispatch({
      type: GET_GAMES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addGame = (game) => (dispatch, getState) => {
  axios.post('/api/games', game, tokenConfig(getState)).then((res) =>
    dispatch({
      type: ADD_GAME,
      payload: res.data,
    }),
  );
};

export const deleteGame = (id) => (dispatch, getState) => {
  axios.delete(`/api/games/${id}`, tokenConfig(getState)).then((res) =>
    dispatch({
      type: DELETE_GAME,
      payload: id,
    }),
  );
};

export const setGamesLoading = () => {
  return {
    type: GAMES_LOADING,
  };
};
