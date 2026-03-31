// Brute Force - Time: O(n²) | Space: O(1)
const smallerNumbersThanCurrent = (nums) => {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    let count = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] < nums[i]) count++;
    }
    result[i] = count;
  }
  return result;
};

// Sorting + Hash Map - Time: O(n log n) | Space: O(n)
const smallerNumbersThanCurrent2 = (nums) => {
  const map = new Map(
    [...nums]
      .sort((a, b) => b - a)
      .map((val, idx) => [val, nums.length - idx - 1]),
  );
  return nums.map((n) => map.get(n));
};

// Sorting + Index Tracking - Time: O(n log n) | Space: O(n)
const smallerNumbersThanCurrent3 = (nums) => {
  const firstIndex = new Map();
  const sorted = [...nums].sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; i++) {
    if (!firstIndex.has(sorted[i])) {
      firstIndex.set(sorted[i], i);
    }
  }

  return nums.map((n) => firstIndex.get(n));
};

// Counting Sort + Prefix Sum - Time: O(n + k) | Space: O(k)
const smallerNumbersThanCurrent4 = (nums) => {
  const M = Math.max(...nums);
  const count = new Array(M).fill(0);

  for (let num of nums) count[num]++;
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  return nums.map((n) => (n === 0 ? 0 : count[n - 1]));
};

// Binary Search - Time: O(n log n) | Space: O(n)
const smallerNumbersThanCurrent5 = (nums) => {
  const sorted = [...nums].sort((a, b) => a - b);
  // Helper: find first index where value >= target
  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  };
  return nums.map((num) => binarySearch(sorted, num));
};

// Fenwick Tree - Time: O(n log n) | Space: O(n)
const smallerNumbersThanCurrent6 = (nums) => {
  const rank = new Map();
  // Coordinate compression
  const sortedUnique = [...new Set(nums)].sort((a, b) => a - b);
  sortedUnique.forEach((val, idx) => rank.set(val, idx + 1));

  // Fenwick Tree (BIT)
  class FenwickTree {
    constructor(size) {
      this.tree = new Array(size + 1).fill(0);
    }

    update(index, value) {
      while (index < this.tree.length) {
        this.tree[index] += value;
        index += index & -index;
      }
    }

    query(index) {
      let sum = 0;
      while (index > 0) {
        sum += this.tree[index];
        index -= index & -index;
      }
      return sum;
    }
  }

  const fenwick = new FenwickTree(sortedUnique.length);

  // Build full frequency
  for (const num of nums) {
    fenwick.update(rank.get(num), 1);
  }

  return nums.map((num) => fenwick.query(rank.get(num) - 1));
};

const nums = [8, 1, 2, 2, 3];
console.log(smallerNumbersThanCurrent(nums));
console.log(smallerNumbersThanCurrent2(nums));
console.log(smallerNumbersThanCurrent3(nums));
console.log(smallerNumbersThanCurrent4(nums));
console.log(smallerNumbersThanCurrent5(nums));
console.log(smallerNumbersThanCurrent6(nums));
