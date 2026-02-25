const directions = [
  [-1, 0], // Up
  [0, 1], // Right
  [1, 0], // Down
  [0, -1], // Left
];

const numberOfIslands = (matrix) => {
  if (matrix.length === 0) return 0;

  let islandCount = 0; // Actual result

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === 1) {
        islandCount++;
        matrix[row][col] = 0;

        let queue = [];
        queue.push([row, col]);

        while (queue.length) {
          const currentPos = queue.shift();
          const currentRow = currentPos[0];
          const currentCol = currentPos[1];

          for (let i = 0; i < directions.length; i++) {
            const currentDir = directions[i];
            const nextRow = currentRow + currentDir[0];
            const nextCol = currentCol + currentDir[1];

            if (
              nextRow < 0 ||
              nextCol < 0 ||
              nextRow >= matrix.length ||
              nextCol >= matrix[0].length
            ) {
              continue;
            }

            if (matrix[nextRow][nextCol] === 1) {
              queue.push([nextRow, nextCol]);
              matrix[nextRow][nextCol] = 0;
            }
          }
        }
      }
    }
  }

  return islandCount;
};

// const matrix = [
//   [1, 1, 1, 1, 0],
//   [1, 1, 0, 1, 0],
//   [1, 1, 0, 0, 1],
//   [0, 0, 0, 1, 1],
// ];

const matrix = [
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1],
  [0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
];

const result = numberOfIslands(matrix);
console.log(result);
