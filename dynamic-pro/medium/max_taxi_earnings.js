// Approach: DP with Points as States
const maxTaxiEarnings = (n, rides) => {
  // Group rides by end point
  const ridesMap = new Map();

  for (const [target, end, tip] of rides) {
    const profit = end - target + tip;
    if (!ridesMap.has(end)) {
      ridesMap.set(end, []);
    }
    ridesMap.get(end).push([target, profit]);
  }

  // Initialize dp array, with defaults
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    // Carry forward the maximum earnings
    dp[i] = Math.max(dp[i], dp[i - 1]);

    if (ridesMap.has(i)) {
      // Calculate profit for rides ending at point i
      for (const [target, profit] of ridesMap.get(i)) {
        dp[i] = Math.max(dp[i], dp[target] + profit);
      }
    }
  }

  return dp[n];
};

// Approach: DP + BS (Iterative)
const maxTaxiEarnings = (n, rides) => {
  const m = rides.length;

  // Sort rides by end
  rides.sort((a, b) => a[1] - b[1]);

  // Binary search helper (rides array)
  const findLastNonOverlap = (target, i) => {
    let left = 0;
    let right = i - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (rides[mid][1] <= target) {
        result = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  };

  // Initialize DP array
  const dp = new Array(m).fill(0);

  for (let i = 0; i < m; i++) {
    const [start, end, tip] = rides[i];
    const profit = end - start + tip;

    const skip = i > 0 ? dp[i - 1] : 0;
    const idx = findLastNonOverlap(start, i);
    const take = profit + (idx >= 0 ? dp[idx] : 0);

    dp[i] = Math.max(skip, take);
  }

  return dp[m - 1];
};

// Approach: DP + BS (Recursive)
const maxTaxiEarnings = (n, rides) => {
  // Sort rides by start time
  rides.sort((a, b) => a[0] - b[0]);

  const m = rides.length;
  const memo = new Array(m).fill(undefined);

  // Extract start times for binary search
  const starts = rides.map((r) => r[0]);

  // Find first ride with start >= target
  const findNextIndex = (target, left) => {
    let right = m - 1;
    let result = m;

    while (left <= right) {
      const mid = (left + right) >> 1;

      if (starts[mid] >= target) {
        result = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return result;
  };

  const dfs = (i) => {
    if (i >= m) return 0;
    if (memo[i] !== undefined) return memo[i];

    const [start, end, tip] = rides[i];
    const profit = end - start + tip;

    const nextIndex = findNextIndex(end, i + 1);

    const skip = dfs(i + 1);
    const take = profit + dfs(nextIndex);

    return (memo[i] = Math.max(skip, take));
  };

  return dfs(0);
};

const n = 20;
const rides = [
  [1, 6, 1],
  [3, 10, 2],
  [10, 12, 3],
  [11, 12, 2],
  [12, 15, 2],
  [13, 18, 1],
];
const result = maxTaxiEarnings(n, rides);
console.log(result);
