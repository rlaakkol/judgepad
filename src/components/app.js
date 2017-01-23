import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import Scorecard from './scorecard';
import HistoryTable from './historytable';
import Score from '../utils/score';
import * as Actions from '../actions';
import ConfirmModal from './confirm';

const defaultRows = [
  { key: 0, id: 0, value: 0 },
  { key: 1, id: 1, value: 0 },
  { key: 2, id: 2, value: 0 },
  { key: 3, id: 3, value: 0 },
  { key: 4, id: 4, value: 0 }];

const dantaiLabels = [
  'Format & sync',
  'Technique & unsoku',
  'Expression',
  'Power',
  'Use of tengi',
];

const tenkaiLabels = [
  'Technique & unsoku',
  'Area & Space',
  'Attack timing',
  'Final technique & kimegi',
  'Use of tengi',
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: _.cloneDeep(defaultRows),
      showSubmit: false,
      showClear: false,
      visibleTab: 'scorecard',
      mode: 'dantai',
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.showPrevious = this.showPrevious.bind(this);
    this.toggleSubmitConfirmation = this.toggleSubmitConfirmation.bind(this);
    this.toggleClearConfirmation = this.toggleClearConfirmation.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.chooseLabelPreset = this.chooseLabelPreset.bind(this);
  }

  handleValueChange(id, value) {
    const rows = _.cloneDeep(this.props.rows);
    const i = rows.findIndex(e => e.id === id);
    rows[i].value = value;
    this.props.updateCurrent(rows);
  }

  handleSubmit() {
    this.props.addScore(this.props.rows);
  }

  handleLabelChange(value, i) {
    const labels = _.clone(this.props.labels);
    labels[i] = value;
    this.props.changeLabels(labels);
  }

  chooseLabelPreset(mode) {
    switch (mode) {
      case 'dantai':
        this.setState({ mode: 'dantai' });
        this.props.changeLabels(dantaiLabels);
        break;
      case 'tenkai':
        this.setState({ mode: 'tenkai' });
        this.props.changeLabels(tenkaiLabels);
        break;
      default:
        break;
    }
  }

  showPrevious(i) {
    this.setState({
      rows: _.cloneDeep(this.props.history[i]),
      visibleTab: 'scorecard',
    });
  }

  toggleSubmitConfirmation() {
    this.setState({ showSubmit: !this.state.showSubmit });
  }

  toggleClearConfirmation() {
    this.setState({ showClear: !this.state.showClear });
  }

  handleNavigation(value) {
    if (['scorecard', 'show', 'history'].includes(value)) {
      this.setState({ visibleTab: value });
    }
  }

  render() {
    const total = Score.calcTotal(this.props.rows);
    const visibleComponent = ((label) => {
      switch (label) {
        case 'history':
          return (
            <HistoryTable
              scores={this.props.history}
              current={this.props.rows}
              labels={this.props.labels}
              show={this.showPrevious}
              toggleClearConfirmation={this.toggleClearConfirmation}
              undoLastScore={this.props.undoLastScore}
            />);
        case 'show':
          return (
            <div>
              <h1 className="totaldisp">{Math.round(total * 10) / 10}</h1>
              <div className="center">
                <button
                  className="btn btn-primary"
                  onClick={this.toggleSubmitConfirmation}
                >
                  Submit
                </button>
              </div>
            </div>);
        case 'scorecard':
        default:
          return (
            <Scorecard
              history={this.props.history}
              rows={this.props.rows}
              labels={this.props.labels}
              handleValueChange={this.handleValueChange}
              handleLabelChange={this.handleLabelChange}
              clear={this.props.clearCurrent}
            />
          );
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
          onSelect={this.handleNavigation}
        >
          <Navbar.Header>
            <Navbar.Brand>
              Taido
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem
                eventKey={'scorecard'}
                active={this.state.visibleTab === 'scorecard'}
              >
                Scorecard
              </NavItem>
              <NavItem
                eventKey={'show'}
                active={this.state.visibleTab === 'show'}
              >
                Show
              </NavItem>
              <NavItem
                eventKey={'history'}
                active={this.state.visibleTab === 'history'}
              >
                History
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavDropdown
                title="Mode"
                id="label-mode-dropdown"
                onSelect={this.chooseLabelPreset}
              >
                <MenuItem
                  eventKey={'dantai'}
                  active={this.state.mode === 'dantai'}
                >
                  Dantai Hokei
                </MenuItem>
                <MenuItem
                  eventKey={'tenkai'}
                  active={this.state.mode === 'tenkai'}
                >
                  Tenkai
                </MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
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
  undoLastScore: React.PropTypes.func.isRequired,
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
    clearScores: Actions.clearScores,
    undoLastScore: Actions.undoLastScore,
    changeLabels: Actions.changeLabels,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
