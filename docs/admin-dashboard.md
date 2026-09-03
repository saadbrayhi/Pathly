# Pathly Admin Dashboard — Feature Documentation

> **Branch:** `feature/admin-dashboard`  
> **GitHub Issue:** #21  
> **Status:** Complete — lint ✅ build ✅ all API tests ✅

---

## Table of Contents

1. [What Was Built](#1-what-was-built)
2. [How to Access the Admin Dashboard](#2-how-to-access)
3. [Architecture Overview](#3-architecture-overview)
4. [File Structure](#4-file-structure)
5. [Backend Changes](#5-backend-changes)
6. [API Endpoints Added](#6-api-endpoints-added)
7. [Frontend (Admin UI) Components](#7-frontend-components)
8. [Admin Pages](#8-admin-pages)
9. [Data Flow Walkthrough](#9-data-flow-walkthrough)
10. [Validation Rules](#10-validation-rules)
11. [Design Decisions](#11-design-decisions)
12. [What Was NOT Changed](#12-what-was-not-changed)
13. [Known Limitations](#13-known-limitations)
14. [Manual QA Checklist](#14-manual-qa-checklist)

---

## 1. What Was Built

A fully functional, unauthenticated **admin dashboard** at `/admin` that lets you manage the countries and scholarships that power Pathly's public pages.

### Features at a glance

| Feature | Countries | Scholarships |
|---|---|---|
| List all records (real DB) | ✅ | ✅ |
| Search / filter | ✅ | ✅ |
| Create new record | ✅ | ✅ |
| Edit existing record | ✅ | ✅ |
| Delete with confirmation | ✅ | ✅ |
| Responsive (mobile cards) | ✅ | ✅ |
| Loading states | ✅ | ✅ |
| Error states | ✅ | ✅ |

The dashboard is intentionally **unauthenticated** at this stage (bootcamp/demo scope). It is not linked from any public navigation — you reach it by going directly to `/admin`.

---

## 2. How to Access

```
http://localhost:3000/admin            ← Dashboard overview
http://localhost:3000/admin/countries  ← Countries management
http://localhost:3000/admin/scholarships ← Scholarships management
```

> **Not linked anywhere public.** The Navbar, Footer, and Home page are completely untouched.

---

## 3. Architecture Overview

The feature follows the **exact same layered architecture** that already existed in the project:

```
Browser (React / TanStack Query)
        │
        │  HTTP (axios)
        ▼
Next.js Route Handler  (src/app/api/...)
        │
        ▼
Service Layer          (src/server/services/...)
        │  Business rules, 404/409 guards
        ▼
Repository Layer       (src/server/repositories/...)
        │  Prisma queries only
        ▼
Prisma Client          (src/lib/prisma.ts)
        │
        ▼
PostgreSQL / Supabase
```

### Reused project infrastructure

| Helper | Where it lives | What it does |
|---|---|---|
| `withApiHandler` | `src/server/api/handler.ts` | Wraps route handlers, catches all errors |
| `successResponse` | `src/server/api/response.ts` | Returns `{ success: true, data }` |
| `errorResponse` / `ApiError` | `src/server/api/errors.ts` | Standardised error responses |
| `parseJsonBody` | `src/server/validation/request.ts` | Parses + Zod-validates POST/PUT bodies |
| `api` (axios instance) | `src/lib/axios.ts` | Client-side HTTP, shared base URL |
| `prisma` | `src/lib/prisma.ts` | Singleton Prisma client |
| `Country` / `CountryDetails` interfaces | `src/interfaces/country.ts` | Shared types |
| `ThemeToggle` | `src/components/theme/ThemeToggle.tsx` | Used in sidebar |
| `Button`, `Card` | `src/components/shared/` | Used in overview page |

---

## 4. File Structure

### New files created

```
src/
├── app/
│   └── admin/
│       ├── layout.tsx                  ← Admin shell layout (sidebar + main)
│       ├── page.tsx                    ← /admin overview page
│       ├── countries/
│       │   └── page.tsx                ← /admin/countries page
│       └── scholarships/
│           └── page.tsx                ← /admin/scholarships page
│
└── components/
    └── admin/
        ├── AdminSidebar.tsx            ← Desktop sidebar + mobile drawer
        ├── AdminOverview.tsx           ← Dashboard home: stat cards + quick actions
        ├── AdminPageHeader.tsx         ← Eyebrow / title / description / action slot
        ├── AdminFormField.tsx          ← AdminInput, AdminTextarea, AdminFormSection
        ├── CountriesAdmin.tsx          ← Full countries CRUD interface
        ├── ScholarshipsAdmin.tsx       ← Full scholarships CRUD interface
        ├── CountryForm.tsx             ← Country create/edit form
        ├── ScholarshipForm.tsx         ← Scholarship form + country multi-select
        ├── StatCard.tsx                ← Dashboard metric card
        ├── DataTable.tsx               ← Responsive table wrapper
        ├── Modal.tsx                   ← Accessible modal dialog
        ├── ConfirmDialog.tsx           ← Delete confirmation dialog
        └── apiError.ts                 ← Extracts readable messages from Axios errors
```

### Files modified (backend — existing files extended)

```
src/server/
├── repositories/
│   ├── countryRepository.ts       ← Added: createCountry, updateCountry,
│   │                                         deleteCountry, countCountries
│   └── scholarshipRepository.ts   ← Added: createScholarship, updateScholarship,
│                                            deleteScholarship, countScholarships
├── services/
│   ├── countryService.ts          ← Added: createCountry, updateCountry,
│   │                                         deleteCountry, getTotalCountries
│   └── scholarshipService.ts      ← Added: createScholarship, updateScholarship,
│                                            deleteScholarship, getTotalScholarships
└── validation/
    ├── country.ts                 ← Added: createCountrySchema, updateCountrySchema
    └── scholarship.ts             ← Added: createScholarshipSchema, updateScholarshipSchema

src/app/api/
├── countries/
│   ├── route.ts                   ← Added: POST handler
│   └── [slug]/route.ts            ← Added: PUT, DELETE handlers
└── scholarships/
    ├── route.ts                   ← Added: POST handler
    └── [slug]/route.ts            ← Added: PUT, DELETE handlers

src/services/
├── countryApi.ts                  ← Added: adminCreateCountry, adminUpdateCountry,
│                                            adminDeleteCountry
└── scholarship.ts                 ← Added: adminCreateScholarship, adminUpdateScholarship,
                                            adminDeleteScholarship
```

---

## 5. Backend Changes

### 5.1 Repository Layer

Repositories only contain **Prisma queries** — no business logic.

#### `countryRepository.ts` — new functions

```typescript
// Create a new country
createCountry(input: CreateCountryInput): Promise<Country>

// Update a country by its current slug
updateCountry(slug: string, input: UpdateCountryInput): Promise<Country>

// Delete a country (cascades related records per Prisma schema)
deleteCountry(slug: string): Promise<Country>

// Return total count of countries
countCountries(): Promise<number>
```

`CreateCountryInput` accepts: `name`, `slug`, `flag`, `image`, `description`, `languages`, `tuition`, `livingCost`, `tuitionRange`, `overview`, `mainLanguage`, `livingCostSummary`, `educationSystem`, `whoCanApply`, `eligibilityWarning`, `languageWarning`, `languageOptions[]`, `studyLevelOptions[]`

`UpdateCountryInput` = all fields of `CreateCountryInput` made optional.

#### `scholarshipRepository.ts` — new functions

```typescript
createScholarship(input: CreateScholarshipInput): Promise<Scholarship>
updateScholarship(slug: string, input: UpdateScholarshipInput): Promise<Scholarship>
deleteScholarship(slug: string): Promise<Scholarship>
countScholarships(): Promise<number>
```

`CreateScholarshipInput` accepts: `title`, `slug`, `image`, `flag`, `scopeLabel`, `provider`, `level`, `field`, `funding`, `overview`, `whoCanApply`, `eligibilityNote`, `fundingCoverage`, `fundingNote`, `officialUrl`, `countryIds[]`

> `countryIds` is an array of existing Country UUIDs. The repo uses Prisma's `{ connect: [...] }` / `{ set: [...] }` relation syntax to link/update them.

---

### 5.2 Service Layer

Services sit between routes and repositories. They enforce **business rules**:

| Situation | HTTP status | Error code |
|---|---|---|
| Record not found on PUT/DELETE | 404 | `NOT_FOUND` |
| Duplicate `name` or `slug` on POST/PUT | 409 | `CONFLICT` |
| Unexpected Prisma error | 500 | `INTERNAL_ERROR` |

Duplicate detection uses Prisma error code `P2002` (unique constraint violation).

```typescript
// countryService.ts — example
export async function updateCountry(slug: string, input: UpdateCountryInput) {
  const existing = await findCountryBySlug(slug);   // → 404 if missing
  if (!existing) throw new ApiError({ status: 404, ... });

  try {
    return await repoUpdate(slug, input);
  } catch (err) {
    if (isUniqueConstraintError(err))               // → 409 if duplicate
      throw new ApiError({ status: 409, ... });
    throw err;                                      // → 500 via withApiHandler
  }
}
```

---

### 5.3 Validation Layer (Zod)

All incoming `POST` / `PUT` bodies are validated with **Zod** via the existing `parseJsonBody` helper before reaching the service.

#### Country schemas

```typescript
createCountrySchema = z.object({
  name:  z.string().trim().min(1, "Name is required").max(100),
  slug:  z.string().trim().min(1).max(100).regex(/^[a-z0-9-]+$/),
  flag:  z.string().trim().max(10).optional().nullable(),
  image: z.string().trim().url().optional().nullable(),
  // ... all other optional nullable string fields
  languageOptions:   z.array(z.string().trim().min(1)).optional(),
  studyLevelOptions: z.array(z.string().trim().min(1)).optional(),
})

updateCountrySchema = createCountrySchema.partial()  // all fields optional
```

#### Scholarship schemas

```typescript
createScholarshipSchema = z.object({
  title:     z.string().trim().min(1, "Title is required").max(300),
  slug:      z.string().trim().min(1).max(100).regex(/^[a-z0-9-]+$/),
  officialUrl: z.string().trim().url().optional().nullable(),
  countryIds:  z.array(z.string().uuid()).optional(),
  // ... all other optional nullable string fields
})

updateScholarshipSchema = createScholarshipSchema.partial()
```

Validation errors return **HTTP 400** with field-level details:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the submitted fields.",
    "details": {
      "fieldErrors": { "name": ["Name is required"] }
    }
  }
}
```

---

## 6. API Endpoints Added

> All existing `GET` endpoints are completely unchanged.

### Countries

| Method | Endpoint | Body | Response |
|---|---|---|---|
| `POST` | `/api/countries` | `CreateCountryBody` | `201` created country |
| `PUT` | `/api/countries/:slug` | `UpdateCountryBody` (partial) | `200` updated country |
| `DELETE` | `/api/countries/:slug` | — | `200 { success: true, data: null }` |

### Scholarships

| Method | Endpoint | Body | Response |
|---|---|---|---|
| `POST` | `/api/scholarships` | `CreateScholarshipBody` | `201` created scholarship |
| `PUT` | `/api/scholarships/:slug` | `UpdateScholarshipBody` (partial) | `200` updated scholarship |
| `DELETE` | `/api/scholarships/:slug` | — | `200 { success: true, data: null }` |

### Error response shape (all endpoints)

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND | CONFLICT | VALIDATION_ERROR | INTERNAL_ERROR",
    "message": "Human-readable message"
  }
}
```

---

## 7. Frontend Components

All admin components live under `src/components/admin/` and are **completely isolated** from the public site components.

### `AdminSidebar.tsx`
- Desktop: fixed left sidebar (256px wide), hidden on mobile
- Mobile: top header bar with hamburger → slide-in drawer
- Shows: Pathly logo, "Administration" label, nav links (Overview / Countries / Scholarships), demo warning badge, theme toggle
- Active link highlighted with `bg-soft-blue text-primary`

### `AdminOverview.tsx`
- Uses **TanStack Query** (`useQuery`) to fetch live counts from the existing GET APIs
- Shows two `StatCard` components: Total Countries + Total Scholarships
- Shows loading (`—` placeholder), error (retry button), and live (`✓ Live data`) states
- Quick action cards link to `/admin/countries?action=new` and `/admin/scholarships?action=new`

### `CountriesAdmin.tsx` / `ScholarshipsAdmin.tsx`
- Client components with full CRUD state management
- Search bar filters the list client-side (no extra API calls)
- **Desktop:** `DataTable` with sortable-looking columns
- **Mobile:** stacked article cards (table is hidden with `md:hidden`)
- Success notices appear as dismissible banners after mutations
- Errors from the API are shown inside the modal form

### `Modal.tsx`
- Covers viewport with a semi-transparent backdrop
- Closes on `Escape` key or backdrop click (blocked during save)
- Traps scroll on body while open
- ARIA: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`

### `ConfirmDialog.tsx`
- Separate z-index layer above the modal (`z-[300]`)
- ARIA: `role="alertdialog"`
- Shows a red `AlertTriangle` icon, title, description
- "Delete" button turns red; disabled + shows "Deleting…" while request is in flight

### `CountryForm.tsx`
- Auto-generates slug from name (can be manually overridden)
- Client-side validation before the API call
- `languageOptions` and `studyLevelOptions` entered as comma-separated strings, split into arrays on submit
- Fields: name, flag emoji, slug, image URL, description, languages summary, language options, study levels, tuition, tuition range, living cost

### `ScholarshipForm.tsx`
- Same slug auto-generation pattern
- Country selector: scrollable grid of checkboxes with flag + name. Checked countries turn blue.
- Fields: title, slug, flag, provider, destination label (scopeLabel), degree/level, field, funding, funding coverage, funding note, image URL, official URL, overview, who can apply, eligibility note

### `AdminFormField.tsx`
Custom admin-specific form primitives (not reusing public `Input`/`Select` to avoid coupling):
- `AdminInput` — label + input + error/hint message
- `AdminTextarea` — same but textarea with `resize-y`
- `AdminFormSection` — `<fieldset>` wrapper with legend + optional description

---

## 8. Admin Pages

### `app/admin/layout.tsx`
```tsx
// Uses fixed inset-0 z-[100] to overlay the public Navbar/Footer
// from the root layout — zero changes to app/layout.tsx
<div className="fixed inset-0 z-[100] flex overflow-hidden bg-page">
  <AdminSidebar />
  <main className="min-w-0 flex-1 overflow-y-auto pt-16 lg:pt-0">
    <div className="mx-auto w-full max-w-7xl px-4 py-7 ...">
      {children}
    </div>
  </main>
</div>
```

### `app/admin/page.tsx`
Simple delegation: `<AdminOverview />`

### `app/admin/countries/page.tsx`
```tsx
// Server component — reads ?action=new to auto-open create modal
export default async function CountriesAdminPage({ searchParams }) {
  const params = await searchParams;
  return <CountriesAdmin openCreateOnLoad={params.action === "new"} />;
}
```

### `app/admin/scholarships/page.tsx`
Same pattern as countries page.

---

## 9. Data Flow Walkthrough

### Creating a country (end-to-end)

```
1. User clicks "Add country" button
   → CountriesAdmin sets isFormOpen=true

2. Modal opens with CountryForm (blank state)

3. User fills in name → slug auto-populates
   User fills optional fields, clicks "Add country"

4. CountryForm validates client-side
   → if errors: shows field messages, no API call

5. CountryForm calls onSubmit(payload)
   → CountriesAdmin calls adminCreateCountry(payload)
   → axios.post('/api/countries', payload)

6. Route handler: POST /api/countries
   → parseJsonBody validates with createCountrySchema (Zod)
   → calls countryService.createCountry(body)
   → calls countryRepository.createCountry(input)
   → prisma.country.create({ data: ... })
   → returns { success: true, data: newCountry }

7. Back in CountriesAdmin:
   → invalidates ["admin", "countries"] query
   → TanStack Query re-fetches, table updates
   → Modal closes, success notice appears
```

### Deleting a country (end-to-end)

```
1. User clicks trash icon on a country row
   → CountriesAdmin sets deletingCountry = that country

2. ConfirmDialog appears:
   "Delete France? This will permanently remove..."

3. User clicks "Delete"
   → confirmDelete() is called
   → axios.delete('/api/countries/france')

4. Route handler: DELETE /api/countries/[slug]
   → countryService.deleteCountry(slug)
   → checks findCountryBySlug → 404 if not found
   → countryRepository.deleteCountry(slug)
   → prisma.country.delete({ where: { slug } })
   → Prisma cascades delete to: AdmissionRequirement,
     StudyLevelDetail, LanguageRequirement, OfficialSource
     (as defined in the existing Prisma schema)

5. Back in CountriesAdmin:
   → query invalidated → table re-fetches
   → success notice: "France was deleted."
```

---

## 10. Validation Rules

### Country

| Field | Rule |
|---|---|
| `name` | Required, max 100 chars |
| `slug` | Required, max 100, must match `/^[a-z0-9-]+$/` |
| `flag` | Optional, max 10 chars (emoji) |
| `image` | Optional, must be valid URL if provided |
| `languageOptions` | Array of non-empty strings |
| `studyLevelOptions` | Array of non-empty strings |
| All other string fields | Optional, nullable, max varies 200–5000 |

### Scholarship

| Field | Rule |
|---|---|
| `title` | Required, max 300 chars |
| `slug` | Required, max 100, must match `/^[a-z0-9-]+$/` |
| `officialUrl` | Optional, must be valid URL if provided |
| `countryIds` | Array of valid UUIDs |
| All other string fields | Optional, nullable |

### Uniqueness (enforced at DB level, caught in service)

- `Country.name` — unique
- `Country.slug` — unique
- `Scholarship.slug` — unique

Duplicate violations return **HTTP 409 Conflict**.

---

## 11. Design Decisions

### Layout isolation — why `fixed inset-0 z-[100]`?

The root `app/layout.tsx` always renders `<Navbar />` and `<Footer />` around all children. Rather than modifying that shared file (which would risk breaking public pages), the admin layout uses `position: fixed; inset: 0; z-index: 100` to create a full-viewport overlay that visually covers the public shell entirely. Zero changes to public layout files.

### Client-side data fetching vs server-side

The admin pages use **TanStack Query** (`useQuery`) for data fetching rather than server-side `fetch` inside RSCs, because:
- The CRUD operations need to invalidate and refetch after mutations
- Loading/error/retry states are much cleaner to manage client-side
- The existing public pages already use this pattern for the same APIs

### Slug auto-generation

When typing a name in the form, the slug is automatically derived using:
```typescript
name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
```
Once the user manually edits the slug field, auto-generation stops (tracked via `slugWasEdited` state).

### Mobile cards vs desktop table

`DataTable` is hidden on mobile (`hidden md:block`). Below the table, a duplicate list of article-card elements is shown (`grid gap-3 md:hidden`). Both are driven by the same `filteredCountries` / `filteredScholarships` array — no duplication of logic.

---

## 12. What Was NOT Changed

These files and features are **completely untouched**:

- `src/app/layout.tsx` — root layout with Navbar/Footer
- `src/components/shared/Navbar.tsx` — no admin links added
- `src/components/shared/Footer.tsx` — no admin links added
- `src/app/page.tsx` — home page
- `src/app/study-abroad/` — public study-abroad pages
- `src/app/scholarship/` — public scholarship pages
- `src/app/documents/` — public document pages
- `src/app/search/` — search page
- `prisma/schema.prisma` — no schema changes, no migrations
- `prisma/seed/` — seed data untouched
- All existing `GET` API handlers — logic unchanged
- `src/services/scholarship.ts` `fetchScholarships` / `fetchScholarshipBySlug` — unchanged
- `src/services/countryApi.ts` `fetchCountries` / `fetchCountryBySlug` — unchanged

---

## 13. Known Limitations

| Limitation | Reason | Future fix |
|---|---|---|
| No authentication | Out of scope for this issue | Add Next.js middleware that checks a session/JWT |
| Scholarship deadlines read-only | `ScholarshipDeadline` is a separate relation not in the current write contract | Add deadline CRUD in a follow-up |
| `verificationStatus` not editable in form | It's a Prisma enum — needs a select field + validation | Add to scholarship form |
| No pagination on admin tables | Dataset is small currently | Add `parsePagination` helper (already exists in the project) |
| No image upload | Image fields are URLs only | Integrate file storage (S3/Supabase Storage) |
| No `featured` toggle on scholarships | No `featured` boolean in Prisma schema | Add schema field + migration if needed |

---

## 14. Manual QA Checklist

Run `npm run dev` and open `http://localhost:3000`.

### Admin routes

- [ ] `/admin` loads → stat cards show real counts (7 countries, 6 scholarships)
- [ ] Clicking "Countries" in sidebar → navigates to `/admin/countries`
- [ ] Clicking "Scholarships" in sidebar → navigates to `/admin/scholarships`
- [ ] "Add country" quick-action → opens `/admin/countries?action=new` with modal pre-opened
- [ ] "Add scholarship" quick-action → same for scholarships

### Countries CRUD

- [ ] Table loads with all 7 seeded countries and their flags
- [ ] Search for "fra" → filters to France
- [ ] Click **Edit** on France → modal opens pre-filled with France's data
- [ ] Change `tuition` to a new value → Save → value updates in table
- [ ] Click **Add country** → fill name + slug → Add → appears in table
- [ ] Click **Delete** on the test country → confirm dialog appears
- [ ] Confirm delete → country removed from table
- [ ] `/api/countries` still returns 7 original countries

### Scholarships CRUD

- [ ] Table loads with all 6 seeded scholarships
- [ ] Search "eiffel" → filters correctly
- [ ] Edit a scholarship → change `provider` → Save → updates in table
- [ ] Add a new scholarship with a linked country → appears in table with country flag
- [ ] Delete the test scholarship → removed from table
- [ ] `/api/scholarships` still returns 6 original scholarships

### Public pages (no regression)

- [ ] `/study-abroad` — loads country cards
- [ ] `/study-abroad/france` — loads France detail page
- [ ] `/scholarship` — loads scholarship list
- [ ] `/scholarship/[slug]` — loads scholarship detail
- [ ] `/documents` — loads document list
- [ ] `/search` — search page works

### Responsive

- [ ] Mobile viewport: sidebar hidden, hamburger menu visible
- [ ] Tap hamburger → mobile drawer slides in
- [ ] Tap a nav link → drawer closes, navigates correctly
- [ ] Countries/scholarships show card layout (not table) on mobile

---

## Appendix — Quick API Examples

### Create a country

```bash
curl -X POST http://localhost:3000/api/countries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Portugal",
    "slug": "portugal",
    "flag": "🇵🇹",
    "languages": "Portuguese",
    "tuition": "From €697/year",
    "livingCost": "€700–€900/month",
    "languageOptions": ["Portuguese", "English"],
    "studyLevelOptions": ["Bachelor", "Master", "PhD"]
  }'
```

### Update a country

```bash
curl -X PUT http://localhost:3000/api/countries/portugal \
  -H "Content-Type: application/json" \
  -d '{ "description": "Updated description." }'
```

### Delete a country

```bash
curl -X DELETE http://localhost:3000/api/countries/portugal
```

### Create a scholarship

```bash
curl -X POST http://localhost:3000/api/scholarships \
  -H "Content-Type: application/json" \
  -d '{
    "title": "FCT Scholarship",
    "slug": "fct-scholarship",
    "provider": "FCT Portugal",
    "level": "PhD",
    "field": "Science & Technology",
    "funding": "Fully funded",
    "officialUrl": "https://www.fct.pt"
  }'
```

---

*Documentation generated for the `feature/admin-dashboard` branch — Pathly project.*
