import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function Navbar() {
  // Explicitly define the types for the refs
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define the correct event type and ensure the event target is a Node
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      toggleRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !toggleRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="navbar bg-base-100 justify-between md:h-24 px-6">
        <div className="navbar-start">
          <Link className="link link-hover" to="/">
            <h3>RAM FIORENTINO</h3>
          </Link>
        </div>

        <div className="navbar-end hidden lg:flex z-20">
          <ul className="menu menu-horizontal px-1" ref={menuRef}>
            <li>
              <Link to="/bio">Bio</Link>
            </li>
            <li id="desktop-menu-toggle">
              <details>
                <summary>Contact</summary>
                <ul className="p-2 z-[1] bg-white">
                  <li>
                    <a
                      className="link link-hover"
                      href="https://garrulous-track-baf.notion.site/Ram-Fiorentino-CV-585c9ee46aae4904913b80a40e13008d"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CV
                    </a>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <a
                      className="link link-hover"
                      href="https://www.linkedin.com/in/ramfiorentino/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Linkedin
                    </a>
                  </li>
                  <li>
                    <a
                      className="link link-hover"
                      href="https://github.com/ramfiorentino"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div
          id="mobile-menu-toggle"
          className="dropdown dropdown-end z-20"
          ref={toggleRef}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {isMenuOpen && (
            <ul
              id="menu"
              ref={menuRef}
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
            >
              <li>
                <Link to="/bio">BIO</Link>
              </li>
              <li>
                <a
                  className="link link-hover"
                  href="https://garrulous-track-baf.notion.site/Ram-Fiorentino-CV-585c9ee46aae4904913b80a40e13008d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CV
                </a>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <a
                  className="link link-hover"
                  href="https://www.linkedin.com/in/ramfiorentino/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </a>
              </li>
              <li>
                <a
                  className="link link-hover"
                  href="https://github.com/ramfiorentino"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
