import { BrowserRouter as Router, Link, Route, useParams } from 'react-router-dom';
import { Project } from './projectsData';
import Navbar from "./Navbar";
import Footer from "./Footer";
import ramStar from "./assets/ramStar.svg"

function ProjectPage(props: { projects: Project[] }) {
  
  const { projects } = props;
  const { projectId } = useParams<{ projectId: string }>(); // Ensure projectId is always a string
  const selectedProject = projects.find(project => project.id === parseInt(projectId || "", 10)); // Use default value if projectId is undefined

  if (!selectedProject) {
    return <div>Project not found!</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="mt-5 px-2 pb-5 border-b-2 border-red-500 text-right md:px-9 md:flex md:items-center md:justify-between">
        <img className="md:w-1/3" src={selectedProject.image} alt="project-image"></img>
        <div className="md:w-1/3">
          <h2>{selectedProject.title}</h2>
          <p>{selectedProject.dateAndLocation}</p>
          <p>{selectedProject.shortDescription}</p>
          <button className="btn rounded-full items-center mt-5" onClick={() => window.open(selectedProject.livesite, '_blank')}>Live Site</button>
        </div>
      </div>

      <div className="collapse bg-base-200 md:py-6 md:pl-9">
        <input type="checkbox" />
        <div className="collapse-title flex py-4 items-center justify-between">
          <h3>Description</h3>
          <img src={ramStar} alt="SVG Graphic" />
        </div>
        <div className="collapse-content">
        {selectedProject.description.map((desc, index) => {
          if (index % 2 === 0) {
            // Even indices render as <h4>
            return <button key={index} className="btn rounded-full my-5 h-auto">{desc}</button>;
          } else {
            // Odd indices render as <p>
            return <p key={index}>{desc}</p>;
          }
        })}
        </div>
      </div>


      <div className="collapse bg-base-200 md:py-6 md:px-9">
        <input type="checkbox" />
        <div className="collapse-title flex px-2 py-4 items-center justify-between">
          <img src={ramStar} alt="SVG Graphic" />
          <h3 className="" >TechStack</h3>
        </div>
        <div className="collapse-content">
        <p>{selectedProject.techStackText}</p>
        <div className="flex my-4" id="tech-stack">
          {selectedProject.techStack.map((tech, index) => (
            <div key={index}>
              <div
                id="singleTechIcon"
                className="flex flex-col items-center mr-2"
              >
                <div dangerouslySetInnerHTML={{ __html: tech.icon }} />
                <span className="text-xs">{tech.title}</span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

    
      <div className="collapse bg-base-200 md:py-6 md:px-9">
        <input type="checkbox" />
        <div className="collapse-title flex px-2 py-4 items-center justify-between">
          <h3 className="" >Key Features</h3>
          <img src={ramStar} alt="SVG Graphic" />
        </div>

        <div className="collapse-content">
        <div id="key-features">
          {selectedProject.keyFeatures.map((feature, index) => (
            <div key={index} className="key-feature mx-2 my-5 md:flex md:flex-col md:items-center">
              <p>{feature.description}</p>
              <div className="mt-5 border-2 border-red-500 md:w-2/3">
              <img className="w-full" src={feature.imageUrl} alt={`Key Feature ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      <div className="collapse bg-base-200 md:py-6 md:px-9">
        <input type="checkbox" />
        <div className="collapse-title flex px-2 py-4 items-center justify-between">
          <img src={ramStar} alt="SVG Graphic" />
          <h3 className="" >Solutions</h3>
        </div>

        <div className="collapse-content">
        <p>{selectedProject.solutions}</p>
        </div>
      </div>

      <div className="flex place-content-center">
      <button className="btn rounded-full my-10">
        <Link to="/">Back to projects list</Link>
      </button>
      </div>

      <Footer />
    </div>
  );
}

export default ProjectPage;