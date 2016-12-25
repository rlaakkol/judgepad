import React, { Component } from 'react';
import _ from 'lodash';

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
  var rowDivs = rows.map((row, i) => <tr key={i}>{row}</tr>);

  return (
    <div className="table-responsive">
      <table className="table table-sm table-nonfluid">
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>{rowDivs}</tbody>
      </table>
    </div>);
};

export default HistoryTable;
