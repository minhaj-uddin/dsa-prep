const canAttendMeetings = (intervals) => {
  if (intervals?.length <= 1) return true;

  // Sort intervals by start time time
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const last = intervals[i - 1];

    // Current meeting starts before previous ends
    if (start < last[1]) return false;
  }

  return true;
};

const intervals = [
  [0, 30],
  [15, 20],
  [10, 15],
];
const result = canAttendMeetings(intervals);
console.log(result);
