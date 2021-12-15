import React from "react";
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, id, cancelInterview } = props;
  
  // Show Form if an interview exists, show Empty if no interview exists
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

    // Upon selecting edit from Show, transition to Confirm screen
    const edit = () => {
      transition(EDIT);
    }  

  // After editing, transition to Status (Saving) screen and submit info to API
  const save = (name, interviewer) => {
    transition(SAVING);
    
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((error) => {
      transition(ERROR_SAVE, true)
    });
  };

  // Upon selecting delete from Show, transition to Confirm screen
  const onDelete = () => {
    transition(CONFIRM);
  };

  // Upon confirming delete, transition to Status (Deleting) screen,
  // then transition to Empty screen on success or Error screen on failure
  const onConfirm = (id) => {
    transition(DELETING, true);
    cancelInterview(id)
    .then(()=> {
      transition(EMPTY);
    })
    .catch((error) => {
      transition(ERROR_DELETE, true)
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
            onEdit={edit}
            onDelete={onDelete}
          />
        }
        {mode === CREATE && 
          <Form interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          />
        }
        {mode === EDIT &&
          <Form student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
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
        {mode === ERROR_SAVE &&
          <Error message={'Could not edit appointment'} onClose={() => back()}/>
        }
        {mode === ERROR_DELETE &&
          <Error message={'Could not delete appointment'} onClose={() => back()}/>
        }
    </article>
  );
}