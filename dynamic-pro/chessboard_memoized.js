const knightProbability = (N, k, r, c) => {
  const dp = new Array(k + 1)
    .fill(0)
    .map(() => new Array(N).fill(0).map(() => new Array(N).fill(undefined)));

  return recurse(N, k, r, c, dp);
};

const recurse = (N, k, r, c, dp) => {
  if (k === 0) return 1;
  if (r < 0 || r >= N || c < 0 || c >= N) return 0;

  if (dp[k][r][c] !== undefined) return dp[k][r][c];

  let response = 0;
  for (let i = 0; i < DIRECTIONS.length; i++) {
    const currentDir = DIRECTIONS[i];
    response += recurse(N, k - 1, r + currentDir[0], c + currentDir[1], dp) / 8;
  }

  dp[k][r][c] = response;
  return dp[k][r][c];
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
