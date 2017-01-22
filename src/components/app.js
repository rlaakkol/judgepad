import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navbar, Nav, NavItem, Jumbotron } from 'react-bootstrap';

import Scorecard from './scorecard';
import HistoryTable from './historytable';
import Score from '../utils/score';
import * as Actions from '../actions';
import ConfirmModal from './confirm';
import ShowTotal from './show.js';

const defaultRows = [
  { key: 0, id: 0, value: 0 },
  { key: 1, id: 1, value: 0 },
  { key: 2, id: 2, value: 0 },
  { key: 3, id: 3, value: 0 },
  { key: 4, id: 4, value: 0 }];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: _.cloneDeep(defaultRows),
      overlayVisible: false,
      showSubmit: false,
      showClear: false,
      visibleTab: "scorecard",
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.showPrevious = this.showPrevious.bind(this);
    this.toggleSubmitConfirmation = this.toggleSubmitConfirmation.bind(this);
    this.toggleClearConfirmation = this.toggleClearConfirmation.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleValueChange(id, value) {
    const rows = this.state.rows;
    const i = rows.findIndex(e => e.id === id);
    rows[i].value = value;
    this.setState({ rows });
  }

  handleSubmit() {
    this.props.addScore(this.state.rows);
    this.setState({ rows: _.cloneDeep(defaultRows) });
  }

  toggleOverlay() {
    this.setState({ overlayVisible: !this.state.overlayVisible });
  }

  handleLabelChange(value, i) {
    const labels = _.clone(this.props.labels);
    labels[i] = value;
    this.props.changeLabels(labels);
  }

  showPrevious(i) {
    this.setState({
      rows: _.cloneDeep(this.props.history[i]),
      visibleTab: "scorecard",
    });
  }

  toggleSubmitConfirmation() {
    this.setState({ showSubmit: !this.state.showSubmit });
  }

  toggleClearConfirmation() {
    this.setState({ showClear: !this.state.showClear });
  }

  handleNavigation(value) {
    this.setState({ visibleTab: value})
  }

  render() {

    const total = Score.calcTotal(this.state.rows);
    const standing = Score.getStanding(this.props.history, this.state.rows);
    const isTie = Score.isTie(this.props.history, this.state.rows);
    const overlayVisibility = this.state.overlayVisible ? 'overlay-visible' : '';
    const visibleComponent = (label => {
      switch (label) {
        case "scorecard":
          return (
            <Scorecard
              history={this.props.history}
              rows={this.state.rows}
              labels={this.props.labels}
              handleValueChange={this.handleValueChange}
              handleLabelChange={this.handleLabelChange}
              total={total}
              standing={standing}
              isTie={isTie}
            />
          );
        case "history":
          return (
            <HistoryTable
              scores={this.props.history}
              current={this.state.rows}
              labels={this.props.labels}
              show={this.showPrevious}
              toggleClearConfirmation={this.toggleClearConfirmation}
            />);
        case "show":
          return (
            <Jumbotron>
              <h1 className="totaldisp">{Math.round(total * 10) / 10}</h1>
              <button
                className="btn btn-primary"
                onClick={this.toggleSubmitConfirmation}
              >
                Submit
              </button>
            </Jumbotron>);
      }
    })(this.state.visibleTab);
    return (
      <div>
        {visibleComponent}
        <ConfirmModal
          text="Submit?"
          stateVar={this.state.showSubmit}
          onConfirm={this.handleSubmit}
          toggle={this.toggleSubmitConfirmation}
        />
        <ConfirmModal
          text="Clear?"
          stateVar={this.state.showClear}
          onConfirm={this.props.clearScores}
          toggle={this.toggleClearConfirmation}
        />
        <Navbar
          fixedBottom
          onSelect={this.handleNavigation}>
          <Nav expdanded={false}>
            <NavItem eventKey={"scorecard"}>Scorecard</NavItem>
            <NavItem eventKey={"show"}>Show</NavItem>
            <NavItem eventKey={"history"}>History</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

App.propTypes = {
  history: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.number,
        id: React.PropTypes.number,
        value: React.PropTypes.number,
      }))).isRequired,
  labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  clearScores: React.PropTypes.func.isRequired,
  addScore: React.PropTypes.func.isRequired,
  changeLabels: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    history: state.scores,
    labels: state.labels,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addScore: Actions.addScore,
    clearScores: Actions.clearScores,
    changeLabels: Actions.changeLabels,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
