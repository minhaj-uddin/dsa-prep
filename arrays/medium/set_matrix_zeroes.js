const setZeroes = (matrix) => {
  if (!matrix.length || !matrix[0].length) return;

  const rows = matrix.length;
  const cols = matrix[0].length;

  let zeroFirstRow = false;
  let zeroFirstCol = false;

  // Check if first row needs to be zeroed
  for (let c = 0; c < cols; c++) {
    if (matrix[0][c] === 0) {
      zeroFirstRow = true;
      break;
    }
  }

  // Check if first column needs to be zeroed
  for (let r = 0; r < rows; r++) {
    if (matrix[r][0] === 0) {
      zeroFirstCol = true;
      break;
    }
  }

  // Use first row & column as markers
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;
        matrix[0][c] = 0;
      }
    }
  }

  // Apply zeroes based on markers
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) {
        matrix[r][c] = 0;
      }
    }
  }

  // Zero first row if needed
  if (zeroFirstRow) {
    for (let c = 0; c < cols; c++) {
      matrix[0][c] = 0;
    }
  }

  // Zero first column if needed
  if (zeroFirstCol) {
    for (let r = 0; r < rows; r++) {
      matrix[r][0] = 0;
    }
  }
};

// const matrix = [
//   [1, 1, 1],
//   [1, 0, 1],
//   [1, 1, 1],
// ];
const matrix = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
];

console.log(matrix);
setZeroes(matrix);
console.log(matrix);
