import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import ScorePicker from './scorepicker';
import SubmitButton from './submit';
import Score from '../utils/score';
import * as Actions from '../actions';

const Scorecard = (props) => {
  const handleLabelChange = (value, i) => {
    const labels = _.clone(props.labels);
    labels[i] = value;
    props.changeLabels(labels);
  };

  const handleValueChange = (id, value) => {
    const rows = _.cloneDeep(props.rows);
    const i = rows.findIndex(e => e.id === id);
    rows[i].value = value;
    props.updateCurrent(rows);
  };

  const rows = props.rows.map((rowprops, i) =>
    <ScorePicker
      {...rowprops}
      label={props.labels[i]}
      handleValueChange={handleValueChange}
      handleLabelChange={handleLabelChange}
    />,
  );
  const total = Score.calcTotal(props.rows);
  const standing = Score.getStanding(props.history, props.rows);
  const isTie = Score.isTie(props.history, props.rows);
  return (
    <div>
      <div className="container">
        <div className="row equal">
          <div className="col-md-12">
            <strong>Team number {props.history.length + 1}</strong>
          </div>
        </div>
        <div className="h-divider" />
        {rows}
        <div className="h-divider" />
        <div className="row equal">
          <div className="col-md-6">
            <strong>Total:</strong> {Math.round(total * 10) / 10}
          </div>
          <div className="col-md-6">
            <strong>Current standing:</strong> {standing} {isTie ? <i className="fa fa-warning" /> : ''}
          </div>
        </div>
        <div className="row equal">
          <div className="col-md-4">
            <button className="btn btn-warning" onClick={props.clearCurrent}>Clear</button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={() => browserHistory.push('/display')}>Show</button>
          </div>
          <div className="col-md-4">
            <SubmitButton className="btn btn-success">Submit</SubmitButton>
          </div>
        </div>
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
  clearCurrent: React.PropTypes.func.isRequired,
  addScore: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    rows: state.current,
    history: state.scores,
    labels: state.labels,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateCurrent: Actions.updateCurrent,
    clearCurrent: Actions.clearCurrent,
    changeLabels: Actions.changeLabels,
    addScore: Actions.addScore,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scorecard);
