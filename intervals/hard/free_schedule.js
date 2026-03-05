// Approach 1: Merge → Sort → Detect Gaps
const employeeFreeTime = (schedule) => {
  if (!schedule?.length) return [];

  // Flattening the schedule
  const intervals = [].concat(...schedule);

  // Sorting by start of each Interval
  intervals.sort((a, b) => a[0] - b[0]);

  const freeTimes = [];
  let prevEnd = intervals[0][1];

  // Checking for free time between intervals
  for (let i = 1; i < intervals.length; i++) {
    const [currStart, currEnd] = intervals[i];

    if (prevEnd < currStart) {
      freeTimes.push([prevEnd, currStart]);
    }

    prevEnd = Math.max(prevEnd, currEnd);
  }

  return freeTimes;
};

// Appoach 2: Sweep Line
const employeeFreeTime2 = (schedule) => {
  const timeline = new Map();

  for (const employee of schedule) {
    for (const [start, end] of employee) {
      timeline.set(start, (timeline.get(start) || 0) + 1);
      timeline.set(end, (timeline.get(end) || 0) - 1);
    }
  }

  const sortedKeys = [...timeline.keys()].sort((a, b) => a - b);

  const result = [];
  let active = 0;

  for (let i = 0; i < sortedKeys.length - 1; i++) {
    active += timeline.get(sortedKeys[i]);

    if (active === 0) {
      result.push([sortedKeys[i], sortedKeys[i + 1]]);
    }
  }

  return result;
};

const schedule = [
  [
    [1, 3],
    [6, 7],
  ],
  [[2, 4]],
  [
    [2, 5],
    [9, 12],
  ],
];
const result = employeeFreeTime2(schedule);
console.log(result);
