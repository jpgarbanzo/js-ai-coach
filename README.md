# JS AI Coach

An interactive JavaScript learning platform with AI-powered coaching, running entirely in your browser. No backend required.

Live: **https://jpgarbanzo.github.io/js-ai-coach/**

---

## Features

- **Structured Lessons** — slide-by-slide content that builds concepts progressively
- **Live Code Exercises** — write real JavaScript in a syntax-highlighted editor and get instant pass/fail feedback
- **AI Coach** — on-device AI models provide hints and feedback without sending your code to any server
- **Multiple AI Models** — choose between no AI (pass/fail only), a tiny fast model, or a larger high-quality model
- **Progress Tracking** — your code and completed exercises are saved in localStorage
- **Troubleshoot Page** — browser capability diagnostics and model loading tests
- **100% Private** — everything runs client-side; no accounts, no telemetry

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 6 | Build tool and dev server |
| CodeMirror 6 | Code editor with syntax highlighting |
| @huggingface/transformers | In-browser ONNX model inference |
| Vitest | Unit testing |
| @testing-library/react | Component testing |
| ESLint 9 (flat config) | Linting |
| Prettier | Code formatting |
| GitHub Actions | CI/CD |
| GitHub Pages | Hosting |

---

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repo
git clone https://github.com/jpgarbanzo/js-ai-coach.git
cd js-ai-coach

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/js-ai-coach/`

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server (hot reload) |
| `npm run build` | Build for production to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run tests once (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Check linting (ESLint) |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format source files with Prettier |

---

## Project Structure

```
js-ai-coach/
├── public/
│   └── favicon.svg              # JS logo favicon
├── src/
│   ├── components/
│   │   ├── Navigation.jsx       # Top navigation bar + model selector
│   │   ├── HomePage.jsx         # Lesson list / landing page
│   │   ├── LessonPage.jsx       # Lesson viewer (slides + exercises)
│   │   ├── SlideViewer.jsx      # Slide-by-slide content display
│   │   ├── ExercisePanel.jsx    # Code editor + test runner
│   │   ├── AICoachPanel.jsx     # AI hint / feedback display
│   │   └── TroubleshootPage.jsx # Diagnostics and settings
│   ├── lessons/
│   │   └── index.js             # Lesson registry
│   ├── styles/
│   │   └── global.css           # CSS custom properties + global styles
│   ├── tests/
│   │   ├── setup.js             # Vitest setup (@testing-library/jest-dom)
│   │   └── *.test.js            # Unit/component tests
│   ├── utils/
│   │   ├── evaluator.js         # Sandboxed code evaluation
│   │   ├── aiCoach.js           # Transformers.js model loading + prompts
│   │   └── storage.js           # localStorage helpers
│   ├── App.jsx                  # Root component + routing state
│   └── main.jsx                 # React entry point
├── CLAUDE.md                    # Project north star / architecture doc
├── eslint.config.js             # ESLint flat config
├── index.html                   # Vite HTML entry point
├── package.json
├── vite.config.js
└── .prettierrc
```

---

## Adding Lessons

1. Create a directory under `src/lessons/` (e.g. `src/lessons/lesson-02-functions/`)
2. Create `index.js` exporting the lesson object:

```js
export default {
  id: 'lesson-02-functions',
  title: 'Functions',
  description: 'Learn how to declare and call functions.',
  slides: [
    {
      id: 'slide-1',
      title: 'What is a function?',
      content: `A **function** is a reusable block of code...`,
    },
  ],
  exercises: [
    {
      id: 'ex-1',
      title: 'Write a greeting function',
      description: 'Create a function called greet that takes a name and returns "Hello, <name>!"',
      initialCode: '// Write your function here\n',
      setupCode: '',
      testCases: [
        {
          description: 'greet("World") returns "Hello, World!"',
          test: (exported) => exported.greet('World') === 'Hello, World!',
        },
      ],
      hints: ['Use the function keyword', 'Return a template literal'],
      solution: 'function greet(name) { return `Hello, ${name}!` }\nexports.greet = greet',
    },
  ],
}
```

3. Register the lesson in `src/lessons/index.js`:

```js
import lesson02 from './lesson-02-functions/index.js'

export const LESSONS = [lesson02]
```

---

## AI Model Options

Models are downloaded from HuggingFace and cached in your browser's Cache Storage on first use.

| Option | Model | Download Size | Quality |
|---|---|---|---|
| No Coach | — | 0 | Pass/fail only |
| SmolLM2 (135M) | HuggingFaceTB/SmolLM2-135M-Instruct | ~270 MB | Good for quick hints |
| Phi-3 Mini (3.8B) | microsoft/Phi-3-mini-4k-instruct | ~7.6 GB | High quality hints and explanations |

Select the model from the navigation bar. Your selection is saved automatically.

---

## Exercise Evaluation

Code is evaluated client-side using the `Function` constructor (not `eval`):

1. Your code is wrapped: `new Function('exports', userCode)`
2. An `exports` object is injected — assign your results to it
3. Each test case is a function `(exports) => boolean`
4. Results are returned with pass/fail status and error details

The sandbox does NOT have access to `window`, `document`, or module scope — only what you explicitly pass.

---

## Troubleshoot Page

Visit the **Troubleshoot** link in the navigation to:

- Check browser capability (WebAssembly, SharedArrayBuffer, IndexedDB)
- Test loading a model with a live progress indicator
- View and clear your saved progress data
- Read solutions to common issues

---

## Deployment

The app is automatically deployed to GitHub Pages on every push to `main`.

Workflow file: `.github/workflows/deploy.yml`

Build steps:
1. `npm ci` — install dependencies
2. `npm run build` — Vite builds to `dist/`
3. Deploy `dist/` to the `gh-pages` branch

The Vite `base` is set to `/js-ai-coach/` so all asset paths resolve correctly under the GitHub Pages subpath.

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Run tests: `npm test`
4. Run lint: `npm run lint`
5. Commit and push
6. Open a pull request

Please keep JS plain (no TypeScript), follow the existing code style, and add tests for new utilities.

---

## License

MIT
