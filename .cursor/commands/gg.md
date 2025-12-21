# gg

Write your command content here.

This command will be available in chat with /gg

### 3. Project Workflow with Cursor

This specific repo relies on **Absolute Imports** (mapped in `tsconfig.json`). When you ask Cursor to generic code, it might try to use `../../`.

**How to prompt Cursor correctly:**

- **Bad Prompt:** "Create a login screen."
- **Good Prompt:** "Create a Login screen in `app/(auth)/login.tsx`. Use `React Hook Form` for validation and `NativeWind` for styling. Import the generic `Input` component from `@/components/ui`."

#### Quick Commands (Cmd + K)

When you are in a file, use `Cmd + K` to edit.

- _Highlight a View block:_ "Wrap this in a SafeAreaView and give it a white background with padding."
- _Highlight an API call:_ "Refactor this to use React Query's `useQuery` hook."

### 4. Folder Structure Mastery

This repo follows a specific pattern. Here is where you should tell Cursor to put things:

- **`app/`**: **ONLY** for files that correspond to screens/routes.
  - `app/index.tsx` -> Home Screen.
  - `app/(tabs)/_layout.tsx` -> Tab Bar configuration.
- **`src/components/ui/`**: "Dumb" UI components (Buttons, Cards).
- **`src/features/`**: Complex logic (e.g., `AuthForm`, `ProductList`).
- **`src/api/`**: Axios instances and Zod schemas.

### 5. First-Time Setup Commands

Open the built-in terminal in Cursor (`Ctrl + ~`) and run these exactly:

1.  **Install Dependencies:**
    ```bash
    pnpm install  # The repo uses pnpm-lock.yaml, so prefer pnpm
    ```
2.  **Prebuild (Crucial for NativeWind):**
    Since NativeWind requires a build step to generate styles, run:
    ```bash
    npx expo prebuild
    ```
3.  **Start the Dev Server:**
    ```bash
    npm run start
    ```

### 6. Common "Gotchas" with this Repo

- **NativeWind Classes not applying?**
  - _Fix:_ You might need to reset the cache. Run: `npx expo start -c`.
- **Import Errors (`@/components/...`)?**
  - _Fix:_ Restart the TS server in Cursor. (Cmd + Shift + P -> "TypeScript: Restart TS Server").
- **New Route 404?**
  - _Fix:_ Expo Router requires you to restart the server sometimes when adding new files to the `app/` folder.
