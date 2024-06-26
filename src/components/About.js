import React, { useState } from 'react';
import { usePostHog } from 'posthog-js/react';
import { MdContentCopy } from 'react-icons/md'; // Import the copy icon

const About = () => {
    const posthog = usePostHog();
    const [copySuccess, setCopySuccess] = useState('');

    const handleDownloadClick = (format) => {
        posthog.capture('download_cv', { format });
    };

    const handleContactClick = () => {
        posthog.capture('contact_me_clicked');
    };

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText('pandol.francisco@gmail.com').then(() => {
            setCopySuccess('Email copied!');
            setTimeout(() => setCopySuccess(''), 2000); // Remove the success message after 2 seconds
        }, (err) => {
            setCopySuccess('Failed to copy!');
        });
    };

  return (
    <div className="container mx-auto mt-8">
    
      <h2 className="text-xl font-bold mb-4">About Me</h2>
      <p className="mb-2">I'm Francisco Pandol, a professional software engineer with extensive experience across a variety of technologies and industries. My career is marked by a passion for developing scalable and efficient software solutions that enhance user experiences and drive business success.</p>
      <p className="mb-2">Throughout my career, I have led teams, pioneered development projects, and delivered comprehensive backend solutions, always focusing on writing clean, efficient, and maintainable code.</p>

    {/* CV Download Links */}
    <div className="flex mt-4">
        <a href="/cv_markdown_en_Francisco_Pandol.md" download className="text-blue-500 hover:underline mr-4"
            onClick={() => handleDownloadClick('markdown')}>
            Download CV (Markdown)
        </a>
        <a href="/CV_en_Francisco_Pandol.pdf" download className="text-blue-500 hover:underline"
            onClick={() => handleDownloadClick('pdf')}>
            Download CV (PDF)
        </a>
    </div>
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
      <h3 className="text-xl font-semibold mt-4 mb-2">Interested in working together? Contact me!</h3>

      <div className="mt-4 flex items-center">
            <a href="mailto:pandol.francisco@gmail.com" className="text-blue-500 hover:underline" onClick={handleContactClick}>
                pandol.francisco@gmail.com
            </a>
            <button onClick={copyToClipboard} className="ml-4 bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 flex items-center">
                <MdContentCopy className="text-lg" /> {/* Icon displayed here */}
            </button>
            {copySuccess && <span className="ml-4 text-green-500">{copySuccess}</span>}
            <span className="mx-2">|</span>
        <a href="https://www.linkedin.com/in/franciscopandol/en/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span className="mx-2">|</span>
        <a href="https://github.com/franpandol" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>

    </div>

  );
}

export default About;
