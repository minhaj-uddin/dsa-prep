const maxSubarraySum = (arr, k) => {
  let n = arr.length;
  if (k <= 0 || k > n) return null;

  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;
  let maxStartIndex = 0;

  // Slide window from start to end
  for (let i = k; i < n; i++) {
    windowSum += arr[i] - arr[i - k];

    if (windowSum > maxSum) {
      maxSum = windowSum;
      maxStartIndex = i - k + 1;
    }
  }

  // Extract the window, i.e. target subarray elements
  const maxWindow = arr.slice(maxStartIndex, maxStartIndex + k);
  return { maxSum, maxWindow };
};

let k = 3;
let arr = [2, 1, 5, 1, 3, 2];
console.log(maxSubarraySum(arr, k));
