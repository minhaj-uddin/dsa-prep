const WALL = -1;
const GATE = 0;
const INF = 2147483647;
const directions = [
  [-1, 0], // Up
  [0, 1], // Right
  [1, 0], // Down
  [0, -1], // Left
];

const wallsAndGates = (matrix) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === GATE) {
        dfs(matrix, row, col, 0);
      }
    }
  }

  return matrix;
};

const dfs = (matrix, row, col, currentStep) => {
  if (
    row < 0 ||
    col < 0 ||
    row >= matrix.length ||
    col >= matrix[0].length ||
    currentStep > matrix[row][col]
  ) {
    return;
  }

  matrix[row][col] = currentStep;
  for (let i = 0; i < directions.length; i++) {
    const currentDir = directions[i];
    dfs(matrix, row + currentDir[0], col + currentDir[1], currentStep + 1);
  }
};

const matrix = [
  [INF, -1, 0, INF],
  [INF, INF, INF, -1],
  [INF, -1, INF, -1],
  [0, -1, INF, INF],
];

const result = wallsAndGates(matrix);
console.log(result);
