export const ADD_SCORE = 'ADD_SCORE';
export const CLEAR_SCORES = 'CLEAR_SCORES';

/*
 * action creators
 */

export function addScore(scoreCard) {
  return { type: ADD_SCORE, scores: scoreCard }
}

export function clearScores() {
  return { type: CLEAR_SCORES }
}
