const insert = (intervals, newInterval) => {
  const N = intervals.length;
  if (N === 0) return [newInterval];

  const result = [];
  let i = 0;

  // 1. Add all intervals before new interval
  while (i < N && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // 2. Merge all overlapping intervals
  while (i < N && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }

  result.push(newInterval);

  // 3. Add remaining intervals
  while (i < N) {
    result.push(intervals[i]);
    i++;
  }

  return result;
};

const intervals = [
  [1, 2],
  [3, 5],
  [6, 7],
  [8, 10],
  [12, 16],
];
const newInterval = [4, 8];
const result = insert(intervals, newInterval);
console.log(result);
