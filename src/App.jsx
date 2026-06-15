import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./Landing";
import NotFound from "./NotFound";
import Calendars from "./Calendars";
import ToDo from "./ToDo";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/calendars" element={<Calendars />} />
        <Route path="/todos" element={<ToDo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
} export default App;