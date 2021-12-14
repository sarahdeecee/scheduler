import React from "react";
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, id, editInterview, toConfirmation, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    if(!name || !interviewer) {
      return;
    }
    transition(SAVING, true);
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
    .then(() => {
      transition(SHOW);
    });
  };
  const onDelete = () => {
    toConfirmation();
    transition(CONFIRM);
  };

  const onConfirm = (id) => {
    transition(DELETING, true);
    cancelInterview(id)
    .then(()=> {
      transition(EMPTY);
    });
  };
  
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
            onDelete={onDelete}
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
        {mode === CONFIRM &&
          <Confirm id={id} message="Delete the appointment?"
            onConfirm={onConfirm} onCancel={() => back()} />
        }
        {mode === DELETING &&
          <Status message={'Deleting'} />
        }
    </article>
  );
}