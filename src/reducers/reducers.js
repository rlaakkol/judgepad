import { ADD_SCORE, CLEAR_SCORES, CHANGE_LABELS } from '../actions';

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
