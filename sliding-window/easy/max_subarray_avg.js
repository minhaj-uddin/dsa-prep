const maxSubarrayAverage = (nums, k) => {
  if (k <= 0 || k > nums.length) return 0;

  let maxSum = 0;
  let currentSum = 0;
  const window = new Set();
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    const currentValue = nums[right];

    // If duplicate appears, shrink from the left
    while (window.has(currentValue)) {
      window.delete(nums[left]);
      currentSum -= nums[left];
      left++;
    }

    // Add new element
    window.add(currentValue);
    currentSum += currentValue;

    // If window reaches size k
    if (right - left + 1 === k) {
      maxSum = Math.max(maxSum, currentSum);

      // Slide window by removing leftmost element
      window.delete(nums[left]);
      currentSum -= nums[left];
      left++;
    }
  }

  return maxSum / k;
};

let k = 3;
let arr = [2, 1, 5, 6, 9, 6];
console.log(maxSubarrayAverage(arr, k));
