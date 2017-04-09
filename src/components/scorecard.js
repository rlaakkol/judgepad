import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';

import ScorePicker from './scorepicker';
import SubmitButton from './submit';
import Score from '../utils/score';
import * as Actions from '../actions';

const Scorecard = (props) => {
  const handleValueChange = (id, value) => {
    const rows = _.cloneDeep(props.rows);
    const i = rows.findIndex(e => e.id === id);
    rows[i].value = value;
    props.updateCurrent(rows);
  };

  const rows = props.rows.slice(0, 5).map((rowprops, i) =>
    <ScorePicker
      {...rowprops}
      label={props.labels.labels[i]}
      handleValueChange={handleValueChange}
    />,
  );
  const extraRow = props.rows[5];
  const extraPicker = (
    <ScorePicker
      {...extraRow}
      label={props.labels.labels[5]}
      handleValueChange={handleValueChange}
      isExtra
    />
  );
  const total = Score.calcTotal(props.rows);
  const standing = Score.getStanding(props.history, props.rows);
  const isTie = Score.isTie(props.history, props.rows);
  return (
    <div>
      <div className="container">
        <div className="row equal">
          <div className="col-lg-12">
            <strong>Joukkue {props.history.length + 1}</strong>
          </div>
        </div>
        <div className="h-divider" />
        {rows}
        {extraPicker}
        <div className="h-divider" />
        <div className="row equal">
          <div className="col-md-6">
            <strong>Kokonaispisteet:</strong> {Math.round(total * 10) / 10}
          </div>
          <div className="col-md-6">
            <strong>Tämänhetkinen sijoitus:</strong> {standing} {isTie ? <i className="fa fa-warning" style={{ color: 'red' }} /> : ''}
          </div>
        </div>
        <div className="row equal">
          <div className="col-md-2 col-md-offset-3">
            <button className="btn btn-warning" onClick={props.clearCurrent}>Tyhjennä</button>
          </div>
          <div className="col-md-2 col-md-offset-2">
            <SubmitButton
              className="btn btn-success"
              nextPage="/display"
            >
              Tallenna ja näytä
            </SubmitButton>
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
  labels: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  }),
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
    addScore: Actions.addScore,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scorecard);
