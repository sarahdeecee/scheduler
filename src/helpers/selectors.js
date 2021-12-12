export function getAppointmentsForDay(state, day) {
  const dayAppointments = [];
  if (state.length === 0 || !state || !state.days || !state.appointments) {
    return dayAppointments;
  }
  if (!(state.days).find(dayObj => dayObj['name'] === day)) {
    return dayAppointments;
  }
  const dayAppointmentIds = (state.days).find(dayObj => dayObj['name'] === day).appointments;
  
  for (let appointment in (state.appointments)) {
    if (dayAppointmentIds.includes(Number(appointment))) {
      dayAppointments.push(state.appointments[appointment]);
    }
  }
  return dayAppointments;
};

export function getInterview(state, interview) {
  if (!interview || !state) {
    return null;
  }
  const { student, interviewer }  = interview;
  const interviewers = state.interviewers;

  const interviewObj = {
    student: student,
    interviewer: {
      id: interviewer,
      name: interviewers[interviewer].name,
      avatar: interviewers[interviewer].avatar
    }
  };

  return interviewObj;
};
