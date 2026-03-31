class SegmentTree {
  constructor(n) {
    this.size = n;
    this.tree = new Array(4 * n).fill(0);
    this.lazy = new Array(4 * n).fill(0);
  }

  leftChild = (node) => 2 * node + 1;
  rightChild = (node) => 2 * node + 2;

  propagate = (node, start, end) => {
    const pending = this.lazy[node];
    if (!pending || start === end) return;

    const [lc, rc] = [this.leftChild(node), this.rightChild(node)];
    this.tree[lc] = this.lazy[lc] = pending;
    this.tree[rc] = this.lazy[rc] = pending;
    this.lazy[node] = 0;
  };

  update = (node, start, end, l, r, value) => {
    if (r < start || end < l) return;

    if (l <= start && end <= r) {
      this.tree[node] = value;
      this.lazy[node] = value;
      return;
    }

    this.propagate(node, start, end);

    const mid = Math.floor((start + end) / 2);
    this.update(this.leftChild(node), start, mid, l, r, value);
    this.update(this.rightChild(node), mid + 1, end, l, r, value);

    this.tree[node] = Math.max(
      this.tree[this.leftChild(node)],
      this.tree[this.rightChild(node)],
    );
  };

  query = (node, start, end, l, r) => {
    if (r < start || end < l) return 0;

    if (l <= start && end <= r) return this.tree[node];

    this.propagate(node, start, end);

    const mid = Math.floor((start + end) / 2);
    return Math.max(
      this.query(this.leftChild(node), start, mid, l, r),
      this.query(this.rightChild(node), mid + 1, end, l, r),
    );
  };
}

const fallingSquares = (positions) => {
  // Coordinate Compression
  const coords = new Set();
  for (const [left, size] of positions) {
    coords.add(left);
    coords.add(left + size);
  }

  // Sort coordinates by left, ascending order
  const sorted = [...coords].sort((a, b) => a - b);

  const indexMap = new Map();
  sorted.forEach((x, i) => indexMap.set(x, i));

  const st = new SegmentTree(sorted.length);

  const result = [];
  let maxHeight = 0;

  for (const [left, size] of positions) {
    const L = indexMap.get(left);
    const R = indexMap.get(left + size) - 1;

    const baseHeight = st.query(1, 0, st.size - 1, L, R);
    const currentHeight = baseHeight + size;

    st.update(1, 0, st.size - 1, L, R, currentHeight);

    maxHeight = Math.max(maxHeight, currentHeight);
    result.push(maxHeight);
  }

  return result;
};

const positions = [
  [1, 2],
  [2, 3],
  [6, 1],
];
const result = fallingSquares(positions);
console.log(result);
