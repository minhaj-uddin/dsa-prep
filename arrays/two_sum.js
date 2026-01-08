const findTwoSum = (nums, target) => {
  const numsMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const currentMapVal = numsMap.get(nums[i]);

    if (currentMapVal >= 0) {
      return [currentMapVal, i];
    } else {
      const numberToFind = target - nums[i];
      numsMap.set(numberToFind, i);
    }
  }
};

const target = 11;
const nums = [3, 2, 5, 9, 1, 7];

const result = findTwoSum(nums, target);
console.log(result);
