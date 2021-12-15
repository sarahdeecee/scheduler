import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  const parsedInterviewers = interviewers.map(interviewer => 
    <InterviewerListItem key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      onChange={(e) => onChange(interviewer.id)}
    />
  );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className='interviewers__list'>{parsedInterviewers}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};