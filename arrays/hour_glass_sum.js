const hourglassSum = (arr) => {
  let maxSum = -Infinity;
  let bestHourglass = [];

  const maxRows = arr.length - 1;
  const maxCols = arr[0].length - 1;

  for (let row = 0; row <= maxRows - 2; row++) {
    for (let col = 0; col <= maxCols - 2; col++) {
      const top = arr[row][col] + arr[row][col + 1] + arr[row][col + 2];
      const mrowddle = arr[row + 1][col + 1];
      const bottom =
        arr[row + 2][col] + arr[row + 2][col + 1] + arr[row + 2][col + 2];
      const currentSum = top + mrowddle + bottom;

      if (currentSum > maxSum) {
        maxSum = currentSum;
        bestHourglass = [
          [arr[row][col], arr[row][col + 1], arr[row][col + 2]],
          [arr[row + 1][col + 1]],
          [arr[row + 2][col], arr[row + 2][col + 1], arr[row + 2][col + 2]],
        ];
      }
    }
  }

  return {
    maxSum,
    bestHourglass,
  };
};

// Sliding Window Technique
function maxMaskedWindow(arr, mask) {
  let maxSum = -Infinity;
  let bestWindow = [];

  const rows = arr.length;
  const cols = arr[0].length;

  const h = mask.length;
  const w = mask[0].length;

  for (let i = 0; i <= rows - h; i++) {
    for (let j = 0; j <= cols - w; j++) {
      let sum = 0;
      let window = [];

      for (let r = 0; r < h; r++) {
        let row = [];
        for (let c = 0; c < w; c++) {
          if (mask[r][c] === 1) {
            sum += arr[i + r][j + c];
            row.push(arr[i + r][j + c]);
          } else {
            row.push(null);
          }
        }
        window.push(row);
      }

      if (sum > maxSum) {
        maxSum = sum;
        bestWindow = window;
      }
    }
  }

  return { sum: maxSum, window: bestWindow };
}

const arr = [
  [1, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
  [0, 0, 2, 4, 4, 0],
  [0, 0, 0, 2, 0, 0],
  [0, 0, 1, 2, 4, 0],
];
const hourglassMask = [
  [1, 1, 1],
  [0, 1, 0],
  [1, 1, 1],
];

console.log(hourglassSum(arr));
const result = maxMaskedWindow(arr, hourglassMask);
console.log(result);
