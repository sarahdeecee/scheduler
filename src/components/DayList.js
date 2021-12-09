import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;
  const parsedDays = days.map(day => 
    <DayListItem key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === value}
      setDay={onChange}
    />
  );
  return (
    <ul>{parsedDays}</ul>
  );
};