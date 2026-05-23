import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setCONTACTOpen] = useState(false);

  return (
    <>
      <div className="navbar justify-between md:h-24">
        <div className="navbar-start">
          <Link className="link link-hover" to="/" onClick={() => setMenuOpen(false)}>
            <h5>ram fiorentino</h5>
          </Link>
        </div>

        {/* Desktop nav — inline links + CONTACT sidebar */}
        <div className="navbar-end hidden lg:flex items-center gap-2">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/bio">about me</Link></li>
          </ul>
          <button onClick={() => setCONTACTOpen(o => !o)} className="link link-hover font-normal text-base px-4">contact</button>
          <button onClick={toggleTheme} className="btn rounded-full">
            {theme === 'spicy-tech' ? 'simply-red' : 'spicy-tech'}
          </button>
        </div>

        {/* Desktop CONTACT full-height sidebar */}
        {contactOpen && (
          <>
            <div className="fixed inset-0 z-[14] bg-transparent" onClick={() => setCONTACTOpen(false)} />
            <div className="fixed top-0 right-0 h-screen z-[15] w-80 bg-base-100 shadow-2xl flex flex-col items-center justify-center px-10 py-8">
              <button className="absolute top-8 right-8 btn btn-ghost btn-sm" onClick={() => setCONTACTOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <nav className="flex flex-col gap-8 items-center">
                <a className="text-xl link link-hover" href="https://www.canva.com/design/DAF_Uta0kDA/fymP6Th60dzb6UNSkZxYjA/view?utm_content=DAF_Uta0kDA&utm_campaign=designshare&utm_medium=link&utm_source=editor" target="_blank" rel="noopener noreferrer">CV</a>
                <a className="text-xl link link-hover" href="mailto:mariabf.bcn@gmail.com">Email</a>
                <a className="text-xl link link-hover" href="https://www.linkedin.com/in/ramfiorentino/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                <a className="text-xl link link-hover" href="https://github.com/ramfiorentino" target="_blank" rel="noopener noreferrer">Github</a>
              </nav>
            </div>
          </>
        )}

        {/* Mobile hamburger */}
        <button className="btn rounded-full lg:hidden" onClick={() => setMenuOpen(o => !o)}>
          MENU
        </button>
      </div>

      {/* Mobile full-screen panel */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[14] bg-black/20" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-screen z-[15] w-full bg-base-100 flex flex-col px-10 py-8">
            <button className="self-end btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col gap-8 mt-12">
              <Link className="text-3xl link link-hover" to="/bio" onClick={() => setMenuOpen(false)}>BIO</Link>
              <a className="text-3xl link link-hover" href="https://www.canva.com/design/DAF_Uta0kDA/fymP6Th60dzb6UNSkZxYjA/view?utm_content=DAF_Uta0kDA&utm_campaign=designshare&utm_medium=link&utm_source=editor" target="_blank" rel="noopener noreferrer">CV</a>
              <a className="text-3xl link link-hover" href="mailto:mariabf.bcn@gmail.com">Email</a>
              <a className="text-3xl link link-hover" href="https://www.linkedin.com/in/ramfiorentino/" target="_blank" rel="noopener noreferrer">Linkedin</a>
              <a className="text-3xl link link-hover" href="https://github.com/ramfiorentino" target="_blank" rel="noopener noreferrer">Github</a>
            </nav>
            <div className="mt-auto">
              <button onClick={toggleTheme} className="btn rounded-full">
                {theme === 'spicy-tech' ? 'simply-red' : 'spicy-tech'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
