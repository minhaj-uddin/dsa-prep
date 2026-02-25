class FenwickTree {
  constructor(size) {
    this.size = size;
    this.tree = new Array(size + 1).fill(0);
  }

  query(index) {
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }
    return sum;
  }

  update(index) {
    while (index <= this.size) {
      this.tree[index]++;
      index += index & -index;
    }
  }
}

function larrysArray(A) {
  const n = A.length;
  if (n < 3) return "YES";

  // Initialize Finweck Tree
  const fenwick = new FenwickTree(n);

  let inversions = 0;
  for (let i = 0; i < n; i++) {
    inversions += i - fenwick.query(A[i]);
    fenwick.update(A[i]);
  }

  return inversions % 2 === 0 ? "YES" : "NO";
}

const A = [1, 6, 5, 2, 4, 3];
const result = larrysArray(A);
console.log(result);
