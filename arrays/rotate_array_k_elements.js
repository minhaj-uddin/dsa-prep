const rotateArray = (nums, k) => {
  const n = nums.length;
  k = k % n;

  const reverse = (arr, start, end) => {
    while (start <= end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };

  // Step 1: Reverse entire array
  reverse(nums, 0, n - 1);
  // Step 2: Reverse first k elements
  reverse(nums, 0, k - 1);
  // Step 3: Reverse remaining elements
  reverse(nums, k, n - 1);
};

const nums = [1, 2, 3, 4, 5, 6, 7];
rotateArray(nums, 3);
console.log(nums);
