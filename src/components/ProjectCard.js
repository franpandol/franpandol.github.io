import React from 'react';

const ProjectCard = ({ project }) => {
  return (

    <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
      <h3 className="text-lg text-blue-600 font-semibold">{project.name}</h3>
      <p className="text-gray-700 mt-2">{project.longDescription}</p>
      <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">{project.language}</span>
      </div>
      <div className="flex mt-4">
        <a href={project.repoUrl} className="text-blue-600 hover:underline mr-4" target="_blank" rel="noopener noreferrer">Repository</a>
        {project.demoUrl && <a href={project.demoUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Live Demo</a>}
      </div>
      <div className="flex flex-wrap mt-4">
        {project.tags && project.tags.map(tag => (
          <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded-full mr-2">{tag}</span>
        ))}
        
      </div>
    </div>
  );
}

export default ProjectCard;
