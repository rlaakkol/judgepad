import React from "react";

import Alert from "./alert";
import { Alert as AlertType } from "../types";

interface AlertsProps {
  alerts: AlertType[];
  removeAlert: (id: string) => void;
}

const Alerts: React.FC<AlertsProps> = (props) => {
  const { alerts, removeAlert } = props;

  const renderAlerts = () =>
    alerts.map((alert) => (
      <Alert alert={alert} key={alert.id} removeAlert={removeAlert} />
    ));

  return (
    <div id="messages" data-testid="alerts">
      {renderAlerts()}
    </div>
  );
};

export default Alerts;
