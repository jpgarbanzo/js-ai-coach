# Deployment Guide

This document describes how the JS AI Coach application is built and deployed to GitHub Pages.

## Live URL

https://jpgarbanzo.github.io/js-ai-coach/

---

## Prerequisites

| Tool | Minimum version | Notes |
|------|-----------------|-------|
| Node.js | 20.x | Use `.nvmrc` with `nvm use` to pin the version |
| npm | 10.x | Bundled with Node 20 |
| Git | Any recent version | Required for version control and CI |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev
# App is available at http://localhost:5173/js-ai-coach/

# 3. Run tests (single pass)
npm test

# 4. Run tests in watch mode
npm run test:watch

# 5. Run tests with coverage report
npm run test:coverage

# 6. Check linting
npm run lint

# 7. Auto-fix lint issues
npm run lint:fix

# 8. Format code with Prettier
npm run format

# 9. Build for production (output goes to dist/)
npm run build

# 10. Preview the production build locally
npm run preview
# Preview is available at http://localhost:4173/js-ai-coach/
```

---

## How GitHub Actions Deploys Automatically

Every push to the `main` branch triggers the workflow defined in
`.github/workflows/deploy.yml`. The workflow runs two jobs:

### Job 1: `build`

1. Checks out the repository.
2. Sets up Node.js 20 with npm dependency caching.
3. Runs `npm ci` to install exact dependency versions from `package-lock.json`.
4. Runs `npm run lint` (lint warnings do not block the build — `|| true`).
5. Runs `npm test` (vitest run). A test failure **will** abort the deployment.
6. Runs `npm run build` with the environment variable `VITE_BUILD_TIME` set to
   the GitHub Actions run ID for cache-busting purposes.
7. Configures GitHub Pages and uploads the `dist/` directory as a Pages artifact.

### Job 2: `deploy`

Depends on `build`. Downloads the artifact and publishes it to the
`github-pages` environment using the official `actions/deploy-pages@v4` action.
The final page URL is available as a step output and is shown in the GitHub
Actions log.

### Concurrency

Only one deployment runs at a time. If a new push arrives while a deployment is
in progress the older run is cancelled to avoid race conditions:

```yaml
concurrency:
  group: pages
  cancel-in-progress: true
```

---

## Enabling GitHub Pages in Repository Settings

Before the first deployment succeeds you must configure GitHub Pages to use
GitHub Actions as the source:

1. Open the repository on GitHub: https://github.com/jpgarbanzo/js-ai-coach
2. Go to **Settings** > **Pages** (left sidebar, under "Code and automation").
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Save. No branch or folder selection is required when using Actions.

The repository also needs the following **permissions** for the Actions workflow
(already set in `deploy.yml`):

- `contents: read`
- `pages: write`
- `id-token: write`

These are granted automatically to the `GITHUB_TOKEN` when you select "GitHub
Actions" as the Pages source.

---

## Cache Busting

Vite produces content-hashed output filenames by default, for example:

```
dist/assets/index-B3kR9xZp.js
dist/assets/index-C7mLqYts.css
dist/assets/react-DnRpXeQv.js
dist/assets/codemirror-Hq2ZvFsA.js
```

The hash changes whenever the file content changes. Browsers and CDN caches will
automatically fetch the new file because the URL is different. Files that have
not changed keep the same hash and remain cached, which improves load
performance for returning visitors.

In addition, the `VITE_BUILD_TIME` environment variable is set to
`${{ github.run_id }}` during CI builds. This value is embedded in the compiled
JavaScript and can be surfaced in the UI or used for version diagnostics.

### Accessing the build timestamp in code

```js
const buildTime = import.meta.env.VITE_BUILD_TIME ?? 'local';
console.log('Build ID:', buildTime);
```

---

## Manual Deployment Steps

If you need to deploy without GitHub Actions (e.g., from a local machine):

```bash
# 1. Make sure you are on main and it is up to date
git checkout main
git pull origin main

# 2. Install dependencies
npm ci

# 3. Build
VITE_BUILD_TIME=$(date +%s) npm run build

# 4. Deploy using the gh CLI (requires gh auth login)
gh api repos/jpgarbanzo/js-ai-coach/pages \
  --method POST \
  --field source='{"branch":"main","path":"/"}'

# --- OR deploy the dist/ folder to the gh-pages branch manually ---

# Install the deploy helper (once)
npm install -g gh-pages

# Push dist/ to the gh-pages branch
npx gh-pages -d dist
```

> Note: When deploying manually via `gh-pages`, make sure the GitHub Pages
> source is set to the `gh-pages` **branch** (not "GitHub Actions") in the
> repository settings.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_BUILD_TIME` | No | Set by CI to the GitHub Actions run ID. Accessible at runtime via `import.meta.env.VITE_BUILD_TIME`. |

All Vite environment variables must be prefixed with `VITE_` to be exposed to
the client bundle. Variables without this prefix are only available at build
time and are not included in the output.

---

## Checking Deployment Status

### Via GitHub UI

1. Open https://github.com/jpgarbanzo/js-ai-coach/actions
2. Click the most recent **"Deploy to GitHub Pages"** workflow run.
3. Expand the **deploy** job to see the published URL.

### Via gh CLI

```bash
# List recent workflow runs
gh run list --workflow=deploy.yml

# Watch a specific run in real time
gh run watch <run-id>

# View a completed run's logs
gh run view <run-id> --log
```

### Via the deployments page

https://github.com/jpgarbanzo/js-ai-coach/deployments/activity_log?environment=github-pages

---

## Troubleshooting Deployment Issues

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| "Permissions" error in deploy job | Pages source not set to GitHub Actions | See "Enabling GitHub Pages" section above |
| Build fails on `npm test` | A test regression was introduced | Fix the failing test before merging to main |
| `dist/` is empty | `npm run build` failed silently | Check the build step logs for Rollup/Vite errors |
| 404 on all routes after deploy | `base` in `vite.config.js` mismatch | Confirm `base: '/js-ai-coach/'` is set |
| Old version still served | CDN / browser cache | Content-hashed filenames should prevent this; hard-reload with Ctrl+Shift+R |
| Deploy job skipped | Concurrency group cancelled the run | Push again or trigger manually via `workflow_dispatch` |

For browser-side and AI model issues see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
