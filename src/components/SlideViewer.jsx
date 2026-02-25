import React from 'react'

/**
 * SlideViewer — renders lesson slides with prev/next navigation.
 *
 * Props:
 *   slides         — array of { id, title, content } objects
 *   currentIndex   — active slide index (controlled)
 *   onNavigate     — (newIndex: number) => void
 */
function SlideViewer({ slides = [], currentIndex = 0, onNavigate }) {
  const total = slides.length
  const slide = slides[currentIndex]

  if (!slide) {
    return (
      <div className="slide-viewer slide-viewer--empty card card-body">
        <p className="text-secondary text-center">No slides available for this lesson.</p>
      </div>
    )
  }

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < total - 1

  const handlePrev = () => {
    if (canGoPrev) onNavigate(currentIndex - 1)
  }

  const handleNext = () => {
    if (canGoNext) onNavigate(currentIndex + 1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrev()
    if (e.key === 'ArrowRight') handleNext()
  }

  return (
    <div
      className="slide-viewer card animate-fade-in"
      role="region"
      aria-label={`Slide ${currentIndex + 1} of ${total}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <div className="slide-header card-header">
        <div className="slide-nav-top">
          <div className="slide-counter text-sm text-secondary">
            Slide {currentIndex + 1} of {total}
          </div>
          <div className="slide-dot-indicators" role="tablist" aria-label="Slide indicators">
            {slides.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                className={`slide-dot ${i === currentIndex ? 'slide-dot--active' : ''} ${i < currentIndex ? 'slide-dot--visited' : ''}`}
                onClick={() => onNavigate(i)}
              />
            ))}
          </div>
        </div>
        <h2 className="slide-title">{slide.title}</h2>
      </div>

      {/* Content */}
      <div
        className="slide-content card-body"
        dangerouslySetInnerHTML={{ __html: slide.content ?? '' }}
      />

      {/* Navigation footer */}
      <div className="slide-footer">
        <button
          className="btn btn-secondary"
          onClick={handlePrev}
          disabled={!canGoPrev}
          aria-label="Previous slide"
        >
          ← Previous
        </button>

        <div className="slide-progress-bar">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={Math.round(((currentIndex + 1) / total) * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar-fill"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="Next slide"
        >
          Next →
        </button>
      </div>

      <style>{`
        .slide-viewer {
          display: flex;
          flex-direction: column;
          outline: none;
        }

        .slide-viewer:focus-visible {
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
        }

        .slide-header {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .slide-nav-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .slide-dot-indicators {
          display: flex;
          gap: var(--space-1);
          flex-wrap: wrap;
        }

        .slide-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background-color: var(--color-gray-300);
          transition: all var(--transition-fast);
          padding: 0;
        }

        .slide-dot:hover {
          background-color: var(--color-gray-400);
          transform: scale(1.2);
        }

        .slide-dot--active {
          background: var(--gradient-primary);
          width: 24px;
          border-radius: var(--border-radius-full);
        }

        .slide-dot--visited {
          background-color: var(--color-primary-light);
        }

        .slide-title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
        }

        .slide-content {
          flex: 1;
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          min-height: 200px;
        }

        .slide-content h1,
        .slide-content h2,
        .slide-content h3,
        .slide-content h4 {
          margin-top: var(--space-6);
          margin-bottom: var(--space-3);
        }

        .slide-content h1:first-child,
        .slide-content h2:first-child,
        .slide-content h3:first-child {
          margin-top: 0;
        }

        .slide-content ul,
        .slide-content ol {
          margin-bottom: var(--space-4);
        }

        .slide-content blockquote {
          border-left: 4px solid var(--color-primary);
          padding: var(--space-3) var(--space-4);
          margin: var(--space-4) 0;
          background-color: var(--bg-surface-alt);
          border-radius: 0 var(--border-radius) var(--border-radius) 0;
          font-style: italic;
          color: var(--text-secondary);
        }

        .slide-footer {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4) var(--space-6);
          border-top: 1px solid var(--border-color);
          background-color: var(--bg-surface-alt);
        }

        .slide-progress-bar {
          flex: 1;
        }
      `}</style>
    </div>
  )
}


export default SlideViewer
