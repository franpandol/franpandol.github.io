// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Blog from './components/Blog';
import ProjectList from './components/ProjectList';
import './App.css'

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="mt-16">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/blogs" element={<Blog />} />
          {/* Redirect to /about as the home page */}
          <Route path="/" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
