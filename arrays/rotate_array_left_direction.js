var rotateLeft = (nums, k) => {
  if (!Array.isArray(nums)) return;

  const n = nums.length;
  if (n === 0 || n === 1) return;

  // Handle -ive k values
  k = ((k % n) + n) % n;
  if (k === 0) return;

  const reverse = (arr, start, end) => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };

  // Step 1: Reverse first k elements
  reverse(nums, 0, k - 1);
  // Step 2: Reverse remaining elements
  reverse(nums, k, n - 1);
  // Step 3: Reverse entire array
  reverse(nums, 0, n - 1);
};

const nums = [1, 2, 3, 4, 5, 6, 7];
// rotateLeft(nums, -3);
rotateLeft(nums, 3);
console.log(nums);
