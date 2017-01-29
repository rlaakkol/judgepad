import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../actions';

const Alert = props =>
  <div
    className={`message ${props.alert.style}`}
    key={props.alert.id}
    style={props.style}
  >
    {props.alert.text}
    <button className="close-btn" onClick={() => props.removeAlert(props.alert.id)}>
      <i className="fa fa-close" />
    </button>
  </div>;

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    removeAlert: Actions.removeAlert,
  }, dispatch);

const mapStateToProps = state => ({ alerts: state.alerts });

Alert.propTypes = {
  alert: React.PropTypes.shape({
    text: React.PropTypes.string,
    style: React.PropTypes.string,
    id: React.PropTypes.string,
  }).isRequired,
  style: React.PropTypes.string.isRequired,
  removeAlert: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
