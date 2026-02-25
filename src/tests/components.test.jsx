import { render, screen } from '@testing-library/react'
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

// Import components after mocks are in place
import Navigation from '../components/Navigation.jsx'
import HomePage from '../components/HomePage.jsx'
import App from '../App.jsx'

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
describe('Navigation', () => {
  const defaultProps = {
    currentView: 'home',
    navigateTo: vi.fn(),
    selectedModel: 'none',
    onModelChange: vi.fn(),
  }

  it('renders the brand name', () => {
    render(<Navigation {...defaultProps} />)
    expect(screen.getByText(/JS AI Coach/i)).toBeInTheDocument()
  })

  it('renders nav links for Lessons and Troubleshoot', () => {
    render(<Navigation {...defaultProps} />)
    // Both the desktop and mobile menus render these links; getAllByText handles that
    expect(screen.getAllByText(/Lessons/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Troubleshoot/i).length).toBeGreaterThan(0)
  })

  it('shows the model selector label', () => {
    render(<Navigation {...defaultProps} />)
    expect(screen.getAllByText(/AI Coach/i).length).toBeGreaterThan(0)
  })

  it('renders a select element for model selection', () => {
    render(<Navigation {...defaultProps} />)
    // There is at least one model select (desktop)
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// HomePage
// ---------------------------------------------------------------------------
describe('HomePage', () => {
  it('renders without crashing', () => {
    const { container } = render(<HomePage navigateTo={vi.fn()} />)
    expect(container).toBeTruthy()
  })

  it('renders the lessons section heading', () => {
    render(<HomePage navigateTo={vi.fn()} />)
    expect(screen.getByText(/All Lessons/i)).toBeInTheDocument()
  })

  it('renders lesson cards with titles', () => {
    render(<HomePage navigateTo={vi.fn()} />)
    // Each lesson card is an <article> element
    const cards = screen.getAllByRole('article')
    expect(cards.length).toBeGreaterThan(0)
  })

  it('each lesson card has a heading (title)', () => {
    render(<HomePage navigateTo={vi.fn()} />)
    // Lesson titles are rendered as h2 elements inside cards
    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings.length).toBeGreaterThan(0)
  })

  it('renders a Get Started button when lessons exist', () => {
    render(<HomePage navigateTo={vi.fn()} />)
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })

  it('shows the home view by default', () => {
    render(<App />)
    // HomePage renders the hero title
    expect(screen.getByText(/Learn JavaScript/i)).toBeInTheDocument()
  })

  it('renders the navigation bar', () => {
    render(<App />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('shows the JS AI Coach brand in the nav', () => {
    render(<App />)
    expect(screen.getByText(/JS AI Coach/i)).toBeInTheDocument()
  })
})
