const merge = (intervals) => {
  if (intervals.length === 0) return [];
  if (intervals.length < 2) return intervals;

  // Sort intervals based on start time
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const last = merged[merged.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
};

const intervals = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
const result = merge(intervals);
console.log(result);
