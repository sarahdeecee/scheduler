import { action } from "@storybook/addon-actions/dist/preview";
import React, { Fragment } from "react";
import classNames from "classnames";
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  const { time, interview, interviewer } = props;

  const formatTime = (time) ? (`Appointment at ${time}`) : 'No Appointments';
  
  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? <Show {...interview} {...interviewer} /> : <Empty />}
    </article>
  );
}
