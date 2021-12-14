import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // retrieve information from the apin and set to state
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
      setState(prev => ({...prev, days: daysData.data, appointments: appointmentsData.data, interviewers: interviewersData.data}));
    });
  }, []);

  // sets the day of the week
  const setDay = day => setState({ ...state, day });

  // creates appointment by sending info to api
  const bookInterview = (id, interview) => {
    console.log('bookInterview',id,interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put('http://localhost:8001/api/appointments/' + id, {interview})
    .then((res) => {
      setState({ ...state, appointments });
      console.log('status',res.status);
    });
  };

  // deletes appointment from api
  const cancelInterview = (id) => {
    console.log('cancelInterview',id);
    return axios.delete('http://localhost:8001/api/appointments/' + id)
    .then((res) => {
      setState({ ...state });
      console.log('status',res.status);
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};
