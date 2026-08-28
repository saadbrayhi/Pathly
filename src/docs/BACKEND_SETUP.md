
# Pathly Backend Setup Guide

This document explains the current **Pathly backend foundation**, how the backend files are organized, how Prisma connects to Supabase PostgreSQL, how every team member should configure the project locally, and the rules that should be followed before starting backend feature development.

---

# 1. Backend Overview

Pathly uses the existing Next.js application for both the frontend and backend.

The backend is built using:

- Next.js 16.3
- TypeScript
- Next.js Route Handlers
- Prisma ORM 7.10.0
- Supabase PostgreSQL
- PostgreSQL driver `pg`
- Prisma PostgreSQL adapter `@prisma/adapter-pg`

Current local development environment:

```text
Node.js: v26.8.1
npm:     11.19.0
Prisma:  7.10.0
```

Prisma and `@prisma/client` should remain on the same version.

---

# 2. Backend Architecture

The basic backend flow is:

```text
Frontend
   ↓
Next.js API Route
   ↓
Server Logic
   ↓
Shared Prisma Client
   ↓
Prisma PostgreSQL Adapter
   ↓
Supabase PostgreSQL
```

Example:

```text
GET /api/health
      ↓
src/app/api/health/route.ts
      ↓
src/lib/prisma.ts
      ↓
Prisma Client
      ↓
Supabase PostgreSQL
```

---

# 3. Current Backend Folder Structure

```text
Pathly/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── health/
│   │   │       └── route.ts
│   │   │
│   │   └── ...
│   │
│   ├── generated/
│   │   └── prisma/
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── components/
│   ├── constant/
│   ├── data/
│   ├── services/
│   └── ...
│
├── prisma.config.ts
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

The backend will grow later as additional APIs and services are implemented.

---

# 4. Prisma Schema

File:

```text
prisma/schema.prisma
```

The Prisma schema defines:

- the database provider
- Prisma Client generation
- future database models
- relations between models
- enums and database structure

Current basic configuration:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

The Prisma Client is generated into:

```text
src/generated/prisma/
```

The complete Pathly database models should be created in the dedicated **database schema task**, not inside the backend foundation task.

Examples of future models may include:

```text
Country
Document
Scholarship
Visa
StudyPath
SupportRequest
```

Do not create these models randomly in feature branches before the shared schema is agreed upon.

---

# 5. Prisma Configuration

File:

```text
prisma.config.ts
```

This file controls Prisma CLI configuration.

Example:

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DIRECT_URL"),
  },
});
```

Important:

```text
DATABASE_URL
```

is used by the running Next.js application.

```text
DIRECT_URL
```

is used by Prisma CLI operations and migrations.

---

# 6. Generated Prisma Client

Folder:

```text
src/generated/prisma/
```

This directory is generated automatically by Prisma.

Generate it using:

```bash
npx prisma generate
```

Expected output:

```text
Generated Prisma Client (...) to ./src/generated/prisma
```

## Important Rule

Never manually edit files inside:

```text
src/generated/prisma/
```

If the Prisma schema changes, edit:

```text
prisma/schema.prisma
```

and regenerate:

```bash
npx prisma generate
```

---

# 7. Shared Prisma Client

File:

```text
src/lib/prisma.ts
```

This file provides one reusable Prisma Client for the entire backend.

Example usage:

```ts
import prisma from "@/lib/prisma";
```

Backend routes and services should import this shared client.

Do not create a new Prisma Client inside every API route.

Avoid:

```ts
const prisma = new PrismaClient();
```

inside individual routes.

Using a shared client prevents unnecessary database connections, especially during Next.js development and hot reloads.

---

# 8. Backend API Routes

Backend APIs are created using Next.js Route Handlers.

The structure is:

```text
src/app/api/<route-name>/route.ts
```

Example:

```text
src/app/api/health/route.ts
```

becomes:

```text
GET /api/health
```

Future routes may look like:

```text
src/app/api/countries/route.ts

src/app/api/documents/route.ts

src/app/api/scholarships/route.ts

src/app/api/visa/route.ts

src/app/api/search/route.ts

src/app/api/study-path/route.ts

src/app/api/personal-support/route.ts

src/app/api/ai-navigator/route.ts
```

Each API should be implemented in its own backend task.

