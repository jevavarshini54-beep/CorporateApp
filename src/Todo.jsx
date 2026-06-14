import { animate, AnimatePresence, delay, motion, stagger } from "framer-motion";
import './ToDo.css'
import { useState } from "react";

function ToDo() {

  const [tasks, setTasks] = useState([
    { id: 1, title: "Submit Q2 report", desc: "Compile data and send to manager by EOD", priority: "high", time: "5:00 PM" },
    { id: 2, title: "Team standup meeting", desc: "Discuss sprint progress and blockers", priority: "medium", time: "10:00 AM" },
    { id: 3, title: "Review pull requests", desc: "Check and approve 3 pending PRs on GitHub", priority: "medium", time: "" },
    { id: 4, title: "Update project documentation", desc: "Add new API endpoints to the docs", priority: "low", time: "" },
    { id: 5, title: "Submit Q2 report", desc: "Compile data and send to manager by EOD", priority: "high", time: "5:00 PM" },
    { id: 6, title: "Team standup meeting", desc: "Discuss sprint progress and blockers", priority: "medium", time: "10:00 AM" },
    { id: 7, title: "Review pull requests", desc: "Check and approve 3 pending PRs on GitHub", priority: "medium", time: "" },
    { id: 8, title: "Update project documentation", desc: "Add new API endpoints to the docs", priority: "low", time: "" }
  ]);

  const priorityType = (p) => p === "high" ? "High" : p === "medium" ? "Moderate" : "Low";
  const priorityColor = (p) => p === "high" ? "rgb(70, 255, 70)" : p === "medium" ? "rgb(255, 255, 46)" : "red";

  const cardvariants = {initial: {opacity: 0, x: -50},
                        animate: {opacity: 1, x:0, transition: {duration: 0.3, type: "spring", stiffness: 200, damping: 27}},
                        exit: {opacity: 0, x: -40, transition: {duration: 0.3}}};

  const containervariants = {initial: {}, animate: {transition: {staggerChildren: 0.4, delayChildren: 0.4}}};

  return (
    <motion.div className="todo_page" initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, ease: "easeOut"}}>
      <div className="left_panel">
        <div className="panel_header">
          <div>
            <div className="panel_title">To-Do</div>
            <div className="panel_day">•Today</div>
          </div>
          <motion.button className="add_task_btn" whileHover={{scale: 1.07}}>+ Add Task</motion.button>
        </div>

        <motion.div variants={containervariants} initial="initial" animate="animate">
          <AnimatePresence>
            {tasks.map(t => (
              <motion.div key= {t.id} variants={cardvariants} initial="initial" animate="animate" className="task_card">
                <div className="card_top">
                  <div className="dot" style={{backgroundColor: priorityColor(t.priority)}}></div>
                  <span className="card_title">{t.title}</span>
                </div>
                <div className="desc">{t.desc}</div>
                <div className="card_bottom">
                  <span><span style={{color: "powderblue"}}>Priority : </span>{priorityType(t.priority)}</span>
                  {t.time && <span><span style={{color: "powderblue"}}>Time : </span>{t.time}</span>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="right_panel"></div>
    </motion.div>
  );
} export default ToDo;
