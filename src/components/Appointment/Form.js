import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


const Form = function(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null); 
  
  const reset = function() {
    setName("");
    setInterviewer(null);
  }

  const cancel = function() {
    reset();
    props.onCancel();

  } 
  const save = function() {
    props.onSave(name, interviewer);
    
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
        onSubmit={event => event.preventDefault()}
        autoComplete="off"
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList 
        interviewers={props.interviewers} 
        value={interviewer} 
        onChange={setInterviewer} 
        // id={props.id}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={save} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;