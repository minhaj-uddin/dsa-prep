const directions = [
  [-1, 0], // Up
  [0, 1], // Right
  [1, 0], // Down
  [0, -1], // Left
];

const ROTTEN = 2;
const FRESH = 1;
const EMPTY = 0;

const queue = [];
let freshOranges = 0;

const orangeRotting = (matrix) => {
  if (matrix.length === 0) return 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === ROTTEN) {
        queue.push([row, col]);
      }
      if (matrix[row][col] === FRESH) {
        freshOranges++;
      }
    }
  }

  let minutes = 0;
  let queueSize = queue.length;

  while (queue.length > 0) {
    if (queueSize === 0) {
      queueSize = queue.length;
      minutes++;
    }

    const currentOrange = queue.shift();
    queueSize--;

    const row = currentOrange[0];
    const col = currentOrange[1];

    for (let i = 0; i < directions.length; i++) {
      const currentDir = directions[i];
      const nextRow = row + currentDir[0];
      const nextCol = col + currentDir[1];

      if (
        nextRow < 0 ||
        nextCol < 0 ||
        nextRow >= matrix.length ||
        nextCol >= matrix[0].length
      ) {
        continue;
      }

      if (matrix[nextRow][nextCol] === FRESH) {
        matrix[nextRow][nextCol] = 2;
        queue.push([nextRow, nextCol]);
        freshOranges--;
      }
    }
  }

  return freshOranges > 0 ? -1 : minutes;
};

const matrix = [
  [2, 1, 1, 0, 0],
  [1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1],
  [0, 1, 0, 0, 1],
];

const result = orangeRotting(matrix);
console.log(result);
