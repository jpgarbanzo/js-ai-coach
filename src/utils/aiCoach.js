/**
 * aiCoach.js
 *
 * AI coaching utilities using @huggingface/transformers (ONNX, runs in-browser).
 * Models are downloaded on first use and cached in the browser's Cache Storage.
 *
 * All inference is 100% client-side — no backend required.
 */

import { pipeline } from '@huggingface/transformers'

// ---------------------------------------------------------------------------
// Model registry
// ---------------------------------------------------------------------------

/**
 * Available AI coach models.
 * `id: 'none'` means no AI — exercises are evaluated by test cases only.
 */
export const AVAILABLE_MODELS = [
  {
    id: 'qwen-coder-1.5b',
    name: 'Qwen2.5-Coder 1.5B',
    description: 'Best balance of quality and size. Code-specialized model trained on 5.5T code tokens. Strong JavaScript understanding. ~1.9 GB download.',
    huggingfaceId: 'onnx-community/Qwen2.5-Coder-1.5B-Instruct',
    taskType: 'text-generation',
    dtype: 'q4',
    memoryMB: 1920,
    recommended: true,
  },
  {
    id: 'qwen-coder-0.5b',
    name: 'Qwen2.5-Coder 0.5B',
    description: 'Smallest code-specialized option. Fast and lightweight for quick hints. ~862 MB download.',
    huggingfaceId: 'onnx-community/Qwen2.5-Coder-0.5B-Instruct',
    taskType: 'text-generation',
    dtype: 'q4',
    memoryMB: 862,
  },
  {
    id: 'deepseek-coder-1.3b',
    name: 'DeepSeek-Coder 1.3B',
    description: 'Code-focused model trained on 87% code data. Well-known in the developer community. ~1.36 GB download.',
    huggingfaceId: 'onnx-community/deepseek-coder-1.3b-instruct-ONNX',
    taskType: 'text-generation',
    dtype: 'q4',
    memoryMB: 1360,
  },
  {
    id: 'qwen-coder-3b',
    name: 'Qwen2.5-Coder 3B',
    description: 'Highest code quality. Near GPT-3.5 level for JavaScript. ~3.2 GB download. Requires a capable device.',
    huggingfaceId: 'onnx-community/Qwen2.5-Coder-3B-Instruct',
    taskType: 'text-generation',
    dtype: 'q4',
    memoryMB: 3200,
  },
  {
    id: 'none',
    name: 'No Coach',
    description: 'Manual evaluation only — no AI hints or feedback.',
    huggingfaceId: null,
    taskType: null,
    dtype: null,
    memoryMB: 0,
  },
  {
    id: 'tiny',
    name: 'SmolLM2 (135M)',
    description: 'Fast, lightweight general model. Good for quick hints. ~270 MB download.',
    huggingfaceId: 'HuggingFaceTB/SmolLM2-135M-Instruct',
    taskType: 'text-generation',
    dtype: null,
    memoryMB: 270,
  },
  {
    id: 'small',
    name: 'Phi-3 Mini (3.8B)',
    description: 'Higher quality hints and explanations. ~7.6 GB download. Requires a capable device.',
    huggingfaceId: 'microsoft/Phi-3-mini-4k-instruct',
    taskType: 'text-generation',
    dtype: null,
    memoryMB: 7600,
  },
]

// ---------------------------------------------------------------------------
// Module-level cache
// ---------------------------------------------------------------------------

/** @type {{ modelId: string, pipe: object } | null} */
let cachedModel = null

// ---------------------------------------------------------------------------
// Browser capability check
// ---------------------------------------------------------------------------

/**
 * Check whether the browser supports the features needed for Transformers.js.
 *
 * @returns {{
 *   supported: boolean,
 *   webAssembly: boolean,
 *   sharedArrayBuffer: boolean,
 *   crossOriginIsolated: boolean,
 *   issues: string[]
 * }}
 */
