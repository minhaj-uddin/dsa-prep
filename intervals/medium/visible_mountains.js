const visibleMountains = (peaks) => {
  // Convert peaks to intervals [left, right]
  const intervals = peaks.map(([x, y]) => [x - y, x + y]);

  // Count occurrences to identify identical mountains
  const counts = new Map();
  intervals.forEach(([l, r]) => {
    const key = `${l},${r}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  // Sort: start asc, end desc
  intervals.sort((a, b) => {
    a[0] === b[0] ? b[1] - a[1] : a[0] - b[0];
  });

  let visibleCount = 0;
  let maxRight = -Infinity;

  for (const [l, r] of intervals) {
    if (r > maxRight) {
      // Check identical mountain
      const key = `${l},${r}`;
      if (counts.get(key) === 1) {
        visibleCount++;
      }
      maxRight = r;
    }
  }

  return visibleCount;
};

const peaks = [
  [2, 2],
  [6, 3],
  [5, 4],
];
const result = visibleMountains(peaks);
console.log(result);
