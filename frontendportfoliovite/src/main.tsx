import React from 'react'
import ReactDOM from 'react-dom/client'
import { projectsData } from './projectsData'; // Import projects data
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './ProjectPage'
import Bio from './Bio'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<App />} /> {/* Home page */}
        <Route path="/project/:projectId" element={<ProjectPage projects={projectsData} />}  /> 
        <Route path="/bio" element={<Bio />} /> {/* Bio/contact page */}
        <Route path="*" element={<App />} /> {/* Catch-all route for unmatched paths */}
      </Routes>
    </Router>
  </React.StrictMode>,
)
