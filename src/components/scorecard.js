import React from 'react';

import ScorePicker from './scorepicker';

const Scorecard = (props) => {
  const rows = props.rows.map((cprops, i) =>
    <ScorePicker
      {...cprops}
      label={props.labels[i]}
      handleValueChange={props.handleValueChange}
      handleLabelChange={props.handleLabelChange}
    />,
  );
  return (
    <div>
      <div>
        Team number {props.history.length + 1}
      </div>
      <div className="container">
        {rows}
      </div>
      <div>
      Total: {Math.round(props.total * 10) / 10}
      </div>
      <div>
        Current standing: {props.standing} {props.isTie ? '⚠' : ''}
      </div>
    </div>);
};

export default Scorecard;
