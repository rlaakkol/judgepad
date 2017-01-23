import { ADD_SCORE, CLEAR_SCORES, CHANGE_LABELS, UNDO_LAST_SCORE } from '../actions';

const defaultLabels = [
  'Format & sync',
  'Technique & unsoku',
  'Expression',
  'Power',
  'Use of tengi',
];

const scoreCards = (state = [], action) => {
  switch (action.type) {
    case ADD_SCORE:
      return [
        ...state,
        action.scores,
      ];
    case CLEAR_SCORES:
      return [];
    case UNDO_LAST_SCORE:
      return state.slice(0, -1);
    default:
      return state;
  }
};

const labels = (state = defaultLabels, action) => {
  switch (action.type) {
    case CHANGE_LABELS:
      return action.labels;
    default:
      return state;
  }
};

export { scoreCards, labels };
