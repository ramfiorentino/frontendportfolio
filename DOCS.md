# Portfolio — Developer Documentation

> A frontend portfolio site built with React, TypeScript, Tailwind CSS, DaisyUI, and Sanity CMS. Deployed on Vercel.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Quick Start](#2-quick-start)
3. [Repository Structure](#3-repository-structure)
4. [Tech Stack](#4-tech-stack)
5. [User Journey & Page Map](#5-user-journey--page-map)
6. [Homepage — Project List](#6-homepage--project-list)
7. [Project Page](#7-project-page)
8. [Bio Page](#8-bio-page)
9. [Navbar & Contact](#9-navbar--contact)
10. [Theming](#10-theming)
11. [Content Management — Sanity CMS](#11-content-management--sanity-cms)
12. [Routing](#12-routing)
13. [Deployment](#13-deployment)
14. [Common Tasks](#14-common-tasks)

---

## 1. Overview

This is a single-developer portfolio site. All content (projects, bio, tech stack) is managed through a headless CMS (Sanity Studio) — no content is hardcoded in the frontend. The frontend fetches data at runtime via GROQ queries.

There are two independently deployable apps in the same repository:

| App | Folder | Purpose |
|-----|--------|---------|
| Frontend (React) | `frontendportfoliovite/` | The public-facing portfolio site |
| CMS (Sanity Studio) | `frontendportfoliosanity/` | The content editor for the site owner |

---

## 2. Quick Start

### Prerequisites

- Node.js 18+
- A Sanity account (free tier works)

### Run the frontend locally

```bash
cd frontendportfoliovite
npm install
npm run dev
```

The site will be available at `http://localhost:5173`.

### Run Sanity Studio locally

```bash
cd frontendportfoliosanity
npm install
npx sanity dev
```

Studio will be available at `http://localhost:3333`.

### Environment / credentials

No `.env` file is needed. The Sanity project ID and dataset are hardcoded in `frontendportfoliovite/src/sanityClient.ts`:

```ts
projectId: '7dm3a4l2'
dataset:   'production'
```

These values are public and safe to commit — Sanity CORS controls access.

---

## 3. Repository Structure

```
frontendportfolio/
├── frontendportfoliovite/          # React frontend
│   ├── src/
│   │   ├── main.tsx                # Entry point — Router + ThemeProvider setup
│   │   ├── index.css               # Global styles, DaisyUI overrides, animations
│   │   ├── App.tsx                 # Homepage — project list
│   │   ├── ProjectPage.tsx         # Individual project showcase page
│   │   ├── Bio.tsx                 # Bio / about page
│   │   ├── Contact.tsx             # Contact component
│   │   ├── Navbar.tsx              # Shared navigation bar
│   │   ├── Footer.tsx              # Shared footer
│   │   ├── ThemeContext.tsx        # Theme toggle context (simply-red / spicy-tech)
│   │   ├── sanityClient.ts         # Sanity client configuration
│   │   ├── sanityImageUrl.ts       # Sanity image URL builder helper
│   │   ├── sanityQueries.ts        # GROQ queries for project data
│   │   └── assets/                 # Static images (brand asset, QR code mockup)
│   ├── tailwind.config.js          # Tailwind + DaisyUI theme configuration
│   ├── vite.config.ts              # Vite build config
│   ├── vercel.json                 # Vercel SPA rewrite rules
│   └── package.json
│
├── frontendportfoliosanity/        # Sanity Studio CMS
│   ├── schemaTypes/
│   │   ├── index.ts                # Schema registry
│   │   ├── projectType.ts          # Project document schema
│   │   ├── techStackType.ts        # Tech stack item schema (referenced by projects)
│   │   └── bioType.ts              # Bio document schema
│   ├── sanity.config.ts            # Studio config (project ID, plugins)
│   └── package.json
│
├── .gitignore
└── DOCS.md                         # This file
```

---

## 4. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 18 |
| Language | TypeScript | 5 |
| Build tool | Vite | 5 |
| Styling | Tailwind CSS | 3 |
| Component library | DaisyUI | 4 |
| Router | React Router | 6 |
| CMS | Sanity | v3 |
| QR codes | qrcode.react | — |
| Hosting | Vercel | — |

**Key Tailwind settings:**
- `hoverOnlyWhenSupported: true` — hover styles only apply on devices that support hover (disables them on touch screens)
- Two custom DaisyUI themes: `simply-red` (light, red) and `spicy-tech` (dark, purple/yellow)

---

## 5. User Journey & Page Map

```
[Homepage /]
  │
  ├─ Browse project cards (collapsed)
  ├─ Click card → expands (GIF thumbnail, metrics, short description, tech chips)
  ├─ "Full showcase" → [Project Page /projects/:slug]
  │     ├─ Hero GIF, sections, retrospective
  │     ├─ Sidebar: metrics, tech stack, progress dots, QR code  (desktop)
  │     └─ Prev / Next project navigation
  │
  ├─ Special sections: HOW I WORK, EDUCATION, COMING UP (DaisyUI accordion → Notion links)
  │
  └─ Navbar (always visible)
        ├─ Logo → [Homepage /]
        ├─ BIO → [Bio Page /bio]
        ├─ Contact → sidebar/panel with CV, Email, LinkedIn, GitHub links
        └─ Theme toggle (simply-red ↔ spicy-tech)
```

---

## 6. Homepage — Project List

**File:** `src/App.tsx`

### What it does

Fetches all projects from Sanity on mount and renders them as an accordion list. One card can be open at a time (`openCardId` state). Below the project cards are three static special sections (HOW I WORK, EDUCATION, COMING UP) that link out to Notion pages.

### Data fetch

```ts
// GROQ query inside useEffect
*[_type == "project"] {
  _id, title, slug, dateAndLocation, shortDescription, livesite,
  "techStack": techStack[]->{ title, _id, icon },
  "keyFeatures": keyFeatures[]->{ _id, description },
  gifUrl,
  "metrics": metrics
}
```

### Card states

**Collapsed:** GIF thumbnail column (64px / 96px wide) | title, date, up to 4 tech stack chips, overflow count | Live button + chevron

**Expanded:** GIF hero (left third on desktop) | metrics grid, short description, full tech chips, "Full showcase" + "Live site" CTAs

### Key state

```ts
const [projectsData, setProjectsData] = useState<Project[]>([]);
const [openCardId, setOpenCardId]     = useState<string | null>(null);
```

### TypeScript interfaces

```ts
interface ProjectMetric { value: string; label: string; highlight?: boolean }
interface Project {
  _id: string; title: string; slug: string;
  dateAndLocation: string; shortDescription: string; livesite: string;
  techStack: Technology[]; keyFeatures: KeyFeature[];
  gifUrl?: string; metrics?: ProjectMetric[];
}
```

---

## 7. Project Page

**File:** `src/ProjectPage.tsx`  
**Route:** `/projects/:slug`

### What it does

Loads a single project by its slug and renders a full showcase page. Layout differs between mobile and desktop — they are two separate JSX blocks in the same component using `md:hidden` / `hidden md:block`.

### Data fetch

Two queries run on mount:

```ts
// Full project data
fetchProjectById(slug)        // → src/sanityQueries.ts

// All project slugs/titles for prev/next navigation
fetchAllProjectSlugs()        // → src/sanityQueries.ts
```

### Desktop layout

```
Navbar
Page header (title, date/role | GitHub button + Live site button)
┌─────────────────────────────┬──────────────────┐
│  Left (flex-1)               │  Right (260px)   │
│  ─ Hero GIF                  │  sticky sidebar  │
│  ─ Sections (inline, all     │  ─ Metrics grid  │
│    visible, no accordion)    │  ─ Tech chips    │
│  ─ Retrospective (blockquote)│  ─ Progress dots │
│  ─ Prev / Next nav           │  ─ QR code       │
└─────────────────────────────┴──────────────────┘
Footer
```

### Mobile layout

```
Navbar
Hero row: [QR col 72px] | [title, back link, date/role]
Hero GIF (full width, h-40)
Metrics grid (2×2)
CTA buttons (GitHub + Live site)
Tech stack pills (always visible)
Accordion sections (one open at a time, "The brief" open by default)
Retrospective (always visible as blockquote)
Prev / Next navigation
Footer
```

### Sections fallback

If the `sections` field is not yet populated in Sanity, four placeholder sections are shown:

```ts
const effectiveSections = project.sections?.length
  ? project.sections
  : [
      { title: 'The brief',            body: `${project.title}'s brief is on its way here!` },
      { title: 'The problem',          body: `...` },
      { title: 'My approach',          body: `...` },
      { title: 'Technical highlights', body: `...` },
    ];
```

Same pattern applies for the retrospective and GitHub button (greyed out when null).

### Key state

```ts
const [project, setProject]       = useState<Project | null>(null);
const [allProjects, setAllProjects] = useState<ProjectNav[]>([]);
const [openSection, setOpenSection] = useState<string | null>(null);
```

### TypeScript interfaces (project page additions)

```ts
interface ProjectSection { title: string; body?: string; bullets?: string[] }
interface ProjectMetric  { value: string; label: string; highlight?: boolean;
                           isProjected?: boolean; source?: string }
interface Project {
  // ... base fields from homepage
  heroGifUrl?: string; role?: string; githubUrl?: string;
  sections?: ProjectSection[]; retrospective?: string;
  metrics?: ProjectMetric[];
}
```

---

## 8. Bio Page

**File:** `src/Bio.tsx`  
**Route:** `/bio`

Fetches a single `bio` document from Sanity:

```groq
*[_type == "bio"][0]{ heading, paragraphDesk, paragraphMobile }
```

Renders a personal introduction with skill focus areas (hardcoded labels) and contact information. Contains two SVG icons (envelope and star) that use `fill="currentColor"` to inherit the theme's primary colour.

---

## 9. Navbar & Contact

**File:** `src/Navbar.tsx`

State-driven — no DaisyUI dropdown patterns. Two boolean states control the panels:

```ts
const [menuOpen,    setMenuOpen]    = useState(false); // mobile full-screen panel
const [contactOpen, setContactOpen] = useState(false); // desktop right sidebar
```

### Desktop (≥ lg breakpoint)

Inline links: **BIO** | **Contact** button | **Theme toggle**

Clicking **Contact** opens a `fixed top-0 right-0 h-screen w-80` sidebar with centred links: CV, Email, LinkedIn, GitHub. A transparent backdrop div covers the rest of the screen; clicking it closes the sidebar.

### Mobile (< lg breakpoint)

Hamburger icon → `fixed top-0 right-0 h-screen w-full` full-screen panel with large links and theme toggle at the bottom. A `bg-black/20` backdrop covers the rest of the screen; clicking it closes the panel.

### Z-index

Both panels use `z-[15]`, backdrops use `z-[14]`.

---

## 10. Theming

**Files:** `src/ThemeContext.tsx`, `tailwind.config.js`

### How it works

1. `ThemeProvider` wraps the entire app in `main.tsx`
2. On toggle, it sets `document.documentElement.setAttribute('data-theme', theme)`
3. DaisyUI reads the `data-theme` attribute on `<html>` and applies the matching CSS variable set
4. All colours in components use **semantic tokens** (`text-primary`, `bg-base-100`, `border-primary`, etc.) — never raw hex values

### Themes

| Token | `simply-red` (light) | `spicy-tech` (dark) |
|-------|---------------------|---------------------|
| `primary` | `#ef4444` (red) | `#c3a5e1` (lavender) |
| `primary-content` | `#ffffff` | `#10021e` |
| `base-100` | `#ffffff` | `#10021e` |
| `base-200` | `#f5f5f5` | `#1a063c` |
| `accent` | `#ef4444` | `#edf643` (yellow) |
| `base-content` | `#ef4444` | `#fffff3` |

### Adding a new theme

1. Add a new theme object to the `daisyui.themes` array in `tailwind.config.js`
2. Add the theme name to the `Theme` union type in `ThemeContext.tsx`
3. Update the toggle button label in `Navbar.tsx`

### Global CSS overrides

`src/index.css` contains DaisyUI component overrides that apply across both themes:

- `.btn` — rounded corners, primary border, transparent background; hover fills with accent colour (desktop only via `@media (hover: hover)`)
- `.collapse` — primary border, no radius
- `.navbar` — `padding: 1rem`
- Scrolling ticker animation (`.containeranimationportfolio`)

---

## 11. Content Management — Sanity CMS

**Studio URL:** `https://ramfrontendportfolio.sanity.studio`  
**Project ID:** `7dm3a4l2`  
**Dataset:** `production`

### Schema overview

#### Project document (`projectType.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Project name shown on cards and page |
| `slug` | string | URL identifier — must be unique, e.g. `claudiavitali` |
| `dateAndLocation` | string | Free text, e.g. `NOV '23 – NOW · BCN` |
| `livesite` | url | Used for Live site button and QR code |
| `shortDescription` | string | Shown in expanded card and project page header |
| `techStack` | reference[] | References to `techStack` documents |
| `gifUrl` | url | Small GIF — shown as card thumbnail |
| `heroGifUrl` | url | Larger GIF — shown on project page |
| `metrics` | object[] | `{ value, label, highlight?, isProjected?, source? }` |
| `role` | string | e.g. `Solo build`, shown as meta on project page |
| `githubUrl` | url | Optional — GitHub button hidden when empty |
| `sections` | object[] | `{ title, body?, bullets? }` — narrative content |
| `retrospective` | text | "What I'd do differently" — always shown |

#### Tech Stack document (`techStackType.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Name shown in pills, e.g. `React.js` |
| `icon` | string | Raw SVG string — rendered with `dangerouslySetInnerHTML` |

#### Bio document (`bioType.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `heading` | string | Main bio heading |
| `paragraphDesk` | text | Desktop bio paragraph |
| `paragraphMobile` | text | Mobile bio paragraph |

### How projects are linked to tech stack

Tech stack items are **reference documents**, not inline text. This means:

1. Create a `techStack` document first (Title + SVG icon)
2. Then link it to a project via the `Tech Stack` field
3. The GROQ query dereferences the reference: `techStack[]->{ _id, title, icon }`

### Deploying schema changes

After editing any file in `frontendportfoliosanity/schemaTypes/`, deploy the Studio:

```bash
cd frontendportfoliosanity
npx sanity deploy
# Select: ramfrontendportfolio
```

Schema changes take effect in the Studio immediately after deploy. The frontend reads whatever data is in the dataset — no frontend redeploy needed for content changes.

---

## 12. Routing

**File:** `src/main.tsx`

```
/              → App.tsx        (homepage — project list)
/projects/:slug → ProjectPage.tsx (individual project showcase)
/bio           → Bio.tsx        (bio / about page)
*              → App.tsx        (catch-all — shows homepage)
```

**Important:** `vercel.json` contains a rewrite rule that sends all paths to `/index.html`. This is required for React Router to work on Vercel — without it, direct URL access to `/projects/my-project` would return a 404.

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

### Slug vs ID routing

Projects are routed by their `slug` field (plain string in Sanity schema, **not** Sanity's built-in slug type). The GROQ filter is:

```groq
*[_type == "project" && slug == $slug][0]
```

If a project isn't loading, check that the `slug` field is populated in Sanity Studio.

---

## 13. Deployment

### Frontend — Vercel

- **Production branch:** `main`
- **Build command:** `npm run build` (runs `tsc && vite build`)
- **Output directory:** `dist`
- **Root directory:** `frontendportfoliovite`

Push to `main` triggers an automatic redeploy.

### Workflow

All development happens on the `development` branch. When ready to ship:

```bash
git checkout main
git merge development
git push origin main
```

Then sync `development` back up:

```bash
git checkout development
git merge main
git push origin development
```

### Sanity Studio — hosted by Sanity

```bash
cd frontendportfoliosanity
npx sanity deploy
```

Deploys to `https://ramfrontendportfolio.sanity.studio`. Only needed when schema files change.

---

## 14. Common Tasks

### Add a new project

1. Open Sanity Studio → **Project** → **New**
2. Fill in: Title, Slug, Date and Location, Live Site URL, Short Description
3. Link Tech Stack items (create them first if they don't exist yet)
4. Upload GIF URL (thumbnail) and Hero GIF URL
5. Add Metrics: each has a Value (e.g. `98`), Label (e.g. `Lighthouse score`), optional Highlight toggle
6. Add Sections in order: The brief → The problem → My approach → Technical highlights. Each section has a Title and either a Body (prose) or Bullets (list of strings)
7. Fill in the Retrospective field
8. Optionally add Role and GitHub URL

No frontend redeploy needed — the site fetches live data from Sanity.

---

### Add a tech stack item

1. Open Sanity Studio → **Tech Stack** → **New**
2. Set Title (e.g. `Tailwind CSS`)
3. Paste raw SVG markup into the Icon field
4. Link it to one or more projects via the project's Tech Stack field

---

### Change the site colour theme

Edit `tailwind.config.js` — the `daisyui.themes` array. All components use semantic tokens (`primary`, `base-100`, etc.) so changing a theme value ripples through the entire UI automatically.

---

### Add a new route / page

1. Create the component in `src/`
2. Add the route in `src/main.tsx`:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add a nav link in `Navbar.tsx` if needed

---

### Update the "HOW I WORK / EDUCATION / COMING UP" sections

These are hardcoded in `src/App.tsx` with direct links to Notion pages. Find the relevant `id` (`section-howIWork`, `section-education`, `section-comingUp`) and update the `href` on the `<a>` tag.

---

### Debug a project not loading on the project page

1. Check that the project has a `slug` value in Sanity Studio (not empty)
2. The slug must be a plain string — the GROQ filter is `slug == $slug`, not `slug.current == $slug`
3. Check the browser console for Sanity fetch errors
4. Verify `useCdn: false` is set in `sanityClient.ts` to bypass CDN cache

---

*Documentation last updated: April 2026*