export function checkModelSupport() {
  const issues = []

  const webAssembly = typeof WebAssembly !== 'undefined' && typeof WebAssembly.instantiate === 'function'
  if (!webAssembly) {
    issues.push('WebAssembly is not supported in this browser.')
  }

  const sharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined'
  if (!sharedArrayBuffer) {
    issues.push(
      'SharedArrayBuffer is not available. The page may need to be served with COOP/COEP headers (cross-origin isolation).'
    )
  }

  const crossOriginIsolated = window.crossOriginIsolated ?? false

  const navigator_memory = navigator.deviceMemory
  if (navigator_memory !== undefined && navigator_memory < 4) {
    issues.push(`Low device memory detected (${navigator_memory} GB). Large models may not load.`)
  }

  return {
    supported: webAssembly,
    webAssembly,
    sharedArrayBuffer,
    crossOriginIsolated: Boolean(crossOriginIsolated),
    issues,
  }
}

// ---------------------------------------------------------------------------
// Model loading
// ---------------------------------------------------------------------------

/**
 * Load an AI model by its model config id.
 * Uses the module-level cache so the model is only downloaded once per session.
 *
 * @param {string} modelId - One of the AVAILABLE_MODELS ids (not 'none').
 * @param {(progress: { status: string, progress?: number, file?: string }) => void} [onProgress]
 * @returns {Promise<object>} The loaded Transformers.js pipeline.
 */
export async function loadModel(modelId, onProgress) {
  if (modelId === 'none') {
    throw new Error('Cannot load model with id "none".')
  }

  const modelConfig = AVAILABLE_MODELS.find((m) => m.id === modelId)
  if (!modelConfig) {
    throw new Error(`Unknown model id: "${modelId}". Check AVAILABLE_MODELS.`)
  }

  // Return cached model if it's already loaded
  if (cachedModel && cachedModel.modelId === modelId) {
    return cachedModel.pipe
  }

  const progressCallback = (progress) => {
    if (typeof onProgress === 'function') {
      onProgress(progress)
    }
  }

  const pipelineOptions = { progress_callback: progressCallback }
  if (modelConfig.dtype) {
    pipelineOptions.dtype = modelConfig.dtype
  }

  const pipe = await pipeline(modelConfig.taskType, modelConfig.huggingfaceId, pipelineOptions)

  cachedModel = { modelId, pipe }
  return pipe
}

/**
 * Unload the currently cached model, freeing memory.
 */
export function unloadModel() {
  if (cachedModel && cachedModel.pipe && typeof cachedModel.pipe.dispose === 'function') {
    cachedModel.pipe.dispose()
  }
  cachedModel = null
}

/**
 * Returns true if a model is currently loaded and ready.
 * @param {string} modelId
 * @returns {boolean}
 */
export function isModelLoaded(modelId) {
  return cachedModel !== null && cachedModel.modelId === modelId
}

// ---------------------------------------------------------------------------
// Prompt helpers
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT =
  'You are a JavaScript tutor helping a student learn. Be concise and educational. ' +
  'Provide hints, not complete solutions. Keep responses under 150 words. ' +
  'If you show code, keep it short and focused on the concept.'

/**
 * Build a chat-style message array for hint generation.
 */
/** Strip HTML tags from instructions so they're readable in plain text prompts. */
function stripHtml(html) {
  return (html ?? '').replace(/<[^>]+>/g, ' ').replace(/\s{2,}/g, ' ').trim()
}

function buildHintMessages(exercise, userCode, errorContext) {
  const exerciseInfo = [
    `Exercise: ${exercise.title}`,
    exercise.difficulty ? `Difficulty: ${exercise.difficulty}` : '',
    `Description: ${exercise.description}`,
    exercise.inputSpec  ? `Input:   ${exercise.inputSpec}` : '',
    exercise.outputSpec ? `Returns: ${exercise.outputSpec}` : '',
    exercise.instructions ? `Instructions: ${stripHtml(exercise.instructions)}` : '',
    exercise.testCases?.length
      ? `Tests the student must pass:\n${exercise.testCases.map((t) => `  - ${t.description}`).join('\n')}`
      : '',
    userCode ? `Student's current code:\n\`\`\`js\n${userCode}\n\`\`\`` : 'The student has not written any code yet.',
    errorContext ? `Error or issue: ${errorContext}` : '',
  ]
    .filter(Boolean)
    .join('\n\n')

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: `${exerciseInfo}\n\nPlease give me a hint to help me solve this exercise. Do not give me the complete solution.`,
    },
  ]
}

