const naxSubArray = (nums) => {
  if (!nums.length) return 0;

  let current = nums[0];
  let maxNum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], nums[i] + current);
    maxNum = Math.max(maxNum, current);
  }

  return maxNum;
};

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = naxSubArray(nums);
console.log(result);
