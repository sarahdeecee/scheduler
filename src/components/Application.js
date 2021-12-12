import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import getAppointmentsForDay from 'helpers/selectors'

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  console.log('day',state.day);
  useEffect(() => {
    const daysUrl = 'http://localhost:8001/api/days';
    const appointmentsUrl = 'http://localhost:8001/api/appointments';
    const interviewersUrl = 'http://localhost:8001/api/interviewers';
    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl)
    ]).then((all) => {
      const [daysData, appointmentsData, interviewersData] = all;
      console.log('days',daysData.data);
      console.log('appointments',appointmentsData.data);
      console.log('interviewers',interviewersData.data);
      setState(prev => ({...prev, days: daysData.data, appointments: appointmentsData.data, interviewers: interviewersData.data}));
    });
  }, []);

  const setDay = day => setState({ ...state, day });
    const dailyAppointments = getAppointmentsForDay(state, state.day);
    console.log(dailyAppointments);
  useEffect(() => {

  }, [state.day])

  const parsedAppointments = dailyAppointments.map(appointment =>
    <Appointment key={appointment.id} {...appointment} />
  );


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
      </section>
    </main>
  );
}
