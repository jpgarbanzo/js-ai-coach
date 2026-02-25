import React, { useState, useEffect } from 'react'
import { AVAILABLE_MODELS, loadModel, getHint, evaluateSolution, isModelLoaded } from '../utils/aiCoach.js'

/**
 * AICoachPanel
 *
 * Handles model loading and displays AI-generated hints/feedback.
 *
 * Props:
 *   selectedModel  — model id string ('none', 'tiny', 'small')
 *   exercise       — current exercise object
 *   userCode       — user's current code string
 *   testResults    — array of test result objects (or null)
 *   errorContext   — error message from last run (or null)
 *   autoPrompt     — optional string; when provided the coach automatically runs
 *                    a hint request using this text as the prompt on mount
 */
function AICoachPanel({ selectedModel, exercise, userCode, testResults, errorContext, autoPrompt }) {
  const [loadStatus, setLoadStatus] = useState('idle') // idle | loading | ready | error
  const [loadProgress, setLoadProgress] = useState(null)
  const [hintStatus, setHintStatus] = useState('idle') // idle | loading | done | error
  const [hint, setHint] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [feedbackStatus, setFeedbackStatus] = useState('idle')
  const [loadError, setLoadError] = useState(null)
  const [pipe, setPipe] = useState(null)

  const modelConfig = AVAILABLE_MODELS.find((m) => m.id === selectedModel)

  // When autoPrompt is provided, automatically load the model (if needed) and
  // fire a hint request using the prompt text as the exercise description.
  useEffect(() => {
    if (!autoPrompt || selectedModel === 'none' || !modelConfig) return

    const run = async () => {
      let activePipe = pipe

      if (!activePipe && !isModelLoaded(selectedModel)) {
        setLoadStatus('loading')
        setLoadError(null)
        setLoadProgress(null)
        try {
          activePipe = await loadModel(selectedModel, (progress) => {
            setLoadProgress(progress)
          })
          setPipe(() => activePipe)
          setLoadStatus('ready')
        } catch (err) {
          setLoadStatus('error')
          setLoadError(err instanceof Error ? err.message : String(err))
          return
        }
      }

      if (!activePipe) return

      setHintStatus('loading')
      setHint(null)
      try {
        const syntheticExercise = {
          ...exercise,
          description: autoPrompt,
        }
        const result = await getHint(activePipe, syntheticExercise, userCode, null)
        setHint(result)
        setHintStatus('done')
      } catch (err) {
        setHintStatus('error')
        setHint(`Error getting explanation: ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPrompt])

  if (selectedModel === 'none' || !modelConfig) {
    return null
  }

  const isLoaded = pipe !== null || isModelLoaded(selectedModel)

  const handleLoadModel = async () => {
    setLoadStatus('loading')
    setLoadError(null)
    setLoadProgress(null)

    try {
      const loadedPipe = await loadModel(selectedModel, (progress) => {
        setLoadProgress(progress)
      })
      setPipe(() => loadedPipe)
      setLoadStatus('ready')
    } catch (err) {
      setLoadStatus('error')
      setLoadError(err instanceof Error ? err.message : String(err))
    }
  }

  const handleGetHint = async () => {
    if (!pipe) return
    setHintStatus('loading')
    setHint(null)

    try {
      const result = await getHint(pipe, exercise, userCode, errorContext)
      setHint(result)
      setHintStatus('done')
    } catch (err) {
      setHintStatus('error')
      setHint(`Error getting hint: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const handleGetFeedback = async () => {
    if (!pipe || !testResults) return
    setFeedbackStatus('loading')
    setFeedback(null)

    try {
      const result = await evaluateSolution(pipe, exercise, userCode, testResults)
      setFeedback(result)
      setFeedbackStatus('done')
    } catch (err) {
      setFeedbackStatus('error')
      setFeedback(`Error getting feedback: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const renderLoadProgress = () => {
    if (!loadProgress) return null
    const { status, progress, file } = loadProgress

    return (
      <div className="coach-progress">
        <div className="text-sm text-secondary">
          {status === 'initiate' && `Preparing download...`}
          {status === 'download' && `Downloading model files...`}
          {status === 'progress' && `${file ? `${file}: ` : ''}${Math.round(progress ?? 0)}%`}
          {status === 'done' && 'Loading complete.'}
        </div>
        {typeof progress === 'number' && (
          <div className="progress-bar mt-2">
            <div className="progress-bar-fill" style={{ width: `${Math.round(progress)}%` }} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="ai-coach-panel card animate-fade-in">
      <div className="coach-header card-header">
        <div className="coach-header-content">
          <div className="flex items-center gap-2">
            <span className="coach-icon" aria-hidden="true">🤖</span>
            <h3 className="coach-title">AI Coach</h3>
            {isLoaded && (
              <span className="badge badge-success">Ready</span>
            )}
          </div>
          <p className="coach-model-name text-sm text-secondary">{modelConfig.name}</p>
        </div>
      </div>

      <div className="coach-body card-body">
        {/* Not yet loaded state */}
        {!isLoaded && loadStatus === 'idle' && (
          <div className="coach-load-prompt">
            <p className="text-sm text-secondary">
              Load <strong>{modelConfig.name}</strong> to get AI-powered hints and feedback.
            </p>
            <p className="text-sm text-secondary">
              Download size: ~{modelConfig.memoryMB >= 1000
                ? `${(modelConfig.memoryMB / 1000).toFixed(1)} GB`
                : `${modelConfig.memoryMB} MB`}
            </p>
            <button className="btn btn-primary mt-4" onClick={handleLoadModel}>
              Load AI Coach
            </button>
          </div>
        )}

        {/* Loading state */}
        {loadStatus === 'loading' && (
          <div className="coach-loading">
            <div className="flex items-center gap-3 mb-4">
              <div className="spinner" aria-hidden="true" />
              <span className="text-sm">Loading model...</span>
            </div>
            {renderLoadProgress()}
            <p className="text-xs text-secondary mt-4">
              This may take a few minutes on the first load. The model is cached in your browser.
            </p>
          </div>
        )}

        {/* Error loading */}
        {loadStatus === 'error' && (
          <div>
            <div className="alert alert-error">
              <strong>Failed to load model.</strong>
              {loadError && <p className="mt-2 text-sm">{loadError}</p>}
            </div>
            <button className="btn btn-secondary btn-sm" onClick={handleLoadModel}>
              Retry
            </button>
          </div>
        )}

        {/* Loaded: show hint / feedback buttons */}
        {isLoaded && (
          <div className="coach-actions">
            <div className="coach-action-buttons">
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleGetHint}
                disabled={hintStatus === 'loading'}
                aria-busy={hintStatus === 'loading'}
              >
                {hintStatus === 'loading' ? (
                  <>
                    <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} aria-hidden="true" />
                    Getting hint...
                  </>
                ) : (
                  'Get Hint'
                )}
              </button>

              {testResults && testResults.length > 0 && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleGetFeedback}
                  disabled={feedbackStatus === 'loading'}
                  aria-busy={feedbackStatus === 'loading'}
                >
                  {feedbackStatus === 'loading' ? (
                    <>
                      <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} aria-hidden="true" />
                      Analyzing...
                    </>
                  ) : (
                    'Get Feedback'
                  )}
                </button>
              )}
            </div>

            {/* Hint output */}
            {hint && (
              <div className={`coach-output coach-output--hint animate-fade-in ${hintStatus === 'error' ? 'alert alert-error' : 'alert alert-info'}`}>
                <strong className="coach-output-label">Hint:</strong>
                <p className="mt-2 text-sm">{hint}</p>
              </div>
            )}

            {/* Feedback output */}
            {feedback && (
              <div className={`coach-output coach-output--feedback animate-fade-in ${feedbackStatus === 'error' ? 'alert alert-error' : 'alert alert-success'}`}>
                <strong className="coach-output-label">Feedback:</strong>
                <p className="mt-2 text-sm">{feedback}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .ai-coach-panel {
          display: flex;
          flex-direction: column;
        }

        .coach-header-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .coach-icon {
          font-size: var(--font-size-xl);
        }

        .coach-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
        }

        .coach-model-name {
          margin-left: 2rem;
        }

        .coach-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .coach-load-prompt {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .coach-load-prompt p {
          margin: 0;
        }

        .coach-loading {
          display: flex;
          flex-direction: column;
        }

        .coach-progress {
          padding: var(--space-3) var(--space-4);
          background-color: var(--bg-surface-alt);
          border-radius: var(--border-radius);
          border: 1px solid var(--border-color);
        }

        .coach-actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .coach-action-buttons {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .coach-output {
          margin: 0;
        }

        .coach-output p {
          margin: 0;
        }

        .coach-output-label {
          font-size: var(--font-size-sm);
        }
      `}</style>
    </div>
  )
}

export default AICoachPanel
