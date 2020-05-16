import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import listReducer from './listReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  game: gameReducer,
  list: listReducer,
  error: errorReducer,
  auth: authReducer,
});
