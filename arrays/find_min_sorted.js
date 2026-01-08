const findMin = (nums) => {
  if (!nums.length) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.min(nums[0], nums[1]);
  if (nums[0] < nums[nums.length - 1]) return nums[0];

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) return nums[mid + 1];
    if (nums[mid] < nums[mid - 1]) return nums[mid];
    if (nums[left] < nums[mid]) left = mid + 1;
    else right = mid - 1;
  }

  // Non-sorted
  return 0;
};

const nums = [8, 9, 1, 2, 3, 4, 5, 6, 7];
const result = findMin(nums);
console.log(result);