---

# 9. Health Check Endpoint

Current endpoint:

```text
GET /api/health
```

File:

```text
src/app/api/health/route.ts
```

The health endpoint tests the real database connection.

It verifies:

```text
Next.js
   ↓
Prisma
   ↓
PostgreSQL Adapter
   ↓
Supabase PostgreSQL
```

Successful response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

Expected HTTP status:

```text
200
```

If the database connection fails, the API should return:

```json
{
  "status": "error",
  "database": "disconnected"
}
```

with HTTP status:

```text
500
```

---

# 10. Testing the Health Endpoint

Start the application:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/api/health
```

Expected result:

```json
{
  "status": "ok",
  "database": "connected"
}
```

This confirms that the complete connection works:

```text
Next.js → Prisma → Supabase PostgreSQL
```

---

# 11. Environment Variables

Each developer needs their own local:

```text
.env
```

The project provides:

```text
.env.example
```

The `.env.example` file should contain placeholders only.

Example:

```env
DATABASE_URL=""
DIRECT_URL=""

NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=""
```

---

# 12. DATABASE_URL

```env
DATABASE_URL=""
```

This is used by the running Next.js backend and Prisma Client.

It should contain the Supabase PostgreSQL runtime/pooled connection.

Conceptually:

```text
Next.js application
      ↓
Prisma Client
      ↓
DATABASE_URL
      ↓
Supabase connection pool
      ↓
PostgreSQL
```

---

# 13. DIRECT_URL

```env
DIRECT_URL=""
```

This connection is used by Prisma CLI operations.

For example:

```bash
npx prisma validate
npx prisma generate
npx prisma migrate dev
npx prisma migrate deploy
```

Conceptually:

```text
Prisma CLI
    ↓
DIRECT_URL
    ↓
Supabase PostgreSQL
```

---

# 14. Supabase Public Variables

```env
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=""
```

These variables may be used later if Pathly needs Supabase functionality in the browser.

Important:

Any variable beginning with:

```text
NEXT_PUBLIC_
```

can be exposed to frontend JavaScript.

Never store private credentials in `NEXT_PUBLIC_*`.

---

# 15. Environment Security

Never commit:

```text
.env
.env.local
```

Never commit:

- database passwords
- Supabase database passwords
- PostgreSQL credentials
- private connection strings
- API secrets
- Supabase service-role keys
- private tokens

Only this file should be committed:

```text
.env.example
```

It must contain placeholders only.

---

# 16. Verify `.env` Is Ignored

Run:

```bash
git check-ignore .env
```

Expected result:

```text
.env
```

If `.env` appears in `git status`, stop before committing and fix `.gitignore`.

A common configuration is:

```gitignore
.env*
!.env.example
```

This ignores real environment files while allowing `.env.example` to remain in Git.

---

# 17. First-Time Setup for Team Members

After the backend foundation is merged into `main`, every teammate should follow these steps.

## Step 1 — Update Main

```bash
git switch main
git pull origin main
```

---

## Step 2 — Install Dependencies

```bash
npm install
```

This installs:

- Next.js
- Prisma
- Prisma Client
- PostgreSQL driver
- Prisma PostgreSQL adapter
- all frontend dependencies

---

## Step 3 — Create Local Environment File

Use:

```text
.env.example
```

as the template.

Create:

```text
.env
```

Then add the correct project credentials.

Never commit this file.

---

## Step 4 — Validate Prisma

Run:

```bash
npx prisma validate
```

Expected result:

```text
The schema at prisma/schema.prisma is valid
```

---

## Step 5 — Generate Prisma Client

Run:

```bash
npx prisma generate
```

Expected folder:

```text
src/generated/prisma/
```

---

## Step 6 — Start Pathly

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Step 7 — Verify Backend Connection

Open:

```text
http://localhost:3000/api/health
```

Expected:

```json
{
  "status": "ok",
  "database": "connected"
}
```

If this does not work, fix the Prisma/Supabase connection before starting backend feature development.

---

# 18. Important Development Commands

## Start Development Server

```bash
npm run dev
```

---

## Validate Prisma Schema

```bash
npx prisma validate
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Run ESLint

```bash
npm run lint
```

---

## Create Production Build

```bash
npm run build
```

---

# 19. Before Starting a Backend Task

