import React from 'react';

import ScorePicker from './scorepicker';
import Score from '../utils/score';

const Scorecard = (props) => {
  const rows = props.rows.map((cprops, i) =>
    <ScorePicker
      {...cprops}
      label={props.labels[i]}
      handleValueChange={props.handleValueChange}
      handleLabelChange={props.handleLabelChange}
    />,
  );
  const total = Score.calcTotal(props.rows);
  const standing = Score.getStanding(props.history, props.rows);
  const isTie = Score.isTie(props.history, props.rows);
  return (
    <div>
      <div>
        Team number {props.history.length + 1}
      </div>
      <div className="container">
        {rows}
      </div>
      <div>
      Total: {Math.round(total * 10) / 10}
      </div>
      <div>
        Current standing: {standing} {isTie ? '⚠' : ''}
      </div>
    </div>);
};

Scorecard.propTypes = {
  rows: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.number,
      id: React.PropTypes.number,
      value: React.PropTypes.number,
    })).isRequired,
  history: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.number,
        id: React.PropTypes.number,
        value: React.PropTypes.number,
      }))).isRequired,
  labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  handleValueChange: React.PropTypes.func.isRequired,
  handleLabelChange: React.PropTypes.func.isRequired,
};

export default Scorecard;
