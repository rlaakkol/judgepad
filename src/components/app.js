import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import * as Actions from '../actions';
import Alerts from './alerts';
import Alert from './alert';

const dantaiLabels = {
  id: 'dantai',
  name: 'Dantai Hokei',
  labels: [
    'Muodon säilyminen, samanaikaisuus',
    'Tekninen puhtaus',
    'Tekninen vaativuus',
    'Hengitys ja teho',
    'Vaikutelma',
  ],
};

const tenkaiLabels = {
  id: 'tenkai',
  name: 'Tenkai',
  labels: [
    'Tilan käyttö ja liikkeen jatkuvuus',
    'Tekninen puhtaus',
    'Tekninen vaativuus',
    'Realistisuus',
    'Ratkaisutekniikan etäisyys ja ajoitus',
  ],
};

const App = (props) => {
  const chooseLabelPreset = (mode) => {
    switch (mode) {
      case 'dantai':
        props.changeLabels(dantaiLabels);
        break;
      case 'tenkai':
        props.changeLabels(tenkaiLabels);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Alerts alerts={props.alerts}>
        <Alert />
      </Alerts>
      {props.children}
      <Navbar
        fixedBottom
      >
        <Navbar.Header>
          <Link to="/scorecard">
            <Navbar.Brand>
              {props.labels.name}
            </Navbar.Brand>
          </Link>
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
            <LinkContainer to="/help">
              <NavItem
                eventKey={4}
              >
                Help
              </NavItem>
            </LinkContainer>
            <NavDropdown
              title="Mode"
              id="label-mode-dropdown"
              onSelect={chooseLabelPreset}
            >
              <MenuItem
                eventKey={'dantai'}
                active={props.labels.id === 'dantai'}
              >
                Dantai Hokei
              </MenuItem>
              <MenuItem
                eventKey={'tenkai'}
                active={props.labels.id === 'tenkai'}
              >
                Tenkai
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

App.propTypes = {
  changeLabels: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired,
  alerts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string,
      style: React.PropTypes.string,
      id: React.PropTypes.string,
    })).isRequired,
  labels: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  }),
};

function mapStateToProps(state) {
  return {
    alerts: state.alerts,
    labels: state.labels,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeLabels: Actions.changeLabels,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
