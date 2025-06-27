import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Outlet } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import Alerts from './alerts.jsx'

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
      <Alerts alerts={props.alerts} removeAlert={props.removeAlert} />
      <div className="container-fluid mt-4 pb-5 mb-5 px-4">
        <Outlet />
      </div>
      <Navbar fixed="bottom" expand="lg" bg="light" variant="light">
        <div className="container-fluid px-4">
          <Navbar.Brand as={NavLink} to="/scorecard">
            {props.labels.name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/scorecard">
                Scoring
              </Nav.Link>
              <Nav.Link as={NavLink} to="/history">
                History
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="/display?navigation=true">
                Show latest record
              </Nav.Link>
              <Nav.Link as={NavLink} to="/help">
                Instructions
              </Nav.Link>
              <NavDropdown
                title="Settings"
                id="settings-dropdown"
                onSelect={handleDropdownAction}
                drop="up"
              >
                <NavDropdown.Item eventKey={'cancel'}>
                  Delete latest
                </NavDropdown.Item>
                <NavDropdown.Item eventKey={'clear'}>
                  Clear history
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Event"
                id="event-dropdown"
                onSelect={handleDropdownAction}
                drop="up"
                align="end"
              >
                <NavDropdown.Item
                  eventKey={'dantai'}
                  active={props.labels.id === 'dantai'}
                >
                  Dantai Hokei
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={'tenkai'}
                  active={props.labels.id === 'tenkai'}
                >
                  Tenkai
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  )
}

App.propTypes = {
  changeLabels: PropTypes.func.isRequired,
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      style: PropTypes.string,
      id: PropTypes.string
    })
  ).isRequired,
  labels: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  clearScores: PropTypes.func.isRequired,
  undoLastScore: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired
}

export default App
