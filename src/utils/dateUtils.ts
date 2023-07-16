export function formatTime(time: Date): string {
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function get30MinuteTimeSlots(startTime: Date, endTime: Date): Date[] {
  const timeSlots: Date[] = [];
  let currentTime = new Date(startTime);

  while (currentTime < endTime) {
    timeSlots.push(new Date(currentTime));
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return timeSlots;
}

export function isDateInPast(date: Date): boolean {
  const today = new Date();
  return date < today;
}
