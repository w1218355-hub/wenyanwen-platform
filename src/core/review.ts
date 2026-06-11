// ===== Spaced Repetition Algorithm =====

export function calculateNextReview(
  currentReviewCount: number,
  lastAnswerCorrect: boolean,
  currentDate: Date = new Date()
): { nextDate: string | null; reviewCount: number; status: 'learning' | 'mastered' | 'new' } {
  if (!lastAnswerCorrect) {
    // Reset cycle on failure
    return {
      nextDate: addDays(currentDate, 1),
      reviewCount: 0,
      status: 'learning',
    }
  }

  const newCount = currentReviewCount + 1

  if (newCount === 1) {
    // First pass: schedule 7-day review
    return { nextDate: addDays(currentDate, 7), reviewCount: newCount, status: 'learning' }
  }

  if (newCount === 2) {
    // Second pass: schedule 30-day review
    return { nextDate: addDays(currentDate, 30), reviewCount: newCount, status: 'learning' }
  }

  // Third pass: mastered, archive
  return { nextDate: null, reviewCount: newCount, status: 'mastered' }
}

function addDays(date: Date, days: number): string {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export function getTodayReviewTasks(wrongAnswers: any[]): any[] {
  const today = new Date().toISOString().split('T')[0]
  return wrongAnswers.filter(w => w.nextReview === today && w.status !== 'mastered')
}
