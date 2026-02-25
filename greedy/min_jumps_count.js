const jump = (nums) => {
  if (nums.length === 1) return 0;

  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }

    if (currentEnd >= nums.length - 1) {
      return jumps;
    }
  }

  return jumps;
};

const nums = [2, 3, 1, 1, 4];
const result = jump(nums);
console.log(result);
