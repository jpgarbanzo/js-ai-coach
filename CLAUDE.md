# CLAUDE.md — JS AI Coach Project North Star

## Project Purpose

JS AI Coach is an interactive JavaScript learning platform that teaches JS through structured lessons and hands-on exercises. An AI coaching layer (powered by Transformers.js running locally in the browser via ONNX/WebAssembly) provides hints and feedback without requiring any backend server. The app runs entirely client-side and deploys to GitHub Pages.

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 (no TypeScript — plain JS/JSX only) |
| Build Tool | Vite 6 |
| Code Editor | CodeMirror 6 via @uiw/react-codemirror |
| AI / Inference | @huggingface/transformers (ONNX, runs in-browser) |
| Testing | Vitest + @testing-library/react + jsdom |
| Linting | ESLint 9 (flat config) + eslint-plugin-react + eslint-plugin-react-hooks |
| Formatting | Prettier |
| Deployment | GitHub Pages via GitHub Actions |

## Architecture

### Views (state-based routing — no React Router)

```
App
├── Navigation          — top nav bar, model selector
├── HomePage            — lesson list / landing page
├── LessonPage          — renders a single lesson
│   ├── SlideViewer     — slide-by-slide lesson content (Markdown-ish)
│   ├── ExercisePanel   — code editor + run/check/hint buttons
│   └── AICoachPanel    — hint/feedback display from the loaded model
└── TroubleshootPage    — model loading diagnostics, browser feature checks
```

### Key Data Flow

1. Lessons are imported from `src/lessons/index.js` which re-exports all lesson modules.
2. Each lesson module exports an object matching the Lesson schema (see below).
3. The user writes code in the ExercisePanel (CodeMirror editor).
4. On "Run" or "Check", `evaluateCode()` (src/utils/evaluator.js) runs the code sandboxed via the `Function` constructor and executes test cases.
5. If a model is loaded and the user asks for a hint, `getHint()` (src/utils/aiCoach.js) calls the in-browser pipeline.
6. Progress is persisted to localStorage via src/utils/storage.js.

## Directory Structure

```
js-ai-coach/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── HomePage.jsx
│   │   ├── LessonPage.jsx
│   │   ├── SlideViewer.jsx
│   │   ├── ExercisePanel.jsx
│   │   ├── AICoachPanel.jsx
│   │   └── TroubleshootPage.jsx
│   ├── lessons/
│   │   ├── index.js          — re-exports all lessons
│   │   └── lesson-01-variables/
│   │       └── index.js
│   ├── styles/
│   │   └── global.css
│   ├── tests/
│   │   ├── setup.js
│   │   ├── evaluator.test.js
│   │   └── storage.test.js
│   ├── utils/
│   │   ├── evaluator.js
│   │   ├── aiCoach.js
│   │   └── storage.js
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── .prettierrc
├── CLAUDE.md
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Lesson Schema

Each lesson file must export a default object matching this shape:

```js
export default {
  id: 'lesson-01-variables',         // unique kebab-case id
  title: 'Variables y Tipos de Datos', // lesson title (Spanish OK)
  description: 'Aprende sobre var, let y const', // short description
  slides: [
    {
      id: 'slide-1',
      title: 'Introducción',
      content: `Markdown-ish string explaining the concept`,
    },
    // ...
  ],
  exercises: [
    {
      id: 'ex-1',
      title: 'Declara una variable',
      description: 'Crea una variable llamada nombre con el valor "Juan"',
      initialCode: `// Tu código aquí\n`,
      setupCode: ``,          // run before user code (optional helpers)
      testCases: [
        {
          description: 'nombre debe ser "Juan"',
          test: (exported) => exported.nombre === 'Juan',
        },
      ],
      hints: ['Usa let o const', 'Asigna el valor con ='],
      solution: `const nombre = 'Juan'`,
    },
  ],
}
```

## AI Model Options

Models run entirely in-browser via @huggingface/transformers (ONNX). They are downloaded on first use and cached in the browser's Cache Storage (IndexedDB-backed).

| ID | Name | HuggingFace ID | VRAM (approx) | Notes |
|---|---|---|---|---|
| `none` | No Coach | — | 0 MB | Pass/fail only, no hints |
| `tiny` | SmolLM2-135M | HuggingFaceTB/SmolLM2-135M-Instruct | ~270 MB | Fast, lower quality hints |
| `small` | Phi-3-mini | microsoft/Phi-3-mini-4k-instruct | ~7600 MB | Better hints, slower load |

Model is selected by the user in the Navigation bar and persisted in localStorage. The TroubleshootPage shows browser capability diagnostics.

## Exercise Evaluation

Exercises are evaluated client-side without any sandbox iframe. The approach:

1. User code is wrapped in a `Function` constructor: `new Function('exports', userCode)`
2. An `exports` object is passed in so user code can export values: `exports.myVar = ...`
3. Each test case is a function `(exported) => boolean` run against the exports object
4. Results are collected: `{passed, description, actual, expected, error}`
5. A simple timeout via `Promise.race` prevents infinite loops

Example evaluator call:
```js
const result = await evaluateCode(userCode, testCases, setupCode)
// result: { passed: true, results: [{passed, description, actual, error}] }
```

## Deployment

- GitHub Actions workflow at `.github/workflows/deploy.yml`
- Triggers on push to `main`
- Runs `npm ci && npm run build`
- Deploys `dist/` to the `gh-pages` branch
- Live URL: https://jpgarbanzo.github.io/js-ai-coach/
- Vite base path is set to `/js-ai-coach/` in vite.config.js

## Key Conventions

- **No TypeScript** — plain JS and JSX only
- **No React Router** — simple `useState`-based view switching in App.jsx
- **Lesson content** — keep Spanish text from source material; UI chrome in English
- **CSS** — plain CSS with custom properties (CSS variables); no CSS-in-JS, no Tailwind
- **State management** — React `useState` / `useReducer` only; no Redux / Zustand
- **Imports** — always use explicit `.jsx` or `.js` extensions in imports
- **Tests** — co-locate test files in `src/tests/`; use Vitest + Testing Library
- **ESLint** — flat config (eslint.config.js); `react/prop-types` is OFF intentionally
- **No console.log** in production code (ESLint warns); `console.warn` / `console.error` are allowed

## Local Development

```bash
npm install
npm run dev        # starts Vite dev server at http://localhost:5173/js-ai-coach/
npm test           # run tests once
npm run test:watch # watch mode
npm run lint       # check linting
npm run format     # format with prettier
```

## Common Pitfalls

- The Vite `base` is `/js-ai-coach/` — all asset paths must account for this
- Transformers.js needs `SharedArrayBuffer` in some modes; the TroubleshootPage documents this
- Model weights are large — always warn users before downloading
- The `Function` constructor sandbox does NOT have access to `window`, `document`, or module scope — this is intentional
- Test files import `@testing-library/jest-dom` via the setup file (src/tests/setup.js)
