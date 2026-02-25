function minMoves(nums) {
  nums.sort((a, b) => a - b);

  const n = nums.length;
  const median = nums[Math.floor(n / 2)];

  let moves = 0;
  for (let num of nums) {
    moves += Math.abs(num - median);
  }

  return moves;
}

const nums = [1, 9, 2, 10];
const result = minMoves(nums);
console.log(result);
