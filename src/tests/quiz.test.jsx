import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock heavy dependencies before importing components
vi.mock('@huggingface/transformers', () => ({
  pipeline: vi.fn(),
  env: { allowLocalModels: false, useBrowserCache: true },
}))

vi.mock('@uiw/react-codemirror', () => ({
  default: vi.fn(({ value, onChange }) => (
    <textarea
      data-testid="code-editor"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={!onChange}
    />
  )),
}))

import QuizPanel from '../components/QuizPanel.jsx'

// ---------------------------------------------------------------------------
// Sample question data
// ---------------------------------------------------------------------------

const singleSelectQuestion = {
  id: 'q-01',
  question: 'Which keyword creates a block-scoped variable?',
  multiSelect: false,
  options: [
    { id: 'a', text: 'var', correct: false },
    { id: 'b', text: 'let', correct: true },
    { id: 'c', text: 'function', correct: false },
  ],
  explanation: 'let creates a block-scoped variable.',
}

const multiSelectQuestion = {
  id: 'q-02',
  question: 'Which of the following are block-scoped?',
  multiSelect: true,
  options: [
    { id: 'a', text: 'var', correct: false },
    { id: 'b', text: 'let', correct: true },
    { id: 'c', text: 'const', correct: true },
  ],
  explanation: 'Both let and const are block-scoped.',
}

const twoQuestions = [singleSelectQuestion, multiSelectQuestion]

// ---------------------------------------------------------------------------
// QuizPanel
// ---------------------------------------------------------------------------