/**
 * Build a chat-style message array for solution evaluation.
 */
function buildEvaluationMessages(exercise, userCode, testResults) {
  const passedCount = testResults.filter((r) => r.passed).length
  const totalCount = testResults.length

  const resultsSummary = testResults
    .map((r) => `  - ${r.passed ? 'PASS' : 'FAIL'}: ${r.description}${r.error ? ` (${r.error})` : ''}`)
    .join('\n')

  const exerciseInfo = [
    `Exercise: ${exercise.title}`,
    exercise.difficulty ? `Difficulty: ${exercise.difficulty}` : '',
    `Description: ${exercise.description}`,
    exercise.inputSpec  ? `Input:   ${exercise.inputSpec}` : '',
    exercise.outputSpec ? `Returns: ${exercise.outputSpec}` : '',
    exercise.instructions ? `Instructions: ${stripHtml(exercise.instructions)}` : '',
    `Student code:\n\`\`\`js\n${userCode}\n\`\`\``,
    `Test results (${passedCount}/${totalCount} passed):\n${resultsSummary}`,
    passedCount === totalCount
      ? 'All tests passed! Please give positive feedback and one tip to improve the code quality.'
      : 'Some tests failed. Please explain what is wrong and give a constructive hint.',
  ]
    .filter(Boolean)
    .join('\n\n')

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: exerciseInfo },
  ]
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generate a hint for an exercise using the loaded AI model.
 *
 * @param {object} pipe               - The loaded Transformers.js pipeline.
 * @param {object} exercise           - The exercise object from lesson data.
 * @param {string} userCode           - The user's current code.
 * @param {string|null} errorContext  - Optional error message to give the model context.
 * @returns {Promise<string>}         - The hint text.
 */
export async function getHint(pipe, exercise, userCode, errorContext = null) {
  if (!pipe) {
    throw new Error('No model loaded. Load a model before calling getHint.')
  }

  const messages = buildHintMessages(exercise, userCode, errorContext)

  const output = await pipe(messages, {
    max_new_tokens: 200,
    temperature: 0.7,
    do_sample: true,
  })

  // Transformers.js text-generation returns an array; grab the generated text
  const generated = output?.[0]?.generated_text
  if (!generated) {
    return 'Sorry, I could not generate a hint at this time. Try again.'
  }

  // The output is the full conversation; extract the last assistant message
  if (Array.isArray(generated)) {
    const assistantMessages = generated.filter((m) => m.role === 'assistant')
    const last = assistantMessages[assistantMessages.length - 1]
    return last?.content?.trim() ?? 'No hint available.'
  }

  // Fallback: the generated text as a string
  return String(generated).trim()
}

/**
 * Evaluate a completed (or attempted) solution and return AI feedback.
 *
 * @param {object} pipe          - The loaded Transformers.js pipeline.
 * @param {object} exercise      - The exercise object from lesson data.
 * @param {string} userCode      - The user's code.
 * @param {Array<{passed: boolean, description: string, error: string|null}>} testResults
 * @returns {Promise<string>}    - The evaluation/feedback text.
 */
export async function evaluateSolution(pipe, exercise, userCode, testResults) {
  if (!pipe) {
    throw new Error('No model loaded. Load a model before calling evaluateSolution.')
  }

  const messages = buildEvaluationMessages(exercise, userCode, testResults)

  const output = await pipe(messages, {
    max_new_tokens: 250,
    temperature: 0.5,
    do_sample: true,
  })

  const generated = output?.[0]?.generated_text
  if (!generated) {
    return 'Sorry, I could not generate feedback at this time. Try again.'
  }

  if (Array.isArray(generated)) {
    const assistantMessages = generated.filter((m) => m.role === 'assistant')
    const last = assistantMessages[assistantMessages.length - 1]
    return last?.content?.trim() ?? 'No feedback available.'
  }

  return String(generated).trim()
}
