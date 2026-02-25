// Sum of all elememnts
const missingNumber = (nums) => {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  const result = nums.reduce((acc, val) => acc + val, 0);
  return expected - result;
};

// Sorting Approach
const missingNumber2 = (nums) => {
  nums.sort((a, b) => a - b);
  const n = nums.length;

  // Case 1: Missing start index
  if (nums[0] !== 0) return 0;

  // Case 2: Missing last index
  if (nums[n - 1] !== n) return n;

  // Case 3: Missing middle index
  for (let i = 1; i < n; i++) {
    if (nums[i] !== i) return i;
  }

  return 0;
};

// XOR Operation
const missingNumber3 = (nums) => {
  const n = nums.length;
  let result = 0;

  for (let i = 0; i < n; i++) {
    result ^= nums[i];
  }

  for (let i = 0; i <= n; i++) {
    result ^= i;
  }

  return result;
};

const nums = [3, 0, 1];
console.log(missingNumber(nums));
console.log(missingNumber2(nums));
console.log(missingNumber3(nums));
