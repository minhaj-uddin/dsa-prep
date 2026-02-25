const minOperations = (A, X) => {
  const N = A.length;

  let totalSum = 0;
  // Compute total sum
  for (let i = 0; i < N; i++) {
    totalSum += A[i];
  }

  // Feasibility check
  if (totalSum % N !== 0) return -1;

  const avgerage = totalSum / N;
  let minOperations = 0;

  // Process X independent sequences
  for (let start = 0; start < X; start++) {
    let curentSum = 0;
    for (let i = start; i < N; i += X) {
      curentSum += A[i] - avgerage;
      minOperations += Math.abs(curentSum);
    }

    // Check for each sequence
    if (curentSum !== 0) return -1;
  }

  return minOperations;
};

const X = 2;
const A = [2, 8, 10, 4, 6];
const result = minOperations(A, X);
console.log(result);
