import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import './Calendars.css';

function Calendars() {
  const [date, setDate] = useState(new Date());
  return (
    <div className="calendar_page">
      <div>
        <Calendar onChange={setDate} value={date} showNeighboringMonth={false} formatShortWeekday={(locale,date) => (
          ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][date.getDay()]
        )}/>
      </div>
      <div className="today">
        <button onclick= {addMeeting}>Add Meeting</button>
      </div>
    </div>
  );
} export default Calendars;