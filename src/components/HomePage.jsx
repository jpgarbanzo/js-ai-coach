import React from 'react'
import { LESSONS, getLessonById } from '../lessons/index.js'
import { getLessonProgress } from '../utils/storage.js'

function LessonCard({ lesson, onStart }) {
  const { completed, total } = getLessonProgress(lesson.id, lesson.exercises?.length ?? 0)
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0
  const isStarted = completed > 0
  const isFinished = total > 0 && completed === total

  return (
    <article className="lesson-card card animate-fade-in-up" aria-label={`Lesson: ${lesson.title}`}>
      <div className="lesson-card-body card-body">
        <div className="lesson-card-header">
          <div className="lesson-card-meta">
            {isFinished && (
              <span className="badge badge-success" aria-label="Completed">
                Completed
              </span>
            )}
            {isStarted && !isFinished && (
              <span className="badge badge-primary" aria-label="In progress">
                In Progress
              </span>
            )}
          </div>
          <h2 className="lesson-card-title">{lesson.title}</h2>
          <p className="lesson-card-description text-secondary">{lesson.description}</p>
        </div>

        {total > 0 && (
          <div className="lesson-card-progress">
            <div className="lesson-card-progress-label">
              <span className="text-sm text-secondary">
                {completed} / {total} exercises
              </span>
              <span className="text-sm text-secondary">{progressPercent}%</span>
            </div>
            <div className="progress-bar" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        )}

        <div className="lesson-card-stats text-sm text-secondary">
          {lesson.slides?.length > 0 && (
            <span>{lesson.slides.length} slides</span>
          )}
          {lesson.exercises?.length > 0 && (
            <span>{lesson.exercises.length} exercises</span>
          )}
        </div>
      </div>

      <div className="lesson-card-footer">
        <button className="btn btn-primary" onClick={() => onStart(lesson)}>
          {isStarted && !isFinished ? 'Continue' : isFinished ? 'Review' : 'Start Lesson'}
        </button>
      </div>

      <style>{`
        .lesson-card {
          display: flex;
          flex-direction: column;
          transition: box-shadow var(--transition-base), transform var(--transition-base);
        }

        .lesson-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .lesson-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .lesson-card-header {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .lesson-card-meta {
          min-height: 22px;
        }

        .lesson-card-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          line-height: var(--line-height-snug);
        }

        .lesson-card-description {
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          margin-bottom: 0;
        }

        .lesson-card-progress {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .lesson-card-progress-label {
          display: flex;
          justify-content: space-between;
        }

        .lesson-card-stats {
          display: flex;
          gap: var(--space-4);
        }

        .lesson-card-footer {
          padding: var(--space-4) var(--space-6);
          border-top: 1px solid var(--border-color);
          background-color: var(--bg-surface-alt);
        }
      `}</style>
    </article>
  )
}

function HomePage({ navigateTo }) {
  const handleStartLesson = (lesson) => {
    navigateTo('lesson', lesson)
  }

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fade-in-up">
            <h1 className="hero-title">
              Learn JavaScript with{' '}
              <span className="hero-highlight">AI Coaching</span>
            </h1>
            <p className="hero-subtitle">
              Interactive lessons, hands-on exercises, and an AI coach that runs entirely in your
              browser — no server, no account required.
            </p>
            {LESSONS.length > 0 && (
              <button
                className="btn btn-primary btn-lg"
                onClick={() => handleStartLesson(LESSONS[0])}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="features-strip">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon" aria-hidden="true">📝</span>
              <div>
                <strong>Structured Lessons</strong>
                <p>Step-by-step slides that build concepts progressively.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon" aria-hidden="true">💻</span>
              <div>
                <strong>Live Exercises</strong>
                <p>Write real JavaScript and get instant pass/fail feedback.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon" aria-hidden="true">🤖</span>
              <div>
                <strong>AI Hints</strong>
                <p>On-device AI gives you hints without revealing the answer.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon" aria-hidden="true">🔒</span>
              <div>
                <strong>100% Private</strong>
                <p>Everything runs in your browser. No data leaves your device.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons grid */}
      <section className="lessons-section">
        <div className="container">
          <div className="lessons-header">
            <h2 className="lessons-title">All Lessons</h2>
            <p className="lessons-subtitle text-secondary">
              {LESSONS.length > 0
                ? `${LESSONS.length} lesson${LESSONS.length !== 1 ? 's' : ''} available`
                : 'Lessons coming soon!'}
            </p>
          </div>

          {LESSONS.length > 0 ? (
            <div className="lessons-grid">
              {LESSONS.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} onStart={handleStartLesson} />
              ))}
            </div>
          ) : (
            <div className="lessons-empty card card-body">
              <p className="text-center text-secondary">
                No lessons have been added yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .home-page {
          min-height: calc(100vh - var(--nav-height));
        }

        /* Hero */
        .hero {
          background: var(--gradient-primary);
          padding: var(--space-20) 0 var(--space-16);
          color: var(--text-inverse);
        }

        .hero-content {
          max-width: 640px;
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: var(--font-weight-bold);
          color: var(--text-inverse);
          line-height: var(--line-height-tight);
        }

        .hero-highlight {
          color: #fef08a;
        }

        .hero-subtitle {
          font-size: var(--font-size-lg);
          opacity: 0.9;
          line-height: var(--line-height-relaxed);
          margin-bottom: 0;
        }

        /* Features */
        .features-strip {
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
          padding: var(--space-8) 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-6);
        }

        .feature-item {
          display: flex;
          gap: var(--space-3);
          align-items: flex-start;
        }

        .feature-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .feature-item strong {
          display: block;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--space-1);
        }

        .feature-item p {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin: 0;
        }

        /* Lessons section */
        .lessons-section {
          padding: var(--space-12) 0;
        }

        .lessons-header {
          margin-bottom: var(--space-8);
        }

        .lessons-title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-2);
        }

        .lessons-subtitle {
          font-size: var(--font-size-base);
        }

        .lessons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-6);
        }

        .lessons-empty {
          text-align: center;
          padding: var(--space-12);
        }
      `}</style>
    </div>
  )
}

export default HomePage
