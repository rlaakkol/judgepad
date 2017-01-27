import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../actions';

const Alert = (props) =>
    <div
      className={props.alert.style}
      key={props.alert.id}
      onClick={() => props.removeAlert(props.alert.id)}
      style={props.style}
    >
          {props.alert.text}
    </div>;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    removeAlert: Actions.removeAlert,
  }, dispatch);

const mapStateToProps = (state) => {
  return ({ alerts: state.alerts, });
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
