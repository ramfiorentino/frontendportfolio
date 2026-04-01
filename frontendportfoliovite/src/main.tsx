import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './ProjectPage'
import Bio from './Bio'
import App from './App.tsx'
import { ThemeProvider } from './ThemeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
    <Router>
      <Routes>
      <Route path="/" element={<App />} /> {/* Home page */}
        <Route path="/projects/:slug" element={<ProjectPage />}  /> 
        <Route path="/bio" element={<Bio />} /> {/* Bio/contact page */}
        <Route path="*" element={<App />} /> {/* Catch-all route for unmatched paths */}
      </Routes>
    </Router>
    </ThemeProvider>
  </React.StrictMode>,
)
