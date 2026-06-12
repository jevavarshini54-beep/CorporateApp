import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import Calendars from "./Calendars";
import Todo from "./Todo";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendars" element={<Calendars />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
} export default App;