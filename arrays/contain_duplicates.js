const containDuplicates = (nums) => {
  const seen = new Set();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];

    if (seen.has(current)) {
      return true;
    }
    seen.add(current);
  }

  return false;
};

const nums = [7, 1, 5, 3, 6, 4];
const result = containDuplicates(nums);
console.log(result);
