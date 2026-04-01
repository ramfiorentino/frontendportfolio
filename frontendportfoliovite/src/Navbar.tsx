import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
        setContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const contactLinks = (
    <>
      <li><a className="link link-hover" href="https://www.canva.com/design/DAF_Uta0kDA/fymP6Th60dzb6UNSkZxYjA/view?utm_content=DAF_Uta0kDA&utm_campaign=designshare&utm_medium=link&utm_source=editor" target="_blank" rel="noopener noreferrer">CV</a></li>
      <li><a className="link link-hover" href="mailto:mariabf.bcn@gmail.com">Email</a></li>
      <li><a className="link link-hover" href="https://www.linkedin.com/in/ramfiorentino/" target="_blank" rel="noopener noreferrer">Linkedin</a></li>
      <li><a className="link link-hover" href="https://github.com/ramfiorentino" target="_blank" rel="noopener noreferrer">Github</a></li>
    </>
  );

  return (
    <div ref={navRef}>
      <div className="navbar bg-base-100 justify-between md:h-24">

        <div className="navbar-start">
          <Link className="link link-hover" to="/"><h3>RAM FIORENTINO</h3></Link>
        </div>

        {/* Desktop nav */}
        <div className="navbar-end hidden lg:flex items-center gap-2">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/bio">BIO</Link></li>
            <li className="relative">
              <button onClick={() => setContactOpen(o => !o)}>Contact</button>
              {contactOpen && (
                <ul className="absolute top-full right-0 p-2 z-[15] bg-base-100 shadow rounded-box w-36">
                  {contactLinks}
                </ul>
              )}
            </li>
          </ul>
          <button onClick={toggleTheme} className="btn rounded-full btn-sm">
            {theme === 'simply-red' ? 'spicy-tech' : 'simply-red'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden relative">
          <button
            className="btn btn-ghost"
            onClick={() => setMobileOpen(o => !o)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          {mobileOpen && (
            <ul className="menu menu-sm absolute top-full right-0 mt-1 z-[15] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/bio" onClick={() => setMobileOpen(false)}>BIO</Link></li>
              {contactLinks}
              <li>
                <button onClick={toggleTheme} className="btn rounded-full btn-sm mt-2">
                  {theme === 'simply-red' ? 'spicy-tech' : 'simply-red'}
                </button>
              </li>
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default Navbar;
