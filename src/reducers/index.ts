import { combineReducers } from "redux";
import { currentCard, scoreCards, labels, alerts } from "./reducers";

const rootReducer = combineReducers({
  current: currentCard,
  scores: scoreCards,
  labels,
  alerts,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
