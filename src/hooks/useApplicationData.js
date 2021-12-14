import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // calculate the number of empty spots
  const calcEmptySpots = (id, appointments) => {
    if (state.days.length > 0 && appointments !== {}) {
      const index = state.days.findIndex(day => day.appointments.includes(id));
      const appointmentIds = state.days[index].appointments;
      const empty = appointmentIds.filter(id => appointments[id].interview === null).length
      return empty;
    };
  };

  const updateDaySpots = (id, appointments) => {
    const days = [...state.days];
    const index = state.days.findIndex(day => day.appointments.includes(id));
    days[index].spots = calcEmptySpots(id, appointments);
    return days;
  }
  // retrieve information from the api and set to state
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
    const days = updateDaySpots(id, appointments);
    return axios.put('http://localhost:8001/api/appointments/' + id, {interview})
    .then((res) => {
      setState({ ...state, appointments, days });
      console.log('status',res.status);
    });
  };

  // deletes appointment from api
  const cancelInterview = (id) => {
    console.log('cancelInterview',id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateDaySpots(id, appointments);
    return axios.delete('http://localhost:8001/api/appointments/' + id)
    .then((res) => {
      setState(prev => ({ ...prev, days, appointments }));
      console.log('status',res.status);
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};
