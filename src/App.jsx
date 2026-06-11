import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import Calendar from "./Calendar";
import Todo from "./Todo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page renders immediately at the root path "/" */}
        <Route path="/" element={<Landing />} />
        
        {/* Respective feature page endpoints */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
} export default App;