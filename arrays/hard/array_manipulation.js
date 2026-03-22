const arrayManipulation = (n, queries) => {
  // Differential Array Technique
  const arr = new Array(n + 1).fill(0);

  // Apply range updates at O(1) time
  for (const [a, b, k] of queries) {
    arr[a] += k;
    arr[b + 1] -= k;
  }

  // Prefix sum & max tracking
  let prefixSum = 0;
  let maxNumber = 0;

  for (let i = 1; i <= n; i++) {
    prefixSum += arr[i];
    maxNumber = Math.max(prefixSum, maxNumber);
  }

  return maxNumber;
};

const n = 10;
const queries = [
  [1, 5, 3],
  [4, 8, 7],
  [6, 9, 1],
];
const result = arrayManipulation(n, queries);
console.log(result);
