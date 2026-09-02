# Pathly API Core

The API core defines shared conventions for all Pathly backend endpoints.

## Directory responsibilities

- `src/app/api`: HTTP Route Handlers.
- `src/server/api`: Response, error, handler, pagination, and query helpers.
- `src/server/validation`: Request validation helpers.
- `src/server/services`: Business logic.
- `src/server/repositories`: Prisma database access.
- `src/lib/prisma.ts`: Shared server-only Prisma client.

## Request flow

Route Handler -> Validation -> Service -> Repository -> Prisma -> Supabase PostgreSQL

## Route Handlers

Route Handlers should only:

- Read HTTP requests.
- Validate request data.
- Call services.
- Return shared API responses.

Routes must not contain Prisma queries or business logic.

## Services

Services contain business rules and coordinate repositories.

Services must not create HTTP responses or access Prisma directly.

## Repositories

Repositories contain Prisma database queries.

They are server-only and must not be imported into Client Components.

## Validation

All request bodies and query parameters are untrusted until validated.

Use `parseJsonBody()` with a Zod schema for JSON request bodies.

Use `parseQuery()` with a feature-specific Zod schema for URL filters.

## Successful responses

Use `successResponse()`.

A successful response follows this structure:

    {
      "success": true,
      "data": {},
      "meta": {}
    }

The `meta` property is optional and is mainly used for pagination.

## Error responses

Use `ApiError` for expected errors.

An error response follows this structure:

    {
      "success": false,
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Please check the submitted fields.",
        "details": {}
      }
    }

Unexpected errors are logged on the server and returned as `INTERNAL_ERROR`.
Stack traces and database details must never be sent to clients.

## Error handling

Wrap Route Handlers with `withApiHandler()`.

The wrapper catches thrown errors and converts them to the shared error format.

## Pagination

Use `parsePagination()` to validate `page` and `pageSize` and calculate
Prisma-compatible `skip` and `take` values.

Use `createPaginationMeta()` to return page information to clients.

## Prisma safety

`src/lib/prisma.ts` imports `server-only`.

Client Components and browser code must never import Prisma, repositories, or
services that access repositories.

Database credentials must remain in ignored environment files.

## Health endpoint

`GET /api/health` verifies that Pathly can connect to PostgreSQL.

Its flow is:

Health route -> Health service -> Health repository -> Prisma -> Supabase

## Verification

Before opening a pull request, run:

- `npm run lint`
- `npm run build`

Then verify `GET /api/health`.