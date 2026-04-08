import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "./sanityClient";
import Navbar from "./Navbar";
import Footer from "./Footer";
import qrcode from "./assets/qrcode-mockup.png";
import { BrandAsset } from "./components/BrandAsset";

interface Technology {
  title: string;
  icon: string;
  _id: string;
}

interface ProjectMetric {
  value: string;
  label: string;
  highlight?: boolean;
}

interface Project {
  _id: string;
  title: string;
  slug: string;
  dateAndLocation: string;
  industry?: string;
  shortDescription: string;
  livesite: string;
  techStack: Technology[];
  gifUrl?: string;
  metrics?: ProjectMetric[];
}

function App() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [collapsingId, setCollapsingId] = useState<string | null>(null);
  const thumbnailTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const handleCardToggle = (id: string) => {
    const isOpening = openCardId !== id;
    if (thumbnailTimerRef.current) clearTimeout(thumbnailTimerRef.current);
    if (isOpening) {
      setCollapsingId(null);
      setOpenCardId(id);
    } else {
      setCollapsingId(id);
      setOpenCardId(null);
      thumbnailTimerRef.current = setTimeout(() => setCollapsingId(null), 700);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project"] {
        _id,
        title,
        slug,
        dateAndLocation,
        industry,
        shortDescription,
        livesite,
        "techStack": techStack[]->{
          title,
          _id,
          icon
        },
        "gifUrl": gifUrl.asset->url,
        "metrics": metrics
      }`;

      const result = await client.fetch(query);
      setProjectsData(result);
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="hero-div" className="flex justify-end md:justify-between mx-6">
        <div className="flex flex-col hidden  md:flex z-0">
          <p className="text-s w-2/3 mt-8 mb-4">
            Hi! I'm a very curious Frontend Dev, always eager to collaborate
            with creative teams and meaningful businesses. Contact me! Scan or
            click the QR code to shoot me a message ;)
          </p>
          <div id="qr-code" className="w-20">
            <img className="opacity-80" src={qrcode} />{" "}
          </div>
        </div>
        <BrandAsset className="w-60 h-40 scale-125 mt-20 absolute right-8 opacity-60 md:pr-6 md:justify-self-end lg::opacity-90" />
        <div className="flex justify-end my-8 z-10">
          <div className="w-72">
            <h1 className="text-right">Selected</h1>
            <div className="flex justify-end">
              <h1 className="text-right">Works</h1>
              <h4 className="text-right">*</h4>
            </div>
            <h1 className="text-right">2025-26</h1>
          </div>
        </div>
      </div>
      <div className="containeranimationportfolio z-10">
        <div className="horizontalscrollingitems">
          <div className="horizontalscrollingitems__item text-primary-content bg-primary">
            Strategic, meaningful, and impactful work by a frontend developer
            focused on coding effective UIs, facilitating optimized performance
            and mantaining clean code and agile work. Strategic, meaningful, and
            impactful work by a frontend developer focused on coding effective
            UIs, facilitating optimized performance and mantaining clean code
            and agile work.
          </div>

          <div className="horizontalscrollingitems__item text-primary-content bg-primary">
            Strategic, meaningful, and impactful work by a frontend developer
            focused on coding effective UIs, facilitating optimized performance
            and mantaining clean code and agile work. Strategic, meaningful, and
            impactful work by a frontend developer focused on coding effective
            UIs, facilitating optimized performance and mantaining clean code
            and agile work.
          </div>
        </div>
      </div>

      {/* PROJECTS LIST */}
      <div className="border-t border-primary">
        {projectsData.map((project) => {
          const isOpen = openCardId === project._id;
          return (
            <div
              key={project._id}
              className="border-b border-primary last:border-b-0"
            >
              {/* Collapsed header row */}
              <div
                className="flex items-stretch cursor-pointer min-h-[80px] md:min-h-[88px]"
                onClick={() => handleCardToggle(project._id)}
              >
                {/* GIF thumbnail column */}
                <div className={`w-1/5 flex-shrink-0 border-r border-primary overflow-hidden hidden ${!isOpen && collapsingId !== project._id ? "md:block" : ""}`}>
                  {project.gifUrl ? (
                    <img
                      src={project.gifUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-base-200" />
                  )}
                </div>

                {/* Header body */}
                <div className="flex flex-1 items-center justify-between px-4 py-3 gap-2">
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-lg md:text-2xl leading-tight">
                      {project.title}
                    </h3>
                    <span className="text-xs">
                      {project.dateAndLocation}
                    </span>
                    {project.industry && (
                      <span className="text-xs">{project.industry}</span>
                    )}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.techStack?.slice(0, 4).map((tech) => (
                        <span
                          key={tech._id}
                          className="text-xs border border-primary rounded-full px-2 py-0.5"
                        >
                          {tech.title}
                        </span>
                      ))}
                      {project.techStack?.length > 4 && (
                        <span className="text-xs border border-primary rounded-full px-2 py-0.5 opacity-50">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end flex-shrink-0 pt-6">
                    <button
                      className="btn btn-sm rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.livesite, "_blank");
                      }}
                    >
                      Live Site
                    </button>
                    <svg
                      className={`w-6 h-10 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6 9l6 6 6-6H6z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded body */}
              <div
                className="overflow-hidden transition-all duration-700 ease-in-out"
                style={{ maxHeight: isOpen ? "700px" : "0px" }}
              >
                <div className="border-t border-primary">
                  <div className="flex flex-col md:flex-row">
                    {/* Left: GIF hero */}
                    <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-primary">
                      {project.gifUrl ? (
                        <img
                          src={project.gifUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 md:h-full bg-base-200" />
                      )}
                    </div>

                    {/* Right: content */}
                    <div className="flex flex-col flex-1 p-4 md:p-6 gap-4">
                      {/* Metrics grid */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {project.metrics.map((metric, i) => (
                            <div
                              key={i}
                              className={`flex flex-col items-center justify-center border border-primary rounded p-2 text-center ${metric.highlight ? "bg-primary text-primary-content" : ""}`}
                            >
                              <span className="text-xl font-bold">
                                {metric.value}
                              </span>
                              <span className="text-xs">
                                {metric.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="text-sm md:text-base">
                        {project.shortDescription}
                      </p>

                      {/* Full tech stack chips */}
                      <div className="flex flex-wrap gap-1">
                        {project.techStack?.map((tech) => (
                          <span
                            key={tech._id}
                            className="text-xs border border-primary rounded-full px-2 py-0.5"
                          >
                            {tech.title}
                          </span>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-2 mt-auto pt-2">
                        <button className="btn btn-sm rounded-full">
                          <Link
                            to={`/projects/${project.slug}`}
                            onClick={() =>
                              navigate(`/projects/${project.slug}`)
                            }
                          >
                            Full showcase
                          </Link>
                        </button>
                        <button
                          className="btn btn-sm rounded-full"
                          onClick={() =>
                            window.open(project.livesite, "_blank")
                          }
                        >
                          Live Site
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* SPECIAL SECTIONS */}
        <div
          id="section-howIWork"
          className="collapse bg-base-200 md:px-2 md:p-4 w-full py"
        >
          <input type="checkbox" />
          <div
            id="item-title"
            className="collapse-title flex items-center justify-between px-4"
          >
            <div className="flex justify-start">
              <h3 className="self-center text-xl font-semibold h-30 w-28 md:w-48">
                HOW I WORK!
              </h3>
              <div className="text-xs self-center uppercase hidden md:flex ml-4 md:ml-0">
                I explain and showcase my project work in progress: photos,
                project management archive, fun facts and more! HEHE
              </div>
            </div>
            <div className="flex items-center md:hidden md:justify-end">
              <div className="w-24 text-xs uppercase">
                I explain and showcase...
              </div>
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

        <div
          id="section-education"
          className="collapse bg-base-200 md:px-2 md:p-4 w-full"
        >
          <input type="checkbox" />
          <div
            id="item-title"
            className="collapse-title flex items-center justify-between px-4 md:justify-between"
          >
            <div className="flex">
              <h3 className="self-center text-xl font-semibold h-30 w-28 md:w-48">
                EDU-
                <br />
                CATION
              </h3>
              <div className="text-xs self-center uppercase hidden md:flex ml-4 md:ml-0">
                Learning is what i love the most. Check out my last completed
                education and courses!
              </div>
            </div>
            <div className="flex items-center md:hidden md:justify-end">
              <div className="w-24 text-xs uppercase">
                Learning is what i love the most...
              </div>
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

        <div
          id="section-comingUp"
          className="collapse bg-base-200 md:px-2 md:p-4 w-full"
        >
          <input type="checkbox" />
          <div
            id="item-title"
            className="collapse-title flex items-center justify-between px-4 md:justify-between"
          >
            <div className="flex">
              <h3 className="self-center text-xl font-semibold h-30 w-28 md:w-48">
                OH SPICY TECH! PODCAST
              </h3>
              <div className="text-xs self-center uppercase hidden md:flex ml-4 md:ml-0">
                Stories and readings around tech and creativity, by Ram Fiorentino and guests.
              </div>
            </div>
            <div className="flex items-center md:hidden md:justify-end">
              <div className="w-24 text-xs uppercase">
                Stories and readings around tech and creativity, by Ram Fiorentino and guests.
              </div>
            </div>
          </div>

          <div className="collapse-content">
            <div className="md:flex md:justify-between md:hidden">
              <p className="md:w-2/3 my-4">
                Stories and readings around tech and creativity, by Ram Fiorentino and guests.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between">
              <button className="btn rounded-full w-fit my-2">
                <a
                  href="https://www.youtube.com/@ohspicytech"
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
      </div>
      <Footer />
    </div>
  );
}

export default App;
