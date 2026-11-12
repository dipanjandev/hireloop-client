<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop Client — AI Agent Handbook & Project Documentation

Welcome to **HireLoop Client**! This document provides crucial context, architectural guidelines, technical specifications, and coding conventions for any AI coding assistant or human developer working on this codebase.

---

## 1. Project Overview

**HireLoop** is a modern, high-performance job recruitment and career management platform. It facilitates interactions between three primary user roles:
- **`seeker`**: Explores jobs, applies to listings, tracks application statuses, and manages profile credentials.
- **`recruiter`**: Posts jobs, manages company listings, updates candidate pipelines, and monitors applicants.
- **`admin`**: Oversees the entire system, handles moderation, and manages user accounts.

---

## 2. Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) `16.4.3` (App Router, Turbopack, React Server Components)
- **Library**: [React](https://react.dev/) `19.3.1`
- **Language**: [TypeScript](https://www.typescriptlang.org/) `5.x` (Strict type safety required)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss`, `tw-animate-css`, and inline CSS variables in `app/globals.css`
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (base-nova style, `@base-ui/react`, Radix primitives)
- **Icons**: [Lucide React](https://lucide.dev/) (`lucide-react`)
- **Authentication**: [Better-Auth](https://better-auth.com/) `1.7.18` with MongoDB adapter (`@better-auth/mongo-adapter`)
- **Notifications**: `shadcn/ui` toast and `react-hot-toast`
- **Backend API Server**: Node.js/Express REST API running at `http://localhost:5000` (configurable via `NEXT_PUBLIC_API_BASE_URL`)

---

## 3. Directory Architecture & Key Locations

```text
hireloop-client/
├── app/
│   ├── (auth)/                    # Authentication pages (unauthenticated layout)
│   │   ├── signin/page.tsx        # Login page (Email/Password & Google OAuth)
│   │   └── get-started/page.tsx   # Registration page (with role selection)
│   ├── api/
│   │   └── auth/[...all]/         # Better-Auth catch-all API handler
│   ├── browse-jobs/page.tsx       # Public/candidate job search & exploration page
│   ├── components/
│   │   └── DashboardSidebar.tsx   # Role-aware collapsible sidebar for dashboard
│   ├── dashboard/                 # Authenticated dashboard area
│   │   ├── layout.tsx             # Shared dashboard shell (SidebarProvider, Toaster)
│   │   ├── seeker/                # Job seeker dashboard routes
│   │   ├── recruiter/             # Recruiter dashboard routes
│   │   │   ├── jobs/page.tsx      # Manage Job Posts (Table view with actions)
│   │   │   └── post-job/page.tsx  # Create/publish a new job listing
│   │   └── admin/                 # Admin dashboard routes
│   ├── globals.css                # Tailwind v4 theme, CSS variables & dark mode styles
│   ├── layout.tsx                 # Root HTML layout with Geist font & ThemeProvider
│   └── page.tsx                   # Public Landing page (Hero, features, CTA)
├── components/
│   ├── homepage-components/       # Landing page sections (NavBar, BanerSection, etc.)
│   ├── ui/                        # Reusable shadcn/ui primitives (button, alert-dialog, etc.)
│   └── DeleteButton.tsx           # Reusable confirmation dialog for job deletion
├── lib/
│   ├── actions/
│   │   └── jobs.ts                # Backwards-compatibility re-export proxy
│   ├── api/
│   │   └── jobs.ts                # Unified job API operations (getJobs, createJob, deleteJob)
│   ├── auth.ts                    # Better-Auth server configuration & MongoDB adapter
│   ├── auth-client.ts             # Better-Auth client instance (signIn, signUp, useSession)
│   └── utils.ts                   # Utility functions (cn helper combining clsx & tailwind-merge)
├── types/
│   └── job.ts                     # Single Source of Truth for all job data structures
├── components.json                # shadcn/ui configuration file
├── package.json                   # Dependencies, scripts, and package metadata
└── tsconfig.json                  # TypeScript compiler settings
```

---

## 4. Environment Variables

The project expects the following environment variables (defined in `.env` / `.env.local`):

| Variable Name | Purpose | Example / Default |
|---|---|---|
| `BETTER_AUTH_SECRET` | Secret key used to sign Better-Auth tokens | Random secure 32+ char string |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Base URL for auth callbacks | `http://localhost:3000` |
| `BETTERAUTH_DB_URI` | MongoDB connection URI for Better-Auth | `mongodb+srv://...` |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the backend REST API server | `http://localhost:5000` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID (optional) | String |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret (optional) | String |

---

## 5. Core Architectural Conventions

### 5.1 Type System & Single Source of Truth (`types/job.ts`)
- **Never duplicate type declarations across pages or components.**
- All job-related models and options are centralized in [`types/job.ts`](file:///c:/webDevProjects/hireloop-project/hireloop-client/types/job.ts):
  - `JOB_TYPES`, `JOB_CATEGORIES`, and `SALARY_FREQUENCIES` are exported as `as const` arrays.
  - `JobType`, `JobCategory`, and `SalaryFrequency` are derived via `(typeof ARRAY)[number]`.
  - `CreateJobInput`: Input payload for posting/editing a job.
  - `Job`: Full database model extending `CreateJobInput` with `_id`, `createdAt`, `updatedAt`, etc.
  - `DisplayJobItem`: Strongly typed utility representation for tabular display in the recruiter dashboard.
- Component props should accept minimal required subsets using TypeScript utility types (e.g., `Pick<Job, "_id" | "title">` in `DeleteButton.tsx`) to maximize reusability and decouple components from page-level types.

### 5.2 Authentication & User Roles
- Authentication is handled by **Better-Auth** via `lib/auth.ts` (server) and `lib/auth-client.ts` (client).
- Every user object has a `role` field: `"seeker" | "recruiter" | "admin"`.
- In client components, obtain session data using `const { data: session } = useSession()`.
- Navigation and available sidebar links dynamically adjust to `session.user.role` via `app/components/DashboardSidebar.tsx`.

### 5.3 UI & Styling Guidelines
- **Theme**: Dark, futuristic SaaS aesthetic matching Figma designs (primary colors `#5851ff`, dark surfaces `#08080c`, `#0d0d14`, `#121217`, subtle borders `border-white/10`).
- **Icons**: Exclusively use `lucide-react` icons.
- **Glassmorphism**: Use `backdrop-blur-xl`, `border-white/10`, and `bg-[#0d0d14]/90` for dark cards and tables.
- **Responsive Design**: Mobile-first grid layouts (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) with horizontal overflow handling for tables.

### 5.4 Data Fetching & API Communication
- **Unified API Client (`lib/api/jobs.ts`)**: All job-related REST API operations are centralized in [`lib/api/jobs.ts`](file:///c:/webDevProjects/hireloop-project/hireloop-client/lib/api/jobs.ts):
  - `getJobs()`: Fetches the job listings (`Promise<DisplayJobItem[]>`).
  - `createJob(data)`: Posts a new job payload (`CreateJobInput`) to `/jobs`.
  - `deleteJob(jobId)`: Deletes a specific job listing by its ID via `/jobs/:id`.
- `lib/actions/jobs.ts` exists as a re-export layer (`export * from "@/lib/api/jobs"`) for seamless backwards compatibility.
- Use `toast.add()` from shadcn or `react-hot-toast` for feedback upon API actions.

---

## 6. Essential CLI Commands Cheatsheet

Always execute commands on Windows using `npm.cmd` (or `npx.cmd`):

| Purpose | Command | Notes |
|---|---|---|
| **Start Development Server** | `npm.cmd run dev` | Runs Next.js with Turbopack on `http://localhost:3000` |
| **Type Check** | `npm.cmd run typecheck` | Strict `tsc --noEmit` check. Must always pass with 0 errors. |
| **Lint Check** | `npm.cmd run lint` | Runs ESLint 9 across project files. |
| **Format Files** | `npm.cmd run format` | Runs Prettier with Tailwind CSS plugin. |
| **Production Build** | `npm.cmd run build` | Compiles App Router routes and static generation. |
| **Run Production** | `npm.cmd run start` | Starts the production server build. |

---

## 7. Mandatory Agent Instructions & Rules

1. **Next.js 16 Compatibility**:
   - Next.js 16 introduces breaking API changes. Check `node_modules/next/dist/docs/` if modifying routing, caching, or core Next.js APIs.
   - Do **NOT** remove or modify the `<!-- BEGIN:nextjs-agent-rules -->` block at the top of this file.

2. **Windows Shell Commands**:
   - The operating system is Windows with PowerShell.
   - Run `npm.cmd` instead of `npm` (e.g. `npm.cmd run typecheck`, `npm.cmd run build`).

3. **Strict Type Safety**:
   - Always run `npm.cmd run typecheck` (`tsc --noEmit`) before completing any task.
   - Zero TypeScript errors (`Exit code 0`) is an absolute requirement.
   - Avoid using `any`; prefer strict interfaces, union types, or `unknown` where applicable.

4. **Preserve Working Code**:
   - Do not refactor unrelated UI or business logic unless explicitly requested.
   - Keep existing comments (Bengali/English) intact unless asked to update them.

5. **Plan Before Modifying**:
   - For non-trivial modifications, outline the implementation plan, impact on existing types, and verify backwards compatibility.