describe('QuizPanel', () => {
  it('renders nothing useful when no questions provided', () => {
    render(<QuizPanel questions={[]} />)
    expect(screen.getByText(/No quiz questions available/i)).toBeInTheDocument()
  })

  it('renders the first question text', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} />)
    expect(screen.getByText(/Which keyword creates a block-scoped variable/i)).toBeInTheDocument()
  })

  it('renders all option texts', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} />)
    expect(screen.getByText('var')).toBeInTheDocument()
    expect(screen.getByText('let')).toBeInTheDocument()
    expect(screen.getByText('function')).toBeInTheDocument()
  })

  it('shows question counter', () => {
    render(<QuizPanel questions={twoQuestions} />)
    expect(screen.getByText(/Question 1 of 2/i)).toBeInTheDocument()
  })

  it('Submit Answer button is disabled before selection', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} />)
    const submitBtn = screen.getByRole('button', { name: /Submit Answer/i })
    expect(submitBtn).toBeDisabled()
  })

  it('Submit Answer button becomes enabled after selecting an option', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} />)
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    const submitBtn = screen.getByRole('button', { name: /Submit Answer/i })
    expect(submitBtn).not.toBeDisabled()
  })

  it('clicking an option marks it as selected (aria-pressed)', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} />)
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    expect(letOption).toHaveAttribute('aria-pressed', 'true')
  })

  it('for single-select, selecting a second option deselects the first', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} />)
    const letOption = screen.getByText('let').closest('button')
    const varOption = screen.getByText('var').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(varOption)
    expect(letOption).toHaveAttribute('aria-pressed', 'false')
    expect(varOption).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows explanation after submitting', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} />)
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(screen.getByRole('button', { name: /Submit Answer/i }))
    expect(screen.getByText(/let creates a block-scoped variable/i)).toBeInTheDocument()
  })

  it('shows Next Question button after submitting', () => {
    render(<QuizPanel questions={twoQuestions} />)
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(screen.getByRole('button', { name: /Submit Answer/i }))
    expect(screen.getByRole('button', { name: /Next Question/i })).toBeInTheDocument()
  })

  it('options are disabled after submit', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} />)
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(screen.getByRole('button', { name: /Submit Answer/i }))
    // All options should be disabled
    singleSelectQuestion.options.forEach(({ text }) => {
      const btn = screen.getByText(text).closest('button')
      expect(btn).toBeDisabled()
    })
  })

  it('shows "Select all that apply" label for multiSelect questions', () => {
    render(<QuizPanel questions={[multiSelectQuestion]} />)
    expect(screen.getByText(/Select all that apply/i)).toBeInTheDocument()
  })

  it('multiSelect allows multiple options to be selected', () => {
    render(<QuizPanel questions={[multiSelectQuestion]} />)
    const letOption = screen.getByText('let').closest('button')
    const constOption = screen.getByText('const').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(constOption)
    expect(letOption).toHaveAttribute('aria-pressed', 'true')
    expect(constOption).toHaveAttribute('aria-pressed', 'true')
  })

  it('navigates to next question on "Next Question" click', () => {
    render(<QuizPanel questions={twoQuestions} />)
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(screen.getByRole('button', { name: /Submit Answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /Next Question/i }))
    expect(screen.getByText(/Question 2 of 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Which of the following are block-scoped/i)).toBeInTheDocument()
  })

  it('clicking Previous button goes back a question', () => {
    render(<QuizPanel questions={twoQuestions} />)
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(screen.getByRole('button', { name: /Submit Answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /Next Question/i }))
    // Now on question 2 — go back
    fireEvent.click(screen.getByRole('button', { name: /Previous question/i }))
    expect(screen.getByText(/Question 1 of 2/i)).toBeInTheDocument()
  })

  it('Previous button is disabled on the first question', () => {
    render(<QuizPanel questions={twoQuestions} />)
    const prevBtn = screen.getByRole('button', { name: /Previous question/i })
    expect(prevBtn).toBeDisabled()
  })

  it('dot indicators are rendered for each question', () => {
    render(<QuizPanel questions={twoQuestions} />)
    // The tablist contains one tab per question
    const tabs = screen.getAllByRole('tab')
    // Note: the tablist in QuizPanel is separate from any tab in LessonPage,
    // but in this isolated render there is only the quiz dots tablist.
    expect(tabs.length).toBe(twoQuestions.length)
  })

  it('clicking a dot navigates to that question', () => {
    render(<QuizPanel questions={twoQuestions} />)
    // Click dot for question 2
    const tabs = screen.getAllByRole('tab')
    fireEvent.click(tabs[1])
    expect(screen.getByText(/Question 2 of 2/i)).toBeInTheDocument()
  })

  it('does not show Ask AI Coach button when selectedModel is none', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} selectedModel="none" />)
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(screen.getByRole('button', { name: /Submit Answer/i }))
    expect(screen.queryByRole('button', { name: /Ask AI Coach/i })).not.toBeInTheDocument()
  })

  it('shows Ask AI Coach button after submit when model is selected', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} selectedModel="tiny" />)
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(screen.getByRole('button', { name: /Submit Answer/i }))
    expect(screen.getByRole('button', { name: /Ask AI Coach/i })).toBeInTheDocument()
  })

  it('calls onAskCoach with formatted prompt when Ask AI Coach is clicked', () => {
    const onAskCoach = vi.fn()
    render(
      <QuizPanel
        questions={[singleSelectQuestion]}
        selectedModel="tiny"
        lessonTitle="Variables"
        onAskCoach={onAskCoach}
      />
    )
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(screen.getByRole('button', { name: /Submit Answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /Ask AI Coach/i }))
    expect(onAskCoach).toHaveBeenCalledOnce()
    const prompt = onAskCoach.mock.calls[0][0]
    expect(prompt).toContain('Variables')
    expect(prompt).toContain(singleSelectQuestion.question)
    expect(prompt).toContain('let')
    expect(prompt).toContain(singleSelectQuestion.explanation)
  })

  it('shows the score screen after completing all questions', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} />)
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(screen.getByRole('button', { name: /Submit Answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /See Results/i }))
    expect(screen.getByText(/Quiz Complete/i)).toBeInTheDocument()
    expect(screen.getByText(/1 \/ 1/)).toBeInTheDocument()
  })

  it('score screen shows correct fraction for a wrong answer', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} />)
    const varOption = screen.getByText('var').closest('button') // wrong answer
    fireEvent.click(varOption)
    fireEvent.click(screen.getByRole('button', { name: /Submit Answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /See Results/i }))
    expect(screen.getByText(/0 \/ 1/)).toBeInTheDocument()
  })

  it('Retry Quiz button resets the quiz', () => {
    render(<QuizPanel questions={[singleSelectQuestion]} />)
    const letOption = screen.getByText('let').closest('button')
    fireEvent.click(letOption)
    fireEvent.click(screen.getByRole('button', { name: /Submit Answer/i }))
    fireEvent.click(screen.getByRole('button', { name: /See Results/i }))
    fireEvent.click(screen.getByRole('button', { name: /Retry Quiz/i }))
    // Should be back on question 1
    expect(screen.getByText(/Question 1 of/i)).toBeInTheDocument()
    expect(screen.getByText(/Which keyword creates a block-scoped variable/i)).toBeInTheDocument()
  })
})
