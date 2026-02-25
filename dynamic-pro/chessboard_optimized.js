const knightProbability = (N, k, r, c) => {
  let previousDP = new Array(N).fill(0).map(() => new Array(N).fill(0));
  let currentDP = new Array(N).fill(0).map(() => new Array(N).fill(0));
  previousDP[r][c] = 1;

  for (let step = 1; step <= k; step++) {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        for (let i = 0; i < DIRECTIONS.length; i++) {
          const currentDir = DIRECTIONS[i];
          const nextRow = row + currentDir[0];
          const nextCol = col + currentDir[1];
          if (nextRow >= 0 && nextRow < N && nextCol >= 0 && nextCol < N) {
            currentDP[row][col] += previousDP[nextRow][nextCol] / 8;
          }
        }
      }
    }
    previousDP = currentDP;
    currentDP = new Array(N).fill(0).map(() => new Array(N).fill(0));
  }

  let response = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      response += previousDP[i][j];
    }
  }

  return response;
};

const N = 6;
const k = 3;
const r = 2;
const c = 2;

const DIRECTIONS = [
  [-2, -1],
  [-2, 1],
  [2, -1],
  [2, 1],
  [-1, 2],
  [1, 2],
  [-1, -2],
  [1, -2],
];

const result = knightProbability(N, k, r, c);
console.log(result);
