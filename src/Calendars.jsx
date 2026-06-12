import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import './Calendars.css';

function Calendars() {

  const [meet, setMeet] = useState({});
  const [date, setDate] = useState(new Date());
  const [loaded, setLoaded] = useState(false);

  // To load meetings
  useEffect(() =>{
    const load = async() => {
      try{
        const result = await window.Storage.get("worksphereMeetings",true);
        if (result?.value) setMeet (JSON.parse(result.value));
      }

      catch{}
    };
    load();
  }, []);

  // To save meetings
  useEffect(() => {
    if (!loaded) return;

    const save = async() => {
      try{
        await window.Storage.set("worksphere-meetings", JSON.stringify(meet), true);
      }

      catch (e) {}
    }
    save();
  }, [meet, loaded]);

  return (
    <div className="calendar_page">
      <div>
        <Calendar onChange={setDate} value={date} showNeighboringMonth={false} formatShortWeekday={(locale,date) => (
          ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][date.getDay()]
        )}/>
      </div>
      <div className="today">
      </div>
    </div>
  );
} export default Calendars;