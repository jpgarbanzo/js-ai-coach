import React, { useState, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { evaluateCode } from '../utils/evaluator.js'
import { getSavedCode, saveCode, markExerciseCompleted, isExerciseCompleted } from '../utils/storage.js'

/**
 * ExercisePanel
 *
 * Contains the code editor, run/check controls, and test results display.
 *
 * Props:
 *   exercise         — the exercise object
 *   lessonId         — the parent lesson id (for storage keys)
 *   onTestResults    — (results) => void — called when tests run
 *   onError          — (errorMsg: string|null) => void — called with compilation errors
 */
function ExercisePanel({ exercise, lessonId, onTestResults, onError }) {
  const savedCode = getSavedCode(lessonId, exercise.id)
  const [code, setCode] = useState(savedCode ?? exercise.starterCode ?? exercise.initialCode ?? '')
  const [results, setResults] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [compilationError, setCompilationError] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const alreadyCompleted = isExerciseCompleted(lessonId, exercise.id)

  // Autosave code on changes (debounced-ish via useCallback)
  const handleCodeChange = useCallback(
    (value) => {
      setCode(value)
      saveCode(lessonId, exercise.id, value)
      // Clear previous results when user starts editing
      if (results !== null) {
        setResults(null)
        setCompilationError(null)
        if (onTestResults) onTestResults(null)
        if (onError) onError(null)
      }
    },
    [lessonId, exercise.id, results, onTestResults, onError]
  )

  const handleRun = async () => {
    setIsRunning(true)
    setCompilationError(null)

    const evaluation = await evaluateCode(code, exercise.testCases ?? [], exercise.setupCode ?? '')

    setResults(evaluation.results)
    setCompilationError(evaluation.compilationError)
    setIsRunning(false)

    if (onTestResults) onTestResults(evaluation.results)
    if (onError) onError(evaluation.compilationError)

    if (evaluation.passed && !alreadyCompleted) {
      markExerciseCompleted(lessonId, exercise.id)
    }
  }

  const handleReset = () => {
    setCode(exercise.starterCode ?? exercise.initialCode ?? '')
    setResults(null)
    setCompilationError(null)
    setShowSolution(false)
    saveCode(lessonId, exercise.id, exercise.starterCode ?? exercise.initialCode ?? '')
    if (onTestResults) onTestResults(null)
    if (onError) onError(null)
  }

  const passedCount = results ? results.filter((r) => r.passed).length : 0
  const totalCount = results ? results.length : 0
  const allPassed = results !== null && passedCount === totalCount && totalCount > 0

  return (
    <div className="exercise-panel card">
      {/* Exercise header */}
      <div className="exercise-header card-header">
        <div className="exercise-title-row">
          <h3 className="exercise-title">{exercise.title}</h3>
          {alreadyCompleted && (
            <span className="badge badge-success" aria-label="Already completed">
              Completed
            </span>
          )}
          {exercise.difficulty && (
            <span className={`badge badge-difficulty badge-difficulty--${exercise.difficulty}`}>
              {exercise.difficulty === 'beginner' ? '🟢 Beginner'
                : exercise.difficulty === 'medium' ? '🟡 Medium'
                : '🔴 Hard'}
            </span>
          )}
        </div>
        <p className="exercise-description text-secondary">{exercise.description}</p>
        {exercise.inputSpec && (
          <div className="io-spec-row">
            <span className="io-label">Input:</span>
            <code>{exercise.inputSpec}</code>
          </div>
        )}
        {exercise.outputSpec && (
          <div className="io-spec-row">
            <span className="io-label">Returns:</span>
            <code>{exercise.outputSpec}</code>
          </div>
        )}
      </div>

      {/* Code editor */}
      <div className="exercise-editor">
        <CodeMirror
          value={code}
          height="280px"
          theme={oneDark}
          extensions={[javascript({ jsx: false })]}
          onChange={handleCodeChange}
          aria-label="Code editor"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: true,
            foldGutter: false,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: false,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: false,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: false,
            historyKeymap: true,
            foldKeymap: false,
            completionKeymap: true,
            lintKeymap: false,
          }}
        />
      </div>

      {/* Action buttons */}
      <div className="exercise-actions">
        <button
          className="btn btn-primary"
          onClick={handleRun}
          disabled={isRunning}
          aria-busy={isRunning}
        >
          {isRunning ? (
            <>
              <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} aria-hidden="true" />
              Running...
            </>
          ) : (
            'Run & Check'
          )}
        </button>

        <button className="btn btn-ghost btn-sm" onClick={handleReset} title="Reset to initial code">
          Reset
        </button>

        {exercise.solution && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowSolution((s) => !s)}
            aria-expanded={showSolution}
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        )}
      </div>

      {/* Compilation error */}
      {compilationError && (
        <div className="exercise-results">
          <div className="alert alert-error animate-fade-in">
            <strong>Syntax / Runtime Error:</strong>
            <pre className="error-pre">{compilationError}</pre>
          </div>
        </div>
      )}

      {/* Test results */}
      {results && !compilationError && (
        <div className="exercise-results animate-fade-in">
          {/* Summary */}
          <div className={`results-summary ${allPassed ? 'results-summary--pass' : 'results-summary--fail'}`}>
            <span className="results-icon" aria-hidden="true">
              {allPassed ? '✅' : '❌'}
            </span>
            <span className="results-text">
              {allPassed
                ? `All ${totalCount} tests passed!`
                : `${passedCount} / ${totalCount} tests passed`}
            </span>
          </div>

          {/* Individual results */}
          <ul className="results-list" role="list">
            {results.map((result, i) => (
              <li
                key={i}
                className={`result-item ${result.passed ? 'result-item--pass' : 'result-item--fail'}`}
                aria-label={`Test ${i + 1}: ${result.passed ? 'passed' : 'failed'}`}
              >
                <span className="result-icon" aria-hidden="true">
                  {result.passed ? '✓' : '✗'}
                </span>
                <div className="result-content">
                  <span className="result-description">{result.description}</span>
                  {result.error && (
                    <span className="result-error text-sm">{result.error}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Hints list (from lesson data, not AI) */}
          {!allPassed && exercise.hints && exercise.hints.length > 0 && (
            <details className="hints-details">
              <summary className="hints-summary text-sm">
                Show hints ({exercise.hints.length})
              </summary>
              <ul className="hints-list">
                {exercise.hints.map((hint, i) => (
                  <li key={i} className="hint-item text-sm">
                    💡 {hint}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      {/* Solution reveal */}
      {showSolution && exercise.solution && (
        <div className="exercise-solution animate-fade-in">
          <div className="solution-header text-sm font-semibold text-secondary">Solution:</div>
          <pre className="solution-code">
            <code>{exercise.solution}</code>
          </pre>
        </div>
      )}

      <style>{`
        .exercise-panel {
          display: flex;
          flex-direction: column;
        }

        .exercise-header {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .exercise-title-row {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          flex-wrap: wrap;
        }

        .exercise-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
        }

        .exercise-description {
          font-size: var(--font-size-sm);
          margin: 0;
          line-height: var(--line-height-relaxed);
        }

        .exercise-editor {
          border-bottom: 1px solid var(--border-color);
        }

        .exercise-editor .cm-editor {
          font-family: var(--font-family-mono);
          font-size: var(--font-size-sm);
        }

        .exercise-actions {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-4);
          background-color: var(--bg-surface-alt);
          border-bottom: 1px solid var(--border-color);
          flex-wrap: wrap;
        }

        .exercise-results {
          padding: var(--space-4) var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          border-bottom: 1px solid var(--border-color);
        }

        .results-summary {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-weight: var(--font-weight-semibold);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--border-radius);
        }

        .results-summary--pass {
          background-color: var(--color-success-light);
          color: #276749;
          border: 1px solid var(--color-success-border);
        }

        .results-summary--fail {
          background-color: var(--color-error-light);
          color: #c53030;
          border: 1px solid var(--color-error-border);
        }

        .results-icon {
          font-size: var(--font-size-lg);
        }

        .results-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .result-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--border-radius);
          font-size: var(--font-size-sm);
        }

        .result-item--pass {
          background-color: var(--color-success-light);
          color: #276749;
        }

        .result-item--fail {
          background-color: var(--color-error-light);
          color: #c53030;
        }

        .result-icon {
          font-weight: var(--font-weight-bold);
          flex-shrink: 0;
          margin-top: 1px;
        }

        .result-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .result-error {
          opacity: 0.8;
          font-family: var(--font-family-mono);
          font-size: var(--font-size-xs);
        }

        .error-pre {
          margin: var(--space-2) 0 0;
          padding: var(--space-3);
          background-color: rgba(0,0,0,0.1);
          border-radius: var(--border-radius-sm);
          font-size: var(--font-size-xs);
          white-space: pre-wrap;
          word-break: break-all;
          box-shadow: none;
          color: inherit;
        }

        .hints-details {
          margin-top: var(--space-2);
        }

        .hints-summary {
          cursor: pointer;
          color: var(--text-secondary);
          user-select: none;
          padding: var(--space-1) 0;
        }

        .hints-summary:hover {
          color: var(--text-primary);
        }

        .hints-list {
          list-style: none;
          padding: var(--space-3) 0 0 var(--space-4);
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .hint-item {
          color: var(--text-secondary);
          margin: 0;
        }

        .exercise-solution {
          padding: var(--space-4) var(--space-6);
          background-color: var(--bg-surface-alt);
          border-top: 2px solid var(--color-warning);
        }

        .solution-header {
          margin-bottom: var(--space-2);
        }

        .solution-code {
          margin: 0;
          font-size: var(--font-size-sm);
        }

        .badge-difficulty {
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          padding: 2px 8px;
          border-radius: var(--border-radius-full);
          text-transform: capitalize;
        }
        .badge-difficulty--beginner {
          background: #d1fae5;
          color: #065f46;
        }
        .badge-difficulty--medium {
          background: #fef3c7;
          color: #92400e;
        }
        .badge-difficulty--hard {
          background: #fee2e2;
          color: #991b1b;
        }

        .io-spec-row {
          display: flex;
          align-items: baseline;
          gap: var(--space-2);
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin-top: var(--space-1);
        }
        .io-label {
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          min-width: 60px;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  )
}

export default ExercisePanel
