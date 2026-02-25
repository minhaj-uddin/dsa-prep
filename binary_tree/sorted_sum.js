const MOD = 1_000_000_007;

class FenwickTree {
  constructor(n) {
    this.n = n;
    this.bit = Array(n + 1).fill(0);
  }

  update(i, delta) {
    while (i <= this.n) {
      this.bit[i] = (this.bit[i] + delta) % MOD;
      i += i & -i;
    }
  }

  query(i) {
    let sum = 0;
    while (i > 0) {
      sum = (sum + this.bit[i]) % MOD;
      i -= i & -i;
    }
    return sum;
  }
}

function sortedSum(arr) {
  // Coordinate compression
  const sortedVals = [...new Set(arr)].sort((a, b) => a - b);
  const index = new Map(sortedVals.map((v, i) => [v, i + 1]));

  const size = sortedVals.length;
  const countBIT = new FenwickTree(size);
  const sumBIT = new FenwickTree(size);

  let total = 0;
  let currWeightedSum = 0;

  for (const x of arr) {
    const idx = index.get(x);

    const leftCount = countBIT.query(idx);
    const leftSum = sumBIT.query(idx);

    const rightSum = (sumBIT.query(size) - leftSum + MOD) % MOD;

    // New weighted sum after insertion
    currWeightedSum = (currWeightedSum + x * (leftCount + 1) + rightSum) % MOD;

    total = (total + currWeightedSum) % MOD;

    countBIT.update(idx, 1);
    sumBIT.update(idx, x);
  }

  return total;
}
