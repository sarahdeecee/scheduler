import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { day, days, setDay } = props;
  const parsedDays = days.map(today => 
    <DayListItem key={today.id}
      name={today.name}
      spots={today.spots}
      selected={today.name === day}
      setDay={setDay}
    />
  );
  return (
    <ul>{parsedDays}</ul>
  );
};