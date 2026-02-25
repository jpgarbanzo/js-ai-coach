import { describe, it, expect } from 'vitest'
import { evaluateCode, checkSyntax } from '../utils/evaluator.js'

describe('evaluateCode', () => {
  it('passes when all test cases pass', async () => {
    const code = `exports.add = (a, b) => a + b`
    const testCases = [
      {
        description: 'add(2, 3) === 5',
        test: (exp) => exp.add(2, 3) === 5,
      },
      {
        description: 'add(0, 0) === 0',
        test: (exp) => exp.add(0, 0) === 0,
      },
    ]

    const result = await evaluateCode(code, testCases)
    expect(result.passed).toBe(true)
    expect(result.compilationError).toBeNull()
    expect(result.results).toHaveLength(2)
    expect(result.results[0].passed).toBe(true)
    expect(result.results[1].passed).toBe(true)
  })

  it('fails when a test case fails', async () => {
    const code = `exports.add = (a, b) => a - b` // intentionally wrong
    const testCases = [
      {
        description: 'add(2, 3) === 5',
        test: (exp) => exp.add(2, 3) === 5,
      },
    ]

    const result = await evaluateCode(code, testCases)
    expect(result.passed).toBe(false)
    expect(result.results[0].passed).toBe(false)
  })

  it('returns compilationError when code has a syntax error', async () => {
    const code = `exports.x = (` // syntax error
    const result = await evaluateCode(code, [])
    expect(result.passed).toBe(false)
    expect(result.compilationError).not.toBeNull()
    expect(typeof result.compilationError).toBe('string')
  })

  it('returns compilationError when code throws at runtime', async () => {
    const code = `throw new Error('runtime error')`
    const result = await evaluateCode(code, [])
    expect(result.passed).toBe(false)
    expect(result.compilationError).toContain('runtime error')
  })

  it('handles empty test cases', async () => {
    const code = `exports.x = 1`
    const result = await evaluateCode(code, [])
    expect(result.passed).toBe(false) // no tests = not passed
    expect(result.compilationError).toBeNull()
    expect(result.results).toHaveLength(0)
  })

  it('handles missing code gracefully', async () => {
    const result = await evaluateCode('', [{ description: 'test', test: () => true }])
    expect(result.passed).toBe(false)
    expect(result.compilationError).not.toBeNull()
  })

  it('runs setup code before user code', async () => {
    const setupCode = `function helper(x) { return x * 2 }`
    const userCode = `exports.result = helper(21)`
    const testCases = [
      {
        description: 'result === 42',
        test: (exp) => exp.result === 42,
      },
    ]

    const result = await evaluateCode(userCode, testCases, setupCode)
    expect(result.passed).toBe(true)
  })

  it('captures individual test errors', async () => {
    const code = `exports.fn = null` // fn is not callable
    const testCases = [
      {
        description: 'fn() should work',
        test: (exp) => exp.fn(), // will throw: fn is not a function
      },
    ]

    const result = await evaluateCode(code, testCases)
    expect(result.passed).toBe(false)
    expect(result.results[0].passed).toBe(false)
    expect(result.results[0].error).not.toBeNull()
  })

  it('does not expose module-scope variables to user code', async () => {
    // The Function constructor does not have access to the surrounding module scope.
    // Variables defined in the test file should not be accessible in user code.
    const secretVar = 'should-not-leak' // eslint-disable-line no-unused-vars
    const code = `exports.canAccess = typeof secretVar !== 'undefined'`
    const testCases = [
      {
        description: 'secretVar from outer scope is not accessible',
        test: (exp) => exp.canAccess === false,
      },
    ]

    const result = await evaluateCode(code, testCases)
    // Function constructor does not capture the calling scope's local variables
    expect(result.passed).toBe(true)
  })
})

describe('checkSyntax', () => {
  it('returns null for valid code', () => {
    expect(checkSyntax('const x = 1 + 2')).toBeNull()
    expect(checkSyntax('function foo() { return 42 }')).toBeNull()
    expect(checkSyntax('')).toBeNull()
  })

  it('returns an error string for invalid code', () => {
    const error = checkSyntax('const x = (')
    expect(typeof error).toBe('string')
    expect(error.length).toBeGreaterThan(0)
  })
})
