const containsDuplicate = function (nums) {
  const visisted = new Map();

  for (i = 0; i < nums.length; i++) {
    if (visisted.has(nums[i])) {
      return true;
    }

    visisted.set(nums[i], true);
  }

  return false;
};

const nums = [1, 2, 3, 4];
const result = containsDuplicate(nums);
console.log(result);
