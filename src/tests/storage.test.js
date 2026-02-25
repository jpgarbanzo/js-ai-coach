import { describe, it, expect, beforeEach } from 'vitest'
import {
  getStoredModel,
  saveModel,
  getSavedCode,
  saveCode,
  getCompletedExercises,
  markExerciseCompleted,
  isExerciseCompleted,
  getLessonProgress,
  clearAllProgress,
  exportAllData,
} from '../utils/storage.js'

// jsdom provides a localStorage implementation, but we reset it between tests
beforeEach(() => {
  localStorage.clear()
})

describe('model preference', () => {
  it('returns null when nothing is stored', () => {
    expect(getStoredModel()).toBeNull()
  })

  it('saves and retrieves a model id', () => {
    saveModel('tiny')
    expect(getStoredModel()).toBe('tiny')
  })

  it('overwrites the previous model id', () => {
    saveModel('tiny')
    saveModel('small')
    expect(getStoredModel()).toBe('small')
  })
})

describe('code saving', () => {
  it('returns null when no code is saved for an exercise', () => {
    expect(getSavedCode('lesson-01', 'ex-1')).toBeNull()
  })

  it('saves and retrieves code for an exercise', () => {
    saveCode('lesson-01', 'ex-1', 'const x = 42')
    expect(getSavedCode('lesson-01', 'ex-1')).toBe('const x = 42')
  })

  it('saves independently for different exercises', () => {
    saveCode('lesson-01', 'ex-1', 'code A')
    saveCode('lesson-01', 'ex-2', 'code B')
    expect(getSavedCode('lesson-01', 'ex-1')).toBe('code A')
    expect(getSavedCode('lesson-01', 'ex-2')).toBe('code B')
  })

  it('saves independently for different lessons', () => {
    saveCode('lesson-01', 'ex-1', 'lesson 1 code')
    saveCode('lesson-02', 'ex-1', 'lesson 2 code')
    expect(getSavedCode('lesson-01', 'ex-1')).toBe('lesson 1 code')
    expect(getSavedCode('lesson-02', 'ex-1')).toBe('lesson 2 code')
  })

  it('overwrites previously saved code', () => {
    saveCode('lesson-01', 'ex-1', 'old code')
    saveCode('lesson-01', 'ex-1', 'new code')
    expect(getSavedCode('lesson-01', 'ex-1')).toBe('new code')
  })
})

describe('exercise completion', () => {
  it('starts with empty completed list', () => {
    expect(getCompletedExercises()).toEqual([])
  })

  it('marks an exercise as completed', () => {
    markExerciseCompleted('lesson-01', 'ex-1')
    expect(isExerciseCompleted('lesson-01', 'ex-1')).toBe(true)
  })

  it('returns false for non-completed exercises', () => {
    expect(isExerciseCompleted('lesson-01', 'ex-1')).toBe(false)
  })

  it('does not duplicate completed entries', () => {
    markExerciseCompleted('lesson-01', 'ex-1')
    markExerciseCompleted('lesson-01', 'ex-1')
    const completed = getCompletedExercises()
    const count = completed.filter((k) => k === 'lesson-01::ex-1').length
    expect(count).toBe(1)
  })

  it('tracks multiple exercises across lessons', () => {
    markExerciseCompleted('lesson-01', 'ex-1')
    markExerciseCompleted('lesson-01', 'ex-2')
    markExerciseCompleted('lesson-02', 'ex-1')
    expect(isExerciseCompleted('lesson-01', 'ex-1')).toBe(true)
    expect(isExerciseCompleted('lesson-01', 'ex-2')).toBe(true)
    expect(isExerciseCompleted('lesson-02', 'ex-1')).toBe(true)
    expect(isExerciseCompleted('lesson-02', 'ex-99')).toBe(false)
  })
})

describe('getLessonProgress', () => {
  it('returns 0/N when no exercises are completed', () => {
    const progress = getLessonProgress('lesson-01', 3)
    expect(progress.completed).toBe(0)
    expect(progress.total).toBe(3)
  })

  it('counts completed exercises for a specific lesson', () => {
    markExerciseCompleted('lesson-01', 'ex-1')
    markExerciseCompleted('lesson-01', 'ex-2')
    markExerciseCompleted('lesson-02', 'ex-1') // different lesson — should not count

    const progress = getLessonProgress('lesson-01', 3)
    expect(progress.completed).toBe(2)
    expect(progress.total).toBe(3)
  })
})

describe('clearAllProgress', () => {
  it('removes all stored progress', () => {
    saveCode('lesson-01', 'ex-1', 'some code')
    markExerciseCompleted('lesson-01', 'ex-1')

    clearAllProgress()

    expect(getSavedCode('lesson-01', 'ex-1')).toBeNull()
    expect(isExerciseCompleted('lesson-01', 'ex-1')).toBe(false)
  })

  it('does not remove the model preference', () => {
    saveModel('tiny')
    clearAllProgress()
    // model preference is NOT cleared by clearAllProgress
    expect(getStoredModel()).toBe('tiny')
  })
})

describe('exportAllData', () => {
  it('returns an object with model, progress, and completed keys', () => {
    const data = exportAllData()
    expect(data).toHaveProperty('model')
    expect(data).toHaveProperty('progress')
    expect(data).toHaveProperty('completed')
  })

  it('includes stored data in export', () => {
    saveModel('tiny')
    saveCode('lesson-01', 'ex-1', 'my code')
    markExerciseCompleted('lesson-01', 'ex-1')

    const data = exportAllData()
    expect(data.model).toBe('tiny')
    expect(data.progress['lesson-01::ex-1']).toBe('my code')
    expect(data.completed).toContain('lesson-01::ex-1')
  })
})
