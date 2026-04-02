import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { fetchProjectById, fetchAllProjectSlugs } from './sanityQueries';
import { QRCodeSVG } from 'qrcode.react';

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

interface ProjectSection {
  title: string;
  body?: string;
  bullets?: string[];
}

interface ProjectMetric {
  value: string;
  label: string;
  highlight?: boolean;
  isProjected?: boolean;
  source?: string;
}

interface Project {
  _id: string;
  title: string;
  slug: string;
  dateAndLocation: string;
  shortDescription: string;
  livesite: string;
  image: string;
  description: string[];
  techStack: TechStack[];
  techStackText: string;
  keyFeatures: KeyFeature[];
  solutions: string;
  gifUrl?: string;
  heroGifUrl?: string;
  metrics?: ProjectMetric[];
  role?: string;
  githubUrl?: string;
  sections?: ProjectSection[];
  retrospective?: string;
}

interface ProjectNav {
  title: string;
  slug: string;
}

function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectNav[]>([]);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchProjectById(slug).then((data) => {
        setProject(data);
        setOpenSection('The brief');
      });
    }
    fetchAllProjectSlugs().then(setAllProjects);
  }, [slug]);

  if (!project) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-64 text-primary text-sm">Loading…</div>
        <Footer />
      </div>
    );
  }

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  // Fallback sections if none are populated in Sanity yet
  const effectiveSections: ProjectSection[] =
    project.sections && project.sections.length > 0
      ? project.sections
      : [
          {
            title: 'The brief',
            body: `${project.title}'s brief is on its way here!`,
          },
          {
            title: 'The problem',
            body: `${project.title}'s problem statement is on its way here!`,
          },
          {
            title: 'My approach',
            body: `${project.title}'s approach is on its way here!`,
          },
          {
            title: 'Technical highlights',
            body: `${project.title}'s technical highlights are on its way here!`,
          },
        ];

  const gifSrc = project.heroGifUrl || project.gifUrl;

  /* ── Shared sub-elements ─────────────────────────────────── */

  const GifPlaceholder = () => (
    <div className="flex flex-col items-center gap-2">
      <div className="w-[80px] h-[58px] border-2 border-primary rounded flex items-center justify-center">
        <div className="w-0 h-0 ml-1 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[17px] border-l-primary" />
      </div>
      <span className="text-[9px] text-primary opacity-55 tracking-[0.07em] uppercase">
        Hero GIF — 10–20s loop
      </span>
    </div>
  );

  const SectionContent = ({ section }: { section: ProjectSection }) =>
    section.body ? (
      <p className="text-xs text-base-content/70 leading-relaxed">{section.body}</p>
    ) : (
      <ul className="flex flex-col gap-1.5 mt-1">
        {section.bullets?.map((b, i) => (
          <li key={i} className="flex gap-2 text-[11px] text-base-content/70 leading-relaxed">
            <span className="text-primary shrink-0">→</span>
            {b}
          </li>
        ))}
      </ul>
    );

  const MetricGrid = ({ valSize }: { valSize: string }) => (
    <div className="grid grid-cols-2 gap-px bg-primary border border-primary">
      {project.metrics?.slice(0, 4).map((m, i) => (
        <div key={i} className="bg-base-100 p-[10px]">
          <div className={`font-medium text-primary leading-none ${valSize}`}>{m.value}</div>
          <div className="text-[9px] text-primary opacity-60 mt-0.5 leading-tight">{m.label}</div>
          {m.isProjected && (
            <div className="text-[8px] text-primary opacity-45 italic">{m.source}</div>
          )}
        </div>
      ))}
    </div>
  );

  const PrevNextNav = () => (
    <div className="flex border-t border-primary">
      {prevProject ? (
        <Link
          to={`/projects/${prevProject.slug}`}
          className="flex-1 px-5 py-3.5 text-xs text-primary border-r border-primary"
        >
          <span className="block text-[8px] opacity-50 tracking-[0.07em] uppercase mb-0.5">
            ← Previous project
          </span>
          {prevProject.title}
        </Link>
      ) : (
        <div className="flex-1 border-r border-primary" />
      )}
      {nextProject ? (
        <Link
          to={`/projects/${nextProject.slug}`}
          className="flex-1 px-5 py-3.5 text-xs text-primary text-right"
        >
          <span className="block text-[8px] opacity-50 tracking-[0.07em] uppercase mb-0.5">
            Next project →
          </span>
          {nextProject.title}
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );

  return (
    <div>
      <Navbar />

      {/* ════════════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on md+)
      ════════════════════════════════════════════════════ */}
      <div className="md:hidden">

        {/* Hero row: QR col (72px) + title col */}
        <div className="flex border-b border-primary">
          <div className="w-[72px] shrink-0 border-r border-primary bg-base-200 flex flex-col items-center justify-center gap-1.5 py-3">
            <QRCodeSVG value={project.livesite} size={44} level="L" />
            <span className="text-[8px] text-primary opacity-60 tracking-wider uppercase">Scan</span>
          </div>
          <div className="flex-1 px-3.5 py-3 flex flex-col justify-between">
            <Link to="/" className="text-[9px] text-primary opacity-60 flex items-center gap-1 mb-2">
              ← Works
            </Link>
            <div>
              <h2 className="text-[26px] font-medium text-primary text-right leading-none">
                {project.title}
              </h2>
              <p className="text-[9px] text-primary opacity-55 text-right mt-1.5">
                {project.dateAndLocation}
                {project.role ? ` · ${project.role}` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Hero GIF */}
        <div className="h-40 bg-base-200 border-b border-primary flex items-center justify-center">
          {gifSrc ? (
            <img
              src={gifSrc}
              loading="lazy"
              alt={project.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <GifPlaceholder />
          )}
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="border-b border-primary">
            <MetricGrid valSize="text-[17px]" />
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex gap-2 px-3.5 py-2.5 border-b border-primary">
          <a
            href={project.githubUrl || '#'}
            target={project.githubUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`flex-1 border border-primary rounded-full py-2 text-xs text-primary text-center ${!project.githubUrl ? 'opacity-30 pointer-events-none' : ''}`}
          >
            GitHub repo
          </a>
          <a
            href={project.livesite}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-primary text-primary-content rounded-full py-2 text-xs text-center"
          >
            Live site
          </a>
        </div>

        {/* Tech stack — always visible */}
        <div className="px-3.5 py-2.5 border-b border-primary">
          <p className="text-[9px] text-primary opacity-55 tracking-[0.07em] uppercase mb-1.5">
            Tech stack
          </p>
          <div className="flex flex-wrap gap-1">
            {project.techStack?.map((t) => (
              <span
                key={t._id}
                className="text-[9px] text-primary border border-primary rounded-full px-2 py-0.5"
              >
                {t.title}
              </span>
            ))}
          </div>
        </div>

        {/* Accordion sections */}
        {effectiveSections.map((section) => {
          const isOpen = openSection === section.title;
          return (
            <div key={section.title} className="border-b border-primary">
              <button
                className="flex items-center justify-between w-full px-3.5 py-2.5 text-left"
                onClick={() => setOpenSection(isOpen ? null : section.title)}
              >
                <span className="text-[13px] font-medium text-primary">{section.title}</span>
                <span
                  className={`w-5 h-5 border border-primary rounded-full flex items-center justify-center text-base text-primary shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div className="px-3.5 pb-3">
                  <SectionContent section={section} />
                </div>
              )}
            </div>
          );
        })}

        {/* Retrospective — always visible */}
        <div className="px-3.5 py-3 border-b border-primary">
          <p className="text-[9px] text-primary opacity-55 tracking-[0.07em] uppercase mb-2">
            What I'd do differently
          </p>
          <blockquote className="border-l-2 border-primary pl-2.5 text-xs italic text-base-content/70 leading-relaxed">
            {project.retrospective || `${project.title}'s retrospective is on its way here!`}
          </blockquote>
        </div>

        {/* Prev / Next */}
        <PrevNextNav />
      </div>

      {/* ════════════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden on mobile)
      ════════════════════════════════════════════════════ */}
      <div className="hidden md:block">

        {/* Page header */}
        <div className="flex items-end justify-between gap-4 px-6 py-5 border-b border-primary">
          <div>
            <h1 className="text-[42px] font-medium text-primary leading-none">{project.title}</h1>
            <p className="text-[10px] text-primary opacity-60 mt-1">
              {project.dateAndLocation}
              {project.role ? ` · ${project.role}` : ''}
            </p>
          </div>
          <div className="flex gap-2 items-end shrink-0">
            <a
              href={project.githubUrl || '#'}
              target={project.githubUrl ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`border border-primary rounded-full px-4 py-[7px] text-xs text-primary ${!project.githubUrl ? 'opacity-30 pointer-events-none' : ''}`}
            >
              GitHub repo
            </a>
            <a
              href={project.livesite}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-content rounded-full px-4 py-[7px] text-xs"
            >
              Live site
            </a>
          </div>
        </div>

        {/* Two-column body */}
        <div className="flex">

          {/* Main (left) */}
          <div className="flex-1 min-w-0 border-r border-primary">

            {/* Hero GIF */}
            <div className="h-64 bg-base-200 border-b border-primary flex items-center justify-center">
              {gifSrc ? (
                <img
                  src={gifSrc}
                  loading="lazy"
                  alt={project.title}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <GifPlaceholder />
              )}
            </div>

            {/* Sections — all visible inline on desktop */}
            {effectiveSections.map((section) => (
              <div key={section.title} className="px-5 py-4 border-b border-primary">
                <p className="text-[9px] text-primary opacity-55 tracking-[0.09em] uppercase mb-2">
                  {section.title}
                </p>
                <SectionContent section={section} />
              </div>
            ))}

            {/* Retrospective */}
            <div className="px-5 py-4 border-b border-primary">
              <p className="text-[9px] text-primary opacity-55 tracking-[0.09em] uppercase mb-2">
                What I'd do differently
              </p>
              <blockquote className="border-l-2 border-primary pl-3 py-1.5 text-xs italic text-base-content/70 opacity-85 leading-relaxed">
                {project.retrospective || `${project.title}'s retrospective is on its way here!`}
              </blockquote>
            </div>

            {/* Prev / Next */}
            <PrevNextNav />
          </div>

          {/* Sidebar (right) — sticky */}
          <div className="w-[260px] shrink-0 sticky top-0 max-h-screen overflow-y-auto">
            <div className="p-4 flex flex-col gap-[18px]">

              {/* Impact metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <p className="text-[9px] text-primary opacity-55 tracking-[0.08em] uppercase mb-2">
                    Impact metrics
                  </p>
                  <MetricGrid valSize="text-[20px]" />
                </div>
              )}

              {/* Tech stack */}
              <div>
                <p className="text-[9px] text-primary opacity-55 tracking-[0.08em] uppercase mb-2">
                  Tech stack
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.techStack?.map((t) => (
                    <span
                      key={t._id}
                      className="text-[10px] text-primary border border-primary rounded-full px-[9px] py-0.5"
                    >
                      {t.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress dots */}
              {allProjects.length > 0 && (
                <div>
                  <p className="text-[9px] text-primary opacity-55 tracking-[0.08em] uppercase mb-2">
                    Portfolio
                  </p>
                  <div className="flex gap-1 mb-1">
                    {allProjects.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 w-[18px] rounded-sm border border-primary ${
                          i === currentIndex ? 'bg-primary' : 'bg-base-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[9px] text-primary opacity-50">
                    {currentIndex + 1} of {allProjects.length} projects
                  </p>
                </div>
              )}

              {/* QR code */}
              <div>
                <p className="text-[9px] text-primary opacity-55 tracking-[0.08em] uppercase mb-2">
                  Scan to visit
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-[52px] h-[52px] border border-primary rounded bg-base-200 flex items-center justify-center shrink-0 p-1">
                    <QRCodeSVG value={project.livesite} size={40} level="L" />
                  </div>
                  <p className="text-[9px] text-primary opacity-60 leading-relaxed">
                    Live site
                    <br />
                    {project.livesite.replace(/^https?:\/\//, '')}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProjectPage;
