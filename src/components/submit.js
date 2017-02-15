import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuid from 'node-uuid';
import { Button } from 'react-bootstrap';

import * as Actions from '../actions';
import Score from '../utils/score';

const SubmitButton = (props) => {
  const handleClick = () => {
    props.addScore(props.rows);
    const id = uuid();
    props.addAlert('Submitted', 'alert alert-success', id);
    setTimeout(() => props.removeAlert(id), 2000);
  };
  const disabled = Score.isTie(props.history, props.rows);
  return (
    <Button
      className={props.className}
      onClick={handleClick}
      disabled={disabled}
    >
      {props.children}
    </Button>);
};

function mapStateToProps(state) {
  return {
    rows: state.current,
    history: state.scores,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addScore: Actions.addScore,
    addAlert: Actions.addAlert,
    removeAlert: Actions.removeAlert,
  }, dispatch);
}

SubmitButton.propTypes = {
  rows: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.number,
      id: React.PropTypes.number,
      value: React.PropTypes.number,
    })).isRequired,
  addScore: React.PropTypes.func.isRequired,
  removeAlert: React.PropTypes.func.isRequired,
  addAlert: React.PropTypes.func.isRequired,
  children: React.PropTypes.string.isRequired,
  className: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);
