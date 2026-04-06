import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './ProjectPage'
import Bio from './Bio.tsx'
import Contact from './Contact.tsx'
import App from './App.tsx'
import { ThemeProvider } from './ThemeContext'
import { ThemeAwareBackground } from './components/AnimatedBackground/ThemeAwareBackground'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeAwareBackground />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} /> {/* Home page */}
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/bio" element={<Bio />} /> {/* Bio/contact page */}
            <Route path="*" element={<App />} /> {/* Catch-all route for unmatched paths */}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  </React.StrictMode>,
)