Always update `main` first:

```bash
git switch main
git pull origin main
```

Then create a new branch:

```bash
git switch -c backend/<task-name>
```

Example:

```bash
git switch -c backend/countries-api
```

Other examples:

```text
backend/database-schema
backend/seed-data
backend/api-core
backend/documents-api
backend/scholarships-api
backend/visa-api
backend/search-api
backend/study-path-api
backend/personal-support-api
backend/ai-navigator
backend/testing-security
backend/deployment
```

---

# 20. Backend Git Rules

Every backend task should have its own branch.

Do not develop backend features directly on:

```text
main
```

Recommended workflow:

```text
main
  ↓
backend/task-name
  ↓
development
  ↓
test
  ↓
push
  ↓
Pull Request
  ↓
review
  ↓
main
```

---

# 21. Before Opening a Pull Request

Run:

```bash
npx prisma validate
npm run lint
npm run build
```

Then check:

```bash
git status
```

Confirm:

```text
✅ Prisma schema valid
✅ lint passes
✅ build passes
✅ no .env file staged
✅ no credentials committed
✅ only task-related files changed
```

Push the branch:

```bash
git push -u origin backend/<task-name>
```

Then create a Pull Request into:

```text
main
```

---

# 22. Prisma Development Rules

## Rule 1 — Use the Shared Prisma Client

Use:

```ts
import prisma from "@/lib/prisma";
```

Do not create separate clients everywhere.

---

## Rule 2 — Never Edit Generated Files

Never manually edit:

```text
src/generated/prisma/
```

Edit:

```text
prisma/schema.prisma
```

then run:

```bash
npx prisma generate
```

---

## Rule 3 — Keep Prisma Versions Consistent

The project currently uses Prisma:

```text
7.10.0
```

Prisma and `@prisma/client` should use matching versions.

Do not upgrade Prisma independently in a feature branch without team agreement.

---

## Rule 4 — Do Not Change Database Tables Manually

Once migrations are introduced, database structure changes should be managed through Prisma.

Avoid manually creating or modifying Pathly application tables in the Supabase dashboard.

Database changes should be represented by:

```text
prisma/schema.prisma
```

and Prisma migrations.

This ensures every developer and every environment has the same database structure.

---

# 23. Database Migration Rules

Database migrations should be treated like source code.

Migration files should:

- be committed to Git
- be reviewed
- belong to the correct task
- describe intentional schema changes

Do not create random database changes directly on Supabase without representing them in Prisma.

Typical migration workflow later:

```bash
npx prisma migrate dev
```

Production migrations should use:

```bash
npx prisma migrate deploy
```

Do not run production migrations casually.

---

# 24. Backend Feature Separation

Keep backend responsibilities separated.

Examples:

```text
Countries API
Documents API
Scholarships API
Visa API
Search API
Study Path API
Personal Support API
AI Navigator API
```

Do not put several unrelated backend features into one branch.

For example:

```text
backend/documents-api
```

should not also implement:

```text
scholarships
visa
countries
```

This keeps Pull Requests smaller and easier to review.

---

# 25. Backend Development Order

The recommended development order is:

```text
#31 Backend Foundation
        ↓
#32 Database Schema
        ↓
#33 Seed Data
        ↓
#34 API Core
        ↓
Feature APIs
        ↓
Frontend Integration
        ↓
Testing & Security
        ↓
Deployment
```

The foundation, schema, and API architecture should be stable before the entire team starts implementing many feature APIs simultaneously.

---

# 26. Why the Database Schema Comes First

All feature APIs depend on shared database models.

For example:

```text
Countries API
      ↓
Country model

Scholarships API
      ↓
Scholarship model

Documents API
      ↓
Document model

Visa API
      ↓
Visa model
```

If everyone creates their own database structure independently, merge conflicts and inconsistent schemas will appear.

Therefore:

```text
Backend Foundation
        ↓
Database Schema
        ↓
Feature APIs
```

---

# 27. Seed Data

After the schema is stable, Pathly will add seed data.

Seed data can include initial:

- countries
- scholarship information
- document types
- visa guide information
- study-related reference data

Seed data provides predictable development data for all team members.

---

# 28. API Core

Before building all feature APIs, shared backend patterns should be established.

