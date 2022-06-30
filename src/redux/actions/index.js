import GET_PLAYER from './actionTypes';

const actGetPlayer = (name, gravatarEmail) => ({
  type: GET_PLAYER,
  payload: {
    name, gravatarEmail,
  },
});

export default actGetPlayer;
