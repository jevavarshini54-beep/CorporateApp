import React, { useState } from "react";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./Landing";
import NotFound from "./NotFound";
import Calendars from "./Calendars";
import Todo from "./Todo";

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/calendars" element={<Calendars />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
} export default App;