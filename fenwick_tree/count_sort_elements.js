class FenwickTree {
  constructor(size) {
    this.size = size;
    this.tree = new Array(size + 1).fill(0);
  }

  update = (index, value) => {
    while (index <= this.size) {
      this.tree[index] += value;
      index += index & -index;
    }
  };

  query = (index) => {
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }
    return sum;
  };

  queryRange = (l, r) => {
    return this.query(r) - this.query(l - 1);
  };
}

// Approach 1: Fenwick Tree
const countAllElements = (nums) => {
  const N = nums.length;

  const smallerRight = Array(N).fill(0);
  const greaterRight = Array(N).fill(0);
  const smallerLeft = Array(N).fill(0);
  const greaterLeft = Array(N).fill(0);

  // Coordinate compression
  const rank = Object.fromEntries(
    [...new Set(nums)]
      .sort((a, b) => a - b) // Sort ascending order
      .map((k, v) => [k, v + 1]), // Convert to KV pair
  );

  // Fenwick Tree instantiation
  const f = new FenwickTree(N);

  // Count smaller/greater to the right
  for (let i = N - 1; i >= 0; i--) {
    const r = rank[nums[i]];
    smallerRight[i] = f.query(r - 1);
    greaterRight[i] = f.queryRange(r + 1, N);
    f.update(r, 1);
  }

  f.tree.fill(0); // Single tree trick

  // Count smaller/greater to the left
  for (let i = 0; i < N; i++) {
    const r = rank[nums[i]];
    smallerLeft[i] = f.query(r - 1);
    greaterLeft[i] = f.queryRange(r + 1, N);
    f.update(r, 1);
  }

  // How many numbers to the left/right are between [a, b]?
  // Direction: left → right vs. right → left
  // Formula: query(rank[b]) - query(rank[a] - 1)
  // queryRange = (l, r) => {
  //  return this.query(r) - this.query(l - 1);
  // };

  return { smallerRight, greaterRight, smallerLeft, greaterLeft };
};

const nums = [5, 2, 6, 1];
const counts = countAllElements(nums);

console.log(nums); // [5, 2, 6, 1]
console.log(counts.smallerRight); // [2,1,1,0]
console.log(counts.greaterRight); // [1,1,0,0]
console.log(counts.smallerLeft); // [0,0,2,0]
console.log(counts.greaterLeft); // [0,1,0,3]
console.log("==============");

// Approach 2: Merge Sorting
const countElements = (nums, compare) => {
  const N = nums.length;
  const result = new Array(N).fill(0);

  // store indices instead of values
  const indices = Array.from({ length: N }, (_, i) => i);

  const mergeSort = (left, right) => {
    if (right - left <= 1) return;

    const mid = Math.floor((left + right) / 2);
    mergeSort(left, mid); // Merge sort (left)
    mergeSort(mid, right); // Merge sort (right)

    merge(left, mid, right);
  };

  const merge = (left, mid, right) => {
    const t = [];
    let i = left;
    let j = mid;
    let count = 0;

    while (i < mid && j < right) {
      // Plug-in comparison + direction logic
      if (compare(nums[indices[j]], nums[indices[i]])) {
        // Right element is smaller/greater
        t.push(indices[j]);
        count++;
        j++;
      } else {
        // Left element gets all seen so far
        result[indices[i]] += count;
        t.push(indices[i]);
        i++;
      }
    }

    // Remaining left elements
    while (i < mid) {
      result[indices[i]] += count;
      t.push(indices[i]);
      i++;
    }

    // Remaining right elements
    while (j < right) {
      t.push(indices[j]);
      j++;
    }

    // Copy back all remaing elements
    for (let k = left; k < right; k++) {
      indices[k] = t[k - left];
    }
  };

  mergeSort(0, N);
  return result;
};

const countSmallerRight = (nums) =>
  countElements(nums, (right, left) => right < left);
const countGreaterRight = (nums) =>
  countElements(nums, (right, left) => right > left);
const countSmallerLeft = (nums) =>
  countElements([...nums].reverse(), (r, l) => r < l).reverse();
const countGreaterLeft = (nums) =>
  countElements([...nums].reverse(), (r, l) => r > l).reverse();

console.log(nums); // [5, 2, 6, 1]
console.log(countSmallerRight(nums)); // [2,1,1,0]
console.log(countGreaterRight(nums)); // [1,1,0,0]
console.log(countSmallerLeft(nums)); // [0,0,2,0]
console.log(countGreaterLeft(nums)); // [0,1,0,3]
