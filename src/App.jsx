import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DocumentMeta from "./components/DocumentMeta";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import SkillsPage from "./pages/SkillsPage";
import ContactPage from "./pages/ContactPage";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "";

const App = () => (
  <Router basename={basename}>
    <div className="min-h-screen w-full bg-surface">
      <DocumentMeta />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/work" element={<Navigate to="/projects" replace />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  </Router>
);

export default App;
