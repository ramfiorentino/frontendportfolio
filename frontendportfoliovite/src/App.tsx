import { Link, useNavigate } from "react-router-dom";
import { projectsData } from "./projectsData";
import Navbar from "./Navbar";
import Footer from "./Footer";
import qrcode from "./assets/qrcode-mockup.png";
import brandasset from "./assets/brand-asset.png";

function App() {
  const navigate = useNavigate(); // Get navigate function

  return (
    <div>
      <Navbar />
      <div id="hero-div" className="flex justify-end md:justify-between mx-6">
        <div className="flex flex-col hidden  md:flex z-10">
          <p className="text-xs w-2/3 mt-8 mb-4">
            Hi! I'm a very curious Frontend Dev available from May 2023, always
            looking to collaborate with creative teams. Let’s talk!
          </p>
          <div id="qr-code" className="w-20">
            <img className="opacity-80" src={qrcode} />{" "}
          </div>
        </div>
        <img
          id="brandasset"
          src={brandasset}
          alt=""
          className="w-60 h-40 scale-125 mt-20 absolute right-8 opacity-60 md:pr-6 md:justify-self-end lg::opacity-90"
        />
        <div className="flex justify-end my-8 z-10">
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
      <div className="containeranimationportfolio z-10">
        <div className="horizontalscrollingitems">
          <div className="horizontalscrollingitems__item text-white bg-red-500">
            Strategic, meaningful, and impactful work by a frontend developer
            focused on coding effective UIs, facilitating optimized performance
            and mantaining clean code and agile work. Strategic, meaningful, and
            impactful work by a frontend developer focused on coding effective
            UIs, facilitating optimized performance and mantaining clean code
            and agile work.
          </div>

          <div className="horizontalscrollingitems__item text-white bg-red-500">
            Strategic, meaningful, and impactful work by a frontend developer
            focused on coding effective UIs, facilitating optimized performance
            and mantaining clean code and agile work. Strategic, meaningful, and
            impactful work by a frontend developer focused on coding effective
            UIs, facilitating optimized performance and mantaining clean code
            and agile work.
          </div>
        </div>
      </div>

      <ul>
        {/* Iterate through projectsData and display titles */}
        {projectsData.map((project) => (
          <li key={project.id}>
            <div
              id="projectList-item"
              className="collapse bg-base-200 md:px-2 md:py-6 w-screen"
            >
              <input type="checkbox" />

              {/* Project list item layout */}
              <div
                id="item-title"
                className="collapse-title flex py-4 items-center justify-between px-4 md:justify-between"
              >
                <div className="flex">
                  <h3 className="w-28 self-center md:w-48 text-2xl">{project.title}</h3>
                  <div className="w-24 text-xs self-center hidden md:flex md:ml-2 md:w-32">
                    {" "}
                    {project.dateAndLocation}{" "}
                  </div>
                </div>
                <div className="flex items-center md:hidden md:justify-end">
                  <div className="w-24 text-xs">
                    {" "}
                    {project.dateAndLocation}{" "}
                  </div>
                  <div className="btn rounded-full w-fit ml-4">Click ☺</div>
                </div>
                <div className="btn rounded-full w-fit ml-4 hidden md:flex">
                  Click ☺
                </div>
              </div>

              <div className="collapse-content">
                <div className="md:flex md:justify-between">
                  <p className="md:w-2/3 md:pt-10">
                    {project.shortDescription}
                  </p>

                  <div className="flex my-4">
                    {project.techStack.map((tech, index) => (
                      <div key={index}>
                        <div
                          id="singleTechIcon"
                          className="flex flex-col items-center mr-2"
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: tech.icon }}
                          />
                          <span className="text-xs">{tech.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between">
                  <button className="btn rounded-full w-fit my-2">
                    <Link
                      to={`/project/${project.id}`}
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      Full project showcase
                    </Link>
                  </button>
                  <button
                    className="btn rounded-full w-fit my-2"
                    onClick={() => window.open(project.livesite, "_blank")}
                  >
                    Live Site
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}

        {/* SPECIAL SECTIONS */}
        <div id="section-howIWork" className="collapse bg-base-200 md:px-2 md:py-6 w-screen">
          <input type="checkbox" />
          <div
            id="item-title"
            className="collapse-title flex py-4 items-center justify-between px-4"
          >
            <div className="flex justify-start">
              <h3 className="self-center text-xl font-semibold w-28 md:w-48">HOW I WORK!</h3>
              <div className="text-xs self-center uppercase hidden md:flex ml-4 md:ml-0">
                I explain and showcase my project work in progress: photos,
                project management archive, fun facts and more! HEHE
              </div>
            </div>
            <div className="flex items-center md:hidden md:justify-end">
              <div className="w-24 text-xs uppercase">
                I explain and showcase...
              </div>
              <div className="btn rounded-full w-fit ml-4">Click ☺</div>
            </div>
            <div className="btn rounded-full w-fit ml-4 hidden md:flex">
              Click ☺
            </div>
          </div>

          <div className="collapse-content">
            <div className="md:flex md:justify-between md:hidden">
              <p className="md:w-2/3 my-4">
                I explain and showcase my project work in progress: photos,
                project management archive, fun facts and more!
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between">
              <button className="btn rounded-full w-fit my-2">
                <a
                  href="https://garrulous-track-baf.notion.site/Ram-Fiorentino-How-I-Work-e47a6c39d73344ab989b8bea7adb3fe0?pvs=4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                Take me there!
                </a>
              </button>
            </div>
          </div>
        </div>

        <div id="section-education" className="collapse bg-base-200 md:px-2 md:py-6 w-screen">
          <input type="checkbox" />
          <div
            id="item-title"
            className="collapse-title flex py-4 items-center justify-between px-4 md:justify-between"
          >

            <div className="flex">
              <h3 className="self-center text-xl font-semibold w-28 md:w-48">EDU-<br />CATION</h3>
              <div className="text-xs self-center uppercase hidden md:flex ml-4 md:ml-0">
                Learning is what i love the most. Check out my last completed
                education and courses!
              </div>
            </div>
            <div className="flex items-center md:hidden md:justify-end">
              <div className="w-24 text-xs uppercase">
                Learning is what i love the most...
              </div>
              <div className="btn rounded-full w-fit ml-4">Click ☺</div>
            </div>
            <div className="btn rounded-full w-fit ml-4 hidden md:flex">
              Click ☺
            </div>
          </div>

          <div className="collapse-content">
            <div className="md:flex md:justify-between md:hidden">
              <p className="md:w-2/3 my-4">
                Learning is what i love the most. Check out my last completed
                education and courses!
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between">
              <button className="btn rounded-full w-fit my-2">
              <a
                  href="https://garrulous-track-baf.notion.site/Ram-Fiorentino-Education-59bf732e27b74101b255d8425b0c0d94?pvs=4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                Take me there!
                </a>
              </button>
            </div>
          </div>
        </div>

        <div id="section-comingUp" className="collapse bg-base-200 md:px-2 md:py-6 w-screen">
          <input type="checkbox" />
          <div
            id="item-title"
            className="collapse-title flex py-4 items-center justify-between px-4 md:justify-between"
          >

            <div className="flex">
              <h3 className="self-center text-xl font-semibold w-28 md:w-48">COMING UP!</h3>
              <div className="text-xs self-center uppercase hidden md:flex ml-4 md:ml-0">
                Want to see whats down the line? Projects, research, meetups and
                more!
              </div>
            </div>
            <div className="flex items-center md:hidden md:justify-end">
              <div className="w-24 text-xs uppercase">
                Want to see whats down the line?
              </div>
              <div className="btn rounded-full w-fit ml-4">Click ☺</div>
            </div>
            <div className="btn rounded-full w-fit ml-4 hidden md:flex">
              Click ☺
            </div>
          </div>

          <div className="collapse-content">
            <div className="md:flex md:justify-between md:hidden">
              <p className="md:w-2/3 my-4">
                Want to see whats down the line? Projects, research, meetups and
                more!
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between">
              <button className="btn rounded-full w-fit my-2">
              <a
                  href="https://garrulous-track-baf.notion.site/Ram-Fiorentino-Coming-up-c09c4eeb0c9541b9813fbe4cb3ccd899?pvs=4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                Take me there!
                </a>
              </button>
            </div>
          </div>
        </div>
      </ul>
      <Footer />
    </div>
  );
}

export default App;
