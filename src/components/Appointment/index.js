import { action } from "@storybook/addon-actions/dist/preview";
import React from "react";
import classNames from "classnames";
import "./styles.scss";

export default function Appointment(props) {
  const { time } = props;

  const formatTime = (time) ? (`Appointment at ${time}`) : 'No Appointments';
  
  return (
    <article className="appointment">{formatTime}</article>
  );
}
