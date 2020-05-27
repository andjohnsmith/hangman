import api from '../utils/api';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// Check token and load user
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = ({ name, username, password }) => async (dispatch) => {
  const body = JSON.stringify({ name, username, password });

  try {
    const res = await api.post('/users', body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'),
    );
    dispatch({ type: REGISTER_FAIL });
  }
};

export const loginUser = (username, password) => async (dispatch) => {
  const body = JSON.stringify({ username, password });

  try {
    const res = await api.post('/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'),
    );

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logoutUser = () => {
  return { type: LOGOUT_SUCCESS };
};

export const tokenConfig = '';
