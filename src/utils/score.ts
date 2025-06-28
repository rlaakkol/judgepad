import { Row } from "../types";

const calcTotal = (rows: Row[]): number =>
  rows
    .map((item) => item.value)
    .reduce(
      (a, b) =>
        Number.parseFloat(a.toString()) + Number.parseFloat(b.toString()),
    ) / 5;

const getStanding = (history: Row[][], current: Row[]): number =>
  history.reduce((a, b) => (calcTotal(b) > calcTotal(current) ? a + 1 : a), 1);

const isTie = (history: Row[][], current: Row[]): boolean =>
  !history.every((team) => calcTotal(current) !== calcTotal(team));

export default { calcTotal, getStanding, isTie };
