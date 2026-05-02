# Project 1

This folder contains the first internal PRD workspace for TaskFlow.

## Run It Locally

From inside this folder:

```bash
npm install
npm run dev
```

## Scope

- Internal tool for project, task, and notification management.
- Feature-based structure under `src/features`.
- Shared code under `src/shared`.
- App entry points under `src/app`.

## PRD Highlights

- Next.js for routing and SSR.
- Feature-based architecture.
- Zustand for state.
- Axios for data fetching.
- Tailwind CSS as the styling choice in the PRD.

## Modules

- Auth
- Projects
- Tasks
- Reports
- Notifications

## Open Questions

- Authentication flow.
- Notification transport.
- Report export format.