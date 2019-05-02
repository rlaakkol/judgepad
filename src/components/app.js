import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import * as Actions from '../actions'
import Alerts from './alerts'
import Alert from './alert'

const dantaiLabels = {
  id: 'dantai',
  name: 'Dantai Hokei',
  labels: [
    'Form preservation, synchronization',
    'Technical purity',
    'Technical difficulty',
    'Breathing and effectiveness',
    'Impression',
    'Additional point'
  ]
}

const tenkaiLabels = {
  id: 'tenkai',
  name: 'Tenkai',
  labels: [
    'Use of space and continuity of movement',
    'Technical purity',
    'Technical difficulty',
    'Realisticity',
    'The disctance and timing of the finishing technique',
    'Additional point'
  ]
}

const App = props => {
  const handleDropdownAction = key => {
    switch (key) {
      case 'dantai':
        props.changeLabels(dantaiLabels)
        break
      case 'tenkai':
        props.changeLabels(tenkaiLabels)
        break
      case 'cancel':
        props.undoLastScore()
        break
      case 'clear':
        props.clearScores()
        break
      default:
        break
    }
  }

  return (
    <div>
      <Alerts alerts={props.alerts}>
        <Alert />
      </Alerts>
      {props.children}
      <Navbar fixedBottom>
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
              <NavItem eventKey={1}>
                Scoring
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/history">
              <NavItem eventKey={3}>
                History
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/display?navigation=true">
              <NavItem eventKey={2}>
                Show latest record
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/help">
              <NavItem eventKey={4}>
                Instructions
              </NavItem>
            </LinkContainer>
            <NavDropdown
              title="Settings"
              id="label-mode-dropdown"
              onSelect={handleDropdownAction}
            >
              <MenuItem eventKey={'cancel'}>
                Delete latest
              </MenuItem>
              <MenuItem eventKey={'clear'}>
                Clear history
              </MenuItem>
            </NavDropdown>
            <NavDropdown
              title="Event"
              id="label-mode-dropdown"
              onSelect={handleDropdownAction}
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
  )
}

App.propTypes = {
  changeLabels: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired,
  alerts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string,
      style: React.PropTypes.string,
      id: React.PropTypes.string
    })
  ).isRequired,
  labels: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  }),
  clearScores: React.PropTypes.func.isRequired,
  undoLastScore: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    alerts: state.alerts,
    labels: state.labels
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeLabels: Actions.changeLabels,
      undoLastScore: Actions.undoLastScore,
      clearScores: Actions.clearScores
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
