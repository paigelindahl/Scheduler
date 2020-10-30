import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from 'helpers/selectors';
import { getInterview } from 'helpers/selectors';
import { getInterviewersForDay } from 'helpers/selectors';
import axios from 'axios';

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data}))
    })
  }, []);

  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log("id:", id, "interview", appointment);
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      });
    
  }
  
  
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {appointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          console.log('interview', {...appointment.interview});
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewers}
              bookInterview={bookInterview}
            />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
