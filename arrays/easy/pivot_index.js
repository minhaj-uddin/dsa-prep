const pivotIndex = (nums) => {
  if (!nums || !nums.length) return -1;

  let leftSum = 0;
  let rightSum = nums.reduce((acc, num) => acc + num, 0);

  for (let index = 0; index < nums.length; index++) {
    leftSum += nums[index];
    // Check if the left sum is equal to the right sum
    if (leftSum * 2 + nums[index] == rightSum) return index;
    // Alternate: if (leftSum === rightSum) return index;
    rightSum -= nums[index];
  }

  return -1;
};

function pivotIndex(nums) {
  const pIndex = -1;
  if (!nums || !nums.length) return pIndex;

  const n = nums.length;
  const prefixSum = new Array(n).fill(0);

  let total = 0;
  for (let i = 0; i < n; i++) {
    total += nums[i];
    prefixSum[i] = total;
  }

  for (let i = 0; i < n; i++) {
    const leftSum = i > 0 ? prefixSum[i - 1] : 0;
    const rightSum = prefixSum[n - 1] - prefixSum[i];
    if (leftSum === rightSum) return i;
  }

  return pIndex;
}

const nums = [1, 7, 3, 6, 5, 6];
const result = pivotIndex(nums);
console.log(result);
