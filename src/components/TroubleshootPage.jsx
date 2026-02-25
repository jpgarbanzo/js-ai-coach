import React, { useState, useEffect } from 'react'
import { AVAILABLE_MODELS, checkModelSupport, loadModel, unloadModel } from '../utils/aiCoach.js'
import { clearAllProgress, exportAllData } from '../utils/storage.js'

/**
 * Capability check row component.
 */
function CapabilityRow({ label, supported, detail }) {
  return (
    <div className={`capability-row ${supported ? 'capability-row--ok' : 'capability-row--warn'}`}>
      <span className="capability-icon" aria-label={supported ? 'Supported' : 'Not supported'}>
        {supported ? '✅' : '⚠️'}
      </span>
      <div className="capability-content">
        <span className="capability-label">{label}</span>
        {detail && <span className="capability-detail text-sm text-secondary">{detail}</span>}
      </div>
    </div>
  )
}

/**
 * TroubleshootPage
 *
 * Provides:
 * - Browser capability diagnostics (WebAssembly, SharedArrayBuffer, etc.)
 * - Model loading test with progress indicator
 * - Storage management (clear progress, export data)
 * - Model information table
 */
function TroubleshootPage({ selectedModel, onModelChange }) {
  const [capabilities, setCapabilities] = useState(null)
  const [loadStatus, setLoadStatus] = useState('idle') // idle | loading | ready | error
  const [loadProgress, setLoadProgress] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const [storageCleared, setStorageCleared] = useState(false)
  const [exportedData, setExportedData] = useState(null)
  const [testModelId, setTestModelId] = useState(selectedModel !== 'none' ? selectedModel : 'tiny')

  useEffect(() => {
    setCapabilities(checkModelSupport())
  }, [])

  const handleTestLoad = async () => {
    if (testModelId === 'none') return
    setLoadStatus('loading')
    setLoadProgress(null)
    setLoadError(null)

    try {
      await loadModel(testModelId, (progress) => {
        setLoadProgress(progress)
      })
      setLoadStatus('ready')
    } catch (err) {
      setLoadStatus('error')
      setLoadError(err instanceof Error ? err.message : String(err))
    }
  }

  const handleUnload = () => {
    unloadModel()
    setLoadStatus('idle')
    setLoadProgress(null)
    setLoadError(null)
  }

  const handleClearProgress = () => {
    clearAllProgress()
    setStorageCleared(true)
    setTimeout(() => setStorageCleared(false), 3000)
  }

  const handleExportData = () => {
    const data = exportAllData()
    setExportedData(JSON.stringify(data, null, 2))
  }

  const testModelConfig = AVAILABLE_MODELS.find((m) => m.id === testModelId)

  return (
    <div className="troubleshoot-page">
      <div className="troubleshoot-header">
        <div className="container">
          <h1 className="troubleshoot-title">Troubleshoot</h1>
          <p className="text-secondary">
            Diagnose browser compatibility, test AI model loading, and manage your stored data.
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="troubleshoot-grid">

          {/* Section 1: Browser Capabilities */}
          <section className="troubleshoot-section card">
            <div className="card-header">
              <h2 className="section-title">Browser Capabilities</h2>
            </div>
            <div className="card-body">
              {!capabilities ? (
                <div className="flex items-center gap-3">
                  <div className="spinner" aria-hidden="true" />
                  <span className="text-sm text-secondary">Checking capabilities...</span>
                </div>
              ) : (
                <>
                  <div className="capabilities-list">
                    <CapabilityRow
                      label="WebAssembly"
                      supported={capabilities.webAssembly}
                      detail={
                        capabilities.webAssembly
                          ? 'WebAssembly is available. Required for ONNX model inference.'
                          : 'WebAssembly is NOT supported. AI models cannot run in this browser.'
                      }
                    />
                    <CapabilityRow
                      label="SharedArrayBuffer"
                      supported={capabilities.sharedArrayBuffer}
                      detail={
                        capabilities.sharedArrayBuffer
                          ? 'SharedArrayBuffer is available.'
                          : 'SharedArrayBuffer is NOT available. Some models may fail to load. The page needs COOP + COEP headers.'
                      }
                    />
                    <CapabilityRow
                      label="Cross-Origin Isolated"
                      supported={capabilities.crossOriginIsolated}
                      detail={
                        capabilities.crossOriginIsolated
                          ? 'Page is cross-origin isolated. SharedArrayBuffer works fully.'
                          : 'Page is not cross-origin isolated. Some multi-threaded WASM features may be limited.'
                      }
                    />
                    <CapabilityRow
                      label="IndexedDB (model cache)"
                      supported={typeof indexedDB !== 'undefined'}
                      detail="Used to cache downloaded model weights between sessions."
                    />
                  </div>

                  {capabilities.issues.length > 0 && (
                    <div className="alert alert-warning mt-4">
                      <strong>Issues detected:</strong>
                      <ul className="mt-2">
                        {capabilities.issues.map((issue, i) => (
                          <li key={i}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {capabilities.issues.length === 0 && (
                    <div className="alert alert-success mt-4">
                      Your browser supports all required features for AI model inference.
                    </div>
                  )}

                  <div className="browser-info mt-4 text-sm text-secondary">
                    <strong>Browser:</strong> {navigator.userAgent}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Section 2: Model Loading Test */}
          <section className="troubleshoot-section card">
            <div className="card-header">
              <h2 className="section-title">Model Loading Test</h2>
            </div>
            <div className="card-body">
              <p className="text-sm text-secondary mb-4">
                Test loading a model to verify your browser can download and run AI models.
                Models are cached in your browser after the first download.
              </p>

              <div className="form-group">
                <label htmlFor="test-model-select" className="form-label">
                  Model to test:
                </label>
                <select
                  id="test-model-select"
                  className="form-control"
                  value={testModelId}
                  onChange={(e) => setTestModelId(e.target.value)}
                  disabled={loadStatus === 'loading'}
                >
                  {AVAILABLE_MODELS.filter((m) => m.id !== 'none').map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} (~{m.memoryMB >= 1000 ? `${(m.memoryMB / 1000).toFixed(1)}GB` : `${m.memoryMB}MB`})
                    </option>
                  ))}
                </select>
              </div>

              {testModelConfig && (
                <p className="text-sm text-secondary mb-4">{testModelConfig.description}</p>
              )}

              <div className="model-test-actions flex gap-2 flex-wrap">
                <button
                  className="btn btn-primary"
                  onClick={handleTestLoad}
                  disabled={loadStatus === 'loading' || loadStatus === 'ready' || testModelId === 'none'}
                >
                  {loadStatus === 'loading' ? (
                    <>
                      <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} aria-hidden="true" />
                      Loading...
                    </>
                  ) : loadStatus === 'ready' ? (
                    'Model Loaded ✓'
                  ) : (
                    'Test Load Model'
                  )}
                </button>

                {loadStatus === 'ready' && (
                  <button className="btn btn-secondary" onClick={handleUnload}>
                    Unload Model
                  </button>
                )}
              </div>

              {/* Progress indicator */}
              {loadStatus === 'loading' && loadProgress && (
                <div className="load-progress mt-4 p-4 bg-surface-alt rounded border">
                  <div className="text-sm text-secondary mb-2">
                    {loadProgress.status === 'initiate' && 'Preparing...'}
                    {loadProgress.status === 'download' && 'Downloading model files...'}
                    {loadProgress.status === 'progress' && (
                      `${loadProgress.file ? `${loadProgress.file}: ` : ''}${Math.round(loadProgress.progress ?? 0)}%`
                    )}
                    {loadProgress.status === 'done' && 'Processing...'}
                  </div>
                  {typeof loadProgress.progress === 'number' && (
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${Math.round(loadProgress.progress)}%` }}
                      />
                    </div>
                  )}
                </div>
              )}

              {loadStatus === 'ready' && (
                <div className="alert alert-success mt-4">
                  <strong>Success!</strong> Model loaded and ready to use.
                  <div className="mt-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        onModelChange(testModelId)
                      }}
                    >
                      Use this model as AI Coach
                    </button>
                  </div>
                </div>
              )}

              {loadStatus === 'error' && (
                <div className="alert alert-error mt-4">
                  <strong>Load failed.</strong>
                  {loadError && <p className="mt-2 text-sm font-mono">{loadError}</p>}
                  <p className="mt-2 text-sm">
                    Common causes: network error, insufficient memory, unsupported browser features.
                    Check the Browser Capabilities section above.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Section 3: Available Models Reference */}
          <section className="troubleshoot-section card">
            <div className="card-header">
              <h2 className="section-title">Available Models</h2>
            </div>
            <div className="card-body">
              <div className="models-table-wrapper">
                <table className="models-table">
                  <thead>
                    <tr>
                      <th>Model</th>
                      <th>Size</th>
                      <th>Description</th>
                      <th>HuggingFace ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AVAILABLE_MODELS.map((model) => (
                      <tr key={model.id}>
                        <td>
                          <strong>{model.name}</strong>
                          {selectedModel === model.id && (
                            <span className="badge badge-primary ml-2" style={{ marginLeft: '0.5rem' }}>
                              Active
                            </span>
                          )}
                        </td>
                        <td className="text-sm text-secondary">
                          {model.memoryMB > 0
                            ? model.memoryMB >= 1000
                              ? `~${(model.memoryMB / 1000).toFixed(1)} GB`
                              : `~${model.memoryMB} MB`
                            : '—'}
                        </td>
                        <td className="text-sm">{model.description}</td>
                        <td className="text-sm font-mono text-secondary">
                          {model.huggingfaceId ?? '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4: Data Management */}
          <section className="troubleshoot-section card">
            <div className="card-header">
              <h2 className="section-title">Data Management</h2>
            </div>
            <div className="card-body">
              <p className="text-sm text-secondary mb-4">
                All progress data is stored in your browser&apos;s localStorage. No data is sent to any server.
              </p>

              <div className="data-actions flex gap-3 flex-wrap">
                <button
                  className="btn btn-secondary"
                  onClick={handleExportData}
                >
                  Export Data (JSON)
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleClearProgress}
                >
                  Clear All Progress
                </button>
              </div>

              {storageCleared && (
                <div className="alert alert-success mt-4 animate-fade-in">
                  All progress data has been cleared.
                </div>
              )}

              {exportedData && (
                <div className="mt-4 animate-fade-in">
                  <p className="text-sm font-semibold mb-2">Stored Data:</p>
                  <pre className="export-pre">{exportedData}</pre>
                </div>
              )}
            </div>
          </section>

          {/* Section 5: FAQ / Common Issues */}
          <section className="troubleshoot-section card">
            <div className="card-header">
              <h2 className="section-title">Common Issues</h2>
            </div>
            <div className="card-body">
              <div className="faq-list">
                <details className="faq-item">
                  <summary className="faq-question">The model won&apos;t load / download fails</summary>
                  <div className="faq-answer text-sm text-secondary">
                    <p>Check your internet connection. Model files can be 270 MB to 7+ GB. If the download was interrupted, try reloading the page — the partial download will be discarded.</p>
                    <p>Make sure you have sufficient free storage (check browser settings under &quot;Site Data&quot;).</p>
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">I get a SharedArrayBuffer error</summary>
                  <div className="faq-answer text-sm text-secondary">
                    <p>SharedArrayBuffer requires the page to be served with <code>Cross-Origin-Opener-Policy: same-origin</code> and <code>Cross-Origin-Embedder-Policy: require-corp</code> headers.</p>
                    <p>The deployed GitHub Pages version may not have these headers. Try running the app locally with <code>npm run dev</code>.</p>
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">The AI gives a hint in the wrong language</summary>
                  <div className="faq-answer text-sm text-secondary">
                    <p>The system prompt asks the AI to respond in English. Smaller models may not always follow this. Try rephrasing your request or use a larger model.</p>
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">My code runs fine but tests fail</summary>
                  <div className="faq-answer text-sm text-secondary">
                    <p>Exercises use an <code>exports</code> object pattern. Your code needs to assign results to <code>exports.yourVariable</code> for tests to access them. Check the exercise description for what should be exported.</p>
                    <p>Example: instead of <code>const x = 5</code>, write <code>exports.x = 5</code> or <code>const x = 5; exports.x = x</code>.</p>
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">The page is blank / app won&apos;t start</summary>
                  <div className="faq-answer text-sm text-secondary">
                    <p>Open the browser developer console (F12) and look for errors. Common causes: JavaScript disabled, very old browser, browser extension interference.</p>
                    <p>Try opening in a private/incognito window or a different browser.</p>
                  </div>
                </details>
              </div>
            </div>
          </section>

        </div>
      </div>

      <style>{`
        .troubleshoot-page {
          min-height: calc(100vh - var(--nav-height));
          padding-bottom: var(--space-16);
        }

        .troubleshoot-header {
          background: var(--gradient-primary);
          padding: var(--space-12) 0 var(--space-8);
          color: var(--text-inverse);
        }

        .troubleshoot-title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-inverse);
          margin-bottom: var(--space-2);
        }

        .troubleshoot-header .text-secondary {
          color: rgba(255,255,255,0.85);
        }

        .troubleshoot-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }

        .troubleshoot-section {
          display: flex;
          flex-direction: column;
        }

        .section-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
        }

        /* Capability rows */
        .capabilities-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .capability-row {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--border-radius);
        }

        .capability-row--ok {
          background-color: var(--color-success-light);
          border: 1px solid var(--color-success-border);
        }

        .capability-row--warn {
          background-color: var(--color-warning-light);
          border: 1px solid var(--color-warning-border);
        }

        .capability-icon {
          font-size: var(--font-size-lg);
          flex-shrink: 0;
          margin-top: 1px;
        }

        .capability-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .capability-label {
          font-weight: var(--font-weight-medium);
          font-size: var(--font-size-sm);
        }

        .capability-detail {
          line-height: var(--line-height-relaxed);
        }

        .browser-info {
          padding: var(--space-3);
          background-color: var(--bg-surface-alt);
          border-radius: var(--border-radius);
          word-break: break-all;
        }

        /* Load progress */
        .load-progress {
          padding: var(--space-3) var(--space-4);
          background-color: var(--bg-surface-alt);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
        }

        /* Models table */
        .models-table-wrapper {
          overflow-x: auto;
        }

        .models-table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--font-size-sm);
        }

        .models-table th {
          text-align: left;
          padding: var(--space-2) var(--space-3);
          border-bottom: 2px solid var(--border-color);
          font-weight: var(--font-weight-semibold);
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .models-table td {
          padding: var(--space-3);
          border-bottom: 1px solid var(--border-color);
          vertical-align: top;
        }

        .models-table tr:last-child td {
          border-bottom: none;
        }

        .models-table tbody tr:hover {
          background-color: var(--bg-surface-alt);
        }

        /* Export pre */
        .export-pre {
          font-size: var(--font-size-xs);
          max-height: 300px;
          overflow: auto;
        }

        /* FAQ */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .faq-item {
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          overflow: hidden;
        }

        .faq-question {
          padding: var(--space-3) var(--space-4);
          cursor: pointer;
          font-weight: var(--font-weight-medium);
          font-size: var(--font-size-sm);
          user-select: none;
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .faq-question::-webkit-details-marker {
          display: none;
        }

        .faq-question::after {
          content: '+';
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          transition: transform var(--transition-fast);
        }

        details[open] .faq-question::after {
          content: '−';
        }

        .faq-question:hover {
          background-color: var(--bg-surface-alt);
        }

        .faq-answer {
          padding: var(--space-4);
          border-top: 1px solid var(--border-color);
          background-color: var(--bg-surface-alt);
        }

        .faq-answer p {
          margin-bottom: var(--space-2);
        }

        .faq-answer p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

export default TroubleshootPage
