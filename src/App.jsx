import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Blog from "./components/Blog";
import ProjectList from "./components/ProjectList";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "";

const App = () => (
  <Router basename={basename}>
    <div className="min-h-screen bg-surface">
      <div className="mx-auto min-h-screen max-w-doc bg-surface-raised md:my-6 md:border md:border-surface-border md:shadow-page">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
