import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';

export default function Form(props) {
  const [form, setForm] = useState({
    input: '',
    student: '',
    interviewer: null
  });
  const { student, interviewers, interviewer, onSave, onCancel } = props;
  const handleInput = (event) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        input: event.target.value
      }
    });
  }
  const setStudent = event => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        student: event.target.value
      }
    });
  }
  const setInterviewer = event => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        interviewer: event.target.value
      }
    });
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
            value={form.input}
            onChange={handleInput}
            onSubmit={setStudent}
          />
        </form>
        <InterviewerList 
          interviewers={interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
          value={form.interviewer}
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