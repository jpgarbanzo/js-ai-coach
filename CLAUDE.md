# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server → http://localhost:5173/js-ai-coach/
npm run build        # Production build to dist/
npm test             # Run all tests once (Vitest)
npm run test:watch   # Watch mode
npm run test:coverage
npm run lint         # ESLint (0 errors expected)
npm run lint:fix
npm run format       # Prettier
```

To run a single test file:
```bash
npx vitest run src/tests/evaluator.test.js
```

## Architecture

### Routing
State-based routing in `App.jsx` — no React Router. `view` state is one of `'home' | 'lesson' | 'troubleshoot'`. `navigateTo(view, lesson?)` is passed down as a prop.

### Component tree
```
App
├── Navigation          top bar, model selector dropdown
├── HomePage            lesson card grid with progress bars
├── LessonPage          lesson view: slides + exercises tabs
│   ├── SlideViewer     prev/next slide navigation, keyboard arrows
│   ├── ExercisePanel   CodeMirror editor, run/check, test results, hints
│   └── AICoachPanel    load model, get hint / get feedback buttons
└── TroubleshootPage    browser capability checks, model test loader
```

### Lesson data flow
1. `src/lessons/index.js` imports all 11 lesson modules, exports `LESSONS` array and `getLessonById(id)`.
2. Each lesson file exports a default object (see schema below).
3. `LessonPage` extracts exercises with:
   ```js
   const exercises = lesson.exercises?.length
     ? lesson.exercises
     : lesson.slides.filter(s => s.hasExercise).map(s => s.exercise)
   ```
   This supports both a top-level `exercises` array and exercises embedded in slides.
4. `ExercisePanel` calls `evaluateCode(code, testCases, setupCode)` from `src/utils/evaluator.js`.
5. Test results and compilation errors flow up to `LessonPage` via `onTestResults` / `onError` props, then into `AICoachPanel` as context for hints.

### Code evaluation (src/utils/evaluator.js)
Two test case formats are supported:

**String format** (used by all lesson files):
```js
{ description: 'add(1,2) returns 3', test: 'return add(1, 2) === 3' }
```
Executed as `new Function(setupCode + '\n' + userCode + '\n' + testString)()`. User code is re-run per test; top-level functions and variables are in scope without needing `exports`.

**Function format** (for programmatic use):
```js
{ description: 'exports value', test: (exports) => exports.result === 42 }
```
User code runs once; values must be assigned to `exports.myVar = ...`.

The sandbox has no access to `window`, `document`, or module scope.

### AI Coach (src/utils/aiCoach.js)
Uses `@huggingface/transformers` to run ONNX models entirely in-browser. Models are downloaded on first use and cached in the browser's Cache Storage.

| ID | Model | Size |
|---|---|---|
| `none` | No Coach (pass/fail only) | — |
| `tiny` | HuggingFaceTB/SmolLM2-135M-Instruct | ~270 MB |
| `small` | microsoft/Phi-3-mini-4k-instruct | ~7.6 GB |

`loadModel(modelId, onProgress)` caches the pipeline in module scope. `getHint(model, exercise, userCode, errorContext)` and `evaluateSolution(model, exercise, userCode, testResults)` are the two AI entry points.

### Persistence (src/utils/storage.js)
localStorage only. Keys: model preference, per-exercise code (`lessonId:exerciseId`), completed exercise set, and a progress map used by `HomePage` for progress bars.

## Lesson schema

All 11 lessons live in `src/lessons/lesson-NN.js`. The actual schema used:

```js
export default {
  id: '01',                // two-digit string
  title: 'Introduction to JavaScript',
  description: 'Short description',
  icon: '🎯',
  slides: [
    {
      id: 'slide-01-1',
      title: 'Slide Title',
      content: `<p>HTML content</p><div class="code-block">code here</div>`,
      hasExercise: false,
    },
    {
      id: 'slide-01-2',
      title: 'Exercise Slide',
      content: `<p>...</p>`,
      hasExercise: true,
      exercise: {
        id: 'ex-01-1',
        title: 'Exercise Title',
        description: 'One-line description shown in the header',
        instructions: `<p>HTML instructions with <code>code</code> inline</p>`,
        starterCode: `// Starter code shown in editor\nfunction foo() {\n  // your code\n}`,
        solution: `function foo() { return 42 }`,
        hints: ['Hint 1', 'Hint 2', 'Hint 3'],
        testCases: [
          {
            description: 'foo() returns 42',
            test: `return foo() === 42`,   // string; runs in same scope as userCode
            input: '(none)',
            expected: '42',
          },
        ],
        difficulty: 'beginner',            // beginner | intermediate | advanced
        concepts: ['functions', 'return'],
      },
    },
  ],
}
```

`ExercisePanel` reads `exercise.starterCode` (with `exercise.initialCode` as fallback).

## Key conventions

- **No TypeScript** — plain JS and JSX only; `react/prop-types` is disabled in ESLint
- **No React Router** — `useState`-based view switching in `App.jsx`
- **CSS** — plain CSS with custom properties in `src/styles/global.css`; no CSS-in-JS or Tailwind
- **State** — `useState` / `useReducer` only; no external state library
- **Imports** — always use explicit `.jsx` or `.js` extensions
- **ESLint** — flat config (`eslint.config.js`); `no-console` warns but allows `console.warn` / `console.error`
- **Vite base** — `/js-ai-coach/`; all asset paths must account for this (affects `public/` references)

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) triggers on push to `main`:
`npm ci` → lint → test → `npm run build` → deploy `dist/` via `actions/deploy-pages@v4`

Live URL: **https://jpgarbanzo.github.io/js-ai-coach/**

Vite produces content-hashed filenames for automatic cache busting.
