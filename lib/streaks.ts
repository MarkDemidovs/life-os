export function calculateStreak(lastCompleted: string, streak: number, currentDate: string): number {
    const lastCompletedObj = new Date(lastCompleted);
    const currentDateObj = new Date(currentDate);

    const diffTime = currentDateObj.getTime() - lastCompletedObj.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        return streak + 1;
    } else if (diffDays > 1) {
        return 0;
    } else {
        return streak;
    }
}