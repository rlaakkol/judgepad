import React from 'react'
import PropTypes from 'prop-types'

import Alert from './alert.jsx'

const Alerts = props => {
  const { alerts, removeAlert } = props

  const renderAlerts = () =>
    alerts.map(alert => (
      <Alert alert={alert} key={alert.id} removeAlert={removeAlert} />
    ))

  return (
    <div id="messages" data-testid="alerts">
      {renderAlerts()}
    </div>
  )
}

Alerts.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      style: PropTypes.string,
      id: PropTypes.string
    })
  ).isRequired,
  removeAlert: PropTypes.func.isRequired
}

export default Alerts
