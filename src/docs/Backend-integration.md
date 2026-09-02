
# Pathly Backend Integration

## Overview

This document consolidates the backend integration decisions for Pathly. It defines the foundation for PostgreSQL/Supabase, Prisma, seed data, Next.js API routes, layered backend code, shared frontend API utilities, and the gradual migration from static/mock domain data to database-backed APIs.

The target runtime flow is:

```text
Frontend page or component
        ↓
Domain API helper
        ↓
Shared Axios client
        ↓
Next.js API route
        ↓
Service
        ↓
Repository
        ↓
Prisma
        ↓
PostgreSQL / Supabase
```

Each layer has one responsibility, which keeps route handlers small and prevents database logic from being duplicated across the application.

---

## 1. Backend Folder Structure

The important backend and shared frontend files are organized as follows:

```text
src/
├── app/
│   └── api/
│       ├── health/
│       │   └── route.ts
│       ├── countries/
│       │   ├── route.ts
│       │   └── [slug]/
│       │       └── route.ts
│       ├── scholarships/
│       ├── documents/
│       └── visa/
│
├── interfaces/
│   ├── interfaces.ts
│   └── method.interfaces.ts
│
├── lib/
│   ├── axios.ts
│   ├── baseUrl.ts
│   └── prisma.ts
│
├── server/
│   ├── api/
│   │   ├── errors.ts
│   │   ├── handler.ts
│   │   ├── pagination.ts
│   │   ├── query.ts
│   │   └── response.ts
│   ├── repositories/
│   ├── services/
│   └── validation/
│
├── constant/
├── data/
└── generated/

prisma/
├── migrations/
├── seeds/
│   ├── countries.seed.ts
│   ├── deadlines.seed.ts
│   ├── documents.seed.ts
│   ├── requirements.seed.ts
│   ├── scholarships.seed.ts
│   └── visa.seed.ts
├── schema.prisma
└── seed.ts

prisma.config.ts
```

Only create domain route or seed files when that domain actually exists. Do not invent empty layers or data.

---

## 2. `src/app/api` vs `src/server/api`

The two `api` folders are valid because they have different jobs.

### `src/app/api`

This is the public HTTP layer provided by the Next.js App Router. Every `route.ts` becomes an endpoint.

```text
src/app/api/health/route.ts              → GET /api/health
src/app/api/countries/route.ts           → GET /api/countries
src/app/api/countries/[slug]/route.ts    → GET /api/countries/:slug
```

Route handlers should parse the request, call a service, and return a response. They should not contain large business rules or repeated Prisma queries.

### `src/server/api`

This is internal server infrastructure shared by route handlers. It contains reusable helpers for:

- error normalization;
- route-handler wrappers;
- pagination;
- query parsing;
- consistent success and error responses.

It does not create endpoints by itself.

```text
src/app/api      = public Next.js endpoints
src/server/api   = private reusable API utilities
```

Keep the internal folder named `src/server/api`. Renaming it to a temporary name such as `api-h` breaks imports like `@/server/api/handler` and makes its purpose less clear.

---

## 3. Layered Route, Service, Repository, and Prisma Flow

```text
route.ts
   ↓
service
   ↓
repository
   ↓
Prisma
   ↓
PostgreSQL
```

### Route

- Receives the HTTP request.
- Parses path, query, and body values.
- Calls the service.
- Uses shared response/error helpers.
- Returns the HTTP response.

### Service

- Contains application and business rules.
- Coordinates one or more repositories.
- Validates domain-level conditions.
- Does not depend on React or page components.

Examples include `CountryService`, `ScholarshipService`, `DocumentService`, and `VisaService`.

### Repository

- Owns database access.
- Encapsulates Prisma queries.
- Keeps persistence details out of routes and services.

Instead of scattering code like this throughout route handlers:

```ts
await prisma.country.findMany();
```

place it in a country repository and call that repository from the country service.

### Prisma

Prisma maps application models and relations to PostgreSQL. The shared Prisma client belongs in `src/lib/prisma.ts` so development hot reload does not create unnecessary connections.

---

## 4. Prisma, PostgreSQL, and Supabase Setup

Pathly uses:

```text
PostgreSQL hosted by Supabase
Prisma ORM
@prisma/adapter-pg
pg
```

The key files are:

```text
prisma/schema.prisma    → models, enums, relations, and generated client settings
prisma.config.ts        → Prisma configuration and seed command
src/lib/prisma.ts       → reusable application Prisma client
prisma/seed.ts          → seed entry point
```

Install the required project dependencies if they are not already present:

