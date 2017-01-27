export const ADD_SCORE = 'ADD_SCORE';
export const UPDATE_CURRENT = 'UPDATE_CURRENT';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';
export const CLEAR_SCORES = 'CLEAR_SCORES';
export const UNDO_LAST_SCORE = 'UNDO_LAST_SCORE';
export const CHANGE_LABELS = 'CHANGE_LABELS';
export const ADD_ALERT = 'ADD_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

/*
 * action creators
 */
export function updateCurrent(rows) {
  return { type: UPDATE_CURRENT, rows };
}

export function clearCurrent() {
  return { type: CLEAR_CURRENT };
}

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

export function addAlert(text, style) {
  return {
    type: ADD_ALERT,
    text,
    style,
  };
}

export function removeAlert(id) {
  return {
    type: REMOVE_ALERT,
    id,
  };
}
