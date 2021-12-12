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
  const { student, interviewer }  = interview.interview;
  const { interviewers } = state.interview;
  const interviewObj = {
    student: student,
    interviewer: {
      id: interviewer.id,
      name: interviewers[interviewer.id].name,
      avatar: interviewers[interviewer.id].avatar
    }
  };
  return interviewObj;
};
