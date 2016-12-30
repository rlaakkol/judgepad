import React from 'react';
import _ from 'lodash';
import Score from '../utils/score';

const HistoryTable = (props) => {
  const header = _.range(0, props.scores.length).map(i =>
    <th key={i}><button onClick={() => props.show(i)}>
      Team {i + 1}
    </button></th>,
  );
  const rows = props.scores.length > 0 ?
    _.range(0, props.scores[0].length).map(i =>
      props.scores.map((score, j) => <td key={`score${j}${i}`}>{score[i].value}</td>),
    ) :
    false;
  const rowDivs = rows ?
    rows.map((row, i) => <tr key={i}><th>{props.labels[i]}</th>{row}</tr>) :
    props.labels.map((label, i) => <tr key={i}><th>{label}</th></tr>);
  const totals = props.scores.map((team, i) =>
    <td key={`total${i}`}><em>{Score.calcTotal(team)}</em></td>,
  );
  const standings = props.scores.map((team, i) =>
    <td key={`standing${i}`}><strong>{Score.getStanding(props.scores, team)}</strong></td>,
  );

  return (
    <div className="table-responsive">
      <table className="table table-sm table-nonfluid">
        <thead>
          <tr><th>Category/Team</th>{header}</tr>
        </thead>
        <tbody>
          {rowDivs}
          <tr>
            <th>Total</th>{totals}
          </tr>
          <tr>
            <th>Standing</th>{standings}
          </tr>
        </tbody>
      </table>
    </div>);
};

HistoryTable.propTypes = {
  scores: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.number,
        id: React.PropTypes.number,
        value: React.PropTypes.number,
      }))).isRequired,
  labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default HistoryTable;
