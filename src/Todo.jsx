import { AnimatePresence, motion } from "framer-motion";
import { IconTrash, IconChecklist } from "@tabler/icons-react";
import './ToDo.css'
import { useState, useEffect, useRef } from "react";

function ToDo() {
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
  

  const [tasks, setTasks] = useState([
    { id: 1, title: "Team standup meeting", desc: "Discuss sprint progress and blockers", priority: "medium", time: "10:00 AM", status: "Not Started" },
    { id: 2, title: "Review pull requests", desc: "Check and approve 3 pending PRs on GitHub", priority: "medium", time: "", status: "In Progress" },
    { id: 3, title: "Update project documentation", desc: "Add new API endpoints to the docs", priority: "low", time: "", status: "Not Started" }
  ]);

  const priorityType = (p) => p === "high" ? "High" : p === "medium" ? "Moderate" : "Low";
  const statusColor = (s) => s === "Completed" ? "rgb(70, 255, 70)" : s === "In Progress" ? "rgb(255, 255, 46)" : "red";
  const [completed, setCompleted] = useState([{id: 1, title: "Submit Q2 report", desc: "Compile data and send to manager by EOD", priority: "high", time: "5:00 PM", status: "Completed"}]);

  const cardVariants = {initial: {opacity: 0, x: -50},
                        animate: {opacity: 1, x:0, transition: {duration: 0.3, type: "spring", stiffness: 200, damping: 27}},
                        exit: {opacity: 0, x: -40, transition: {duration: 0.3}}};

  const containerVariants = {initial: {}, animate: {transition: {staggerChildren: 0.4, delayChildren: 0.4}}};

  const reassignIds = (arr) => arr.map((t, i) => ({ ...t, id: i + 1 }));

  const deleteTask = (id) => {
    setTasks(prev => reassignIds(prev.filter(t => t.id !== id)))
  };

  const markDone = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    setTasks(prev => reassignIds(prev.filter(t => t.id !== id)));
    setCompleted(p => [task, ...p])
  };

  const deleteCompleted = (id) => {
    setCompleted(prev => reassignIds(prev.filter(t => t.id !== id)));
  };

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const savedTasks = localStorage.getItem("worksphere-tasks");
    const savedCompleted = localStorage.getItem("worksphere-completed");

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("worksphere-tasks", JSON.stringify(tasks));
  }, [tasks, loaded]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("worksphere-completed", JSON.stringify(completed));
  }, [completed, loaded]);

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

  // To add a new task
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("moderate");
  const [newStatus, setNewStatus] = useState("Completed");
  const [newTime, setNewTime] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const addTask = () => {
    if (!newTitle.trim()) return;
    const new_task = { id: tasks.length + 1, title: newTitle, desc: newDesc, priority: newPriority, time: newTime, status: newStatus };

    if (newStatus === "Completed") {
      setCompleted(prev => reassignIds([new_task, ...prev]));
    }

    else{
      setTasks(prev => reassignIds([new_task, ...prev]));
    }

    setNewTitle("");
    setNewDesc("");
    setNewTime("");
    setNewPriority("medium");
    setNewStatus("Not Started");
    setShowForm(false);
  };

  return (
    <motion.div className="todo_page" initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, ease: "easeOut"}}>
      <canvas ref={canvasRef} className="canvas_todo"></canvas>
      <div className="left_panel">
        <div className="panel_header">
          <div>
            <div className="panel_title">To-Do</div>
            <div className="panel_day">•Today</div>
          </div>
          <motion.button className="add_task_btn" whileHover={{scale: 1.07}} onClick={() => setShowForm(true)}>+ Add Task</motion.button>
        </div>
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{opacity: 0, y: -20, scale: 0.95}} animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -20, scale: 0.95}} transition={{duration: 0.7, type: "spring", stiffness: 300, damping: 44}} className="form">
              <label className="labels">Task Title</label>
              <input className="form_input" type="input" placeholder="Task Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></input>
              <label className="labels">Description</label>
              <input className="form_input" type="input" placeholder="Description of your task" value={newDesc} onChange={(e) => setNewDesc(e.target.value)}></input>
              <label className="labels">Time</label>
              <input className="form_input" type="input" placeholder="(eg: 4: 40 PM)" value={newTime} onChange={(e) => setNewTime(e.target.value)}></input>
              <label className="labels">Priority</label>
              <select className="form_select" value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
                <option value="high">High</option>
                <option value="medium">Moderate</option>
                <option value="low">Low</option>
              </select>
              <label className="labels">Status</label>
              <select className="form_select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="confirm_cancel">
                <motion.button onClick={() => {addTask(); setShowForm(false)}} className="form_btn" whileHover={{scale: 1.1, y: 10, x: 10}} whileTap={{scale: 0.9, y: 15, x: 10}}>Confirm</motion.button>
                <motion.button onClick={() => setShowForm(false)} className="form_btn" whileHover={{scale: 1.1, y: 10, x: 10}} whileTap={{scale: 0.9, y: 15, x: 10}}>Cancel</motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={containerVariants} initial="initial" animate="animate">
          <AnimatePresence>
            {tasks.map(t => (
              <motion.div key= {`completed-${t.id}`} variants={cardVariants} initial="initial" animate="animate" className="task_card">
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
                  <motion.circle className="ring_fill" cx="35" cy="35" r={r} style={{stroke: "red", strokeWidth: 8}} strokeDasharray={circumference} initial={{strokeDashoffset: circumference}} animate={{strokeDashoffset: circumference - noStart_stroke}}></motion.circle>
                </svg>
                <div className="ring_pct">{noStart_percent}%</div>
              </div>
              <p className="chart_label">Not Started</p>
            </div>
            <div className="chart_item">
              <div className="ring">
                <svg viewBox="0 0 70 70" width="70" height="70">
                  <circle className="ring_bg" cx="35" cy="35" r={r}></circle>
                  <motion.circle className="ring_fill" cx="35" cy="35" r={r} style={{stroke: "rgb(255, 255, 46)", strokeWidth: 8}} strokeDasharray={circumference} initial={{strokeDashoffset: circumference}} animate={{strokeDashoffset: circumference - inProg_stroke}} transition={{duration: 1, ease: "easeOut"}}></motion.circle>
                </svg>
                <div className="ring_pct">{inProg_percent}%</div>
              </div>
              <p className="chart_label">In progress</p>
            </div>
            <div className="chart_item">
              <div className="ring">
                <svg viewBox="0 0 70 70" width="70" height="70">
                  <circle className="ring_bg" cx="35" cy="35" r={r}></circle>
                  <motion.circle className="ring_fill" cx="35" cy="35" r={r} style={{stroke: "rgb(70,255,70)", strokeWidth: 8}} strokeDasharray={circumference} initial={{strokeDashoffset: circumference}} animate={{strokeDashoffset: circumference - completed_stroke}} transition={{duration: 1, ease: "easeOut"}}></motion.circle>
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
                completed.map(c => (
                  <motion.div variants={cardVariants} initial="initial" animate="animate" key={`comp-${c.id}`} className="comp_card">
                    <div className="card_top">
                      <div className="dot" style={{backgroundColor: "rgb(70, 255, 70)"}}></div>
                      <span className="card_title">{c.title}</span>
                    <div className="done_del">
                    <motion.button className="del_btn" onClick={() => deleteCompleted(t.id)}
                      whileHover={{scale: 1.09}} whileTap={{scale: 0.9}}><IconTrash size={30} color="powderblue"></IconTrash></motion.button>
                    </div>
                    </div>
                    <div className="desc">{c.desc}</div>
                    <div className="card_bottom">
                      <span><span style={{color: "powderblue"}}>Priority : </span>{priorityType(c.priority)}</span>
                      {c.time && <span><span style={{color: "powderblue"}}>Time : </span>{c.time}</span>}
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
