import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './ProjectPage'
import Bio from './Bio.tsx'
import Contact from './Contact.tsx'
import App from './App.tsx'
import './Styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<App />} /> {/* Home page */}
        <Route path="/project/:projectId" element={<ProjectPage/>}  /> 
        <Route path="/bio" element={<Bio />} /> {/* Bio page */}
        <Route path="/contact" element={<Contact />} /> {/* Bio page */}
        <Route path="*" element={<App />} /> {/* Catch-all route for unmatched paths */}
      </Routes>
    </Router>
  </React.StrictMode>,
)
