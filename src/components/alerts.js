import React from 'react';

const Alerts = (props) => {
  const { alerts, children, style } = props;

  const renderAlerts = () => 
    alerts.map((alert) => 
        React.cloneElement(children, { alert: alert, key: alert.id })
    );

  return (
    <div className="react-alerts-overlay-component-container">
      {renderAlerts()}
    </div>
  );
}

export default Alerts;
