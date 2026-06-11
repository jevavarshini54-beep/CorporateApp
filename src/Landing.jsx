import React from "react";
import { easeOut, motion, scale, spring } from "framer-motion";
import "./Landing.css";

function Landing({onselect}) {

    const itemVariants = {initial: {opacity: 0, y:20}, 
                          animate: {y:0, opacity: 1,
                          transition: {duration: 2, ease: "easeOut"}} };

    const buttonHoverEffects = {
                                    hover: {scale: 1.1, y: -7, backgroundColor: "black", color: "white", transition: {type: "spring", duration: 0.8, damping: 15, stiffness: 300}},
                                    tap: {scale: 0.7, y: 0, transition: {type: "spring", stiffness: 500, damping: 25 }}
    };

    return(
        <div className="landing_pg">
            <div className="left_container">
                <h1>WorkSphere</h1>
                <h2>The speed of a system is entirely dictated by the visibility of its active node pipelines.</h2>
                <h3>A centralized workspace architecture engineered to synchronize daily agendas, deliverables checklists, and performance updates across departments.</h3>
            </div>

            <div className="right_container"></div>
            <div className="bottom_container">
                <motion.button variants={buttonHoverEffects} whileHover="hover" whileTap="tap" onClick={() => onselect('dashboard')} className="tab_buttons">Dashboard</motion.button>
                <motion.button variants={buttonHoverEffects} whileHover="hover" whileTap="tap" onClick={() => onselect('calendar')} className="tab_buttons">Calendar</motion.button>
                <motion.button variants={buttonHoverEffects} whileHover="hover" whileTap="tap" onClick={() => onselect('todos')} className="tab_buttons">To Do</motion.button>
            </div>
        </div>
    );
} export default Landing;