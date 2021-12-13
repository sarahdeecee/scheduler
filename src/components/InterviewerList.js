import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  const parsedInterviewers = interviewers.map(oneInterviewer => 
    <InterviewerListItem key={oneInterviewer.id}
      name={oneInterviewer.name}
      avatar={oneInterviewer.avatar}
      selected={oneInterviewer.id === value}
      onChange={(e) => onChange((form) => {
        return {
          ...form,
          interviewer: oneInterviewer.id
        }
      })}
    />
  );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className='interviewers__list'>{parsedInterviewers}</ul>
    </section>
  );
};