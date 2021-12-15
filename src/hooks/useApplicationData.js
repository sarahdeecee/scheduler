import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // calculate the number of empty appointment spots
  const calcEmptySpots = (id, appointments) => {
    if (state.days.length > 0 && appointments !== {}) {
      const index = state.days.findIndex(day => day.appointments.includes(id));
      const appointmentIds = state.days[index].appointments;
      const empty = appointmentIds.filter(id => appointments[id].interview === null).length;
      return empty;
    };
  };
  
  // update days array with new number of empty spots
  const updateDaySpots = (id, appointments) => {
    const days = JSON.parse(JSON.stringify(state.days));
    const index = state.days.findIndex(day => day.appointments.includes(id));
    days[index].spots = calcEmptySpots(id, appointments);
    return days;
  };

  // update appointments object
  const updateAppointments = (id, interview) => {
    const newInterview = (interview) ? {...interview} : null;
    const appointment = {
      ...state.appointments[id],
      interview: newInterview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return appointments;
  };

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

  // creates appointment by sending info to API and updates state
  const bookInterview = (id, interview) => {
    const appointments = updateAppointments(id, interview);
    const days = updateDaySpots(id, appointments);
    return axios.put('http://localhost:8001/api/appointments/' + id, {interview})
    .then((res) => {
      setState(prev => ({ ...prev, appointments, days }));
    });
  };

  // deletes appointment from API and updates state
  const cancelInterview = (id) => {
    const appointments = updateAppointments(id);
    const days = updateDaySpots(id, appointments);
    return axios.delete('http://localhost:8001/api/appointments/' + id)
    .then((res) => {
      setState(prev => ({ ...prev, days, appointments }));
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};
