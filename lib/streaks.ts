export function calculateStreak(
  lastCompleted: string,
  streak: number,
  currentDate: string
): "increment" | "reset" | "noChange" {
  const last = new Date(lastCompleted);
  const current = new Date(currentDate);

  last.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  const diffTime = current.getTime() - last.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === 1) {
    return "increment";
  } else if (diffDays > 1) {
    return "reset";
  }

  return "noChange";
}