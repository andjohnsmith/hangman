import axios from 'axios';
import { GET_GAMES, ADD_GAME, DELETE_GAME, GAMES_LOADING } from './types';
import { tokenConfig } from './authActions';

export const getGames = ({ user }) => (dispatch) => {
  dispatch(setGamesLoading);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ user });
  console.log('body: ' + body);

  axios
    .get('/api/games', body, config)
    .then((res) => dispatch({ type: GET_GAMES, payload: res.data }));
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
