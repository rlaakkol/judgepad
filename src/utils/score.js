const calcTotal = rows =>
  rows.map(item => item.value).reduce((a, b) =>
    Number.parseFloat(a, 10) + Number.parseFloat(b, 10)) / 5;

const getStanding = (history, current) =>
  history.reduce((a, b) => calcTotal(b) > calcTotal(current) ? a + 1 : a, 1);

const isTie = (history, current) =>
  !history.every(team => calcTotal(current) !== calcTotal(team));

export default { calcTotal, getStanding, isTie };
