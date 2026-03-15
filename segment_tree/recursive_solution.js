class SegmentTree {
  constructor(arr) {
    this.n = arr.length;

    this.tree = new Array(4 * this.n).fill(0);
    this.lazy = new Array(4 * this.n).fill(0);

    this.build(arr, 0, 0, this.n - 1);
  }

  leftChild = (node) => 2 * node + 1;
  rightChild = (node) => 2 * node + 2;

  build = (arr, node, left, right) => {
    if (left === right) {
      this.tree[node] = arr[left];
      return;
    }

    const mid = (left + right) >> 1;

    const L = this.leftChild(node);
    const R = this.rightChild(node);

    this.build(arr, L, left, mid);
    this.build(arr, R, mid + 1, right);

    this.tree[node] = this.tree[L] + this.tree[R];
  };

  pushDown = (node, left, right) => {
    if (this.lazy[node] === 0) return;

    const val = this.lazy[node];

    this.tree[node] += (right - left + 1) * val;

    if (left !== right) {
      const L = this.leftChild(node);
      const R = this.rightChild(node);

      this.lazy[L] += val;
      this.lazy[R] += val;
    }

    this.lazy[node] = 0;
  };

  rangeQuery = (node, left, right, l, r) => {
    this.pushDown(node, left, right);

    // No overlap
    if (r < left || l > right) return 0;

    // Complete overlap
    if (l <= left && right <= r) return this.tree[node];

    const mid = (left + right) >> 1;

    const L = this.leftChild(node);
    const R = this.rightChild(node);

    const q1 = this.rangeQuery(L, left, mid, l, r);
    const q2 = this.rangeQuery(R, mid + 1, right, l, r);

    return q1 + q2;
  };

  rangeUpdate = (node, left, right, l, r, value) => {
    this.pushDown(node, left, right);

    // No overlap
    if (r < left || l > right) return;

    // Complete overlap
    if (l <= left && right <= r) {
      this.lazy[node] += value;
      this.pushDown(node, left, right);
      return;
    }

    const mid = (left + right) >> 1;

    const L = this.leftChild(node);
    const R = this.rightChild(node);

    this.rangeUpdate(L, left, mid, l, r, value);
    this.rangeUpdate(R, mid + 1, right, l, r, value);

    this.tree[node] = this.tree[L] + this.tree[R];
  };

  // Point update (set index to value)
  pointUpdate = (node, left, right, index, value) => {
    this.pushDown(node, left, right);

    if (left === right) {
      this.tree[node] = value;
      return;
    }

    const mid = (left + right) >> 1;

    const L = this.leftChild(node);
    const R = this.rightChild(node);

    if (index <= mid) {
      this.pointUpdate(L, left, mid, index, value);
    } else {
      this.pointUpdate(R, mid + 1, right, index, value);
    }

    this.tree[node] = this.tree[L] + this.tree[R];
  };
}

const arr = [5, 3, 1, 7];
const st = new SegmentTree(arr);

const LEFT = 0;
const RIGHT = arr.length - 1;
console.log(st.rangeQuery(0, LEFT, RIGHT, 0, 3));

// Range update: add 2 to [1,3]
st.rangeUpdate(0, LEFT, RIGHT, 1, 3, 2);
console.log(st.rangeQuery(0, LEFT, RIGHT, 0, 3));

// Point update: set index 2 → 10
st.pointUpdate(0, LEFT, RIGHT, 2, 10);
console.log(st.rangeQuery(0, LEFT, RIGHT, 0, 3));
