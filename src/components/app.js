import React, { Component } from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import ScorePicker from './scorepicker';
import Overlay from './overlay';
import HistoryTable from './historytable';
import Score from '../utils/score';
import * as Actions from '../actions'

const defaultRows = [
  {key: 0, id: 0, value: 0},
  {key: 1, id: 1, value: 0},
  {key: 2, id: 2, value: 0},
  {key: 3, id: 3, value: 0},
  {key: 4, id: 4, value: 0}];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {rows: _.cloneDeep(defaultRows), overlayVisible: false};

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
  }

  handleValueChange(id, value) {
    var rows = this.state.rows;
    var i = rows.findIndex(e => e.id === id);
    rows[i].value = value;
    this.setState({rows: rows});
  }

  handleSubmit() {
    this.props.addScore(this.state.rows);
    this.setState({rows: _.cloneDeep(defaultRows)});
  }

  toggleOverlay() {
    this.setState({overlayVisible: !this.state.overlayVisible})
  }

  handleLabelChange(value, i) {
    var labels = _.cloneDeep(this.props.labels);
    labels[i] = value;
    this.props.changeLabels(labels);
  }

  render() {
    var rows = this.state.rows.map((props, i) =>
      <ScorePicker {...props} label={this.props.labels[i]}
        handleValueChange={this.handleValueChange}
        handleLabelChange={this.handleLabelChange}
      />
    );
    var total = Score.calcTotal(this.state.rows);
    var standing = Score.getStanding(this.props.history, this.state.rows);
    var overlayVisibility = this.state.overlayVisible ? "overlay-visible" : "";
    return (
      <div>
        <div>
          Team number {this.props.history.length + 1}
        </div>
        <div className="container">
        {rows}
        </div>
        <div>
        Total: {Math.round(total*10)/10}
        </div>
        <div>
          Current standing: {standing}
        </div>
        <div>
          <button className="btn btn-primary" onClick={this.toggleOverlay}>
            Show
          </button>
          <button className="btn btn-primary"
            onClick={this.handleSubmit}>
            Submit
          </button>
          <button className="btn btn-primary"
            onClick={() => this.props.clearScores()}>
            Clear history
          </button>
        </div>
        <Overlay total={total} onClose={this.toggleOverlay} visibility={overlayVisibility} />
        <HistoryTable scores={this.props.history} labels={this.props.labels} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    history: state.scores,
    labels: state.labels
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addScore: Actions.addScore,
    clearScores: Actions.clearScores,
    changeLabels: Actions.changeLabels}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
