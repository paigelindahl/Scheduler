

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  } else {
    const interviewObj = {
      student: interview.student
    };
    interviewObj.interviewer = state.interviewers[interview.interviewer];
    return interviewObj;
  }

}


export function getAppointmentsForDay(state, day) {
  let output = [];
  const filteredDays = state.days.filter(dayObj => dayObj.name === day);
  for (let day of filteredDays) {
    const appointmentsArr = day.appointments;
    for (let appointment of appointmentsArr) {
      const appointmentsObj = state.appointments;
      for (let key in appointmentsObj) {
        if(appointment === parseInt(key)) {
          output.push(appointmentsObj[key])
        }
      }
  }
  
}
return output;
};

