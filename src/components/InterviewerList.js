import React from "react";
import classNames from "classnames";
import { action } from "@storybook/addon-actions/dist/preview";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer, selected } = props;
  const parsedInterviewers = interviewers.map(oneInterviewer => 
    <InterviewerListItem key={oneInterviewer.id}
      name={oneInterviewer.name}
      avatar={oneInterviewer.avatar}
      selected={selected}
      setInterviewer={() => action("setInterviewer")(oneInterviewer.id)}
    />
  );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className='interviewers__list' onClick={setInterviewer}>{parsedInterviewers}</ul>
    </section>
  );
};