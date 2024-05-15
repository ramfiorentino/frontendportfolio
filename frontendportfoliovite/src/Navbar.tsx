import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100 justify-between md:h-24">
  <div className="navbar-start">
  <Link className="link link-hover" to="/"><h3>RAM FIORENTINO</h3></Link>
  </div>
  
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/bio">BIO</Link></li>
      <li>
        <details>
          <summary>Contact</summary>
          <ul className="p-2 z-[1] bg-white">
          <li><a
                    className="link link-hover"
                    href="https://www.canva.com/design/DAF_Uta0kDA/fymP6Th60dzb6UNSkZxYjA/view?utm_content=DAF_Uta0kDA&utm_campaign=designshare&utm_medium=link&utm_source=editor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CV
                  </a></li>
        <li><a
                    className="link link-hover"
                    href="mailto:ramfiorentino@proton.me"
                  >
                    Email
                  </a></li>
        <li><a
                    className="link link-hover"
                    href="https://www.linkedin.com/in/ramfiorentino/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </a></li>
        <li><a
                    className="link link-hover"
                    href="https://github.com/ramfiorentino"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
  <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
        <li><Link to="/bio">BIO</Link></li>
        <li><a
                    className="link link-hover"
                    href="https://www.canva.com/design/DAF_Uta0kDA/fymP6Th60dzb6UNSkZxYjA/view?utm_content=DAF_Uta0kDA&utm_campaign=designshare&utm_medium=link&utm_source=editor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CV
                  </a></li>
        <li><a
                    className="link link-hover"
                    href="mailto:ramfiorentino@proton.me"
                  >
                    Email
                  </a></li>
        <li><a
                    className="link link-hover"
                    href="https://www.linkedin.com/in/ramfiorentino/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </a></li>
        <li><a
                    className="link link-hover"
                    href="https://github.com/ramfiorentino"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a></li>
      </ul>
    </div>

</div>



    </div>
  );
}

export default Navbar;
