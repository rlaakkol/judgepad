import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Score from '../utils/score';

const HistoryTable = (props) => {
  const header = _.range(0, props.scores.length).map(i =>
    <th key={i}>
      Joukkue {i + 1}
    </th>,
  );
  header.push(
    <th key="current">
      Nykyinen
    </th>,
  );
  const scores = [...props.scores, props.current];
  const rows = _.range(0, scores[0].length).map(i =>
      scores.map((score, j) => <td key={`score${j}${i}`}>{score[i].value}</td>),
    );
  const rowDivs = rows ?
    rows.map((row, i) => <tr key={i}><th>{props.labels.labels[i]}</th>{row}</tr>) :
    props.labels.labels.map((label, i) => <tr key={i}><th>{label}</th></tr>);
  const totals = scores.map((team, i) =>
    <td key={`total${i}`}><em>{Score.calcTotal(team)}</em></td>,
  );
  const standings = scores.map((team, i) =>
    <td key={`standing${i}`}><strong>{Score.getStanding(scores, team)}</strong></td>,
  );

  return (
    <div className="table-responsive">
      <table className="table table-sm table-nonfluid">
        <thead>
          <tr><th>Kategoria/Joukkue</th>{header}</tr>
        </thead>
        <tbody>
          {rowDivs}
          <tr>
            <th>Kokonaispisteet</th>{totals}
          </tr>
          <tr>
            <th>Sijoitus</th>{standings}
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
  current: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.number,
      id: React.PropTypes.number,
      value: React.PropTypes.number,
    })).isRequired,
  labels: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  }),
};

function mapStateToProps(state) {
  return {
    current: state.current,
    scores: state.scores,
    labels: state.labels,
  };
}

export default connect(mapStateToProps)(HistoryTable);
