const binarySearch = (nums, left, right, target) => {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const foundVal = nums[mid];

    if (foundVal === target) {
      return mid;
    } else if (foundVal < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};

const searchRange = (nums, target) => {
  if (nums.length === 0) return [-1, -1];

  const firstPos = binarySearch(nums, 0, nums.length - 1, target);
  if (firstPos === -1) return [-1, -1];

  let start = firstPos;
  let end = firstPos;
  let temp1, temp2;

  while (start !== -1) {
    temp1 = start;
    start = binarySearch(nums, 0, start - 1, target);
  }
  start = temp1;

  while (end !== -1) {
    temp2 = end;
    end = binarySearch(nums, end + 1, nums.length - 1, target);
  }
  end = temp2;

  return [start, end];
};

const target = 5;
const arr = [1, 3, 5, 5, 5, 5, 6, 7, 8, 9];
const result = searchRange(arr, target);
console.log(result);
