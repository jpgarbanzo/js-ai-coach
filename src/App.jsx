import React, { useState, useEffect } from 'react'
import HomePage from './components/HomePage.jsx'
import LessonPage from './components/LessonPage.jsx'
import TroubleshootPage from './components/TroubleshootPage.jsx'
import Navigation from './components/Navigation.jsx'
import { getStoredModel, saveModel } from './utils/storage.js'

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
    <div className="app">
      <Navigation
        currentView={view}
        navigateTo={navigateTo}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />
      <main className="main-content">
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
      </main>
    </div>
  )
}

export default App
