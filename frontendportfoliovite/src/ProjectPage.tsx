import { BrowserRouter as Router, Link, Route, useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import ramStar from "./assets/ramStar.svg"
import React, { useEffect, useState } from 'react';
import { fetchProjectById } from './sanityQueries';
import { urlFor } from './sanityImageUrl';


interface TechStack {
  _id: string;
  title: string;
  icon: string;
}

interface KeyFeature {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
}

interface Project {
  _id: string;
  title: string;
  dateAndLocation: string;
  shortDescription: string;
  livesite: string;
  image: string;
  description: string[];
  techStack: TechStack[];
  techStackText: string;
  keyFeatures: KeyFeature[];
  solutions: string;
}

function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>(); 
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projectId) {
      fetchProjectById(projectId).then((data) => setProject(data));
    }
  }, [projectId]);

  if (!project) {
    return <div>Project not found!</div>;
  }

  console.log('project image fetched:', project.image);

  return (
    <div>
      <Navbar />

      <div className="mt-5 px-2 pb-5 border-b-2 border-red-500 text-right md:px-9 md:flex md:items-center md:justify-between">
      <img className="md:w-1/3 my-8" src={urlFor(project.image).url()} alt="project-image" />
        <div className="md:w-1/3">
          <h2 className="my-2">{project.title}</h2>
          <p>{project.dateAndLocation}</p>
          <p>{project.shortDescription}</p>
          <button className="btn rounded-full items-center mt-5" onClick={() => window.open(project.livesite, '_blank')}>Live Site</button>
        </div>
      </div>

      <div className="collapse bg-base-200 md:py-6 md:pl-9">
        <input type="checkbox" />
        <div className="collapse-title flex py-4 items-center justify-between">
          <h3>Description</h3>
          <img src={ramStar} alt="SVG Graphic" />
        </div>
        <div className="collapse-content">
          <p>{project.description}</p>
        </div>
      </div>

      <div className="collapse bg-base-200 md:py-6 md:px-9">
        <input type="checkbox" />
        <div className="collapse-title flex px-2 py-4 items-center justify-between">
          <img src={ramStar} alt="SVG Graphic" />
          <h3 className="">TechStack</h3>
        </div>
        <div className="collapse-content">
          <div className="flex flex-col items-start gap-4 my-4" id="tech-stack">
            <p>{project.techStackText}</p>
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
      </div>

      <div className="collapse bg-base-200 md:py-6 md:px-9">
        <input type="checkbox" />
        <div className="collapse-title flex px-2 py-4 items-center justify-between">
          <h3 className="">Key Features</h3>
          <img src={ramStar} alt="SVG Graphic" />
        </div>
        <div className="collapse-content">
          <div id="key-features">
            {project.keyFeatures.map((feature, index) => (
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
          <h3 className="">Solutions</h3>
        </div>
        <div className="collapse-content">
          <p>{project.solutions}</p>
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
