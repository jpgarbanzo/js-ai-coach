/**
 * storage.js
 *
 * Simple localStorage helpers for JS AI Coach.
 * Handles serialization errors gracefully — never throws.
 */

const KEYS = {
  MODEL: 'jsaicoach:selectedModel',
  PROGRESS: 'jsaicoach:progress',
  COMPLETED: 'jsaicoach:completed',
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function safeGet(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// Model preference
// ---------------------------------------------------------------------------

/**
 * Get the persisted AI model selection.
 * @returns {string|null} Model id, e.g. 'none', 'tiny', 'small'
 */
export function getStoredModel() {
  return safeGet(KEYS.MODEL)
}

/**
 * Persist the user's AI model selection.
 * @param {string} modelId
 * @returns {boolean} true if saved successfully
 */
export function saveModel(modelId) {
  return safeSet(KEYS.MODEL, modelId)
}

// ---------------------------------------------------------------------------
// Exercise progress (user's last-saved code per exercise)
// ---------------------------------------------------------------------------

/**
 * Get saved code for a specific exercise.
 *
 * @param {string} lessonId
 * @param {string} exerciseId
 * @returns {string|null} The saved code string, or null if not saved yet.
 */
export function getSavedCode(lessonId, exerciseId) {
  const progress = safeGet(KEYS.PROGRESS) ?? {}
  return progress[`${lessonId}::${exerciseId}`] ?? null
}

/**
 * Save the user's code for a specific exercise.
 *
 * @param {string} lessonId
 * @param {string} exerciseId
 * @param {string} code
 * @returns {boolean}
 */
export function saveCode(lessonId, exerciseId, code) {
  const progress = safeGet(KEYS.PROGRESS) ?? {}
  progress[`${lessonId}::${exerciseId}`] = code
  return safeSet(KEYS.PROGRESS, progress)
}

// ---------------------------------------------------------------------------
// Completed exercises
// ---------------------------------------------------------------------------

/**
 * Get the set of completed exercise keys.
 * @returns {string[]} Array of 'lessonId::exerciseId' strings.
 */
export function getCompletedExercises() {
  return safeGet(KEYS.COMPLETED) ?? []
}

/**
 * Mark an exercise as completed.
 *
 * @param {string} lessonId
 * @param {string} exerciseId
 * @returns {boolean}
 */
export function markExerciseCompleted(lessonId, exerciseId) {
  const completed = new Set(getCompletedExercises())
  completed.add(`${lessonId}::${exerciseId}`)
  return safeSet(KEYS.COMPLETED, Array.from(completed))
}

/**
 * Check if an exercise has been completed.
 *
 * @param {string} lessonId
 * @param {string} exerciseId
 * @returns {boolean}
 */
export function isExerciseCompleted(lessonId, exerciseId) {
  const completed = getCompletedExercises()
  return completed.includes(`${lessonId}::${exerciseId}`)
}

/**
 * Get completion count for a specific lesson.
 *
 * @param {string} lessonId
 * @param {number} totalExercises
 * @returns {{ completed: number, total: number }}
 */
export function getLessonProgress(lessonId, totalExercises) {
  const completed = getCompletedExercises()
  const lessonCompleted = completed.filter((key) => key.startsWith(`${lessonId}::`)).length
  return { completed: lessonCompleted, total: totalExercises }
}

// ---------------------------------------------------------------------------
// Bulk operations
// ---------------------------------------------------------------------------

/**
 * Clear all stored progress and preferences.
 * Useful for a "reset" feature.
 */
export function clearAllProgress() {
  safeRemove(KEYS.PROGRESS)
  safeRemove(KEYS.COMPLETED)
}

/**
 * Export all stored data as a plain object (for debugging/backup).
 * @returns {object}
 */
export function exportAllData() {
  return {
    model: getStoredModel(),
    progress: safeGet(KEYS.PROGRESS) ?? {},
    completed: getCompletedExercises(),
  }
}
