import React, { useState, useEffect, Component } from 'react'
import HomePage from './components/HomePage.jsx'
import LessonPage from './components/LessonPage.jsx'
import TroubleshootPage from './components/TroubleshootPage.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import { getStoredModel, saveModel } from './utils/storage.js'

class PageErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', maxWidth: 600, margin: '4rem auto' }}>
          <h2 style={{ color: '#c53030', marginBottom: '1rem' }}>Something went wrong</h2>
          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: 6, fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
            {this.state.error.message}
          </pre>
          <button
            style={{ marginTop: '1.5rem', padding: '0.5rem 1.25rem', cursor: 'pointer' }}
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  const [view, setView] = useState('home')
  const [currentLesson, setCurrentLesson] = useState(null)
  const [selectedModel, setSelectedModel] = useState(() => getStoredModel() || 'none')

  // Persist model selection whenever it changes
  useEffect(() => {
    saveModel(selectedModel)
  }, [selectedModel])

  const navigateTo = (newView, lesson = null) => {
    setView(newView)
    setCurrentLesson(lesson)
    window.scrollTo(0, 0)
  }

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId)
  }

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation
        currentView={view}
        navigateTo={navigateTo}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />
      <main className="main-content" style={{ flex: 1 }}>
        <PageErrorBoundary key={view}>
          {view === 'home' && <HomePage navigateTo={navigateTo} />}
          {view === 'lesson' && currentLesson && (
            <LessonPage
              lesson={currentLesson}
              navigateTo={navigateTo}
              selectedModel={selectedModel}
            />
          )}
          {view === 'troubleshoot' && (
            <TroubleshootPage selectedModel={selectedModel} onModelChange={handleModelChange} />
          )}
        </PageErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}

export default App
