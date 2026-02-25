const solveSudoku = (board) => {
  if (solveBacktrack(board)) {
    return board;
  } else {
    return null;
  }
};

const solveBacktrack = (board) => {
  const cell = findCell(board);
  if (!cell) return true;

  const [row, col] = cell;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;

      if (solveBacktrack(board)) {
        return true;
      }

      board[row][col] = 0;
    }
  }

  return false;
};

const findCell = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
};

const isValid = (board, row, col, num) => {
  // Check the row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }

  // Check the column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  // Check the 3x3 box
  const boxRow = row - (row % 3);
  const boxCol = col - (col % 3);

  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }

  return true;
};

const board = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0],
];

const result = solveSudoku(board);
console.log(result);
