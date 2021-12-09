import React from 'react';

export default function Form(props) {

  const { student, interviewers, interviewer, onSave, onCancel } = props;
  const handleInput = (event) => {
    setInput({value: event.target.value});
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={input}
            onChange={handleInput}
          />
        </form>
        <InterviewerList 
          interviewers={interviewers}
          interviewer={interviewer}
          onChange={}
          value={}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}