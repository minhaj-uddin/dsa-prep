const canJump = (nums) => {
  if (nums.length === 1) return true;
  if (nums[0] === 0) return false;

  let maxIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxIndex) return false;
    maxIndex = Math.max(maxIndex, i + nums[i]);
  }

  return true;
};

const canJumpReverse = (nums) => {
  let goal = nums.length - 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= goal) {
      goal = i;
    }
  }

  return goal === 0;
};

const nums = [3, 2, 1, 0, 4];
const result = canJump(nums);
console.log(canJumpReverse(nums));
console.log(result);
