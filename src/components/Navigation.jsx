import React, { useState } from 'react'
import { AVAILABLE_MODELS } from '../utils/aiCoach.js'
import { saveModel as persistModel } from '../utils/storage.js'

function Navigation({ currentView, navigateTo, selectedModel, onModelChange }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleModelChange = (e) => {
    const modelId = e.target.value
    onModelChange(modelId)
    persistModel(modelId)
  }

  const selectedModelConfig = AVAILABLE_MODELS.find((m) => m.id === selectedModel)

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav-inner container-wide">
        {/* Logo / brand */}
        <button
          className="nav-logo"
          onClick={() => navigateTo('home')}
          aria-label="Go to home page"
        >
          <span className="nav-logo-icon" aria-hidden="true">⚡</span>
          <span className="nav-logo-text">JS AI Coach</span>
        </button>

        {/* Desktop links */}
        <div className="nav-links hide-mobile">
          <button
            className={`nav-link ${currentView === 'home' ? 'nav-link--active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            Lessons
          </button>
          <button
            className={`nav-link ${currentView === 'troubleshoot' ? 'nav-link--active' : ''}`}
            onClick={() => navigateTo('troubleshoot')}
          >
            Troubleshoot
          </button>
        </div>

        {/* Model selector */}
        <div className="nav-model-selector hide-mobile">
          <label htmlFor="model-select" className="nav-model-label">
            AI Coach:
          </label>
          <select
            id="model-select"
            className="form-control nav-model-select"
            value={selectedModel}
            onChange={handleModelChange}
            title={selectedModelConfig?.description}
          >
            {AVAILABLE_MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.recommended ? `★ ${model.name}` : model.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger show-mobile-only"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav-mobile-menu show-mobile-only animate-fade-in">
          <button
            className="nav-link"
            onClick={() => {
              navigateTo('home')
              setMenuOpen(false)
            }}
          >
            Lessons
          </button>
          <button
            className="nav-link"
            onClick={() => {
              navigateTo('troubleshoot')
              setMenuOpen(false)
            }}
          >
            Troubleshoot
          </button>
          <div className="nav-model-selector-mobile">
            <label htmlFor="model-select-mobile" className="nav-model-label">
              AI Coach:
            </label>
            <select
              id="model-select-mobile"
              className="form-control"
              value={selectedModel}
              onChange={handleModelChange}
            >
              {AVAILABLE_MODELS.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.recommended ? `★ ${model.name}` : model.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-nav);
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border-color);
          height: var(--nav-height);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          height: var(--nav-height);
          gap: var(--space-4);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-2);
          border-radius: var(--border-radius);
          text-decoration: none;
          transition: background-color var(--transition-fast);
          flex-shrink: 0;
        }

        .nav-logo:hover {
          background-color: var(--color-gray-100);
        }

        .nav-logo-icon {
          font-size: var(--font-size-xl);
        }

        .nav-logo-text {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          flex: 1;
        }

        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-2) var(--space-3);
          border-radius: var(--border-radius);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          text-decoration: none;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background-color: var(--color-gray-100);
        }

        .nav-link--active {
          color: var(--color-primary);
          background-color: #eff2ff;
        }

        .nav-model-selector {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-left: auto;
        }

        .nav-model-label {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          white-space: nowrap;
          font-weight: var(--font-weight-medium);
        }

        .nav-model-select {
          min-width: 160px;
          font-size: var(--font-size-xs);
          padding: var(--space-1) var(--space-8) var(--space-1) var(--space-2);
        }

        .nav-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          padding: var(--space-2);
          background: none;
          border: none;
          cursor: pointer;
          border-radius: var(--border-radius);
          margin-left: auto;
        }

        .nav-hamburger:hover {
          background-color: var(--color-gray-100);
        }

        .hamburger-line {
          display: block;
          width: 20px;
          height: 2px;
          background-color: var(--text-primary);
          border-radius: 2px;
        }

        .nav-mobile-menu {
          position: fixed;
          top: var(--nav-height);
          left: 0;
          right: 0;
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          box-shadow: var(--shadow-lg);
          z-index: var(--z-nav);
        }

        .nav-mobile-menu .nav-link {
          width: 100%;
          text-align: left;
          padding: var(--space-3) var(--space-4);
        }

        .nav-model-selector-mobile {
          padding-top: var(--space-2);
          border-top: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
      `}</style>
    </nav>
  )
}

export default Navigation
