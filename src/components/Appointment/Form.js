import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';

export default function Form(props) {
  const [form, setForm] = useState({
    student: props.student || '',
    interviewer: props.interviewer || null
  })
  const reset = () => {
    setForm({
      student: '',
      interviewer: null
    });
  };
  const cancel = () => {
    props.onCancel();
    reset();
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={form.student}
            onChange={(e) => setForm({...form, student: e.target.value})}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setForm}
          value={form.interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.onSave(form.student, form.interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}
