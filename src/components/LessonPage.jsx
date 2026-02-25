import React, { useState } from 'react'
import SlideViewer from './SlideViewer.jsx'
import ExercisePanel from './ExercisePanel.jsx'
import AICoachPanel from './AICoachPanel.jsx'
import QuizPanel from './QuizPanel.jsx'

/**
 * LessonPage
 *
 * Renders a complete lesson: slide navigation + exercises.
 *
 * Props:
 *   lesson         — the lesson data object
 *   navigateTo     — navigation function from App
 *   selectedModel  — current AI model id
 */
function LessonPage({ lesson, navigateTo, selectedModel }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('slides') // 'slides' | 'exercises' | 'quiz'
  const [testResults, setTestResults] = useState(null)
  const [errorContext, setErrorContext] = useState(null)
  const [coachMessage, setCoachMessage] = useState(null)

  // Support both a top-level `exercises` array and exercises embedded in slides
  const exercises = lesson.exercises?.length
    ? lesson.exercises
    : (lesson.slides ?? []).filter((s) => s.hasExercise).map((s) => s.exercise)
  const hasSlides = lesson.slides && lesson.slides.length > 0
  const hasExercises = exercises.length > 0
  const hasQuiz = lesson.questions?.length > 0
  const currentExercise = hasExercises ? exercises[currentExerciseIndex] : null

  const handleTestResults = (results) => {
    setTestResults(results)
  }

  const handleError = (err) => {
    setErrorContext(err)
  }

  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((i) => i - 1)
      setTestResults(null)
      setErrorContext(null)
    }
  }

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((i) => i + 1)
      setTestResults(null)
      setErrorContext(null)
    }
  }

  return (
    <div className="lesson-page">
      {/* Breadcrumb / back navigation */}
      <div className="lesson-breadcrumb">
        <div className="container-wide">
          <button
            className="btn btn-ghost btn-sm breadcrumb-back"
            onClick={() => navigateTo('home')}
            aria-label="Back to lessons"
          >
            ← All Lessons
          </button>
          <span className="breadcrumb-sep" aria-hidden="true">/</span>
          <span className="breadcrumb-current">{lesson.title}</span>
        </div>
      </div>

      {/* Lesson header */}
      <div className="lesson-header">
        <div className="container-wide">
          <h1 className="lesson-title">{lesson.title}</h1>
          {lesson.description && (
            <p className="lesson-description text-secondary">{lesson.description}</p>
          )}
        </div>
      </div>

      {/* Tabs (show when at least two content types exist) */}
      {(hasSlides || hasExercises || hasQuiz) && (hasSlides + hasExercises + hasQuiz > 1) && (
        <div className="lesson-tabs">
          <div className="container-wide">
            <div className="tabs-row" role="tablist">
              {hasSlides && (
                <button
                  role="tab"
                  aria-selected={activeTab === 'slides'}
                  className={`tab-btn ${activeTab === 'slides' ? 'tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('slides')}
                >
                  Slides
                  {lesson.slides && (
                    <span className="tab-count">{lesson.slides.length}</span>
                  )}
                </button>
              )}
              {hasExercises && (
                <button
                  role="tab"
                  aria-selected={activeTab === 'exercises'}
                  className={`tab-btn ${activeTab === 'exercises' ? 'tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('exercises')}
                >
                  Exercises
                  {exercises.length > 0 && (
                    <span className="tab-count">{exercises.length}</span>
                  )}
                </button>
              )}
              {hasQuiz && (
                <button
                  role="tab"
                  aria-selected={activeTab === 'quiz'}
                  className={`tab-btn ${activeTab === 'quiz' ? 'tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('quiz')}
                >
                  Quiz
                  <span className="tab-count">{lesson.questions.length}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lesson-content container-wide">
        {/* Slides tab */}
        {(!hasExercises && !hasQuiz || activeTab === 'slides') && hasSlides && (
          <div className="lesson-slides-view animate-fade-in">
            <SlideViewer
              slides={lesson.slides}
              currentIndex={currentSlide}
              onNavigate={setCurrentSlide}
            />
            {hasExercises && (
              <div className="slides-to-exercises mt-6 text-center">
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveTab('exercises')}
                >
                  Go to Exercises →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Exercises tab */}
        {(!hasSlides && !hasQuiz || activeTab === 'exercises') && hasExercises && currentExercise && (
          <div className="lesson-exercises-view animate-fade-in">
            {/* Exercise navigator */}
            {exercises.length > 1 && (
              <div className="exercise-navigator">
                <div className="exercise-nav-left">
                  <span className="text-sm text-secondary">
                    Exercise {currentExerciseIndex + 1} of {exercises.length}
                  </span>
                </div>
                <div className="exercise-nav-pills">
                  {exercises.map((ex, i) => (
                    <button
                      key={ex.id}
                      className={`exercise-nav-pill ${i === currentExerciseIndex ? 'exercise-nav-pill--active' : ''}`}
                      onClick={() => {
                        setCurrentExerciseIndex(i)
                        setTestResults(null)
                        setErrorContext(null)
                      }}
                      aria-label={`Exercise ${i + 1}: ${ex.title}`}
                      title={ex.title}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="exercise-nav-arrows">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handlePrevExercise}
                    disabled={currentExerciseIndex === 0}
                    aria-label="Previous exercise"
                  >
                    ←
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleNextExercise}
                    disabled={currentExerciseIndex === exercises.length - 1}
                    aria-label="Next exercise"
                  >
                    →
                  </button>
                </div>
              </div>
            )}

            {/* Exercise + AI Coach layout */}
            <div className="exercise-layout">
              <div className="exercise-main">
                <ExercisePanel
                  key={currentExercise.id}
                  exercise={currentExercise}
                  lessonId={lesson.id}
                  onTestResults={handleTestResults}
                  onError={handleError}
                />
              </div>

              {selectedModel !== 'none' && (
                <div className="exercise-sidebar">
                  <AICoachPanel
                    selectedModel={selectedModel}
                    exercise={currentExercise}
                    userCode={''}
                    testResults={testResults}
                    errorContext={errorContext}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quiz tab */}
        {activeTab === 'quiz' && hasQuiz && (
          <div className="lesson-quiz-view animate-fade-in">
            <QuizPanel
              questions={lesson.questions}
              selectedModel={selectedModel}
              lessonTitle={lesson.title}
              onAskCoach={(prompt) => setCoachMessage(prompt)}
            />
            {coachMessage && selectedModel !== 'none' && (
              <div className="quiz-coach-panel mt-6">
                <AICoachPanel
                  selectedModel={selectedModel}
                  exercise={{ title: 'Quiz Question', description: coachMessage, hints: [] }}
                  userCode={''}
                  testResults={null}
                  errorContext={null}
                  autoPrompt={coachMessage}
                />
              </div>
            )}
          </div>
        )}

        {/* Empty states */}
        {!hasSlides && !hasExercises && !hasQuiz && (
          <div className="card card-body text-center py-12">
            <p className="text-secondary">This lesson has no content yet.</p>
          </div>
        )}
      </div>

      <style>{`
        .lesson-page {
          min-height: calc(100vh - var(--nav-height));
          padding-bottom: var(--space-16);
        }

        .lesson-breadcrumb {
          padding: var(--space-3) 0;
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
        }

        .lesson-breadcrumb .container-wide {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .breadcrumb-back {
          color: var(--color-primary);
        }

        .breadcrumb-sep {
          color: var(--text-muted);
        }

        .breadcrumb-current {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          font-weight: var(--font-weight-medium);
        }

        .lesson-header {
          padding: var(--space-8) 0 var(--space-6);
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
        }

        .lesson-title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-2);
        }

        .lesson-description {
          font-size: var(--font-size-base);
          margin: 0;
        }

        .lesson-tabs {
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: var(--nav-height);
          z-index: var(--z-raised);
        }

        .tabs-row {
          display: flex;
          gap: 0;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-5);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          margin-bottom: -1px;
        }

        .tab-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-surface-alt);
        }

        .tab-btn--active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }

        .tab-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-gray-200);
          color: var(--text-secondary);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          border-radius: var(--border-radius-full);
          min-width: 20px;
          height: 20px;
          padding: 0 var(--space-1);
        }

        .tab-btn--active .tab-count {
          background-color: #e0e7ff;
          color: var(--color-primary-dark);
        }

        .lesson-content {
          padding-top: var(--space-8);
        }

        .lesson-slides-view {
          max-width: 800px;
        }

        .lesson-quiz-view {
          max-width: 800px;
        }

        .quiz-coach-panel {
          margin-top: var(--space-6);
        }

        /* Exercise navigator */
        .exercise-navigator {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
          flex-wrap: wrap;
        }

        .exercise-nav-left {
          flex: 1;
          min-width: 120px;
        }

        .exercise-nav-pills {
          display: flex;
          gap: var(--space-1);
          flex-wrap: wrap;
        }

        .exercise-nav-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--color-gray-200);
          color: var(--text-secondary);
          border: none;
          cursor: pointer;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          transition: all var(--transition-fast);
        }

        .exercise-nav-pill:hover {
          background-color: var(--color-gray-300);
          color: var(--text-primary);
        }

        .exercise-nav-pill--active {
          background: var(--gradient-primary);
          color: white;
        }

        .exercise-nav-arrows {
          display: flex;
          gap: var(--space-2);
        }

        /* Exercise layout: editor + AI panel side by side on large screens */
        .exercise-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }

        @media (min-width: 1024px) {
          .exercise-layout {
            grid-template-columns: 1fr 340px;
          }
        }

        .exercise-main {
          min-width: 0;
        }

        .exercise-sidebar {
          min-width: 0;
        }
      `}</style>
    </div>
  )
}

export default LessonPage
