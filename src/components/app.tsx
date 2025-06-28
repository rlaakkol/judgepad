import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import Alerts from './alerts'
import { Labels, Alert } from '../types'

interface AppProps {
  changeLabels: (labels: Labels) => void;
  alerts: Alert[];
  labels: Labels;
  clearScores: () => void;
  undoLastScore: () => void;
  removeAlert: (id: string) => void;
}

const App: React.FC<AppProps> = (props) => {
  const { t, i18n } = useTranslation()
  const dantaiLabels: Labels = {
    id: 'dantai',
    name: t('dantaiLabels.name'),
    labels: t('dantaiLabels.labels', { returnObjects: true })
  }

  const tenkaiLabels: Labels = {
    id: 'tenkai',
    name: t('tenkaiLabels.name'),
    labels: t('tenkaiLabels.labels', { returnObjects: true })
  }

  useEffect(() => {
    if (props.labels.id === 'dantai') {
      props.changeLabels(dantaiLabels)
    } else {
      props.changeLabels(tenkaiLabels)
    }
  }, [i18n.language])

  const handleDropdownAction = (key: string | null) => {
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

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
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
                {t('navigation.scoring')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/history">
                {t('navigation.history')}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="/display?navigation=true">
                {t('navigation.showLatestRecord')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/help">
                {t('navigation.instructions')}
              </Nav.Link>
              <NavDropdown
                title={t('navigation.settings')}
                id="settings-dropdown"
                onSelect={handleDropdownAction}
                drop="up"
              >
                <NavDropdown.Item onClick={() => handleLanguageChange('en')}>
                  {t('navigation.english')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLanguageChange('fi')}>
                  {t('navigation.finnish')}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey={'cancel'}>
                  {t('navigation.deleteLatest')}
                </NavDropdown.Item>
                <NavDropdown.Item eventKey={'clear'}>
                  {t('navigation.clearHistory')}
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={t('navigation.event')}
                id="event-dropdown"
                onSelect={handleDropdownAction}
                drop="up"
                align="end"
              >
                <NavDropdown.Item
                  eventKey={'dantai'}
                  active={props.labels.id === 'dantai'}
                >
                  {t('dantaiLabels.name')}
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={'tenkai'}
                  active={props.labels.id === 'tenkai'}
                >
                  {t('tenkaiLabels.name')}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  )
}

export default App
