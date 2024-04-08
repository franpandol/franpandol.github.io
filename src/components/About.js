import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto mt-8">
    
      <h2 className="text-xl font-bold mb-4">About Me</h2>
      <p className="mb-2">I'm Francisco Pandol, a professional software engineer with extensive experience across a variety of technologies and industries. My career is marked by a passion for developing scalable and efficient software solutions that enhance user experiences and drive business success.</p>
      <p className="mb-2">Throughout my career, I have led teams, pioneered development projects, and delivered comprehensive backend solutions, always focusing on writing clean, efficient, and maintainable code.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Key Skills</h3>
      <ul className="list-disc list-inside">
        <li>Python & Django Development</li>
        <li>JavaScript & React</li>
        <li>API Design and Integration</li>
        <li>Performance Optimization</li>
        <li>Cloud Services (AWS, Azure)</li>
        <li>Mobile Application Profiling</li>
        <li>Agile Methodologies & Scrum</li>
      </ul>

      <div className="mt-4">
        <a href="mailto:pandol.francisco@gmail.com" className="text-blue-500 hover:underline">pandol.francisco@gmail.com</a>
        <span className="mx-2">|</span>
        <a href="https://www.linkedin.com/in/franciscopandol/en/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span className="mx-2">|</span>
        <a href="https://github.com/franpandol" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>

  );
}

export default About;
