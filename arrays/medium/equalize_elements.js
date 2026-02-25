function minOperations(arr) {
  const n = arr.length;
  const totalSum = arr.reduce((sum, val) => sum + val, 0);

  // Step 1: Check feasibility
  if (totalSum % n !== 0) return -1;

  const target = totalSum / n;
  let operations = 0;

  // Step 2: Count surplus
  for (let val of arr) {
    if (val > target) {
      operations += val - target;
    }
  }

  return operations;
}

const arr = [1, 2, 3, 4, 5];
const result = minOperations(arr);
console.log(result);
