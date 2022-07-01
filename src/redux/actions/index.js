import { GET_PLAYER, UPDATE_SCORE } from './actionTypes';

export const actGetPlayer = (name, gravatarEmail) => ({
  type: GET_PLAYER,
  payload: {
    name, gravatarEmail,
  },
});

export const actUpdateScore = (questionScore, assertion) => ({
  type: UPDATE_SCORE,
  payload: {
    questionScore,
    assertion,
  },
});
