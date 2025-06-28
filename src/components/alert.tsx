import React from "react";
import { Alert as AlertType } from "../types";

interface AlertProps {
  alert: AlertType;
  style?: string;
  removeAlert: (id: string) => void;
}

export const Alert: React.FC<AlertProps> = (props) => (
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
);

export default Alert;
