const knightProbability = (N, k, r, c) => {
  if (k === 0) return 1;
  if (r < 0 || r >= N || c < 0 || c >= N) return 0;

  let response = 0;
  for (let i = 0; i < DIRECTIONS.length; i++) {
    const currentDir = DIRECTIONS[i];
    response +=
      knightProbability(N, k - 1, r + currentDir[0], c + currentDir[1]) / 8;
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
