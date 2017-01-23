import { combineReducers } from 'redux';
import { currentCard, scoreCards, labels } from './reducers';

const rootReducer = combineReducers({
  current: currentCard,
  scores: scoreCards,
  labels,
});

export default rootReducer;
