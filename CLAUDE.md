# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server → http://localhost:5173/js-ai-coach/
npm run build        # Production build to dist/
npm test             # Run all tests once (Vitest) — 67 tests across 4 files
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
State-based routing in `App.jsx` — no React Router. `view` state is one of `'home' | 'lesson' | 'troubleshoot'`. `navigateTo(view, lesson?)` is passed down as a prop. `App.jsx` wraps route content in `PageErrorBoundary` so crashes show a recoverable inline error instead of blanking the whole app.

### Component tree
```
App
├── Navigation          top bar, model selector dropdown
├── Footer              dark footer with © JP Garbanzo, link to jpgc.tech
├── HomePage            lesson card grid with progress bars
├── LessonPage          lesson view: Slides | Exercises | Quiz tabs
│   ├── SlideViewer     prev/next slide navigation, keyboard arrows
│   │                   slide.content is HTML → rendered via dangerouslySetInnerHTML
│   ├── ExercisePanel   CodeMirror editor, run/check, difficulty badge, IO spec, hints
│   ├── AICoachPanel    load model, get hint/feedback, supports autoPrompt prop
│   └── QuizPanel       per-question quiz with single/multi-select, score, AI coach
└── TroubleshootPage    browser capability checks, model test loader
```

### Lesson data flow
1. `src/lessons/index.js` imports all 11 lesson modules, exports `LESSONS` array and `getLessonById(id)`.
2. Each lesson exports a default object with `slides`, `exercises` (top-level array), and `questions`.
3. `LessonPage` reads `lesson.exercises` directly. Legacy fallback: if `exercises` is absent, it extracts them from `lesson.slides` where `slide.hasExercise === true`.
4. `ExercisePanel` calls `evaluateCode(code, testCases, setupCode)` from `src/utils/evaluator.js`.
5. Test results/errors flow up via `onTestResults`/`onError` props into `AICoachPanel`.
6. `QuizPanel` calls `onAskCoach(prompt)` → sets `coachMessage` in `LessonPage` → passed as `autoPrompt` to `AICoachPanel`.

### Code evaluation (src/utils/evaluator.js)
Two test case formats are supported:

**String format** (used by all current lesson files):
```js
{ description: 'add(1,2) returns 3', test: 'return add(1, 2) === 3' }
```
Executed as `new Function(setupCode + '\n' + userCode + '\n' + testString)()`. User-defined functions are in scope without needing `exports`.

**Function format** (for programmatic tests):
```js
{ description: 'exports value', test: (exports) => exports.result === 42 }
```
User code runs once; values must be assigned to `exports.myVar = ...`.

The sandbox has no access to `window`, `document`, or module scope.

### AI Coach (src/utils/aiCoach.js)
Uses `@huggingface/transformers` to run ONNX models entirely in-browser. Downloaded on first use, cached in browser Cache Storage.

| ID | Model | Size |
|---|---|---|
| `none` | No Coach (pass/fail only) | — |
| `tiny` | HuggingFaceTB/SmolLM2-135M-Instruct | ~270 MB |
| `small` | microsoft/Phi-3-mini-4k-instruct | ~7.6 GB |

`loadModel(modelId, onProgress)` caches the pipeline in module scope. `getHint()` and `evaluateSolution()` are the two AI entry points.

### Persistence (src/utils/storage.js)
localStorage only. Keys: model preference, per-exercise code (`lessonId:exerciseId`), completed exercise set, progress map (used by `HomePage` progress bars).

## Lesson schema

All 11 lessons live in `src/lessons/lesson-NN.js`. Current schema:

```js
export default {
  id: '01',                       // two-digit string
  title: 'Introduction to JavaScript',
  description: 'Short description',
  icon: '🎯',
  slides: [
    {
      id: 'slide-01-1',
      title: 'Slide Title',
      content: `<p>HTML content</p><div class="code-block">code here</div>`,
      // hasExercise is legacy — exercises now live in top-level exercises array
    },
  ],
  exercises: [                    // top-level array; 6 per lesson (3B / 2M / 1H)
    {
      id: 'ex-01-1',
      title: 'Exercise Title',
      difficulty: 'beginner',     // 'beginner' | 'medium' | 'hard'
      description: 'One-line summary',
      inputSpec: 'param: type',   // shown as "Input:" row
      outputSpec: 'type — desc',  // shown as "Returns:" row
      instructions: `<p>HTML…</p><div class="io-spec">…</div>`,
      starterCode: `function foo() {\n  // your code\n}`,
      solution: `function foo() { return 42 }`,
      hints: ['Hint 1', 'Hint 2', 'Hint 3'],
      testCases: [
        { description: 'foo() returns 42', test: `return foo() === 42`, input: '()', expected: '42' },
      ],
      concepts: ['functions'],
    },
  ],
  questions: [                    // quiz questions; 7-9 per lesson
    {
      id: 'q-01-1',
      question: 'Question text?',
      multiSelect: false,         // true = "select all that apply"
      options: [
        { id: 'a', text: 'Option A', correct: false },
        { id: 'b', text: 'Option B', correct: true },
      ],
      explanation: 'Educational explanation shown after submit.',
    },
  ],
}
```

`ExercisePanel` reads `exercise.starterCode` (with `exercise.initialCode` as fallback).
`slide.content` is HTML and rendered via `dangerouslySetInnerHTML`. Use `<div class="code-block">` for code samples in slides — CSS gives it a dark pre-formatted block.

## Key conventions

- **No TypeScript** — plain JS and JSX only; `react/prop-types` is disabled in ESLint
- **No React Router** — `useState`-based view switching in `App.jsx`
- **CSS** — plain CSS with custom properties in `src/styles/global.css`; component-specific CSS via inline `<style>` tags; no CSS-in-JS or Tailwind
- **State** — `useState` / `useReducer` only; no external state library
- **Imports** — always use explicit `.jsx` or `.js` extensions
- **ESLint** — flat config (`eslint.config.js`); `no-console` warns but allows `console.warn` / `console.error`
- **Vite base** — `/js-ai-coach/`; all asset paths must account for this

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) triggers on push to `main`:
`npm ci` → lint → test → `npm run build` → deploy `dist/` via `actions/deploy-pages@v4`

Live URL: **https://jpgarbanzo.github.io/js-ai-coach/**

Vite produces content-hashed filenames for automatic cache busting.
