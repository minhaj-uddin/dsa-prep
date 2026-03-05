const findMinArrowShots = (points) => {
  if (points.length === 0) return 0;

  // Sort by end coordinate
  points.sort((a, b) => a[1] - b[1]);

  let arrowCount = 1;
  let arrowPos = points[0][1];

  for (let i = 1; i < points.length; i++) {
    const [start, end] = points[i];

    if (start > arrowPos) {
      arrowCount++;
      arrowPos = end;
    }
  }

  return arrowCount;
};

const points = [
  [10, 16],
  [2, 8],
  [1, 6],
  [7, 12],
];
const result = findMinArrowShots(points);
console.log(result);
