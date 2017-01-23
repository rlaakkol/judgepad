export const ADD_SCORE = 'ADD_SCORE';
export const CLEAR_SCORES = 'CLEAR_SCORES';
export const UNDO_LAST_SCORE = 'UNDO_LAST_SCORE';
export const CHANGE_LABELS = 'CHANGE_LABELS';

/*
 * action creators
 */

export function addScore(scoreCard) {
  return { type: ADD_SCORE, scores: scoreCard };
}

export function clearScores() {
  return { type: CLEAR_SCORES };
}

export function undoLastScore() {
  return { type: UNDO_LAST_SCORE };
}

export function changeLabels(labels) {
  return { type: CHANGE_LABELS, labels };
}
