import _ from 'lodash';

import {
  UPDATE_CURRENT,
  CLEAR_CURRENT,
  ADD_SCORE,
  CLEAR_SCORES,
  CHANGE_LABELS,
  UNDO_LAST_SCORE,
  ADD_ALERT,
  REMOVE_ALERT } from '../actions';

const defaultRows = [
  { key: 0, id: 0, value: 0 },
  { key: 1, id: 1, value: 0 },
  { key: 2, id: 2, value: 0 },
  { key: 3, id: 3, value: 0 },
  { key: 4, id: 4, value: 0 }];

const defaultLabels = {
  id: 'dantai',
  name: 'Dantai Hokei',
  labels: [
    'Format & sync',
    'Expression',
    'Technique & unsoku',
    'Power',
    'Use of tengi',
  ],
};

const currentCard = (state = _.cloneDeep(defaultRows), action) => {
  switch (action.type) {
    case UPDATE_CURRENT:
      return action.rows;
    case CLEAR_CURRENT:
      return _.cloneDeep(defaultRows);
    default:
      return state;
  }
};

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

const alerts = (state = [], action) => {
  switch (action.type) {
    case ADD_ALERT:
      return [
        ...state,
        {
          text: action.text,
          style: action.style,
          id: action.id,
        },
      ];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.id);
    default:
      return state;
  }
};

export { currentCard, scoreCards, labels, alerts };
