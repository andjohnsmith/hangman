import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import listReducer from './listReducer';

export default combineReducers({ game: gameReducer, list: listReducer });
