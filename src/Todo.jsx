import { AnimatePresence, motion } from "framer-motion";
import { IconTrash, IconChecklist } from "@tabler/icons-react";
import './ToDo.css'
import { useState, useEffect } from "react";

function ToDo() {

  const [tasks, setTasks] = useState([
    { id: 1, title: "Submit Q2 report", desc: "Compile data and send to manager by EOD", priority: "high", time: "5:00 PM", status: "Completed" },
    { id: 2, title: "Team standup meeting", desc: "Discuss sprint progress and blockers", priority: "medium", time: "10:00 AM", status: "Not Started" },
    { id: 3, title: "Review pull requests", desc: "Check and approve 3 pending PRs on GitHub", priority: "medium", time: "", status: "In Progress" },
    { id: 4, title: "Update project documentation", desc: "Add new API endpoints to the docs", priority: "low", time: "", status: "Not Started" }
  ]);

  const priorityType = (p) => p === "high" ? "High" : p === "medium" ? "Moderate" : "Low";
  const statusColor = (s) => s === "Completed" ? "rgb(70, 255, 70)" : s === "In Progress" ? "rgb(255, 255, 46)" : "red";
  const [completed, setCompleted] = useState([]);

  const cardVariants = {initial: {opacity: 0, x: -50},
                        animate: {opacity: 1, x:0, transition: {duration: 0.3, type: "spring", stiffness: 200, damping: 27}},
                        exit: {opacity: 0, x: -40, transition: {duration: 0.3}}};

  const containerVariants = {initial: {}, animate: {transition: {staggerChildren: 0.4, delayChildren: 0.4}}};

  const deleteTask = (id) => {
    setTasks(p => p.filter(t => t.id !==id))
  }

  const markDone = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    setTasks(p => p.filter(t => t.id !== id))
    setCompleted(p => [task, ...p])
  };

  const deleteCompleted = (id) => {
    setCompleted(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    const alreadyDone = tasks.filter(t => t.status === "Completed");
    const remaining = tasks.filter(t => t.status !== "Completed");
    if (alreadyDone.length) {
        setTasks(remaining);
        setCompleted(alreadyDone);
    }
  }, []);

  const total = tasks.length + completed.length;
  const compCount = completed.length;
  const inProgCount = tasks.filter(t => t.status === "In Progress").length;
  const notStartCount = tasks.filter(t => t.status === "Not Started").length;

  const comp_percent = total ? Math.round((compCount * 100)/total) : 0;
  const inProg_percent = total ? Math.round((inProgCount / total) * 100) : 0;
  const noStart_percent = total ? Math.round((notStartCount * 100)/total) : 0;

  const r = 27;
  const circumference = 2*Math.PI*r;
  const completed_stroke = (comp_percent*circumference)/100;
  const inProg_stroke = (inProg_percent*circumference)/100;
  const noStart_stroke = (noStart_percent*circumference)/100;

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

        <motion.div variants={containerVariants} initial="initial" animate="animate">
          <AnimatePresence>
            {tasks.map(t => (
              <motion.div key= {t.id} variants={cardVariants} initial="initial" animate="animate" className="task_card">
                <div className="card_top">
                  <div className="dot" style={{backgroundColor: statusColor(t.status)}}></div>
                  <span className="card_title">{t.title}</span>
                  <div className="done_del">
                    <motion.button className="done_btn" onClick={() => markDone(t.id)}
                      whileHover={{scale: 1.09}} whileTap={{scale: 0.9}}><IconChecklist size={30} color="powderblue"></IconChecklist></motion.button>
                    <motion.button className="del_btn" onClick={() => deleteTask(t.id)}
                      whileHover={{scale: 1.09}} whileTap={{scale: 0.9}}><IconTrash size={30} color="powderblue"></IconTrash></motion.button>
                  </div>
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
      <div className="right_panel">
        <div className="stats">
          <p className="task_status">Task Status</p>
          <div className="all_charts">
            <div className="chart_item">
              <div className="ring">
                <svg viewBox="0 0 70 70" width="70" height="70">
                  <circle className="ring_bg" cx="35" cy="35" r={r}></circle>
                  <circle className="ring_fill" cx="35" cy="35" r={r} style={{stroke: "red", strokeDasharray: circumference, strokeDashoffset: circumference - noStart_stroke}}></circle>
                </svg>
                <div className="ring_pct">{noStart_percent}%</div>
              </div>
              <p className="chart_label">Not Started</p>
            </div>
            <div className="chart_item">
              <div className="ring">
                <svg viewBox="0 0 70 70" width="70" height="70">
                  <circle className="ring_bg" cx="35" cy="35" r={r}></circle>
                  <circle className="ring_fill" cx="35" cy="35" r={r} style={{stroke: "rgb(255, 255, 46)", strokeDasharray: circumference, strokeDashoffset: circumference - inProg_stroke}}></circle>
                </svg>
                <div className="ring_pct">{inProg_percent}%</div>
              </div>
              <p className="chart_label">In progress</p>
            </div>
            <div className="chart_item">
              <div className="ring">
                <svg viewBox="0 0 70 70" width="70" height="70">
                  <circle className="ring_bg" cx="35" cy="35" r={r}></circle>
                  <circle className="ring_fill" cx="35" cy="35" r={r} style={{stroke: "rgb(70,255,70)", strokeDasharray: circumference, strokeDashoffset: circumference - completed_stroke}}></circle>
                </svg>
                <div className="ring_pct">{comp_percent}%</div>
              </div>
              <p className="chart_label">Completed</p>
            </div>
          </div>
        </div>
        <div className="completed_panel">
          <p className="completed_title">Completed Tasks</p>
          <motion.div variants={containerVariants} initial="initial" animate="animate"></motion.div>
          <AnimatePresence>
            {completed.length === 0 ? (
              <motion.p className="no_comp" initial={{opacity: 0}} animate={{opacity: 1}}>
                No completed tasks yet
              </motion.p>) : (
                completed.map(t => (
                  <motion.div variants={cardVariants} initial="initial" animate="animate" key={t.id} className="comp_card">
                    <div className="card_top">
                      <div className="dot" style={{backgroundColor: "rgb(70, 255, 70)"}}></div>
                      <span className="card_title">{t.title}</span>
                    <div className="done_del">
                    <motion.button className="del_btn" onClick={() => deleteCompleted(t.id)}
                      whileHover={{scale: 1.09}} whileTap={{scale: 0.9}}><IconTrash size={30} color="powderblue"></IconTrash></motion.button>
                    </div>
                    </div>
                    <div className="desc">{t.desc}</div>
                    <div className="card_bottom">
                      <span><span style={{color: "powderblue"}}>Priority : </span>{priorityType(t.priority)}</span>
                      {t.time && <span><span style={{color: "powderblue"}}>Time : </span>{t.time}</span>}
                    </div>
                  </motion.div>
                ))
              )
            }
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
} export default ToDo;
