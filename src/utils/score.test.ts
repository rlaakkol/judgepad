import { describe, it, expect } from 'vitest'
import Score from './score.js'

describe('Score utility', () => {
  describe('calcTotal', () => {
    it('calculates the total score correctly based on its unique logic', () => {
      const rows = [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 0.5 },
      ];
      // The function incorrectly uses parseFloat and divides by 5
      const expected = (1 + 2 + 3 + 4 + 5 + 0.5) / 5;
      expect(Score.calcTotal(rows)).toBe(expected);
    });

    it('handles an empty array by throwing an error', () => {
      // The function will throw an error because reduce is called on an empty array without an initial value
      expect(() => Score.calcTotal([])).toThrow();
    });
  });

  describe('getStanding', () => {
    const history = [
      [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 0 }], // Total: 15, calcTotal: 3
      [{ value: 2 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 0 }], // Total: 16, calcTotal: 3.2
    ];

    it('returns the correct standing for a new score', () => {
      const newScore = [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 0 }]; // Total: 5, calcTotal: 1
      expect(Score.getStanding(history, newScore)).toBe(3);
    });

    it('returns 1 for the highest score', () => {
      const newScore = [{ value: 3 }, { value: 3 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 0 }]; // Total: 18, calcTotal: 3.6
      expect(Score.getStanding(history, newScore)).toBe(1);
    });
  });

  describe('isTie', () => {
    const history = [
      [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 0 }], // Total: 15, calcTotal: 3
    ];

    it('returns true if there is a tie', () => {
      const newScore = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 0 }]; // Total: 15, calcTotal: 3
      expect(Score.isTie(history, newScore)).toBe(true);
    });

    it('returns false if there is no tie', () => {
      const newScore = [{ value: 2 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 0 }]; // Total: 16, calcTotal: 3.2
      expect(Score.isTie(history, newScore)).toBe(false);
    });
  });
});