The API Core task may define reusable patterns for:

- responses
- errors
- validation
- service structure
- database access
- query handling

This avoids every developer inventing a different API style.

---

# 29. Planned Backend APIs

Current planned backend areas include:

```text
Countries
Documents
Scholarships
Visa
Search
Study Path
Personal Support
AI Navigator
```

Each should later communicate with the existing frontend through Next.js API routes.

---

# 30. Frontend Integration

The frontend currently contains existing static/mock data.

After the backend APIs are implemented, frontend components will gradually be connected to real API responses.

Conceptually:

```text
Current:

Frontend
   ↓
Static / Mock Data


Later:

Frontend
   ↓
Next.js API
   ↓
Prisma
   ↓
Supabase
```

Do not remove frontend mock/static data until the corresponding API is ready.

---

# 31. Current Health Check Status

The backend foundation has successfully been tested.

Current successful response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

This confirms:

```text
✅ Next.js API route works
✅ Prisma Client works
✅ Prisma PostgreSQL adapter works
✅ DATABASE_URL works
✅ Supabase PostgreSQL is reachable
```

---

# 32. Backend Foundation Acceptance Criteria

The foundation is considered ready when:

```text
✅ Supabase PostgreSQL is reachable
✅ Prisma connects successfully
✅ /api/health returns HTTP 200
✅ database status is connected
✅ Prisma schema validates
✅ Prisma Client generates correctly
✅ .env is ignored
✅ no credentials are committed
✅ .env.example exists
✅ shared Prisma Client exists
✅ backend route structure exists
✅ npm run lint passes
✅ npm run build passes
✅ teammates can reproduce the setup
```

---

# 33. Current Backend Foundation Status

Implemented:

```text
✅ Prisma installed
✅ Prisma 7.10.0 configured
✅ Supabase PostgreSQL connected
✅ PostgreSQL adapter installed
✅ runtime DATABASE_URL configured
✅ Prisma CLI DIRECT_URL configured
✅ prisma.config.ts created
✅ prisma/schema.prisma created
✅ Prisma Client generation configured
✅ generated client stored in src/generated/prisma
✅ shared Prisma Client created
✅ src/app/api structure created
✅ /api/health endpoint implemented
✅ actual database connection tested
✅ .env configuration prepared
✅ .env.example prepared
✅ secrets excluded from Git
✅ Prisma validation passing
✅ lint passing
✅ production build passing
```

---

# 34. Important Team Rule

Before a teammate starts implementing a backend feature, run:

```bash
npm install
npx prisma validate
npx prisma generate
npm run dev
```

Then test:

```text
http://localhost:3000/api/health
```

You must receive:

```json
{
  "status": "ok",
  "database": "connected"
}
```

If `/api/health` fails:

```text
STOP
```

Do not start feature API development.

Fix the local database configuration first.

---

# 35. Security Reminder

Never expose:

```text
DATABASE_URL
DIRECT_URL
database password
Supabase service-role key
private API keys
```

Never paste project secrets:

- into GitHub issues
- into Pull Requests
- into README files
- into screenshots
- into source files
- into frontend code

Use environment variables.

---

# 36. Quick Setup Summary

For a teammate joining backend development:

```bash
git switch main

git pull origin main

npm install

npx prisma validate

npx prisma generate

npm run dev
```

Then visit:

```text
http://localhost:3000/api/health
```

Expected:

```json
{
  "status": "ok",
  "database": "connected"
}
```

Then create your assigned backend branch:

```bash
git switch -c backend/<task-name>
```

---

# 37. Quick Pre-PR Checklist

Before every backend Pull Request:

```bash
npx prisma validate
npm run lint
npm run build
git status
```

Verify:

```text
✅ No secrets
✅ No .env
✅ No unrelated files
✅ No manual edits to generated Prisma files
✅ Prisma valid
✅ lint clean
✅ build successful
```

---

# Pathly Backend Foundation

The backend foundation establishes one shared backend environment for the entire Pathly team.

The goal is that every developer works from the same architecture:

```text
Next.js
   ↓
Route Handlers
   ↓
Server Logic
   ↓
Prisma
   ↓
Supabase PostgreSQL
```

Once this setup is available on `main`, the team can safely continue with the shared database schema, seed data, API core, and individual backend feature APIs.
