# Project Context

## Overview

This is a React Native / Expo project ("WordRizz") using Expo Router, NativeWind (Tailwind), and Zustand for state management. It targets Android and iOS.

## Architecture

- **Navigation**: Expo Router (File-based routing).
- **Styling**: NativeWind (Tailwind CSS) + `src/global.css`.
- **State Management**: Zustand stores in `src/lib/auth` and `src/store`.
- **Auth Pattern**: Reactive Root Layout in `src/app/_layout.tsx` listening to `useAuth` status.

## Key Decisions & Conventions

- **Root Layout Protection**: Authentication protection is handled centrally in `src/app/_layout.tsx` rather than individually in screens.
- **Line Limits**: Strict linting rule of 90 lines per function.
- **File Naming**: Kebab-case for filenames (e.g., `use-register-logic.ts`), PascalCase for components.

## Recent Changes

- **Register Component Refactor**: Extracted `FormField` and `ErrorBanner` to `src/components/ui` to reduce `register.tsx` line count.
- **Login Redirection Fix**:
  - Implemented Reactive Root Layout pattern.
  - Removed imperative `navigation.dispatch` from `login.tsx` and `register.tsx` to fix race conditions and infinite loops.
  - Removed redundant redirects in `(app)/_layout.tsx`.

## Current State

- Auth flow is fully functional and reactive.
- Register component is compliant with linting rules.
- `use-register-logic.ts` is correctly named and imported.
