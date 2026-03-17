const subarraySum = (nums, k) => {
  let totalCount = 0;
  let currentSum = 0;

  const prefixMap = new Map([[0, 1]]);

  for (const num of nums) {
    currentSum += num;

    const complement = currentSum - k;
    if (prefixMap.has(complement)) {
      totalCount += prefixMap.get(complement);
    }

    prefixMap.set(currentSum, (prefixMap.get(currentSum) || 0) + 1);
  }

  return totalCount;
};

const k = 3;
const nums = [2, 1, 5, 1, 2, 3];
const result = subarraySum(nums, k);
console.log(result);
