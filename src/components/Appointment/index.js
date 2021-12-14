import React from "react";
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, id, editInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    transition(SAVING, true);
    if(!name || !interviewer) {
      return;
    }
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
    .then(() => {
      transition(SHOW);
    });
  }
  
  return (
    <article className="appointment">
      <Header time={time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && 
          <Show
            id={id}
            student={interview.student}
            interviewer={interview.interviewer}
            onEdit={editInterview}
            onDelete={cancelInterview}
          />
        }
        {mode === CREATE && 
          <Form interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          />
        }
        {mode === SAVING &&
          <Status message={'Saving...'} />
        }
        {mode === DELETING &&
          <Status message={'Deleting'} />
        }
    </article>
  );
}
