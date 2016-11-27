import React, { Component } from 'react';
import _ from 'lodash';

import ScorePicker from './scorepicker'

const defaultRows = [
  {key: 0, id: 0, label: "Format & sync", value: 0},
  {key: 1, id: 1, label: "Technique & unsoku", value: 0},
  {key: 2, id: 2, label: "Expression", value: 0},
  {key: 3, id: 3, label: "Power", value: 0},
  {key: 4, id: 4, label: "Use of tengi", value: 0}];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {rows: _.cloneDeep(defaultRows), prevTotals: [], overlayVisible: false};

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  handleValueChange(id, value) {
    var rows = this.state.rows;
    var i = rows.findIndex(e => e.id === id);
    rows[i].value = value;
    this.setState({rows: rows});
  }

  calcTotal() {
    return this.state.rows.map(item => item.value).reduce((a, b) => Number.parseInt(a) + Number.parseInt(b))/this.state.rows.length
  }

  handleSubmit() {
    var scores = this.state.prevTotals;
    scores.push(this.calcTotal());
    this.setState({rows: _.cloneDeep(defaultRows), prevTotals: scores.sort((a, b) => a < b)});
  }

  toggleOverlay() {
    this.setState({overlayVisible: !this.state.overlayVisible})
  }

  render() {
    var rows = this.state.rows.map(props => <ScorePicker {...props} handleValueChange={this.handleValueChange} />);
    var total = this.calcTotal();
    var standing = this.state.prevTotals.findIndex((e) => e < total) > -1 ? this.state.prevTotals.findIndex((e) => e < total) + 1 : this.state.prevTotals.length + 1;
    var overlayVisibility = this.state.overlayVisible ? "overlay-visible" : "";
    return (
      <div>
        <div className="container-fluid">
        {rows}
        </div>
        <div>
        Total: {Math.round(total*10)/10}
        </div>
        <div>
          Current standing: {standing}
        </div>
        <div>
          <button onClick={this.toggleOverlay}>
            Show
          </button>
          <button
            onClick={this.handleSubmit}>Submit</button>
        </div>
        <div id="myNav" className={"overlay "+overlayVisibility}>
          <a href="#" className="closebtn" onClick={this.toggleOverlay}>&times;</a>
          <div id="overlay-content" className="overlay-content">
            {Math.round(total*10)/10}
          </div>
        </div>
      </div>
    );
  }
}
