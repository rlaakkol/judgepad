import React from 'react';
import { connect } from 'react-redux';

import Score from '../utils/score';
import SubmitButton from './submit';

const ScoreDisplay = props =>
  <div>
    <h1 className="totaldisp">{Math.round(Score.calcTotal(props.rows) * 10) / 10}</h1>
    <div className="center">
      <SubmitButton
        className="btn btn-success"
      >
        Submit
      </SubmitButton>
    </div>
  </div>;

function mapStateToProps(state) {
  return {
    rows: state.current,
  };
}

ScoreDisplay.propTypes = {
  rows: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.number,
      id: React.PropTypes.number,
      value: React.PropTypes.number,
    })).isRequired,
};

export default connect(mapStateToProps)(ScoreDisplay);
