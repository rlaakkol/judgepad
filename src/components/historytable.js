import React, { Component } from 'react';
import _ from 'lodash';
import Score from '../utils/score.js';

const HistoryTable = (props) => {
  var header = _.range(0, props.scores.length).map(i =>
    <th key={i}>Team {i+1}</th>
  );
  if (props.scores.length > 0) {
    var rows = _.range(0, props.scores[0].length).map(i =>
      props.scores.map((score, j) => <td key={"score"+j+i}>{score[i].value}</td>)
    );
  } else {
    var rows = [];
  }
  var rowDivs = rows.map((row, i) => <tr key={i}><th>{props.scores[0][i].label}</th>{row}</tr>);
  var totals = props.scores.map((team, i) =>
    <td key={"total"+i}><em>{Score.calcTotal(team)}</em></td>
  );
  var standings = props.scores.map((team, i) =>
    <td key={"standing"+i}><strong>{Score.getStanding(props.scores, team)}</strong></td>
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

export default HistoryTable;
