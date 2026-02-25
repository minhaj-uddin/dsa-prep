const directions = [
  [-1, 0], // Up
  [0, 1], // Right
  [1, 0], // Down
  [0, -1], // Left
];

const traverseBFS = (matrix) => {
  const values = [];
  const queue = [[0, 0]];

  const visited = new Array(matrix.length)
    .fill(0)
    .map(() => new Array(matrix[0].length).fill(false));

  while (queue.length) {
    const currentPos = queue.shift();
    const row = currentPos[0];
    const col = currentPos[1];

    if (
      row < 0 ||
      col < 0 ||
      row >= matrix.length ||
      col >= matrix[0].length ||
      visited[row][col]
    ) {
      continue;
    }

    visited[row][col] = true;
    values.push(matrix[row][col]);

    for (let i = 0; i < directions.length; i++) {
      const currentDir = directions[i];
      queue.push([row + currentDir[0], col + currentDir[1]]);
    }
  }

  return values;
};

const matrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
];

const values = traverseBFS(matrix);
console.log(values);
