import { combineReducers } from 'redux';
import scoreCards from './reducers';

const rootReducer = combineReducers({
  scores: scoreCards
});

export default rootReducer;
