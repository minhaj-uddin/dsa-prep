const removeCoveredIntervals = (intervals) => {
  if (!intervals?.length) return 0;

  // Sort intervals (start - asc, end -desc order)
  intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  let count = 0;
  let maxEnd = 0;

  for (const [_, end] of intervals) {
    if (end > maxEnd) {
      count++;
      maxEnd = end;
    }
  }

  return count;
};

const intervals = [
  [1, 4],
  [3, 6],
  [2, 8],
];
const result = removeCoveredIntervals(intervals);
console.log(result);
