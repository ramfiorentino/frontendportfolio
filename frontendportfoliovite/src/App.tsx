import { Router,
  Link,
  Route,
  useNavigate,
} from "react-router-dom";
import { projectsData } from "./projectsData"; // Import projects data
import Navbar from "./Navbar";
import Footer from "./Footer";
import qrcode from "./assets/qrcode-mockup.png"

function App() {
  const navigate = useNavigate(); // Get navigate function

  return (
    <div>
      <Navbar />

      <div className="flex justify-end md:justify-between md:mx-2">
        <div className="flex flex-col hidden ml-4 md:flex">
        <p className="text-xs w-2/3 mb-10 mt-8">Hi! I'm a very curious Frontend Dev available from May 2023, always looking to collaborate with creative teams. Let’s talk!</p>
        <div className="w-20"> <img className="" src={qrcode} /> </div>
        </div>
        <div className="flex justify-end my-8 mx-3">
          <div className="w-72">
            <h1 className="text-right">Selected</h1>
            <div className="flex justify-end">
              <h1 className="text-right">Works</h1>
              <h4 className="text-right">(5)</h4>
            </div>
            <h1 className="text-right">2023-24</h1>
          </div>
        </div>
      </div>

      <div className="containeranimationportfolio">
        <div className="horizontalscrollingitems">
          <div className="horizontalscrollingitems__item text-white bg-red-500">
          Strategic, meaningful, and impactful work by a frontend developer focused on coding effective UIs, facilitating optimized performance and mantaining clean code and agile work. Strategic, meaningful, and impactful work by a frontend developer focused on coding effective UIs, facilitating optimized performance and mantaining clean code and agile work.

          </div>

          <div className="horizontalscrollingitems__item text-white bg-red-500">
          Strategic, meaningful, and impactful work by a frontend developer focused on coding effective UIs, facilitating optimized performance and mantaining clean code and agile work. Strategic, meaningful, and impactful work by a frontend developer focused on coding effective UIs, facilitating optimized performance and mantaining clean code and agile work.

          </div>
        </div>
      </div>

      
      <ul>
        
        {/* Iterate through projectsData and display titles */}
        {projectsData.map((project) => (
          <li key={project.id}>
            <div className="collapse bg-base-200 md:px-2 md:py-6">
              <input type="checkbox" />
              

              {/* Project list item layout */}
              <div className="collapse-title flex py-4 items-center justify-between px-4 md:justify-between">
                <div className="flex">
                <h3 className="w-28 self-center md:w-48" >{project.title}</h3>
                <div className="w-24 text-xs self-center hidden md:flex md:ml-2 md:w-32"> {project.dateAndLocation} </div>
                </div>
                <div className="flex items-center md:hidden md:justify-end">
                  <div className="w-24 text-xs"> {project.dateAndLocation} </div>
                  <div className="btn rounded-full w-fit ml-4">Click ☺</div>
                </div>
                <div className="btn rounded-full w-fit ml-4 hidden md:flex">Click ☺</div>
              </div>              

              <div className="collapse-content">
                
                <div className="md:flex md:justify-between">
                <p className="md:w-2/3 md:pt-10">{project.shortDescription}</p>

                <div className="flex my-4">
                  {project.techStack.map((tech, index) => (
                    <div key={index}> 
                      <div id="singleTechIcon" className="flex flex-col items-center mr-2">
                        <div dangerouslySetInnerHTML={{ __html: tech.icon }} />
                        <span className="text-xs">{tech.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between">
                <button className="btn rounded-full w-fit my-2"><Link
                  to={`/project/${project.id}`}
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  Full project showcase
                </Link>
                </button>
                <button className="btn rounded-full w-fit my-2">Live Site</button>
                </div>

                
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Footer />
    </div>
  );
}

export default App;
