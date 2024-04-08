// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const activeLinkStyle = 'text-indigo-600 border-b-2 border-indigo-600'; // Tailwind classes for active link
  return (

    <nav className="bg-white border-b border-github-border p-4">
      <div className="container justify-between mx-auto flex">
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `text-lg font-bold text-gray-900 hover:text-gray-600 ${isActive ? activeLinkStyle : ''}`
          }
        >
          About Me
        </NavLink>
        <NavLink 
          to="/projects"
          className={({ isActive }) => 
            `text-lg font-bold text-gray-900 hover:text-gray-600 ${isActive ? activeLinkStyle : ''}`
          }
        >
          Code
        </NavLink>
        <NavLink 
          to="/blogs"
          className={({ isActive }) => 
            `text-lg font-bold text-gray-900 hover:text-gray-600 ${isActive ? activeLinkStyle : ''}`
          }
        >
          Blogs
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
