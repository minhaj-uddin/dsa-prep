function minMoves(nums) {
  let minVal = Math.min(...nums);

  let moves = 0;
  for (let num of nums) {
    moves += num - minVal;
  }

  return moves;
}

const nums = [1, 9, 2, 10];
const result = minMoves(nums);
console.log(result);
