const minMeetingRooms = (intervals) => {
  if (!intervals?.length) return 0;

  const events = [];
  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end, -1]);
  }

  // Sort by time, if times are same, prioritize end events
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let currentRooms = 0;
  let maxRooms = 0;

  for (const [_, delta] of events) {
    currentRooms += delta;
    maxRooms = Math.max(maxRooms, currentRooms);
  }

  return maxRooms;
};

const intervals = [
  [0, 30],
  [5, 10],
  [15, 20],
];
const result = minMeetingRooms(intervals);
console.log(result);
