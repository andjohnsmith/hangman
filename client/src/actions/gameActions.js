import { GET_GAMES, ADD_GAME, DELETE_GAME } from './types';

export const getGames = () => {
  return { type: GET_GAMES };
};
