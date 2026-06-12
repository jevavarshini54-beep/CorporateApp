import React from "react";
import { motion } from "framer-motion";
import './NotFound.css'

function NotFound() {

  return (
    <motion.div className="page_404">
        <motion.div className="error_404">404</motion.div>
        <motion.div className="no_page">Page not found</motion.div>
    </motion.div>
  );
} export default NotFound;