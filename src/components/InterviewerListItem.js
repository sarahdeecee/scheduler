import { action } from "@storybook/addon-actions/dist/preview";
import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, onChange, id } = props;
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected
  });

  return (
    <li className={interviewerClass} onClick={onChange}>
      <img
        className='interviewers__item-image'
        id={id}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}
