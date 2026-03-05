const eraseOverlapIntervals = (intervals) => {
  if (intervals?.length === 0) return 0;

  // Sort intervals by end (ascending)
  intervals.sort((a, b) => a[1] - b[1]);

  let removalCount = 0;
  let previousEnd = intervals[0][1];
  let non_overlap = [intervals[0]];
  let overlap = [];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    if (start < previousEnd) {
      overlap.push([start, end]);
      removalCount++;
    } else {
      non_overlap.push([start, end]);
      previousEnd = end;
    }
  }

  return { removalCount, non_overlap, overlap };
};

const intervals = [
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 3],
];
const non_overlap = eraseOverlapIntervals(intervals);
console.log(non_overlap);
