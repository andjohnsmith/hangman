import api from '../utils/api';
import { GET_GAMES, ADD_GAME, DELETE_GAME, GAMES_LOADING } from './types';

export const getGames = () => async (dispatch) => {
  try {
    const res = await api.get('/games');

    dispatch({
      type: GET_GAMES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'GAME_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addGame = (difficulty) => async (dispatch) => {
  try {
    const res = await api.post('/games', difficulty);

    dispatch({
      type: ADD_GAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'GAME_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteGame = (id) => async (dispatch) => {
  try {
    await api.delete(`/games/${id}`);

    dispatch({
      type: DELETE_GAME,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: 'GAME_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setGamesLoading = () => {
  return {
    type: GAMES_LOADING,
  };
};
