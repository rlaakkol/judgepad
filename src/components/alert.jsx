import React from 'react'
import PropTypes from 'prop-types'

export const Alert = props => (
  <div
    className={`message ${props.alert.style}`}
    key={props.alert.id}
    style={props.style}
  >
    {props.alert.text}
    <button
      className="close-btn"
      onClick={() => props.removeAlert(props.alert.id)}
    >
      <i className="fa fa-close" />
    </button>
  </div>
)

Alert.propTypes = {
  alert: PropTypes.shape({
    text: PropTypes.string,
    style: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  style: PropTypes.string,
  removeAlert: PropTypes.func.isRequired
}

export default Alert
