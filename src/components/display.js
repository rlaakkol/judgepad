import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Score from '../utils/score';
import * as Actions from '../actions';

const ScoreDisplay = (props) => {
  const handleClick = () => {
    props.addScore(props.rows);
    props.addAlert('Submitted', 'alert alert-success');
  }
  return (
    <div>
      <h1 className="totaldisp">{Math.round(Score.calcTotal(props.rows) * 10) / 10}</h1>
      <div className="center">
        <button
          className="btn btn-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </div>)
};

function mapStateToProps(state) {
  return {
    rows: state.current,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addScore: Actions.addScore,
    addAlert: Actions.addAlert,
  }, dispatch);
}

ScoreDisplay.propTypes = {
  rows: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.number,
      id: React.PropTypes.number,
      value: React.PropTypes.number,
    })).isRequired,
  addScore: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreDisplay);