```bash
npm install @prisma/client @prisma/adapter-pg pg dotenv axios
npm install --save-dev prisma tsx @types/pg
```

Use the existing schema and client-generation location in the project. Do not change models, enums, IDs, slugs, relationships, or the generated-client path merely to reorganize backend files.

A typical setup sequence is:

```text
1. Create or select the Supabase PostgreSQL project.
2. Add the connection strings to the local environment file.
3. Define or review the models in prisma/schema.prisma.
4. Apply the existing migration workflow used by the project.
5. Generate the Prisma Client.
6. Seed the initial domain data.
7. Verify the connection through /api/health.
```

For local schema development, use the migration command only when a schema change is intentional:

```bash
npx prisma migrate dev
```

For this documentation and seed-organization work, no schema change or new migration is required.

---

## 5. Environment Variables

Database credentials must stay in local environment files and must never be committed.

```env
# Pooled/runtime PostgreSQL connection
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# Direct connection used when the Prisma/Supabase workflow requires it
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

Rules:

- Store real values in `.env` or the environment file already used by the project.
- Keep `.env` ignored by Git.
- Put placeholders, never secrets, in `.env.example`.
- Use the Supabase connection strings appropriate to the existing Prisma configuration.
- Do not hardcode database URLs in source files.

---

## 6. Seed Data Purpose

Seed data creates the initial records required by Pathly, including the domains already represented in the database, such as:

- countries and official sources;
- admission and language requirements;
- study levels;
- documents and document guides;
- visa information;
- scholarships;
- deadlines.

The seed command remains configured through `prisma.config.ts`, conceptually as:

```ts
seed: "tsx prisma/seed.ts";
```

Run it with:

```bash
npx prisma db seed
```

Seeds should be repeatable where possible. Preserve the current `upsert`, `create`, `createMany`, ID, slug, relation, enum-mapping, and dependency behavior.

---

## 7. Seed Refactor by Domain

The original `prisma/seed.ts` became too large, so its domain-specific logic was split into `prisma/seeds/*.seed.ts` files.

```text
prisma/
├── seed.ts
└── seeds/
    ├── countries.seed.ts
    ├── requirements.seed.ts
    ├── documents.seed.ts
    ├── visa.seed.ts
    ├── scholarships.seed.ts
    └── deadlines.seed.ts
```

`prisma/seed.ts` remains the only seed entry point. It should:

1. load environment configuration;
2. create one Prisma client/adapter connection;
3. call domain seed functions in dependency order;
4. report failures;
5. disconnect cleanly.

Conceptual orchestration:

```text
prisma/seed.ts
      ↓
seedCountries()
      ↓
seedRequirements()
      ↓
seedDocuments()
      ↓
seedVisa()
      ↓
seedScholarships()
      ↓
seedDeadlines()
```

The exact order must follow the existing foreign-key and relation dependencies. Create the Prisma client once and pass it to the seed functions when that matches the current setup; do not open an unnecessary connection in every file.

Keep a helper inside its domain file when only that domain uses it. Add a shared `prisma/seeds/helpers.ts` only when multiple domains genuinely need the same helper.

### Why seeds are organized by domain, not frontend page

Database data is shared across multiple pages. A country may appear on the home page, Study Abroad, Search, and Study Path Finder, but it is still one `Country` domain.

```text
Good: countries.seed.ts
Bad:  home-page-countries.seed.ts
Bad:  study-abroad-countries.seed.ts
```

Domain organization prevents duplicated seed data and matches the Prisma model boundaries.

---

## 8. Static/Mock Data vs Real Database Data

The existence of `src/constant` or `src/data` does not prove that the application is still using mock data. What matters is whether runtime pages and components import domain records from those folders.

This is still static/mock runtime data:

```ts
import { countries } from "@/constant/countries";
import { documents } from "@/data/documents";
```

This is the intended real-data flow:

```text
Frontend
   ↓
GET /api/countries
   ↓
Country service
   ↓
Country repository
   ↓
Prisma
   ↓
PostgreSQL
```

Static files may remain for true application configuration, for example:

- navigation links;
- UI labels;
- fixed display mappings;
- form options that are not managed records;
- enums mirrored only for presentation;
- static prompts or UI configuration.

Database-backed domain records should not continue as runtime frontend arrays, especially countries, scholarships, visa records, documents, guides, and deadlines.

Seed scripts may temporarily import static arrays as seed input. After seeding, frontend code must read the records through APIs rather than importing those arrays directly.

To audit remaining usage, search for imports and important domain names:

```bash
rg '(/constant/|/data/)' src
rg '(countries|scholarships|documents|visa|deadlines)' src
```

Review every result; do not delete a file only because it is inside `constant` or `data`.

---

## 9. Safe Migration from Static Data to APIs

Migrate one backend domain at a time, then update every frontend consumer of that domain.

```text
1. Confirm the Prisma model and relations.
2. Seed the existing domain data into PostgreSQL.
3. Build the repository.
4. Build the service.
5. Build the API route.
6. Test the API with real database data.
7. Connect all relevant frontend consumers to the API.
8. Verify loading, empty, success, and error states.
9. Search for remaining imports from the old static source.
10. Remove the old mock file only when it has no required consumers.
```

Do not delete `countries.ts`, for example, after migrating only the Study Abroad page if Home, Search, or Study Path Finder still imports it.

The migration is by domain, not blindly by page:

```text
Study Abroad                    → Countries API
Scholarships                    → Scholarships API
Documents                       → Documents API
Student Visa                    → Visa API
Global/domain search            → Search API
Study Path Finder and results   → Study Path API
Personal Support                → Personal Support API
AI Navigator                    → AI Navigator API
```

---

## 10. Shared Axios Client, Base URL, and Interfaces

### Shared Axios client

`src/lib/axios.ts` is the single reusable HTTP client for frontend API requests. Pages should not create a new Axios configuration for every domain.

Conceptual usage:

```ts
import { axiosGet } from "@/lib/axios";

const response = await axiosGet<Country[]>("/countries");
```

With an API base URL, `/countries` resolves to `/api/countries`.

The shared client can centralize:

- base URL and credentials;
- `GET`, `POST`, `PUT`/`PATCH`, and `DELETE` helpers;
- the shared response contract;
- conversion of API failures into a consistent `ApiError`;
- explicitly allowed statuses such as a normal `404` empty state.

Create small domain API modules when useful:

```ts
import { axiosGet } from "@/lib/axios";

export function getCountries() {
  return axiosGet<Country[]>("/countries");
}

export function getCountry(slug: string) {
  return axiosGet<Country>(`/countries/${slug}`);
}
```

### Base URL helper

`src/lib/baseUrl.ts` centralizes URL construction so URLs are not hardcoded throughout the application. The Axios client can use the helper to build its `/api` base URL.

For browser calls to the same Next.js application, a relative `/api` base is sufficient. If `buildUrl("api")` is already part of the project convention, keep using it consistently rather than mixing approaches.

### Shared interfaces

Reusable API contracts belong in:

```text
src/interfaces/interfaces.ts
src/interfaces/method.interfaces.ts
```

They should define common response and HTTP-method types once so frontend helpers and backend responses do not duplicate incompatible shapes.

The client must match the backend response convention. If the backend returns an application `status` inside a response body, the client should unwrap it consistently and throw `ApiError` when that status represents a failure.

---

## 11. Health Endpoint Architecture

The health endpoint is the first reference implementation of the layered backend design.

```http
GET /api/health
```

```text
src/app/api/health/route.ts
        ↓
shared API handler/response helpers
        ↓
health service
        ↓
health repository
        ↓
Prisma database check
        ↓
PostgreSQL / Supabase
```

It verifies that:

- the Next.js route layer is running;
- shared API helpers resolve correctly;
- service and repository imports work;
- Prisma can communicate with PostgreSQL.

Use it as the architecture pattern for new domain APIs, not as a place for unrelated system details or secrets.

---

## 12. Upcoming Domain APIs

The backend foundation supports the following planned work:

```text
Countries API
Scholarships API
Documents API
Visa API
Search API
Study Path API
Personal Support API
AI Navigator API
```

Initial country endpoints:

```http
GET /api/countries
GET /api/countries/[slug]
```

Country flow:

```text
Study Abroad / Home / Search / Study Path
                  ↓
         Countries API helper
                  ↓
        GET /api/countries[/slug]
                  ↓
            CountryService
                  ↓
          CountryRepository
                  ↓
               Prisma
                  ↓
             PostgreSQL
```

Every new API should reuse the same handler, response, error, pagination, query, service, repository, and Prisma conventions rather than introducing a separate architecture.

---

## 13. Source-of-Truth Rule

Pathly must not maintain two active runtime sources of truth for the same domain.

Avoid this:

```text
Frontend → src/constant/countries.ts
                    +
Frontend → API → PostgreSQL countries table
```

Use this:

```text
Static seed input, when still needed
                ↓
        Prisma domain seed
                ↓
           PostgreSQL
                ↓
          Backend API
                ↓
            Frontend
```

The database is the runtime source of truth. Static seed input is only a database-population source, and true UI configuration may remain static.

---

## 14. Commands

Install dependencies:

```bash
npm install
```

Install Axios separately if it is missing:

```bash
npm install axios
```

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply a development migration only when the schema intentionally changed:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

Start development:

```bash
npm run dev
```

Application and health URLs:

```text
http://localhost:3000
http://localhost:3000/api/health
```

Run quality checks:

```bash
npm run lint
npm run build
```

---

## 15. Verification Checklist Before Merge

- [ ] Review `git status`, `git diff --stat`, and `git diff` for unexpected changes.
- [ ] Confirm the final diff contains only intended backend integration and documentation work.
- [ ] Confirm `src/server/api` was not accidentally renamed to `src/server/api-h`.
- [ ] Confirm all `@/server/api/...` imports resolve.
- [ ] Run `npx prisma generate` successfully.
- [ ] Run `npx prisma db seed` successfully.
- [ ] Confirm every existing seed record and relationship is still created.
- [ ] Confirm seed execution order respects foreign keys.
- [ ] Confirm the database connection succeeds.
- [ ] Confirm `GET /api/health` succeeds.
- [ ] Run `npm run lint` successfully.
- [ ] Run `npm run build` successfully.
- [ ] Confirm there are no TypeScript or unresolved-import errors.
- [ ] Confirm existing frontend routes still work.
- [ ] Confirm migrated pages read domain data from APIs/PostgreSQL.
- [ ] Audit remaining imports from `src/constant` and `src/data` before deleting anything.
- [ ] Confirm `.env` and real credentials are not staged or committed.

---

## 16. Git Workflow for `test/backend-integration` and PR #50

The backend foundation and seed refactor were integrated on:

```text
test/backend-integration
```

Before staging, inspect the work carefully:

```bash
git status
git diff --stat
git diff
```

Run verification:

```bash
npx prisma generate
npx prisma db seed
npm run lint
npm run build
```

Stage only the intended work, then review the staged result:

```bash
git add BACKEND_INTEGRATION.md
git status
git diff --cached
```

If the backend integration changes are not committed yet, stage their exact paths as well; do not use a broad `git add .` without reviewing the diff.

Commit the documentation:

```bash
git commit -m "docs: add backend integration documentation"
```

Push the existing branch:

```bash
git push -u origin test/backend-integration
```

PR `#50` already targets `main`, so a new PR is not required. New commits pushed to `test/backend-integration` automatically appear in the same PR.

Before merging PR `#50`:

- review the Files changed tab;
- confirm the checks pass;
- confirm the base is `main` and compare branch is `test/backend-integration`;
- confirm the PR contains no unrelated frontend or schema changes;
- use the repository's approved merge method, such as **Squash and merge**.

After GitHub reports the PR as merged:

```bash
git switch main
git pull origin main
```

Optional cleanup after confirming the merge:

```bash
git branch -d test/backend-integration
git push origin --delete test/backend-integration
git fetch --prune
```

Relevant backend work represented by the integration included:

```text
feat(api-core): add shared API utilities
refactor(api): apply layered architecture to health endpoint
docs(api): document backend conventions
feat(backend): add database seed data
refactor: organize backend integration and seed structure
```

---

## 17. Final Architecture Diagrams

### Runtime architecture

```text
                         PATHLY

                Frontend pages/components
                           │
                           ▼
                  Domain API helpers
                           │
                           ▼
                  Shared Axios client
               axios.ts + baseUrl.ts + types
                           │
                           ▼
                  Next.js API routes
                     src/app/api
                           │
                           ▼
                  Shared API utilities
                    src/server/api
                           │
                           ▼
                        Services
                           │
                           ▼
                      Repositories
                           │
                           ▼
                         Prisma
                           │
                           ▼
                PostgreSQL / Supabase
```

### Seed architecture

```text
Static seed inputs, when still required
                    │
                    ▼
          prisma/seeds/*.seed.ts
                    │
                    ▼
        prisma/seed.ts orchestrator
                    │
                    ▼
                  Prisma
                    │
                    ▼
          PostgreSQL / Supabase
```

### Domain migration lifecycle

```text
Confirm model and seed data
             ↓
Build repository and service
             ↓
Build and test API route
             ↓
Connect every frontend consumer
             ↓
Verify UI and error states
             ↓
Search for old static imports
             ↓
Remove only unused mock data
```

This foundation lets every remaining Pathly API follow one consistent structure without duplicating database access, response handling, error handling, seed logic, or frontend HTTP configuration.
