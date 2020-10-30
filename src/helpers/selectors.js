// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//       interviewers: [1, 2]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//       interviewers: [1]
//     },
//   ],
//   appointments: {
//     1: { id: 1, time: "12pm", interview: null },
//     2: { id: 2, time: "1pm", interview: null },
//     3: {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 },
//     },
//     4: { id: 4, time: "3pm", interview: null },
//     5: {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 },
//     },
//   },
//   interviewers: {
//     1: {
//       id: 1,
//       name: "Sylvia Palmer",
//       avatar: "https://i.imgur.com/LpaY82x.png",
//     },
//     2: {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png",
//     }
//   }
// };

export function getInterviewersForDay(state, day) {
  let output = [];
  const filteredDays = state.days.filter(dayObj => dayObj.name === day);
  if (filteredDays) {
    for (let day of filteredDays) {
      const interviewers = day.interviewers;
      for (let interviewer of interviewers) {
        output.push(state.interviewers[interviewer]);
      }
    }
  
    }
  return output;
  
};


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



