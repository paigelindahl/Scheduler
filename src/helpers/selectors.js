//finds available interviewers for that day
export function getInterviewersForDay(state, day) {
  let output = [];
  const filteredDays = state.days.filter((dayObj) => dayObj.name === day);
  if (filteredDays) {
    for (let day of filteredDays) {
      const interviewers = day.interviewers;
      for (let interviewer of interviewers) {
        output.push(state.interviewers[interviewer]);
      }
    }
  }
  return output;
}

//finds the correct appointments for that day
export function getAppointmentsForDay(state, day) {
  let output = [];
  const filteredDays = state.days.filter((dayObj) => dayObj.name === day);
  for (let day of filteredDays) {
    const appointmentsArr = day.appointments;
    for (let appointment of appointmentsArr) {
      const appointmentsObj = state.appointments;
      for (let key in appointmentsObj) {
        if (appointment === parseInt(key)) {
          output.push(appointmentsObj[key]);
        }
      }
    }
  }
  return output;
}

//gets student and teacher to pass to appointment component
export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  } else {
    const interviewObj = {
      student: interview.student,
    };
    interviewObj.interviewer = state.interviewers[interview.interviewer];
    return interviewObj;
  }
}
