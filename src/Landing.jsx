import React from "react";
import {motion} from "framer-motion";
import "./Landing.css";

function Landing({onselect}) {

    const itemVariants = {initial: {opacity: 0, y:20}, 
                          animate: {y:0, opacity: 1,
                          transition: {duration: 0.5}}
                         };
    const landingVariants = {initial: {}, 
                          animate: {transition: {staggerChildren: 0.5, delayChildren: 0.5}}
                         };

    const buttonHoverEffects = {    initial: {opacity: 0, x:100},
                                    animate: {opacity: 1, x:0, transition: {duration: 0.6}},
                                    hover: {scale: 1.1, y: -7, transition: {type: "spring", duration: 0.8, damping: 15, stiffness: 300}},
                                    tap: {scale: 0.7, y: 0, transition: {type: "spring", stiffness: 500, damping: 25 }}
    };

    const btnContainer = {
                            animate: {transition: {delayChildren: 0.5, staggerChildren: 0.5}}
    };

    return(
        <div className="landing_pg">
            <motion.div className="left_container" variants={landingVariants} initial= "initial" animate="animate">
                <motion.h1 variants={itemVariants}>WorkSphere</motion.h1>
                <motion.h2 variants={itemVariants}>Work smarter, together.</motion.h2>
                <motion.h3 variants={itemVariants}>Track projects, deadlines, and progress effortlessly.</motion.h3>
            </motion.div>

            <div className="right_container"></div>
            <motion.div className="bottom_container" variants={btnContainer}>
                <motion.button variants={buttonHoverEffects} initial="initial" animate="animate" whileHover="hover" whileTap="tap" onClick={() => onselect('dashboard')} className="tab_buttons">Dashboard</motion.button>
                <motion.button variants={buttonHoverEffects} initial="initial" animate="animate" whileHover="hover" whileTap="tap" onClick={() => onselect('calendar')} className="tab_buttons">Calendar</motion.button>
                <motion.button variants={buttonHoverEffects} initial="initial" animate="animate" whileHover="hover" whileTap="tap" onClick={() => onselect('todos')} className="tab_buttons">To Do</motion.button>
            </motion.div>
        </div>
    );
} export default Landing;