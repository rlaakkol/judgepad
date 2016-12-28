import { combineReducers } from 'redux';
import { scoreCards, labels } from './reducers';

const rootReducer = combineReducers({
  scores: scoreCards,
  labels: labels
});

export default rootReducer;
