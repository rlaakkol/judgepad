import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import * as Actions from '../actions';
import Alerts from './alerts';
import Alert from './alert';

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
      notificationActive: false,
    };

    this.handleNavigation = this.handleNavigation.bind(this);
    this.chooseLabelPreset = this.chooseLabelPreset.bind(this);
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

  handleNavigation(value) {
    if (['scorecard', 'show', 'history'].includes(value)) {
      this.setState({ visibleTab: value });
    }
  }

  render() {
    return (
      <div>
        <Alerts alerts={this.props.alerts}>
          <Alert />
        </Alerts>
        {this.props.children}
        <Navbar
          fixedBottom
        >
          <Navbar.Header>
            <Navbar.Brand>
              Taido
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/scorecard">
                <NavItem
                  eventKey={1}
                >
                  Scorecard
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/display">
                <NavItem
                  eventKey={2}
                >
                  Show
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/history">
                <NavItem
                  eventKey={3}
                >
                  History
                </NavItem>
              </LinkContainer>
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
  labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  changeLabels: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired,
  alerts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string,
      style: React.PropTypes.string,
      id: React.PropTypes.string,
    })).isRequired,
};

function mapStateToProps(state) {
  return {
    labels: state.labels,
    alerts: state.alerts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeLabels: Actions.changeLabels,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
