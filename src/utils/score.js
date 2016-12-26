const calcTotal = (rows) => {
  return rows.map(item => item.value).reduce((a, b) =>
    Number.parseInt(a) + Number.parseInt(b)
    )/rows.length
}

const getStanding = (history, current) => {
  return history.reduce((a, b) =>
    calcTotal(b) > calcTotal(current) ? a + 1 : a,
    1)
}

export default {calcTotal, getStanding};
