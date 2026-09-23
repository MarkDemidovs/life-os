const DAY_IN_MS = 24 * 60 * 60 * 1000;

function calendarDay(value: string): number {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);

  if (!year || !month || !day) {
    throw new Error(`Invalid calendar date: ${value}`);
  }

  return Date.UTC(year, month - 1, day);
}

export function formatCalendarDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function calculateStreak(
  lastCompleted: string,
  streak: number,
  currentDate: string
): "increment" | "reset" | "noChange" {
  const diffDays = (calendarDay(currentDate) - calendarDay(lastCompleted)) / DAY_IN_MS;

  if (diffDays === 1) {
    return "increment";
  } else if (diffDays > 1) {
    return "reset";
  } else if (diffDays === 0 && streak === 0) {
    return "increment";
  }

  return "noChange";
}