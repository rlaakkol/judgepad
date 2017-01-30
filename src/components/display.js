import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Score from '../utils/score';
import SubmitButton from './submit';
import * as Actions from '../actions';

const ScoreDisplay = props =>
  <div className="container">
    <h1 className="totaldisp">{Math.round(Score.calcTotal(props.rows) * 10) / 10}</h1>
    <div className="row">
      <div className="col-md-2 col-md-offset-3">
        <button className="btn btn-warning" onClick={props.clearCurrent}>
          Clear
        </button>
      </div>
      <div className="col-md-2 col-md-offset-2">
        <SubmitButton
          className="btn btn-success"
        >
          Submit
        </SubmitButton>
      </div>
    </div>
  </div>;

function mapStateToProps(state) {
  return {
    rows: state.current,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearCurrent: Actions.clearCurrent,
  }, dispatch);
}

ScoreDisplay.propTypes = {
  rows: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.number,
      id: React.PropTypes.number,
      value: React.PropTypes.number,
    })).isRequired,
  clearCurrent: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreDisplay);
