import { combineReducers } from 'redux';
import playerReducer from './reducers';

const rootReducer = combineReducers({
  playerReducer,
});

export default rootReducer;
