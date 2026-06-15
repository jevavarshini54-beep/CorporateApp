import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { useState, useRef } from "react";
import { IconTrash } from "@tabler/icons-react";
import { motion } from "framer-motion";
import './Calendars.css';
import { AnimatePresence } from "framer-motion";

function Calendars() {

  const canvasRef = useRef(null);

  useEffect(() => {
    const Canvas = canvasRef.current;
    const ctx = Canvas.getContext('2d');

    function reSize() {
      Canvas.height = window.innerHeight;
      Canvas.width = window.innerWidth;
    }
    reSize();

    window.addEventListener('resize', reSize);

    const particles = Array.from({length : 100}, () => ({
      x: Math.random()*Canvas.width, y: Math.random()*Canvas.height,
      r: 1.5 + Math.random()*4, dx: ((Math.random())-0.5)*0.5,
      dy: -0.2-((Math.random())*0.5), alpha: 0.2 + Math.random() * 0.5,
      color: Math.random() > 0.5 ? 'powderblue' : 'white'
    }));

    let animation;
    function draw() {
      ctx.clearRect(0, 0, Canvas.width, Canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -p.r) { p.y = Canvas.height + p.r; p.x = Math.random() * Canvas.width; }
        if (p.x < -p.r) p.x = Canvas.width + p.r;
        if (p.x > Canvas.width + p.r) p.x = -p.r;
      });
      animation = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('resize', reSize);
    };
  }, []);

  const [meet, setMeet] = useState({});
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date());
  const [loaded, setLoaded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState("");

  const dateKey = (d) => d.toDateString();

  // To load meetings
  useEffect(() => {
    const result = localStorage.getItem("worksphere-meetings");
    if (result) setMeet(JSON.parse(result));
    setLoaded(true);
  }, []);

  // To save meetings
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("worksphere-meetings", JSON.stringify(meet));
  }, [meet, loaded]);

  const addMeet = () => {
    if (!title.trim() || !time) return;
    const key = dateKey(selectedDate);
    setMeet(prev => ({
      ...prev,
      [key] : [... (prev[key] || []), {title: title, time, id: Date.now()}]
    }));
    setTitle("");
    setTime("");
  };

  useEffect(() => {console.log("Meetings:", meet);}, [meet]);

  const deleteMeet = (key,id) => {
    setMeet( prev => ({
      ...prev,
      [key] : prev[key].filter(m => m.id !==id)
    }));
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const key = dateKey(date);
    const count = meet[key]?.length || 0;
    if (!count) return null;

    return <span className="meeting_dot" />;
  };

  const [showpopup, setShowpopup] = useState(false);
  const popupVariants = {
    initial: {y: 100, opacity: 0, scale: 0.9},
    animate: {y:0, opacity: 1, scale:1, transition: {type: "spring", stiffness: 300, damping: 20}},
    exit: {y: 100, opaity: 0, scale: 0.9, transition: {duration: 0.4}}
  };

  return (
    <motion.div className="calendar_page" initial={{ opacity: 0, y: 39 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
      <canvas ref={canvasRef} className="canvas_calendar"></canvas>
      <div>
        <Calendar onChange={setDate} value={date} onClickDay={(d) => {setSelectedDate(d); setShowpopup(true);}}
        showNeighboringMonth={false} formatShortWeekday={(locale,date) => (
          ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][date.getDay()]
        )} tileContent={tileContent}/>
        <div style={{color: "grey", marginTop: 16, fontSize: 29}}>Click a date to view and save your meetings</div>
      </div>
      <div className="today">
        <AnimatePresence>
          {showpopup && selectedDate && (
            <motion.div className= "popup" variants={popupVariants} initial="initial" animate="animate" exit="exit">
              <div className="top">

                <div className="display">
                  <p>Meetings for</p>
                  <p>{selectedDate.toDateString()}</p>
                </div>

                <motion.div className="close_btn" onClick={() => setShowpopup(false)}
                  whileHover={{ scale: 1.2}} whileTap={{scale: 1}} transition={{type: "spring", stiffness: 20, damping: 1000}}>X</motion.div>
              </div>

              <div className="meet_list">
                <AnimatePresence>
                  {(meet[dateKey(selectedDate)] || []).length ===0 ? (
                    <motion.p className="no_meetings" initial={{opacity: 0}} animate= {{opacity: 1}}>No meetings yet - add one below</motion.p>
                  ) : (
                    [...(meet[dateKey(selectedDate)] || [])].sort((a,b) => a.time.localeCompare(b.time)).map(m => { return(<motion.div key={m.id} className="cards">
                      <div className="meeting_cards">
                        <p className="card_title">Meet : {m.title}</p>
                        <p className="card_time">Time : {m.time}</p>
                      </div>
                      <motion.button className="del_btn" onClick={() => deleteMeet(dateKey(selectedDate),m.id)}>
                        <IconTrash size={30} className="trash_icon" />
                      </motion.button>

                    </motion.div>)})
                  )}
                </AnimatePresence>

                <div className="add_all">
                  <input className="meeting_title" placeholder="Meeting Title" value={title} onChange={e => {setTitle(e.target.value)}}></input>
                  <input className="meeting_time" type="time" value={time} onChange={e => {setTime(e.target.value)}}></input>
                  <motion.button className="add_btn" onClick={addMeet} whileTap={{scale: 0.9, type: "spring", stiffness: 100, damping: 30}}>Add meet</motion.button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} export default Calendars;