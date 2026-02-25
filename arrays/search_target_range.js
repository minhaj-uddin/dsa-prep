// Approach: Two binary searches
const searchRange = (nums, target) => {
  const first = findFirst(nums, target);
  const last = findLast(nums, target);
  return [first, last];
};

const findFirst = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left < nums.length && nums[left] === target ? left : -1;
};

const findLast = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right >= 0 && nums[right] === target ? right : -1;
};

const target = 5;
const arr = [1, 3, 5, 5, 5, 5, 6, 7, 8, 9];
const result = searchRange(arr, target);
console.log(result);

// Approach: Unified binary search
const findBound = (nums, target, isFirst) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      if (isFirst) {
        // Check if it is the first occurrence
        if (mid === left || nums[mid - 1] !== target) {
          return mid;
        } else {
          right = mid - 1;
        }
      } else {
        // Check if it is the last occurrence
        if (mid === right || nums[mid + 1] !== target) {
          return mid;
        } else {
          left = mid + 1;
        }
      }
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
};

const searchRange = (nums, target) => {
  const first = findBound(nums, target, true);
  if (first === -1) return [-1, -1];

  const last = findBound(nums, target, false);
  return [first, last];
};

// Approach: Single binary search with expansion
function searchRange(nums, target) {
  let start = -1;
  let end = -1;

  // Perform a single binary search
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      // Found target, now expand to find the bounds
      start = mid;
      end = mid;

      // Move in both directions to find the start and end
      while (start - 1 >= 0 && nums[start - 1] === target) {
        start--;
      }
      while (end + 1 < nums.length && nums[end + 1] === target) {
        end++;
      }

      return [start, end];
    }
  }

  return [start, end];
}
