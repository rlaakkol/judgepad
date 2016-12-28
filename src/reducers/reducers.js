import { ADD_SCORE, CLEAR_SCORES } from '../actions';

const scoreCards = (state = [], action) => {
  switch (action.type) {
    case ADD_SCORE:
      return [
        ...state,
        action.scores
      ]
      case CLEAR_SCORES:
      return []
    default:
      return state
  }
}

export default scoreCards;
