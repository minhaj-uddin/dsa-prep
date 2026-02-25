const directions = [
  [-1, 0], // Up
  [0, 1], // Right
  [1, 0], // Down
  [0, -1], // Left
];

const traverseDFS = (matrix) => {
  const values = [];
  const visited = new Array(matrix.length)
    .fill(0)
    .map(() => new Array(matrix[0].length).fill(false));

  dfs(matrix, 0, 0, visited, values);
  return values;
};

const dfs = (matrix, row, col, visited, values) => {
  if (
    row < 0 ||
    col < 0 ||
    row >= matrix.length ||
    col >= matrix[0].length ||
    visited[row][col]
  ) {
    return;
  }

  visited[row][col] = true;
  values.push(matrix[row][col]);

  for (let i = 0; i < directions.length; i++) {
    dfs(
      matrix,
      row + directions[i][0],
      col + directions[i][1],
      visited,
      values
    );
  }
};

const matrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
];

const values = traverseDFS(matrix);
console.log(values);
