export function calculateStreak(
  lastCompleted: string,
  streak: number,
  currentDate: string
): number {
  const last = new Date(lastCompleted);
  const current = new Date(currentDate);

  last.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  const diffTime = current.getTime() - last.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === 1) {
    return 1;
  } else if (diffDays > 1) {
    return 0;
  }

  return streak;
}