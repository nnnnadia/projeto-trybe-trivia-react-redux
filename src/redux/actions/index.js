// import { SUCCESS, FAIL } from './actionTypes';

// const successRequest = (token) => ({
//   type: SUCCESS,
//   payload: token,
// });

// const failRequest = (error) => ({
//   type: FAIL,
//   payload: error,
// });

// const fetchToken = () => async (dispatch) => {
//   try {
//     const response = await fetch('https://opentdb.com/api_token.php?command=request');
//     const data = await response.json();
//     dispatch(successRequest(data.token));
//   } catch (error) {
//     dispatch(failRequest(error));
//   }
// };

// export default fetchToken;
import GET_PLAYER from './actionTypes';

const actGetPlayer = (name, gravatarEmail) => ({
  type: GET_PLAYER,
  payload: {
    name, gravatarEmail,
  },
});

export default actGetPlayer;
