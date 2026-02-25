import React, { useState } from 'react'

/**
 * QuizPanel
 *
 * Full-featured quiz component for a lesson.
 *
 * Props:
 *   questions      — array of question objects
 *   selectedModel  — current AI model id ('none' disables the Ask AI Coach button)
 *   lessonTitle    — title of the lesson (used in AI prompt)
 *   onAskCoach     — callback(prompt: string) invoked when user clicks "Ask AI Coach"
 */
function QuizPanel({ questions = [], selectedModel = 'none', lessonTitle = '', onAskCoach }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState({}) // { [questionIndex]: Set<optionId> }
  const [submitted, setSubmitted] = useState({}) // { [questionIndex]: true }
  const [quizDone, setQuizDone] = useState(false)
  const [score, setScore] = useState(null)

  if (questions.length === 0) {
    return (
      <div className="quiz-empty">
        <p className="text-secondary">No quiz questions available for this lesson.</p>
      </div>
    )
  }

  const question = questions[currentIndex]
  const totalQuestions = questions.length
  const isSubmitted = !!submitted[currentIndex]
  const currentSelections = selectedOptions[currentIndex] || new Set()
  const hasSelection = currentSelections.size > 0

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------

  const getQuestionStatus = (index) => {
    if (!submitted[index]) return 'unanswered'
    const q = questions[index]
    const selections = selectedOptions[index] || new Set()
    const correctIds = new Set(q.options.filter((o) => o.correct).map((o) => o.id))
    const isCorrect =
      selections.size === correctIds.size && [...selections].every((id) => correctIds.has(id))
    return isCorrect ? 'correct' : 'wrong'
  }

  const isOptionSelected = (optionId) => currentSelections.has(optionId)

  const getOptionState = (option) => {
    if (!isSubmitted) {
      return isOptionSelected(option.id) ? 'selected' : 'idle'
    }
    const selected = isOptionSelected(option.id)
    if (option.correct && selected) return 'correct-selected'
    if (option.correct && !selected) return 'correct-missed'
    if (!option.correct && selected) return 'wrong-selected'
    return 'idle'
  }

  // -----------------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------------

  const handleOptionClick = (optionId) => {
    if (isSubmitted) return
    setSelectedOptions((prev) => {
      const prevSet = new Set(prev[currentIndex] || [])
      if (question.multiSelect) {
        if (prevSet.has(optionId)) {
          prevSet.delete(optionId)
        } else {
          prevSet.add(optionId)
        }
      } else {
        prevSet.clear()
        prevSet.add(optionId)
      }
      return { ...prev, [currentIndex]: prevSet }
    })
  }

  const handleSubmit = () => {
    if (!hasSelection || isSubmitted) return
    setSubmitted((prev) => ({ ...prev, [currentIndex]: true }))
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Calculate score
      let correct = 0
      for (let i = 0; i < totalQuestions; i++) {
        if (getQuestionStatus(i) === 'correct') correct++
      }
      setScore(correct)
      setQuizDone(true)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleRetry = () => {
    setCurrentIndex(0)
    setSelectedOptions({})
    setSubmitted({})
    setQuizDone(false)
    setScore(null)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  const handleAskCoach = () => {
    if (!onAskCoach) return
    const selectedTexts = question.options
      .filter((o) => currentSelections.has(o.id))
      .map((o) => o.text)
      .join(', ')
    const correctTexts = question.options
      .filter((o) => o.correct)
      .map((o) => o.text)
      .join(', ')
    const prompt = `Quiz question from "${lessonTitle}": ${question.question}

My answer: ${selectedTexts || '(none selected)'}

Correct answer: ${correctTexts}

Explanation: ${question.explanation || '(none provided)'}

Please explain this concept further.`
    onAskCoach(prompt)
  }

  // -----------------------------------------------------------------------
  // End screen
  // -----------------------------------------------------------------------

  if (quizDone) {
    const pct = Math.round((score / totalQuestions) * 100)
    let emoji = '🎉'
    if (pct < 50) emoji = '📚'
    else if (pct < 75) emoji = '👍'
    else if (pct < 100) emoji = '🌟'

    return (
      <div className="quiz-panel">
        <div className="quiz-end-screen">
          <div className="quiz-end-emoji" aria-hidden="true">{emoji}</div>
          <h2 className="quiz-end-title">Quiz Complete!</h2>
          <div className="quiz-end-score">
            <span className="quiz-score-fraction">{score} / {totalQuestions}</span>
            <span className="quiz-score-pct">correct ({pct}%)</span>
          </div>
          <div className="quiz-end-bar-wrap">
            <div className="quiz-end-bar" style={{ width: `${pct}%` }} />
          </div>
          <p className="quiz-end-message">
            {pct === 100 && 'Perfect score! Outstanding work.'}
            {pct >= 75 && pct < 100 && 'Great job! Review the ones you missed.'}
            {pct >= 50 && pct < 75 && 'Good effort! A bit more review will help.'}
            {pct < 50 && 'Keep studying — you\'ll get there!'}
          </p>
          <button className="btn btn-primary quiz-retry-btn" onClick={handleRetry}>
            Retry Quiz
          </button>
        </div>
        <style>{quizStyles}</style>
      </div>
    )
  }

  // -----------------------------------------------------------------------
  // Question screen
  // -----------------------------------------------------------------------

  const progressPct = ((currentIndex + 1) / totalQuestions) * 100

  return (
    <div className="quiz-panel">
      {/* Progress bar */}
      <div className="quiz-progress-bar-wrap" aria-hidden="true">
        <div className="quiz-progress-bar-fill" style={{ width: `${progressPct}%` }} />
      </div>

      {/* Dot indicators */}
      <div className="quiz-dots" role="tablist" aria-label="Questions">
        {questions.map((_, i) => {
          const status = submitted[i] ? getQuestionStatus(i) : 'unanswered'
          const isCurrent = i === currentIndex
          return (
            <button
              key={i}
              role="tab"
              aria-selected={isCurrent}
              aria-label={`Question ${i + 1}${status !== 'unanswered' ? ` (${status})` : ''}`}
              className={[
                'quiz-dot',
                isCurrent ? 'quiz-dot--current' : '',
                status === 'correct' ? 'quiz-dot--correct' : '',
                status === 'wrong' ? 'quiz-dot--wrong' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleDotClick(i)}
            >
              {status === 'correct' ? '✓' : status === 'wrong' ? '✗' : i + 1}
            </button>
          )
        })}
      </div>

      {/* Question counter */}
      <div className="quiz-counter" aria-live="polite">
        Question {currentIndex + 1} of {totalQuestions}
      </div>

      {/* Question card */}
      <div className="quiz-question-card">
        <h2 className="quiz-question-text">{question.question}</h2>
        {question.multiSelect && (
          <p className="quiz-multi-label">Select all that apply</p>
        )}

        {/* Options */}
        <div className="quiz-options" role="group" aria-label="Answer options">
          {question.options.map((option) => {
            const state = getOptionState(option)
            return (
              <button
                key={option.id}
                className={[
                  'quiz-option',
                  state === 'selected' ? 'quiz-option--selected' : '',
                  state === 'correct-selected' ? 'quiz-option--correct' : '',
                  state === 'correct-missed' ? 'quiz-option--missed' : '',
                  state === 'wrong-selected' ? 'quiz-option--wrong' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleOptionClick(option.id)}
                disabled={isSubmitted}
                aria-pressed={isOptionSelected(option.id)}
              >
                <span className="quiz-option-indicator" aria-hidden="true">
                  {!isSubmitted && (
                    question.multiSelect
                      ? (isOptionSelected(option.id) ? '☑' : '☐')
                      : (isOptionSelected(option.id) ? '◉' : '○')
                  )}
                  {isSubmitted && state === 'correct-selected' && '✓'}
                  {isSubmitted && state === 'correct-missed' && '✓'}
                  {isSubmitted && state === 'wrong-selected' && '✗'}
                  {isSubmitted && state === 'idle' && (question.multiSelect ? '☐' : '○')}
                </span>
                <span className="quiz-option-text">{option.text}</span>
              </button>
            )
          })}
        </div>

        {/* Explanation (after submit) */}
        {isSubmitted && question.explanation && (
          <div className="quiz-explanation animate-fade-in">
            <strong className="quiz-explanation-label">Explanation:</strong>
            <p className="quiz-explanation-text">{question.explanation}</p>
          </div>
        )}

        {/* Ask AI Coach (after submit) */}
        {isSubmitted && selectedModel !== 'none' && (
          <button
            className="btn btn-secondary btn-sm quiz-ask-coach-btn"
            onClick={handleAskCoach}
          >
            Ask AI Coach
          </button>
        )}
      </div>

      {/* Action buttons */}
      <div className="quiz-actions">
        <button
          className="btn btn-ghost btn-sm"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous question"
        >
          ← Previous
        </button>

        <div className="quiz-actions-right">
          {!isSubmitted ? (
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!hasSelection}
            >
              Submit Answer
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleNext}>
              {currentIndex < totalQuestions - 1 ? 'Next Question →' : 'See Results'}
            </button>
          )}
        </div>
      </div>

      <style>{quizStyles}</style>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const quizStyles = `
  .quiz-panel {
    max-width: 720px;
    margin: 0 auto;
  }

  /* Progress bar */
  .quiz-progress-bar-wrap {
    height: 4px;
    background-color: var(--color-gray-200);
    border-radius: 2px;
    margin-bottom: var(--space-4);
    overflow: hidden;
  }

  .quiz-progress-bar-fill {
    height: 100%;
    background: var(--gradient-primary);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  /* Dot indicators */
  .quiz-dots {
    display: flex;
    gap: var(--space-1);
    flex-wrap: wrap;
    margin-bottom: var(--space-3);
  }

  .quiz-dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid var(--color-gray-300);
    background-color: var(--bg-surface);
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .quiz-dot:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  .quiz-dot--current {
    border-color: var(--color-primary);
    background: var(--gradient-primary);
    color: white;
  }

  .quiz-dot--correct {
    border-color: var(--color-success);
    background-color: var(--color-success);
    color: white;
  }

  .quiz-dot--wrong {
    border-color: var(--color-error);
    background-color: var(--color-error);
    color: white;
  }

  /* Counter */
  .quiz-counter {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    margin-bottom: var(--space-4);
  }

  /* Question card */
  .quiz-question-card {
    background-color: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--space-6);
    margin-bottom: var(--space-4);
  }

  .quiz-question-text {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--text-primary);
    margin-bottom: var(--space-2);
    line-height: 1.4;
  }

  .quiz-multi-label {
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--space-4);
  }

  /* Options */
  .quiz-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .quiz-option {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-3) var(--space-4);
    background-color: var(--bg-base);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    text-align: left;
    font-size: var(--font-size-base);
    color: var(--text-primary);
    transition: all var(--transition-fast);
  }

  .quiz-option:hover:not(:disabled) {
    border-color: var(--color-primary);
    background-color: var(--bg-surface);
  }

  .quiz-option--selected {
    border-color: var(--color-primary);
    background-color: #eef2ff;
    color: var(--color-primary-dark);
  }

  .quiz-option--correct {
    border-color: var(--color-success);
    background-color: #f0fdf4;
    color: #166534;
  }

  .quiz-option--missed {
    border-color: #3b82f6;
    background-color: #eff6ff;
    color: #1d4ed8;
  }

  .quiz-option--wrong {
    border-color: var(--color-error);
    background-color: #fef2f2;
    color: #991b1b;
  }

  .quiz-option:disabled {
    cursor: default;
  }

  .quiz-option-indicator {
    font-size: var(--font-size-lg);
    flex-shrink: 0;
    width: 20px;
    text-align: center;
  }

  .quiz-option-text {
    flex: 1;
  }

  /* Explanation */
  .quiz-explanation {
    background-color: var(--bg-surface-alt);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .quiz-explanation-label {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }

  .quiz-explanation-text {
    margin-top: var(--space-1);
    font-size: var(--font-size-sm);
    color: var(--text-primary);
    line-height: 1.6;
  }

  /* Ask AI Coach button */
  .quiz-ask-coach-btn {
    margin-bottom: var(--space-2);
  }

  /* Action bar */
  .quiz-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3);
  }

  .quiz-actions-right {
    display: flex;
    gap: var(--space-2);
  }

  /* End screen */
  .quiz-end-screen {
    background-color: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--space-10) var(--space-6);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }

  .quiz-end-emoji {
    font-size: 3rem;
    line-height: 1;
  }

  .quiz-end-title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
  }

  .quiz-end-score {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
  }

  .quiz-score-fraction {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
  }

  .quiz-score-pct {
    font-size: var(--font-size-base);
    color: var(--text-secondary);
  }

  .quiz-end-bar-wrap {
    width: 100%;
    max-width: 320px;
    height: 8px;
    background-color: var(--color-gray-200);
    border-radius: 4px;
    overflow: hidden;
  }

  .quiz-end-bar {
    height: 100%;
    background: var(--gradient-primary);
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  .quiz-end-message {
    font-size: var(--font-size-base);
    color: var(--text-secondary);
  }

  .quiz-retry-btn {
    margin-top: var(--space-2);
  }

  .quiz-empty {
    padding: var(--space-8);
    text-align: center;
  }
`

export default QuizPanel
