// src/components/ProjectList.js
import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
    {
      id: 1,
      name: 'This Page',
      longDescription: 'A React app to highlight my projects, blogs, and more.',
      language: 'Javascript',
      lastUpdate: '2021-10-13',
      repoUrl: 'https://github.com/franpandol/franpandol.github.io', // Add the repo URL if this project is in a repository
      demoUrl: 'https://franpandol.github.io', // Add a demo URL if available
      tags: ['React', 'TailwindCSS'],
    },
    {
      id: 2,
      name: 'Automotive Django App',
      longDescription: 'A Django-based application for managing and serving a hypothetical automotive dealership using Django Rest Framework. The app goal is to show how to use some of the most common features of Django and Django Rest Framework, and the latest tools for development, such as Docker, flake8, black, pre-commit, and GitHub Actions. Just like you would do in a real-world project.',
      language: 'Python',
      lastUpdate: '2021-10-13',
      repoUrl: 'https://github.com/franpandol/automotive_django_app',
      demoUrl: '', // Add a demo URL if available
      tags: ['Django', 'Python'],
    },
    {
      id: 3,
      name: 'Chicago Artworks App',
      longDescription: 'A full-stack application that includes a Node.js Express backend and a Firestore database. The backend serves as an API for fetching artist and artwork data from Firestore, while the frontend is a React application that consumes this data and displays it to the user.',
      language: 'Javascript',
      lastUpdate: '2021-10-13',
      repoUrl: 'https://github.com/franpandol/chicago_artworks_app',
      demoUrl: '', // Add a demo URL if available
      tags: ['Javascript', 'Node.js', 'React.js', 'Express.js', 'MongoDB'],
    },
    {
        id: 4,
        name: 'Local Image Server',
        longDescription: 'This is a simple Go-based server that serves images from a local directory. It provides two main API endpoints: one for retrieving a specific image by its filename and another for listing all available images in the directory.',
        language: 'Golang',
        lastUpdate: '2021-10-13',
        repoUrl: 'https://github.com/franpandol/golang_image_lister',
        demoUrl: '', // Add a demo URL if available
        tags: ['Golang', ],
    },
    {
        id: 5,
        name: 'README Enhancer',
        longDescription: 'A Go project that aims to enhance the quality and readability of README files in GitHub repositories. It utilizes the OpenAI GPT-3.5 model to generate improved content for the README files.',
        language: 'Golang',
        lastUpdate: '2021-10-13',
        repoUrl: 'https://github.com/franpandol/readme_enhancer',
        demoUrl: '', // Add a demo URL if available
        tags: ['Golang', ],
    },
    {
        id: 8,
        name: 'Chat with your PDF',
        longDescription: 'This Streamlit application allows you to upload a PDF document, and then ask questions to retrieve relevant information from the document.',
        language: 'Python',
        lastUpdate: '2021-10-13',
        repoUrl: 'https://github.com/franpandol/streamlit_openai_ask_pdf/',
        demoUrl: '', // Add a demo URL if available
        tags: ['Python', 'Streamlit', 'OpenAI'],
    },
    {
        id: 6,
        name: 'OpenAI Pricing API',
        longDescription: 'A Django based app providing a RESTful API to calculate costs based on the usage of OpenAI\'s GPT and image generation models. Useful for saas companies that want to offer OpenAI services to their customers.',
        language: 'Python',
        lastUpdate: '2021-10-13',
        repoUrl: 'https://github.com/franpandol/openai_pricing',
        demoUrl: '', // Add a demo URL if available
        tags: ['Django', 'Python'],
    },
    {
        id: 7,
        name: 'Stock Market API',
        longDescription: 'A Django app that provides a RESTful API for fetching stock market data. This is a simple project that with a topic usually requested by recruiters. We showcase how to present the project in a professional way, including a README file, a requirements file, and a Dockerfile.',
        language: 'Python',
        lastUpdate: '2021-10-13',
        repoUrl: 'https://github.com/franpandol/stock_market_django',
        demoUrl: '', // Add a demo URL if available
        tags: ['Django', 'Python'],
    },
    {
        id: 8,
        name: 'EtherRealm Monarchs: Rule the Ethereum Dynasty',
        longDescription: 'An Ethereum-based game where you strive to be the reigning monarch of the EtherRealm. Strategize and outbid others to claim the throne. This game is written using Solidity.',
        language: 'Solidity',
        lastUpdate: '2021-10-13',
        repoUrl: 'https://github.com/franpandol/ether-realm-monarchs-game',
        demoUrl: '', // Add a demo URL if available
        tags: ['Solidity', 'Ethereum'],
    },
    {
        id: 9,
        name: 'Ethereum Wall Project',
        longDescription: 'An Ethereum-based project that allows users to post messages on the blockchain. This project showcases how to interact with Ethereum smart contracts using web3.js and how to deploy a smart contract to the Ethereum network.',
        language: 'Solidity',
        lastUpdate: '2021-10-13',
        repoUrl: 'https://github.com/franpandol/eth-board',
        demoUrl: '', // Add a demo URL if available
        tags: ['Solidity', 'Javascript', 'Ethereum'],
    },

    
  ];
  

const ProjectList = () => {
      // Group projects by language
  const projectsByLanguage = projects.reduce((acc, project) => {
    const { language } = project;
    if (!acc[language]) {
      acc[language] = [];
    }
    acc[language].push(project);
    return acc;
  }, {});


  return (
   
    <div className="container mx-auto mt-8">
    
      {Object.keys(projectsByLanguage).map((language) => (
        <div key={language}>

          <h2 className="text-xl font-bold mb-4 mt-6">{language} Projects</h2>

            <div className="grid grid-cols-3 gap-4">
                {projectsByLanguage[language].map((project) => (
                <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
      ))}
    </div>
  );
};


export default ProjectList;

