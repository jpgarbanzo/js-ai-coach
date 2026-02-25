/**
 * evaluator.js
 *
 * Sandboxed code evaluation for JS AI Coach exercises.
 *
 * User code is executed via the Function constructor, which prevents access to
 * module scope. An `exports` object is injected so user code can export values:
 *
 *   exports.myVar = 42
 *   exports.myFn = function() { ... }
 *
 * Each test case is a function:
 *   {
 *     description: string,
 *     test: (exported) => boolean,
 *   }
 *
 * Usage:
 *   const result = await evaluateCode(userCode, testCases, setupCode)
 *   // { passed: true, results: [{passed, description, actual, error}] }
 */

/** Timeout in ms for each individual test case */
const TEST_TIMEOUT_MS = 3000

/**
 * Wraps a synchronous function in a Promise that rejects after `ms` milliseconds.
 * Because JS is single-threaded, this cannot interrupt a truly infinite loop;
 * it will reject AFTER the synchronous work completes (or never, in the infinite case).
 * We rely on the outer try/catch for gross errors and the timeout for async issues.
 */
function withTimeout(fn, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout: test took longer than ${ms}ms`))
    }, ms)

    try {
      const result = fn()
      clearTimeout(timer)
      resolve(result)
    } catch (err) {
      clearTimeout(timer)
      reject(err)
    }
  })
}

/**
 * Execute user code in a sandboxed Function constructor context.
 *
 * @param {string} userCode   - The code string written by the user.
 * @param {string} setupCode  - Optional code to run before user code (defines helpers).
 * @returns {{ exports: object, error: Error|null }}
 */
function executeUserCode(userCode, setupCode = '') {
  const exports = {}

  try {
    // Combine setup and user code; both share the same `exports` object.
    const combined = `${setupCode}\n${userCode}`

    // The Function constructor does NOT have access to the surrounding module
    // scope, window, or document — only what we explicitly pass as arguments.
    const fn = new Function('exports', combined)
    fn(exports)

    return { exports, error: null }
  } catch (err) {
    return { exports, error: err }
  }
}

/**
 * Run a single test case against the exports object.
 *
 * @param {{ description: string, test: (exports: object) => boolean }} testCase
 * @param {object} exports - The object populated by user code.
 * @returns {Promise<{ passed: boolean, description: string, error: string|null }>}
 */
async function runTestCase(testCase, exports) {
  const { description, test } = testCase

  try {
    const passed = await withTimeout(() => test(exports), TEST_TIMEOUT_MS)

    return {
      passed: Boolean(passed),
      description,
      error: null,
    }
  } catch (err) {
    return {
      passed: false,
      description,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

/**
 * Evaluate user code against a set of test cases.
 *
 * @param {string} userCode          - Code written by the user.
 * @param {Array<{description: string, test: (exports: object) => boolean}>} testCases
 * @param {string} [setupCode='']    - Optional code to run before user code.
 * @returns {Promise<{
 *   passed: boolean,
 *   compilationError: string|null,
 *   results: Array<{passed: boolean, description: string, error: string|null}>
 * }>}
 */
export async function evaluateCode(userCode, testCases = [], setupCode = '') {
  if (!userCode || typeof userCode !== 'string') {
    return {
      passed: false,
      compilationError: 'No code provided.',
      results: testCases.map((tc) => ({
        passed: false,
        description: tc.description,
        error: 'No code provided.',
      })),
    }
  }

  // Step 1: Execute user code
  const { exports, error: compilationError } = executeUserCode(userCode, setupCode)

  if (compilationError) {
    // If the code threw at parse/run time, all tests fail with the same error
    const errorMessage = compilationError instanceof Error
      ? compilationError.message
      : String(compilationError)

    return {
      passed: false,
      compilationError: errorMessage,
      results: testCases.map((tc) => ({
        passed: false,
        description: tc.description,
        error: `Compilation error: ${errorMessage}`,
      })),
    }
  }

  // Step 2: Run each test case
  const results = await Promise.all(testCases.map((tc) => runTestCase(tc, exports)))

  const passed = results.length > 0 && results.every((r) => r.passed)

  return {
    passed,
    compilationError: null,
    results,
  }
}

/**
 * Quick syntax check: tries to parse the code without running it.
 * Returns null if valid, or an error message string if invalid.
 *
 * @param {string} code
 * @returns {string|null}
 */
export function checkSyntax(code) {
  try {
    new Function(code)
    return null
  } catch (err) {
    return err instanceof Error ? err.message : String(err)
  }
}
