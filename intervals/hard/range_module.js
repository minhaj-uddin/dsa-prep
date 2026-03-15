// Approach 1:
// Sorted List + Binary Search
class RangeModule {
  constructor() {
    this.intervals = [];
  }

  binarySearch = (target) => {
    let left = 0;
    let right = this.intervals.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (this.intervals[mid][1] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  };

  queryRange = (left, right) => {
    const index = this.binarySearch(left);
    if (index === this.intervals.length) return false;

    const [start, end] = this.intervals[index];
    return start <= left && end >= right;
  };

  addRange = (left, right) => {
    const n = this.intervals.length;
    const result = [];
    let i = 0;

    // Add intervals completely before new range
    while (i < n && this.intervals[i][1] < left) {
      result.push(this.intervals[i]);
      i++;
    }

    // Merge overlapping intervals
    while (i < n && this.intervals[i][0] <= right) {
      left = Math.min(left, this.intervals[i][0]);
      right = Math.max(right, this.intervals[i][1]);
      i++;
    }

    result.push([left, right]);

    // Add remaining intervals
    while (i < n) {
      result.push(this.intervals[i]);
      i++;
    }

    this.intervals = result;
  };

  removeRange = (left, right) => {
    const result = [];

    for (const [start, end] of this.intervals) {
      if (end <= left || start >= right) {
        result.push([start, end]);
      } else {
        if (start < left) {
          result.push([start, left]);
        }

        if (end > right) {
          result.push([right, end]);
        }
      }
    }

    this.intervals = result;
  };
}

// Approach 2:
// Dynamic Segment Tree
// (Lazy Propagation)
class TreeNode {
  constructor() {
    this.left = null;
    this.right = null;
    this.covered = false;
    this.lazy = null;
  }
}

class RangeModule {
  constructor() {
    this.root = new TreeNode();
    this.MINIMUM = 0;
    this.MAXIMUM = 20; //1e9;
  }

  pushDown = (node) => {
    if (node.lazy === null) return;

    if (!node.left) node.left = new TreeNode();
    if (!node.right) node.right = new TreeNode();

    node.left.covered = node.lazy;
    node.right.covered = node.lazy;

    node.left.lazy = node.lazy;
    node.right.lazy = node.lazy;

    node.lazy = null;
  };

  pushUp = (node) => {
    node.covered =
      node.left && node.right && node.left.covered && node.right.covered;
  };

  update = (node, start, end, l, r, val) => {
    if (l >= end || r <= start) return;

    if (l <= start && end <= r) {
      node.covered = val;
      node.lazy = val;
      return;
    }

    this.pushDown(node);

    const mid = Math.floor((start + end) / 2);

    if (!node.left) node.left = new TreeNode();
    if (!node.right) node.right = new TreeNode();

    this.update(node.left, start, mid, l, r, val);
    this.update(node.right, mid, end, l, r, val);

    this.pushUp(node);
  };

  query = (node, start, end, l, r) => {
    if (!node || l >= end || r <= start) return true;

    if (node.covered) return true;

    if (l <= start && end <= r && node.lazy !== null) {
      return node.covered;
    }

    const mid = Math.floor((start + end) / 2);

    this.pushDown(node);

    return (
      this.query(node.left, start, mid, l, r) &&
      this.query(node.right, mid, end, l, r)
    );
  };

  addRange = (left, right) => {
    this.update(this.root, this.MINIMUM, this.MAXIMUM, left, right, true);
  };

  removeRange = (left, right) => {
    this.update(this.root, this.MINIMUM, this.MAXIMUM, left, right, false);
  };

  queryRange = (left, right) => {
    return this.query(this.root, this.MINIMUM, this.MAXIMUM, left, right);
  };
}
