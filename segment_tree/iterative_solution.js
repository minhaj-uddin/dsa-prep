class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.h = Math.ceil(Math.log2(this.n));

    this.tree = new Array(2 * this.n).fill(0);
    this.lazy = new Array(this.n).fill(0);

    // insert leaves
    for (let index = 0; index < this.n; index++) {
      this.tree[this.n + index] = arr[index];
    }

    // build tree
    for (let index = this.n - 1; index > 0; index--) {
      this.tree[index] = this.tree[index << 1] + this.tree[(index << 1) | 1];
    }
  }

  apply(index, value, length) {
    this.tree[index] += value * length;
    if (index < this.n) this.lazy[index] += value;
  }

  build(index) {
    let length = 2;

    while (index > 1) {
      index >>= 1;

      this.tree[index] =
        this.tree[index << 1] +
        this.tree[(index << 1) | 1] +
        this.lazy[index] * length;

      length <<= 1;
    }
  }

  push(index) {
    for (let c = this.h; c > 0; c--) {
      let node = index >> c;

      if (this.lazy[node] !== 0) {
        let value = this.lazy[node];

        this.apply(node << 1, value, 1 << (c - 1));
        this.apply((node << 1) | 1, value, 1 << (c - 1));

        this.lazy[node] = 0;
      }
    }
  }

  rangeQuery(left, right) {
    let result = 0;

    left += this.n;
    right += this.n;

    this.push(left);
    this.push(right);

    while (left <= right) {
      if (left & 1) result += this.tree[left++];
      if (!(right & 1)) result += this.tree[right--];

      left >>= 1;
      right >>= 1;
    }

    return result;
  }

  rangeUpdate(left, right, value) {
    let l = left + this.n;
    let r = right + this.n;

    this.push(l);
    this.push(r);

    let length = 1;

    for (
      left += this.n, right += this.n;
      left <= right;
      left >>= 1, right >>= 1, length <<= 1
    ) {
      if (left & 1) this.apply(left++, value, length);
      if (!(right & 1)) this.apply(right--, value, length);
    }

    this.build(l);
    this.build(r);
  }

  pointUpdate(index, value) {
    let pos = index + this.n;

    // Push lazy values
    this.push(pos);

    // Update leaf node
    this.tree[pos] = value;

    // Build the tree
    this.build(pos);
  }
}

const arr = [5, 3, 2, 6];
const st = new SegmentTree(arr);
console.log(st.rangeQuery(1, 3));

// Range update
st.rangeUpdate(1, 3, 2);
console.log(st.rangeQuery(0, 3));

// Point update
st.pointUpdate(2, 10);
console.log(st.rangeQuery(0, 3));
